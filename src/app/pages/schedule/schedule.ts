import { Component, inject } from '@angular/core';
import { ScheduleStorageService } from '../../services/schedule-storage';

@Component({
  selector: 'app-schedule',
  imports: [],
  templateUrl: './schedule.html',
  styleUrl: './schedule.css'
})
export class Schedule {

  // Hämtar servicen som hanterar ramschemat
  private scheduleService = inject(ScheduleStorageService);

  // Hämtar användarens valda kurser
  courses = this.scheduleService.courses;

  // Hämtar det totala antalet högskolepoäng
  totalPoints = this.scheduleService.totalPoints;

  // Tar bort en kurs från ramschemat
  removeCourse(courseCode: string): void {
    this.scheduleService.removeCourse(courseCode);
  }
}