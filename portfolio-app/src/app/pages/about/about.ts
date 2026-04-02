import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ContactService, ContactData } from '../../services/contact.service';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './about.html',
  styleUrl: './about.css',
})
export class About {
  contactData: ContactData = {
    name: '',
    email: '',
    message: ''
  };

  isSubmitting = false;
  submitSuccess = false;
  submitError = '';

  constructor(private contactService: ContactService) {}

  onSubmit() {
    this.isSubmitting = true;
    this.submitSuccess = false;
    this.submitError = '';

    this.contactService.submitContact(this.contactData).subscribe({
      next: (res) => {
        this.submitSuccess = true;
        this.isSubmitting = false;
        // Reset form
        this.contactData = { name: '', email: '', message: '' };
      },
      error: (err) => {
        console.error(err);
        this.submitError = 'Failed to submit form. Please make sure the XAMPP server is running.';
        this.isSubmitting = false;
      }
    });
  }
}
