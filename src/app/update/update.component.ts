import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { User } from '../models/user';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css']
})
export class UpdateComponent implements OnInit {
  user: User = {
    id: '',
    name: '',
    email: '',
    phone: ''
  };

  loading = true;
  submitting = false;
  error = '';
  success = '';

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
          this.user = { ...foundUser };
        } else {
          this.error = 'User not found';
        }
        this.loading = false;
      },
      error: (error) => {
        this.error = 'Error loading user data. Please try again.';
        this.loading = false;
      }
    });
  }

  onSubmit(form: any): void {
    if (form.invalid) {
      this.error = 'Please fill out all required fields correctly.';
      return;
    }

    this.submitting = true;

    this.userService.updateUser(this.user).subscribe({
      next: (response: any) => {
        alert("User Update Sucessfully!");
        setTimeout(() => {
          this.router.navigate(['/']);
        }, 2000);
      },
    });
  }

  cancel(): void {
    this.router.navigate(['/']);
  }
}
