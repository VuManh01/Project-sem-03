import { Component, OnInit } from '@angular/core';
import { AccountService } from './user.service';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
})
export class UsersComponent implements OnInit {
  accounts: any[] = [];
  subscriptions: any[] = [];
  combinedData: any[] = [];  // To store merged account and subscription data
  isEditing: boolean = false;
  selectedAccount: any = null;
  editSuccess: boolean = false; // To track success notification visibility
  currentPage = 1;  // Current page, default is 1
  itemsPerPage = 10; // Number of items per page
  totalItems = 100;  // Total items (this should come from your data or API)

  get paginatedAccounts() {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    return this.combinedData.slice(startIndex, startIndex + this.itemsPerPage);
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
    this.fetchData();
  }

  fetchData(): void {
    forkJoin({
      accounts: this.accountService.getAllAccounts(),
      subscriptions: this.accountService.getAllSubscriptions(),
    }).subscribe({
      next: (data) => {
        this.accounts = data.accounts;
        this.subscriptions = data.subscriptions;

        // Combine the accounts and subscriptions data
        this.combineData();
      },
      error: (err) => {
        console.error('Error fetching data:', err);
      },
    });
  }

  combineData(): void {
    // Assuming that each subscription corresponds to an account by matching some identifier
    this.combinedData = this.accounts.map((account) => {
      // Find the corresponding subscription for this account
      const subscription = this.subscriptions.find((sub) => sub.accountId === account.accountId);
      return {
        ...account,
        startDate: subscription ? subscription.startDate : null,
        endDate: subscription ? subscription.endDate : null,
      };
    });
  }

  editAccount(account: any): void {
    this.isEditing = true;
    this.selectedAccount = { ...account };
  }

  saveAccount(): void {
    this.accountService.updateAccount(this.selectedAccount).subscribe({
      next: () => {
        this.fetchData();
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
