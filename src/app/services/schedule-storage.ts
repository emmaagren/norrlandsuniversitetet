import { Injectable, signal } from '@angular/core';
import type { Course } from '../models/course';

@Injectable({
  providedIn: 'root'
})
export class ScheduleStorageService {

  // Lagrar kurserna som användaren har valt
  private selectedCourses = signal<Course[]>([]);

  // Gör kurslistan tillgänglig för komponenterna
  courses = this.selectedCourses.asReadonly();

  // Lägger till en kurs i ramschemat
  addCourse(course: Course): boolean {

    // Kontrollerar om kursen redan finns
    const alreadyExists = this.selectedCourses().some(
      selectedCourse => selectedCourse.courseCode === course.courseCode
    );

    // Lägger inte till kursen om den redan finns
    if (alreadyExists) {
      return false;
    }

    // Lägger till kursen i listan
    this.selectedCourses.update(courses => [...courses, course]);

    return true;
  }

}