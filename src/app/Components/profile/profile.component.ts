import { Component, inject } from '@angular/core';
import { AuthServceService } from '../../Services/auth/auth-servce.service';
import { Router, RouterLink } from '@angular/router';
import { TaskService } from '../../Services/task/task.service';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {
    authService = inject(AuthServceService);
    taskService = inject(TaskService);
    router = inject(Router);
    showModal = false;

    onLogout(){
      this.authService.logoutUser();
      this.taskService.tasksSubject.next([]);
      this.router.navigate(["/login"])
    }

    toggleModal(){
      this.showModal = !this.showModal
    }
  
}
