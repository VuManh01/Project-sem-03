import { Component, OnInit } from '@angular/core';
import { AccountService } from './user.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
})
export class UsersComponent implements OnInit {
  accounts: any[] = [];
  isEditing: boolean = false;
  selectedAccount: any = null;
  editSuccess: boolean = false; // To track success notification visibility
  currentPage = 1;  // Current page, default is 1
  itemsPerPage = 10; // Number of items per page
  totalItems = 100;  // Total items (this should come from your data or API)
  get paginatedAccounts() {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    return this.accounts.slice(startIndex, startIndex + this.itemsPerPage);
  }

  nextPage() {
    if (this.currentPage * this.itemsPerPage < this.totalItems) {
      this.currentPage++;
    }
  }

  prevPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }

  getTotalPages(): number {
    return Math.ceil(this.totalItems / this.itemsPerPage);
  }

  constructor(private accountService: AccountService) {}

  ngOnInit(): void {
    this.fetchAccounts();
  }

  fetchAccounts(): void {
    this.accountService.getAllAccounts().subscribe({
      next: (data) => {
        this.accounts = data;
      },
      error: (err) => {
        console.error('Error fetching accounts:', err);
      },
    });
  }

  editAccount(account: any): void {
    this.isEditing = true;
    this.selectedAccount = { ...account };
  }

  saveAccount(): void {
    this.accountService.updateAccount(this.selectedAccount).subscribe({
      next: () => {
        this.fetchAccounts();
        this.isEditing = false;
        this.selectedAccount = null;

        // Show success notification
        this.editSuccess = true;

        // Hide the notification after 3 seconds
        setTimeout(() => {
          this.editSuccess = false;  // This will hide the notification
        }, 3000);
      },
      error: (err) => {
        console.error('Error updating account:', err);
      },
    });
  }

  cancelEdit(): void {
    this.isEditing = false;
    this.selectedAccount = null;
  }
}
