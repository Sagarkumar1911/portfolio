import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule, Router } from '@angular/router';
import { ProjectService, Project } from '../../services/project.service';

@Component({
  selector: 'app-project-detail',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './project-detail.html',
  styleUrl: './project-detail.css'
})
export class ProjectDetailComponent implements OnInit {
  project: Project | null = null;
  loading = true;
  error = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private projectService: ProjectService
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const idParam = params.get('id');
      if (idParam) {
        const id = parseInt(idParam, 10);
        this.loadProjectDetails(id);
      } else {
        this.error = 'Invalid Project ID';
        this.loading = false;
      }
    });
  }

  loadProjectDetails(id: number) {
    this.loading = true;
    this.error = '';
    
    this.projectService.getProjectById(id).subscribe({
      next: (data) => {
        if (data && data.length > 0) {
          this.project = data[0]; // PHP backend returns array
        } else {
          this.error = 'Project not found';
        }
        this.loading = false;
      },
      error: (err) => {
        console.error('Error loading project:', err);
        this.error = 'Failed to load project details. Check backend connection.';
        this.loading = false;
      }
    });
  }

  goBack() {
    this.router.navigate(['/projects']);
  }
}
