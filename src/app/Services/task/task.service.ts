import { inject, Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { AuthServceService } from '../auth/auth-servce.service';

export interface Task {
  title: string;
  subtitle?: string;
  status: 'completed' | 'started' | 'not-started';
  progress: number;
  dueDate: number;
  date?: string;
  id: string;
  members: number,
  description: string
}

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  authService = inject(AuthServceService);
  showSidebar = false;

  constructor() {
    const localTask: Record<string, Task[]> = JSON.parse(localStorage.getItem('oasis-tasks') || '[]');
    console.log({localTask});
    
     this.tasks = localTask[this.authService.currentUser?.data.email!] || [];
     this.tasksSubject.next(this.tasks);
  }
  
  // localTask: Record<string, Task[]> = JSON.parse(localStorage.getItem('oasis-tasks') || '[]');
  
  private tasks: Task[] =  [];
  // console.log({localTask});
  tasksSubject = new BehaviorSubject<Task[]>(this.tasks);
  tasks$ = this.tasksSubject.asObservable();

  toggleSideBar(){
    this.showSidebar = !this.showSidebar;
  }

}
