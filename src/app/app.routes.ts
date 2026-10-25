import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { CourseCatalog } from './pages/course-catalog/course-catalog';
import { Schedule } from './pages/schedule/schedule';

// Definierar webbplatsens undersidor
export const routes: Routes = [
    { path: '', component: Home },
    { path: 'kurser', component: CourseCatalog },
    { path: 'mitt-ramschema', component: Schedule },
    { path: '**', redirectTo: '' }
];
