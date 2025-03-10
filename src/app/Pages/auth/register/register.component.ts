import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { AuthServceService } from '../../../Services/auth/auth-servce.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule,RouterLink, CommonModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  private fb = inject(FormBuilder);
  authService = inject(AuthServceService);
  errMsg = '';

  formData = this.fb.group({
    fullName: ['', Validators.required],
    email: ['', Validators.required],
    password: ['', 
      [Validators.required,
      Validators.minLength(8),
      Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/) ]
    ]
  });

  ngOnInit() {
    this.formData.valueChanges.subscribe(() => {
      this.errMsg = ''; 
    });
  }

  onRegister(event: Event){
    event.preventDefault();
    this.errMsg = this.authService.registerUser(this.formData);
  }

  hasLowerCase(): boolean {
    return /[a-z]/.test(this.formData.get('password')?.value|| '');
  }

  hasUpperCase(): boolean {
    return /[A-Z]/.test(this.formData.get('password')?.value|| '');
  }

  hasSpecialCharacter(): boolean {
    return /[\W_]/.test(this.formData.get('password')?.value || '');
  }

  hasNumber(): boolean {
    return /\d/.test(this.formData.get('password')?.value || '');
  }

  hasMinimumLength(): boolean {
    return (this.formData.get('password')?.value || '').length >= 8;
  }
}
