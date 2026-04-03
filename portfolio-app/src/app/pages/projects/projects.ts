import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProjectService, Project } from '../../services/project.service';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './projects.html',
  styleUrl: './projects.css'
})
export class ProjectsComponent implements OnInit {
  projects: Project[] = [];
  filteredProjects: Project[] = [];
  loading = true;
  error = '';
  activeFilter = 'all';
  searchId: number | null = null; // To store user input ID

  constructor(private projectService: ProjectService) {}

  ngOnInit() {
    this.loadAllProjects();
  }

  loadAllProjects() {
    this.loading = true;
    this.error = '';
    this.projectService.getProjects().subscribe({
      next: (data) => {
        this.projects = data;
        this.filteredProjects = data;
        this.loading = false;
        this.activeFilter = 'all';
      },
      error: (err) => {
        console.error('Error fetching projects:', err);
        this.error = 'Failed to load projects from API. Ensure XAMPP is running and backend is accessible.';
        this.loading = false;
      }
    });
  }

  searchProjectById() {
    if (!this.searchId) {
      // If input is empty, reload all projects
      this.loadAllProjects();
      return;
    }

    this.loading = true;
    this.error = '';
    this.projectService.getProjectById(this.searchId).subscribe({
      next: (data) => {
        // Handle backend returning an array with 1 item
        this.projects = data;
        this.filteredProjects = data;
        this.loading = false;
        this.activeFilter = 'all';
      },
      error: (err) => {
        console.error('Error fetching project by ID:', err);
        this.error = 'Failed to fetch the specific project. Please check if ID is correct.';
        this.loading = false;
      }
    });
  }

  filterProjects(category: string) {
    this.activeFilter = category;
    if (category === 'all') {
      this.filteredProjects = this.projects;
    } else {
      this.filteredProjects = this.projects.filter(p => p.category === category);
    }
  }
}
