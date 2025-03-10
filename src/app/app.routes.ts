import { Routes } from '@angular/router';
import { HomeComponent } from './Pages/home/home.component';
import { LoginComponent } from './Pages/auth/login/login.component';
import { RegisterComponent } from './Pages/auth/register/register.component';
import { DashboardComponent } from './Pages/dashboard/dashboard/dashboard.component';
import { SettingComponent } from './Pages/dashboard/setting/setting.component';
import { TaskComponent } from './Pages/dashboard/task/task.component';
import { CreateTaskComponent } from './Pages/dashboard/create-task/create-task.component';
import { TaskIdComponent } from './Pages/task-id/task-id.component';
import { authGaurdGuard } from './Gaurds/auth-gaurd.guard';
import { closeauthGuard } from './Gaurds/closeauth.guard';

export const routes: Routes = [
    {
        path: "",
        component: HomeComponent
    },
    {
        path: "login",
        canActivate: [closeauthGuard],
        component: LoginComponent
    },
    {
        path: "register",
        canActivate: [closeauthGuard],
        component: RegisterComponent
    },
    {
        path: "dashboard",
        canActivate:[authGaurdGuard],
        children: [
            {
                path: "home",
                component: DashboardComponent
            },
            {
                path: "setting",
                component: SettingComponent
            },
            {
                path: "task",
                children:[
                    {
                        path: "",
                        component: TaskComponent
                    },
                    {
                        path: "create-task",
                        component: CreateTaskComponent
                    },
                    {
                        path: ":id",
                        component: TaskIdComponent
                    }
                ]
            },
            {
                path: "dashboard/create-task",
                component: CreateTaskComponent
            },
        ]
    },
    
];
