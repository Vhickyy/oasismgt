import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Task } from '../../Services/task/task.service';

@Component({
  selector: 'app-task-component',
  standalone: true,
  imports: [CommonModule,RouterLink],
  templateUrl: './task-component.component.html',
  styleUrl: './task-component.component.css'
})
export class TaskComponentComponent implements OnInit {
  @Input() item : Task | null = null;

  ngOnInit(){
    const date1 = new Date();
    const date2 = new Date(this.item?.dueDate!);
    this.daysLeft = Math.floor(this.getDateDifference(date1,date2));
  }
  daysLeft: number = 0

  getDateDifference(date1 : Date, date2 :  Date): number {
    const differenceInTime = date2.getTime() - date1.getTime();
    return differenceInTime / (1000 * 3600 * 24);
  }
}
