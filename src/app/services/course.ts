import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import type { Course } from '../models/course';

@Injectable({
  providedIn: 'root'
})
export class CourseService {

  // Sökväg till JSON-filen med kursinformation
  private url: string = '/miun_courses.json';

  constructor(private http: HttpClient) {}

  // Hämtar alla kurser från JSON-filen
  getCourses(): Observable<Course[]> {
    return this.http.get<Course[]>(this.url);
  }
}