import { Component, OnInit } from '@angular/core';
import { AccountService } from './user.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  accounts: any[] = [];
  loading: boolean = true;
  error: string | null = null;
  roles: string[] = ['Admin', 'User', 'Moderator']; // Example roles
  editingRole: boolean = false;
  selectedRole: string | null = null;
  currentAccount: any | null = null;

  constructor(private accountService: AccountService) {}

  ngOnInit(): void {
    this.accountService.getAllAccounts().subscribe({
      next: (data) => {
        this.accounts = data;
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Failed to load accounts.';
        this.loading = false;
      }
    });
  }






}
