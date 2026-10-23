import { Injectable, signal, computed } from '@angular/core';
import type { Course } from '../models/course';

@Injectable({
  providedIn: 'root'
})
export class ScheduleStorageService {

  // Lagrar kurserna som användaren har valt
  private selectedCourses = signal<Course[]>([]);

  // Gör kurslistan tillgänglig för komponenterna
  courses = this.selectedCourses.asReadonly();

  // Hämtar sparade kurser när servicen skapas
  constructor() {
    this.loadFromLocalStorage();
  }

  // Beräknar det totala antalet högskolepoäng
  totalPoints = computed(() => {
    return this.selectedCourses().reduce(
      (total, course) => total + course.points,
      0
    );
  });

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
    this.saveToLocalStorage();

    return true;
  }

  // Tar bort en kurs från ramschemat
  removeCourse(courseCode: string): void {

    // Filtrerar bort kursen med angiven kurskod
    this.selectedCourses.update(courses =>
      courses.filter(course => course.courseCode !== courseCode)
    );

    this.saveToLocalStorage();

  }

  // Sparar användarens valda kurser i localStorage
  private saveToLocalStorage(): void {
    localStorage.setItem(
      'norrlandsuniversitetet-schedule',
      JSON.stringify(this.selectedCourses())
    );
  }

  // Hämtar tidigare sparade kurser från localStorage
  private loadFromLocalStorage(): void {
    const savedCourses = localStorage.getItem(
      'norrlandsuniversitetet-schedule'
    );

    if (savedCourses) {
      try {
        const courses: Course[] = JSON.parse(savedCourses);
        this.selectedCourses.set(courses);
      } catch (error) {
        console.error('Kunde inte läsa det sparade ramschemat:', error);
      }
    }
  }

}