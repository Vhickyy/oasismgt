import { Component, inject } from '@angular/core';
import { DashboardLayoutComponent } from "../../../Components/dashboard-layout/dashboard-layout.component";
import { CommonModule } from '@angular/common';
import { TaskComponentComponent } from "../../../Components/task-component/task-component.component";
import { ProfileComponent } from "../../../Components/profile/profile.component";
import { Task, TaskService } from '../../../Services/task/task.service';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { AuthServceService } from '../../../Services/auth/auth-servce.service';

@Component({
  selector: 'app-task',
  standalone: true,
  imports: [DashboardLayoutComponent, CommonModule, TaskComponentComponent, ProfileComponent,FormsModule, RouterLink],
  templateUrl: './task.component.html',
  styleUrl: './task.component.css'
})
export class TaskComponent {
  tasks: Task[] = [];
  taskService = inject(TaskService);
  authService = inject(AuthServceService);
  search = '';

  // constructor(private taskService: TaskService) {}

  ngOnInit(): void {
    
    this.taskService.tasks$.subscribe(tasks => {
      this.tasks = tasks;
      console.log({tasks});
      
    });
  }

  get notStartedTasks(): Task[] {
    return this.tasks.filter(task =>
      task.status === 'not-started' &&
      task.title.toLowerCase().includes(this.search.toLowerCase())
    );
  }

  get inProgressTasks(): Task[] {
    return this.tasks.filter(task =>
      task.status === 'started' &&
      task.title.toLowerCase().includes(this.search.toLowerCase())
    );
  }

  get completedTasks(): Task[] {
    return this.tasks.filter(task =>
      task.status === 'completed' &&
      task.title.toLowerCase().includes(this.search.toLowerCase())
    );
  }
}
