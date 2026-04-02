import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { About } from './pages/about/about';
import { ProjectsComponent } from './pages/projects/projects';
import { Admin } from './pages/admin/admin';

export const routes: Routes = [
  { path: '', component: Home },
  { path: 'about', component: About },
  { path: 'projects', component: ProjectsComponent },
  { path: 'admin', component: Admin },
  { path: '**', redirectTo: '' }
];
