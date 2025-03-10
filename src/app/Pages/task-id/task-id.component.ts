import { Component, inject } from '@angular/core';
import { DashboardLayoutComponent } from "../../Components/dashboard-layout/dashboard-layout.component";
import { ProfileComponent } from "../../Components/profile/profile.component";
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Task, TaskService } from '../../Services/task/task.service';
import { AuthServceService } from '../../Services/auth/auth-servce.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-task-id',
  standalone: true,
  imports: [DashboardLayoutComponent, ProfileComponent,CommonModule, RouterLink],
  templateUrl: './task-id.component.html',
  styleUrl: './task-id.component.css'
})
export class TaskIdComponent {
  activatedRoute = inject(ActivatedRoute);
  router = inject(Router)
  authService = inject(AuthServceService);
  paramObs!: Subscription;
  id: string | null = null;
  task:Task | null = null;
  taskService = inject(TaskService);
  

  ngOnInit(){
    this.paramObs = this.activatedRoute.paramMap.subscribe(params => {
      this.id = params.get('id');
      const tasks : Record<string, Task[]> = JSON.parse(localStorage.getItem('oasis-tasks') || '{}');
      
      if(!Object.keys(tasks).length){
        this.router.navigate(["/dashboard/task/create-task"]);
      }else{
        const userTasks : Task[] = tasks[this.authService.currentUser?.data.email!];
        if(!userTasks.length){
          this.router.navigate(["/dashboard/task/create-task"]);
        }

        let index = 0;
        const taskExist = userTasks.find((task,i) => {
          index = i;
          return task.id == this.id
        });

        if(!taskExist){
          this.router.navigate(["/dashboard/task"]);
        }else{
          if(userTasks[index].status !== 'completed'){
            if(userTasks[index].progress == 0){
              userTasks[index].status = 'started';
              userTasks[index].progress = Math.floor(Math.random() * 49) + 40;
            }else{
              userTasks[index].status = 'completed';
              userTasks[index].progress = 100;
            }
          }
          this.task = taskExist;
          this.taskService.tasksSubject.next(userTasks)
          localStorage.setItem('oasis-tasks',JSON.stringify({...tasks,[this.authService.currentUser?.data.email!]:userTasks}))
        }
      }
    });
  }
}
