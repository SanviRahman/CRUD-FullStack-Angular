import { Component } from '@angular/core';
import { UserService } from '../services/user.service';
import { User } from '../models/user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent {
  user: User = {
    id: '',
    name: '',
    email: '',
    phone: ''
  };

  submitting = false;
  success = '';
  error = '';

  constructor(
    private userService: UserService,
    private router: Router
  ) { }

  onSubmit(form: any): void {
    if (form.invalid) {
      this.error = 'Please fill out all required fields correctly.';
      return;
    }

    this.userService.createUser(this.user).subscribe({
      next: (response: any) => {
        alert("User Create Successfully!");

        setTimeout(() => {
          this.router.navigate(['/']);
        }, 2000);
      },
    });
  }
}
