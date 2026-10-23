import { Component, inject, signal, computed } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { CourseService } from '../../services/course';
import type { Course } from '../../models/course';

@Component({
  selector: 'app-course-catalog',
  imports: [],
  templateUrl: './course-catalog.html',
  styleUrl: './course-catalog.css'
})
export class CourseCatalog {

  // Hämtar kursservicen
  private courseService = inject(CourseService);

  // Hämtar kurserna från JSON-filen
  courses = toSignal(this.courseService.getCourses(), {
    initialValue: [] as Course[]
  });

  // Lagrar användarens sökfras
  searchTerm = signal('');

  // Lagrar vilket ämne användaren har valt
  selectedSubject = signal('');

  // Skapar en alfabetiskt sorterad lista över alla ämnen
  subjects = computed(() => {
    const allSubjects = this.courses().map(course => course.subject);

    return [...new Set(allSubjects)].sort((a, b) =>
      a.localeCompare(b, 'sv')
    );
  });


  // Filtrerar kurser efter sökfras och valt ämne
  filteredCourses = computed(() => {
    const search = this.searchTerm().toLowerCase().trim();
    const subject = this.selectedSubject();

    return this.courses().filter(course => {
      const matchesSearch =
        course.courseCode.toLowerCase().includes(search) ||
        course.courseName.toLowerCase().includes(search);

      const matchesSubject =
        subject === '' || course.subject === subject;

      return matchesSearch && matchesSubject;
    });
  });

  // Uppdaterar sökfrasen när användaren skriver
  updateSearch(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.searchTerm.set(input.value);
  }

  // Uppdaterar valt ämne
  updateSubject(event: Event): void {
    const select = event.target as HTMLSelectElement;
    this.selectedSubject.set(select.value);
  }

}