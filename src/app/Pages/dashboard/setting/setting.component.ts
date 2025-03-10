import { Component } from '@angular/core';
import { DashboardLayoutComponent } from "../../../Components/dashboard-layout/dashboard-layout.component";
import { ProfileComponent } from "../../../Components/profile/profile.component";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-setting',
  standalone: true,
  imports: [DashboardLayoutComponent, ProfileComponent, CommonModule],
  templateUrl: './setting.component.html',
  styleUrl: './setting.component.css'
})
export class SettingComponent {

  activeTab : 'general' | 'notification' = 'general';
  showMessage = false;
  taskUpdate = true;
  taskDeadline = false;
  mentorHelp = true
  zone : '24hrs' | '12hrs' = '24hrs';

  onChangeTab(){
    if(this.activeTab == 'general'){
      this.activeTab = 'notification'
    }else{
      this.activeTab = 'general'
    }
  }

  onChangeZone(){
    if(this.zone == '24hrs'){
      this.zone = '12hrs'
    }else{
      this.zone = '24hrs'
    }
  }

  changeShowMessage(){
    this.showMessage = !this.showMessage
  }

  changeTaskUpdate(){
    this.taskUpdate = !this.taskUpdate
  }

  changeTaskDealine(){
    this.taskDeadline = !this.taskDeadline
  }
  chamgeMentorHelp(){
    this.mentorHelp = !this.mentorHelp
  }
}


// hpme page
// verify types
// responsive taskid
// finish dashboard