import { Component, inject } from '@angular/core';
import { DashboardLayoutComponent } from "../../../Components/dashboard-layout/dashboard-layout.component";
import { ProfileComponent } from "../../../Components/profile/profile.component";
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthServceService } from '../../../Services/auth/auth-servce.service';
import { Task, TaskService } from '../../../Services/task/task.service';
import { User } from '../../../Services/auth/auth-servce.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-task',
  standalone: true,
  imports: [DashboardLayoutComponent, ProfileComponent, ReactiveFormsModule, CommonModule],
  templateUrl: './create-task.component.html',
  styleUrl: './create-task.component.css'
})
export class CreateTaskComponent {

  private fb = inject(FormBuilder);
  authService = inject(AuthServceService);
  taskService = inject(TaskService);

  router = inject(Router);

  taskFormData = this.fb.group({
    title: ['', Validators.required],
    description: ['', Validators.required],
    dueDate: ['', Validators.required]
  });

  minDate = new Date().toISOString().split('T')[0];
  
  openDatePicker(dateInput: HTMLInputElement): void {
    dateInput.showPicker(); 
  }

  onSubmitTask(event:Event){
    event.preventDefault();
    const tasks: Record<string, Task[]> = JSON.parse(localStorage.getItem('oasis-tasks') || '{}');
    const task = {...this.taskFormData.value,members: Math.floor(Math.random() * 2) + 2,status:"not-started",progress:0,id:Date.now().toString()};

    if(Object.keys(tasks).length){
      // ==========to do: make a check to be sure all tasks details are present, do same for user ========//
    }

    let userTask: Task[] = tasks[this.authService.currentUser?.data.email!];
    
    if(userTask){
      userTask.push(task as unknown as Task);
    }else{
      userTask = [task as unknown as Task];
      
    }
    
    localStorage.setItem('oasis-tasks',JSON.stringify({...tasks,[this.authService.currentUser?.data.email!]:userTask}));
    this.taskService.tasksSubject.next(userTask)
    this.router.navigate(["/dashboard/task"])
  }
}
