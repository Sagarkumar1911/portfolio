import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface ContactData {
  name: string;
  email: string;
  message: string;
}

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  private apiUrl = 'http://localhost/backend/submitContact.php';

  constructor(private http: HttpClient) { }

  submitContact(data: ContactData): Observable<any> {
    return this.http.post(this.apiUrl, data);
  }
}
