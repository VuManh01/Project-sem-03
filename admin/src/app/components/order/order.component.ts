import { Component, OnInit } from '@angular/core';
import { OrderService } from './order.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css'],
})
export class OrderComponent implements OnInit {
  orders: any[] = [];
  statuses: string[] = ['Pending', 'Shipped', 'Delivered', 'Cancelled'];
  editIndex: number | null = null; // Theo dõi hàng đang chỉnh sửa
  currentPage: number = 1; // Trang hiện tại
pageSize: number = 10; // Số item mỗi trang


  constructor(private orderService: OrderService) {}

  ngOnInit(): void {
    this.fetchOrders();
  }
  get totalPages(): number {
    return Math.ceil(this.orders.length / this.pageSize);
  }

  fetchOrders(): void {
    this.orderService.getOrders().subscribe({
      next: (data) => {
        console.log('Orders fetched:', data); // Log danh sách đơn hàng
        this.orders = data;
      },
      error: (err) => {
        console.error('Error fetching orders:', err);
      },
    });
  }
  get paginatedOrders(): any[] {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    return this.orders.slice(startIndex, endIndex);
  }

  nextPage(): void {
    if (this.currentPage < Math.ceil(this.orders.length / this.pageSize)) {
      this.currentPage++;
    }
  }

  previousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }
  startEditing(index: number): void {
    this.editIndex = index; // Bắt đầu chỉnh sửa hàng
  }

  cancelEditing(): void {
    this.editIndex = null; // Hủy chỉnh sửa
    this.fetchOrders(); // Tải lại dữ liệu để reset
  }

  saveOrder(order: any, index: number): void {
    console.log('Saving order:', order); // Ghi log để kiểm tra
    if (!order) {
      console.error('Order is null or undefined!');
      return;
    }


    this.orderService.updateOrder(order).subscribe({
      next: () => {
        alert('Order updated successfully');
        this.editIndex = null;
        this.fetchOrders();
      },
      error: (err) => {
        console.error('Error updating order:', err);
        alert('Failed to update order. Check console for details.');
      },
    });
  }
}
