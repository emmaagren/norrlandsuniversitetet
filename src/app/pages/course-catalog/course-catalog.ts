import { Component, inject } from '@angular/core';
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

  // Hämtar kursservicen med Angulars inject()
  private courseService = inject(CourseService);

  // Hämtar kurserna och omvandlar resultatet till en Signal
  courses = toSignal(this.courseService.getCourses(), {
    initialValue: [] as Course[]
  });

}