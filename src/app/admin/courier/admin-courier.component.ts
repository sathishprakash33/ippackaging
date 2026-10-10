import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AdminApiService, CourierBootstrap, CourierSlab, CourierZone } from '../admin-api.service';
import { apiErrorMessage } from '../admin-auth.interceptor';

@Component({
  selector: 'app-admin-courier',
  imports: [FormsModule],
  templateUrl: './admin-courier.component.html',
  styleUrl: '../admin.scss',
})
export class AdminCourierComponent {
  private readonly api = inject(AdminApiService);

  readonly bootstrap = signal<CourierBootstrap | null>(null);
  readonly error = signal('');
  readonly zoneId = signal(0);
  stateName = '';
  isActive = true;
  slabs: CourierSlab[] = [];

  constructor() {
    this.load();
  }

  load(): void {
    this.api.courier().subscribe({
      next: (data) => {
        this.bootstrap.set(data);
        if (this.zoneId() === 0 && !this.stateName) {
          this.startNew();
        }
      },
      error: (error) => this.error.set(apiErrorMessage(error, 'Could not load courier rates.')),
    });
  }

  edit(zone: CourierZone): void {
    this.zoneId.set(zone.id);
    this.stateName = zone.stateName;
    this.isActive = zone.isActive;
    this.slabs = zone.slabs.map((slab, index) => ({
      fromGrams: slab.fromGrams,
      toGrams: slab.toGrams,
      rateAmount: slab.rateAmount,
      currencyId: slab.currencyId,
      isEnabled: slab.isEnabled,
      sortOrder: slab.sortOrder || index,
      slabLabel: slab.slabLabel,
    }));
  }

  startNew(): void {
    const currencyId = this.bootstrap()?.currencies.find((item) => item.isActive)?.id ?? 0;
    this.zoneId.set(0);
    this.stateName = '';
    this.isActive = true;
    this.slabs = [
      {
        fromGrams: 1,
        toGrams: 500,
        rateAmount: 0,
        currencyId,
        isEnabled: true,
        sortOrder: 0,
        slabLabel: null,
      },
    ];
  }

  addSlab(): void {
    const currencyId = this.slabs[0]?.currencyId || this.bootstrap()?.currencies[0]?.id || 0;
    const last = this.slabs[this.slabs.length - 1];
    this.slabs = [
      ...this.slabs,
      {
        fromGrams: last ? last.toGrams + 1 : 1,
        toGrams: last ? last.toGrams + 500 : 500,
        rateAmount: 0,
        currencyId,
        isEnabled: true,
        sortOrder: this.slabs.length,
        slabLabel: null,
      },
    ];
  }

  removeSlab(index: number): void {
    this.slabs = this.slabs.filter((_, itemIndex) => itemIndex !== index);
  }

  save(): void {
    const body = {
      stateName: this.stateName.trim(),
      isActive: this.isActive,
      slabs: this.slabs.map((slab, index) => ({
        ...slab,
        fromGrams: Number(slab.fromGrams),
        toGrams: Number(slab.toGrams),
        rateAmount: Number(slab.rateAmount),
        currencyId: Number(slab.currencyId),
        sortOrder: index,
      })),
    };
    const id = this.zoneId();
    const request = id ? this.api.updateZone(id, body) : this.api.createZone(body);
    request.subscribe({
      next: (zone) => {
        this.error.set('');
        this.zoneId.set(zone.id);
        this.load();
      },
      error: (error) => this.error.set(apiErrorMessage(error, 'Could not save courier rates.')),
    });
  }

  remove(zone: CourierZone): void {
    if (!confirm(`Remove rates for ${zone.stateName}?`)) {
      return;
    }
    this.api.deleteZone(zone.id).subscribe({
      next: () => {
        if (this.zoneId() === zone.id) {
          this.startNew();
        }
        this.load();
      },
      error: (error) => this.error.set(apiErrorMessage(error, 'Could not remove that state.')),
    });
  }
}
