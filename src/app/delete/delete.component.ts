import { Component } from '@angular/core';
import { UserService } from '../services/user.service';
import { User } from '../models/user';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.css']
})
export class DeleteComponent {
  user: User = {
    id: '',
    name: '',
    email: '',
    phone: ''
  };

  loading = true;
  deleting = false;
  error = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService
  ) { }

  ngOnInit(): void {
    const userId = this.route.snapshot.paramMap.get('id');
    if (userId) {
      this.loadUser(userId);
    } else {
      this.error = 'User ID not provided';
      this.loading = false;
    }
  }

  loadUser(id: string): void {
    this.userService.getUsers().subscribe({
      next: (users) => {
        const foundUser = users.find(user => user.id === id);
        if (foundUser) {
          this.user = foundUser;
        } else {
          this.error = 'User not found';
        }
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading user:', error);
        this.error = 'Error loading user details';
        this.loading = false;
      }
    });
  }

  confirmDelete(): void {
    this.deleting = true;
    this.error = '';

    this.userService.deleteUser(this.user.id).subscribe({
      next: () => {
        this.deleting = false;
        alert('User deleted successfully!');
        this.router.navigate(['/']);
      },
      error: (error) => {
        console.error('Error deleting user:', error);
        this.error = 'Error deleting user. Please try again.';
        this.deleting = false;
      }
    });
  }

  cancel(): void {
    this.router.navigate(['/']);
  }
}