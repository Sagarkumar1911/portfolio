import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProjectService } from '../../services/project.service';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './admin.html',
  styleUrl: './admin.css',
})
export class Admin {
  projectData = {
    title: '',
    category: 'Deep Learning',
    description: '',
    image: '',
    github_link: '',
    live_link: ''
  };

  isSubmitting = false;
  submitSuccess = false;
  submitError = '';

  categories = ['Deep Learning', 'Web Dev', 'Data Science', 'Other'];

  constructor(private projectService: ProjectService) {}

  onSubmit() {
    this.isSubmitting = true;
    this.submitSuccess = false;
    this.submitError = '';

    this.projectService.addProject(this.projectData).subscribe({
      next: (res) => {
        this.submitSuccess = true;
        this.isSubmitting = false;
        // Reset form
        this.projectData = {
          title: '',
          category: 'Deep Learning',
          description: '',
          image: '',
          github_link: '',
          live_link: ''
        };
      },
      error: (err) => {
        console.error(err);
        this.submitError = 'Failed to add project. Please make sure the XAMPP server is running.';
        this.isSubmitting = false;
      }
    });
  }
}
