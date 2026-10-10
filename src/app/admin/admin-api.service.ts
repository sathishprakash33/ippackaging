import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

export interface ProductGroup {
  id: number;
  name: string;
  createdAt: string;
}

export interface ProductItem {
  internalId: number;
  id: string;
  name: Record<string, string>;
  description: Record<string, string>;
  productGroupId: number;
  productGroupName: string;
  image: string;
  rate: number;
  discount: number;
  sellingPrice: number;
  weightGrams: number;
  inStock: boolean;
  isActive: boolean;
  bestSeller: boolean;
  certificates: string[];
  rating: number;
  trackInventory: boolean;
  stockQuantity: number;
}

export interface SaveProductBody {
  slug: string;
  productGroupId: number;
  name: Record<string, string>;
  description: Record<string, string>;
  imageUrl: string;
  rate: number;
  discount: number;
  rating: number;
  bestSeller: boolean;
  inStock: boolean;
  certificates: string[];
  isActive: boolean;
  weightGrams: number;
  trackInventory: boolean;
  stockQuantity: number;
}

export interface OrderItem {
  id: number;
  orderCode: string;
  status: string;
  customerName: string | null;
  phone: string | null;
  email: string | null;
  doorNumber: string | null;
  street: string | null;
  city: string | null;
  stateName: string | null;
  pincode: string | null;
  finalAmount: number;
  createdAt: string;
}

export interface OrdersBoard {
  pending: OrderItem[];
  confirmed: OrderItem[];
  processing: OrderItem[];
  shipped: OrderItem[];
  delivered: OrderItem[];
  cancelled: OrderItem[];
}

export interface CourierSlab {
  fromGrams: number;
  toGrams: number;
  rateAmount: number;
  currencyId: number;
  isEnabled: boolean;
  sortOrder: number;
  slabLabel: string | null;
}

export interface CourierZone {
  id: number;
  stateName: string;
  isActive: boolean;
  slabs: Array<CourierSlab & { id: number; currencyCode: string }>;
}

export interface CourierBootstrap {
  currencies: Array<{ id: number; currencyCode: string; currencyName: string; isActive: boolean }>;
  zones: CourierZone[];
}

@Injectable({ providedIn: 'root' })
export class AdminApiService {
  constructor(private readonly http: HttpClient) {}

  groups() {
    return this.http.get<ProductGroup[]>('/api/admin/product-groups');
  }

  createGroup(name: string) {
    return this.http.post<ProductGroup>('/api/admin/product-groups', { name });
  }

  updateGroup(id: number, name: string) {
    return this.http.put<ProductGroup>(`/api/admin/product-groups/${id}`, { name });
  }

  deleteGroup(id: number) {
    return this.http.delete<void>(`/api/admin/product-groups/${id}`);
  }

  products() {
    return this.http.get<ProductItem[]>('/api/admin/products', { params: { includeInactive: 'true' } });
  }

  createProduct(body: SaveProductBody) {
    return this.http.post<ProductItem>('/api/admin/products', body);
  }

  updateProduct(id: number, body: SaveProductBody) {
    return this.http.put<ProductItem>(`/api/admin/products/${id}`, body);
  }

  deleteProduct(id: number) {
    return this.http.delete<void>(`/api/admin/products/${id}`);
  }

  orders() {
    return this.http.get<OrdersBoard>('/api/admin/orders');
  }

  updateOrderStatus(id: number, status: string) {
    return this.http.patch<OrderItem>(`/api/admin/orders/${id}/status`, { status });
  }

  courier() {
    return this.http.get<CourierBootstrap>('/api/admin/courier/bootstrap');
  }

  createZone(body: { stateName: string; isActive: boolean; slabs: CourierSlab[] }) {
    return this.http.post<CourierZone>('/api/admin/courier/zones', body);
  }

  updateZone(id: number, body: { stateName: string; isActive: boolean; slabs: CourierSlab[] }) {
    return this.http.put<CourierZone>(`/api/admin/courier/zones/${id}`, body);
  }

  deleteZone(id: number) {
    return this.http.delete<void>(`/api/admin/courier/zones/${id}`);
  }
}
