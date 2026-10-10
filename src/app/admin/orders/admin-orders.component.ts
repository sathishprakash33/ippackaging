import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AdminApiService, OrderItem, OrdersBoard } from '../admin-api.service';
import { apiErrorMessage } from '../admin-auth.interceptor';

@Component({
  selector: 'app-admin-orders',
  imports: [FormsModule],
  templateUrl: './admin-orders.component.html',
  styleUrl: '../admin.scss',
})
export class AdminOrdersComponent {
  private readonly api = inject(AdminApiService);

  readonly orders = signal<OrderItem[]>([]);
  readonly error = signal('');
  readonly statuses = ['pending', 'confirmed', 'processing', 'shipped', 'delivered', 'cancelled'];

  constructor() {
    this.load();
  }

  load(): void {
    this.api.orders().subscribe({
      next: (board) => this.orders.set(this.flatten(board)),
      error: (error) => this.error.set(apiErrorMessage(error, 'Could not load orders.')),
    });
  }

  address(order: OrderItem): string {
    return [order.doorNumber, order.street, order.city, order.stateName, order.pincode]
      .filter(Boolean)
      .join(', ');
  }

  changeStatus(order: OrderItem, status: string): void {
    if (status === order.status) {
      return;
    }
    this.api.updateOrderStatus(order.id, status).subscribe({
      next: () => {
        this.error.set('');
        this.load();
      },
      error: (error) => this.error.set(apiErrorMessage(error, 'That status change is not allowed.')),
    });
  }

  private flatten(board: OrdersBoard): OrderItem[] {
    return [
      ...board.pending,
      ...board.confirmed,
      ...board.processing,
      ...board.shipped,
      ...board.delivered,
      ...board.cancelled,
    ];
  }
}
