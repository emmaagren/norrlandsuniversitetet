import { Routes } from '@angular/router';
import { CourseCatalog } from './pages/course-catalog/course-catalog';
import { Schedule } from './pages/schedule/schedule';

// Definierar webbplatsens undersidor
export const routes: Routes = [
    { path: '', redirectTo: 'kurser', pathMatch: 'full'},
    { path: 'kurser', component: CourseCatalog },
    { path: 'mitt-ramschema', component: Schedule },
    { path: '**', redirectTo: 'kurser' }
];
