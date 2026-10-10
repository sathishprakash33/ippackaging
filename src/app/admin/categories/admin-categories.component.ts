import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { AdminApiService, ProductGroup } from '../admin-api.service';
import { apiErrorMessage } from '../admin-auth.interceptor';

@Component({
  selector: 'app-admin-categories',
  imports: [ReactiveFormsModule],
  templateUrl: './admin-categories.component.html',
  styleUrl: '../admin.scss',
})
export class AdminCategoriesComponent {
  private readonly api = inject(AdminApiService);
  private readonly formBuilder = inject(FormBuilder);

  readonly groups = signal<ProductGroup[]>([]);
  readonly error = signal('');
  readonly editingId = signal<number | null>(null);
  readonly form = this.formBuilder.nonNullable.group({
    name: ['', Validators.required],
  });

  constructor() {
    this.load();
  }

  load(): void {
    this.api.groups().subscribe({
      next: (groups) => this.groups.set(groups),
      error: (error) => this.error.set(apiErrorMessage(error, 'Could not load categories.')),
    });
  }

  edit(group: ProductGroup): void {
    this.editingId.set(group.id);
    this.form.setValue({ name: group.name });
  }

  reset(): void {
    this.editingId.set(null);
    this.form.reset({ name: '' });
  }

  save(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    const name = this.form.getRawValue().name.trim();
    const id = this.editingId();
    const request = id ? this.api.updateGroup(id, name) : this.api.createGroup(name);
    request.subscribe({
      next: () => {
        this.error.set('');
        this.reset();
        this.load();
      },
      error: (error) => this.error.set(apiErrorMessage(error, 'Could not save the category.')),
    });
  }

  remove(group: ProductGroup): void {
    if (!confirm(`Remove category “${group.name}”?`)) {
      return;
    }
    this.api.deleteGroup(group.id).subscribe({
      next: () => this.load(),
      error: (error) => this.error.set(apiErrorMessage(error, 'Could not remove the category.')),
    });
  }
}
