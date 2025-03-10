import { Component, inject } from '@angular/core';
import { DashboardLayoutComponent } from '../../../Components/dashboard-layout/dashboard-layout.component';
import { TaskComponentComponent } from "../../../Components/task-component/task-component.component";
import { ProfileComponent } from "../../../Components/profile/profile.component";
import { RouterLink } from '@angular/router';
import { Task, TaskService } from '../../../Services/task/task.service';
import { AuthServceService } from '../../../Services/auth/auth-servce.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [DashboardLayoutComponent, TaskComponentComponent, ProfileComponent, RouterLink, CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {

  authService = inject(AuthServceService)
  taskService = inject(TaskService);
  tasks: Task[] = []
  date = new Date().toISOString().split('T')[0];

  ngOnInit(): void {
    const localTask: Record<string, Task[]> = JSON.parse(localStorage.getItem('oasis-tasks') || '[]');
    const tasks = localTask[this.authService?.currentUser?.data.email!] || [];
    this.taskService.tasksSubject.next(tasks);
    this.taskService.tasks$.subscribe(tasks => {
      this.tasks = tasks;
    });
  }

  get completedTasks(): Task[] {
    return this.tasks.filter(task =>
      task.status === 'completed'
    );
  }

  messages = [
    {
      pic: "../../../../assets/angelie.png",
      name: "Angelie Crison",
      message: "Thank you very much. I'm glad ...",
      status: "received",
      timing: "1m"
    },
    {
      pic: "../../../../assets/jakob.png",
      name: "Jakob Saris",
      message: "You : Sure! let me tell you about w…",
      status: "sent",
      timing: "2m"
    },
    {
      pic: "../../../../assets/emery.png",
      name: "Emery Korsgard",
      message: "Thank's. You are very helpful...",
      status: "received",
      timing: "3m"
    },
    {
      pic: "../../../../assets/jeremy.png",
      name: "Jeremy Zucker",
      message: "You : Sure! let me teach you about  ...",
      status: "sent",
      timing: "4m"
    },
    {
      pic: "../../../../assets/nadia.png",
      name: "Nadia Lauren",
      message: "Is there anything I can help? Just ...",
      status: "received",
      timing: "5m"
    },
    {
      pic: "../../../../assets/jasaon.png",
      name: "Jason Statham",
      message: "You : Sure! let me share about...",
      status: "sent",
      timing: "6m"
    },
  ]
}
