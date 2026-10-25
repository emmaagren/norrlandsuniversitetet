import { Component, computed, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';

import { CourseService } from '../../services/course';
import { ScheduleStorageService } from '../../services/schedule-storage';
import { Course } from '../../models/course';

@Component({
  selector: 'app-home',
  imports: [RouterLink],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home {

  // Hämtar kursdata och användarens ramschema
  private courseService = inject(CourseService);
  private scheduleService = inject(ScheduleStorageService);

  // Läser in kurserna från JSON-filen
  courses = toSignal(this.courseService.getCourses(), {
    initialValue: [] as Course[]
  });

  // Beräknar antalet tillgängliga kurser
  totalCourses = computed(() => this.courses().length);

  // Beräknar antalet unika ämnesområden
  totalSubjects = computed(() => {
    const subjects = this.courses().map(course => course.subject);
    return new Set(subjects).size;
  });

  // Hämtar antalet kurser i användarens ramschema
  selectedCourses = computed(() => this.scheduleService.courses().length);

}