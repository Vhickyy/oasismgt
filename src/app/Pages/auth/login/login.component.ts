import { Component, inject } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { AuthServceService } from '../../../Services/auth/auth-servce.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule,RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  errorMsg: string = '';
  router = inject(Router);
  authService = inject(AuthServceService);

  onLogin(data:NgForm){
    this.errorMsg = this.authService.loginUser(data);
  }

  clearErrorMsg() {
    this.errorMsg = ''; 
}
}
