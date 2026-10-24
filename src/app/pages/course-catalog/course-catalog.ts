import { Component, inject, signal, computed } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { CourseService } from '../../services/course';
import type { Course } from '../../models/course';
import { ScheduleStorageService } from '../../services/schedule-storage';

@Component({
  selector: 'app-course-catalog',
  imports: [],
  templateUrl: './course-catalog.html',
  styleUrl: './course-catalog.css'
})
export class CourseCatalog {

  // Hämtar kursservicen
  private courseService = inject(CourseService);

  // Hämtar servicen som hanterar användarens ramschema
  private scheduleService = inject(ScheduleStorageService);

  // Hämtar kurserna från JSON-filen
  courses = toSignal(this.courseService.getCourses(), {
    initialValue: [] as Course[]
  });

  // Lagrar användarens sökfras
  searchTerm = signal('');

  // Lagrar vilket ämne användaren har valt
  selectedSubject = signal('');

  // Lagrar vilket fält kurserna ska sorteras efter
  sortBy = signal<'courseCode' | 'courseName' | 'points' | 'subject'>('courseCode');

  // Aktuell sida i kurskatalogen
  currentPage = signal(1);

  // Antal kurser som visas per sida
  pageSize = 25;

  // Skapar en alfabetiskt sorterad lista över alla ämnen
  subjects = computed(() => {
    const allSubjects = this.courses().map(course => course.subject);

    return [...new Set(allSubjects)].sort((a, b) =>
      a.localeCompare(b, 'sv')
    );
  });

  // Filtrerar och sorterar kurserna
  filteredCourses = computed(() => {
    const search = this.searchTerm().toLowerCase().trim();
    const subject = this.selectedSubject();
    const sortBy = this.sortBy();

    // Filtrerar kurser efter sökfras och ämne
    const filtered = this.courses().filter(course => {
      const matchesSearch =
        course.courseCode.toLowerCase().includes(search) ||
        course.courseName.toLowerCase().includes(search);

      const matchesSubject =
        subject === '' || course.subject === subject;

      return matchesSearch && matchesSubject;
    });

    // Sorterar kurserna efter valt fält
    return filtered.sort((a, b) => {
      if (sortBy === 'points') {
        return a.points - b.points;
      }

      return a[sortBy].localeCompare(b[sortBy], 'sv');
    });
  });

  // Beräknar hur många sidor som behövs
  totalPages = computed(() =>
    Math.ceil(this.filteredCourses().length / this.pageSize)
  );

  // Hämtar kurserna som ska visas på aktuell sida
  paginatedCourses = computed(() => {
    const start = (this.currentPage() - 1) * this.pageSize;

    return this.filteredCourses().slice(
      start,
      start + this.pageSize
    );
  });

  // Går till föregående sida
  previousPage(): void {
    if (this.currentPage() > 1) {
      this.currentPage.update(page => page - 1);
    }
  }

  // Går till nästa sida
  nextPage(): void {
    if (this.currentPage() < this.totalPages()) {
      this.currentPage.update(page => page + 1);
    }
  }

  // Uppdaterar sökfrasen när användaren skriver
  updateSearch(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.searchTerm.set(input.value);
    this.currentPage.set(1);
  }

  // Uppdaterar valt ämne
  updateSubject(event: Event): void {
    const select = event.target as HTMLSelectElement;
    this.selectedSubject.set(select.value);
    this.currentPage.set(1);
  }

  // Uppdaterar sorteringen
  updateSort(event: Event): void {
    const select = event.target as HTMLSelectElement;
    this.currentPage.set(1);
    this.sortBy.set(
      select.value as 'courseCode' | 'courseName' | 'points' | 'subject'
    );
  }
  
  // Lägger till en kurs i användarens ramschema
  addToSchedule(course: Course): void {
    const added = this.scheduleService.addCourse(course);

    if (added) {
      alert('Kursen har lagts till i ditt ramschema!');
    } else {
      alert('Kursen finns redan i ditt ramschema.');
    }
  }
}