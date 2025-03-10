import { Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { TaskService } from '../../Services/task/task.service';

@Component({
  selector: 'app-dashboard-layout',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './dashboard-layout.component.html',
  styleUrl: './dashboard-layout.component.css'
})
export class DashboardLayoutComponent {

  taskService = inject(TaskService);
  
  dashboardRoutes = [
    {
      icon: "./../../assets/dashboard.svg",
      path:"/dashboard/home",
      name: "Dashboard"
    },
    {
      icon: "./../../assets/book.svg",
      path:"/dashboard/task",
      name: "Task"
    },
    {
      icon: "./../../assets/message.svg",
      path:"#",
      name: "Message"
    },
    {
      icon: "./../../assets/setting.svg",
      path:"/dashboard/setting",
      name: "Settings"
    },
  ]
}
