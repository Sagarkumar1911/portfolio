import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Project {
  id: number;
  title: string;
  category: string;
  description: string;
  image: string;
  github_link: string;
  live_link: string;
}

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  private apiUrl = 'http://localhost/backend/getProjects.php';
  private addUrl = 'http://localhost/backend/addProject.php';

  constructor(private http: HttpClient) { }

  getProjects(): Observable<Project[]> {
    return this.http.get<Project[]>(this.apiUrl);
  }

  addProject(projectData: Partial<Project>): Observable<any> {
    return this.http.post(this.addUrl, projectData);
  }
}
