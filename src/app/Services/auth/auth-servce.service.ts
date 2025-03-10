import { inject, Injectable } from '@angular/core';
import { FormBuilder, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Task, TaskService } from '../task/task.service';

export interface User{
  data:{
    fullName: string;
    email: string;
    password: string;
    id: string;
    isLoggedIn: boolean
  }
}

@Injectable({
  providedIn: 'root'
})
export class AuthServceService {

  router = inject(Router);
  // taskService = inject(TaskService);
  currentUser: User | null = null;
  
  constructor() { }

  getUser(): User[]{
    return JSON.parse(localStorage.getItem('oasis-users') || '[]');
  }

  registerUser(formData: any){
    const {email} = formData.value;
    const users = this.getUser();
    const userExist = users.find(user => user.data.email == email);
    if(!userExist){
      console.log({formData});
      
      users.push({
        data: { ...formData.value, id: Date.now(), isLoggedIn: false }
      });
      localStorage.setItem('oasis-users', JSON.stringify(users));
      this.router.navigate(['/login'])
      return '';
    }else{
      return 'User already exist';
    }
  
  }

  loginUser(data:NgForm){
    const {email,password} = data.value;
    if(!email || !password){
      return 'Please provide all fields'
    }else{
      const users = this.getUser();
      let index = 0;
      const userExist = users.find((user, i:number) => {
        index = i;
        return user.data.email == email && user.data.password == password
      });
      
      if(!userExist){
        return 'Invalid Credentials.'
      }else{
        const updateList = users.map((item,i: number) => index != i ? {data:{...item.data,isLoggedIn: false}} : {data:{...userExist.data,isLoggedIn: true}});
        
        localStorage.setItem('oasis-users',JSON.stringify(updateList));
        this.currentUser = userExist;
        
        this.router.navigate(["/dashboard/home"]);
        return '';
      }
    }
  }

  logoutUser(){
    const user = this.getUser();
    const updateUsers = user.map((user ) => ({...user,data: {...user.data,isLoggedIn:false}}));
    console.log({updateUsers});
    this.currentUser = null;
    localStorage.setItem('oasis-users', JSON.stringify(updateUsers));
  }
}
