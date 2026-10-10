import { Component, inject, signal } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AdminApiService, ProductGroup, ProductItem, SaveProductBody } from '../admin-api.service';
import { apiErrorMessage } from '../admin-auth.interceptor';

@Component({
  selector: 'app-admin-products',
  imports: [ReactiveFormsModule, FormsModule],
  templateUrl: './admin-products.component.html',
  styleUrl: '../admin.scss',
})
export class AdminProductsComponent {
  private readonly api = inject(AdminApiService);
  private readonly formBuilder = inject(FormBuilder);

  readonly products = signal<ProductItem[]>([]);
  readonly groups = signal<ProductGroup[]>([]);
  readonly error = signal('');
  readonly editingId = signal<number | null>(null);
  readonly formOpen = signal(false);
  private nameTranslations: Record<string, string> = {};
  private descriptionTranslations: Record<string, string> = {};

  readonly form = this.formBuilder.nonNullable.group({
    slug: ['', Validators.required],
    productGroupId: [0, Validators.min(1)],
    name: ['', Validators.required],
    description: [''],
    imageUrl: [''],
    rate: [0, Validators.min(0)],
    discount: [0, [Validators.min(0), Validators.max(100)]],
    weightGrams: [0, Validators.min(0)],
    inStock: [true],
    isActive: [true],
  });

  constructor() {
    this.api.groups().subscribe({
      next: (groups) => this.groups.set(groups),
      error: (error) => this.error.set(apiErrorMessage(error, 'Could not load categories.')),
    });
    this.load();
  }

  load(): void {
    this.api.products().subscribe({
      next: (products) => this.products.set(products),
      error: (error) => this.error.set(apiErrorMessage(error, 'Could not load products.')),
    });
  }

  openNew(): void {
    this.clearForm();
    this.formOpen.set(true);
  }

  edit(product: ProductItem): void {
    this.formOpen.set(true);
    this.editingId.set(product.internalId);
    this.nameTranslations = { ...product.name };
    this.descriptionTranslations = { ...product.description };
    this.form.setValue({
      slug: product.id,
      productGroupId: product.productGroupId,
      name: product.name['en'] || Object.values(product.name)[0] || '',
      description: product.description['en'] || Object.values(product.description)[0] || '',
      imageUrl: product.image,
      rate: product.rate,
      discount: product.discount,
      weightGrams: product.weightGrams,
      inStock: product.inStock,
      isActive: product.isActive,
    });
  }

  reset(): void {
    this.clearForm();
    this.formOpen.set(false);
  }

  private clearForm(): void {
    this.editingId.set(null);
    this.nameTranslations = {};
    this.descriptionTranslations = {};
    this.form.reset({
      slug: '',
      productGroupId: 0,
      name: '',
      description: '',
      imageUrl: '',
      rate: 0,
      discount: 0,
      weightGrams: 0,
      inStock: true,
      isActive: true,
    });
  }

  save(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    const value = this.form.getRawValue();
    const body: SaveProductBody = {
      slug: value.slug.trim(),
      productGroupId: Number(value.productGroupId),
      name: { ...this.nameTranslations, en: value.name.trim() },
      description: { ...this.descriptionTranslations, en: value.description.trim() },
      imageUrl: value.imageUrl.trim(),
      rate: Number(value.rate),
      discount: Number(value.discount),
      rating: 0,
      bestSeller: false,
      inStock: value.inStock,
      certificates: [],
      isActive: value.isActive,
      weightGrams: Number(value.weightGrams),
      trackInventory: false,
      stockQuantity: 0,
    };
    const current = this.products().find((item) => item.internalId === this.editingId());
    if (current) {
      body.rating = current.rating;
      body.bestSeller = current.bestSeller;
      body.certificates = current.certificates;
      body.trackInventory = current.trackInventory;
      body.stockQuantity = current.stockQuantity;
    }
    const id = this.editingId();
    const request = id ? this.api.updateProduct(id, body) : this.api.createProduct(body);
    request.subscribe({
      next: () => {
        this.error.set('');
        this.reset();
        this.load();
      },
      error: (error) => this.error.set(apiErrorMessage(error, 'Could not save the product.')),
    });
  }

  remove(product: ProductItem): void {
    const label = product.name['en'] || product.id;
    if (!confirm(`Remove “${label}”?`)) {
      return;
    }
    this.api.deleteProduct(product.internalId).subscribe({
      next: () => this.load(),
      error: (error) => this.error.set(apiErrorMessage(error, 'Could not remove the product.')),
    });
  }

  label(product: ProductItem): string {
    return product.name['en'] || Object.values(product.name)[0] || product.id;
  }
}
