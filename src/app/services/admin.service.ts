import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  private apiURL = "http://localhost:8082/admin";
  private apiURL2 = "http://localhost:8082/contact";
  constructor(private http: HttpClient) { }

  desactivateCandidate(id:number) : Observable<void> {
    return this.http.put<void>(`${this.apiURL}/candidates/${id}/desactivate`, {});
  }

  activateCandidate(id:number) : Observable<void> {
    return this.http.put<void>(`${this.apiURL}/candidates/${id}/activate`, {});
  }

  desactivateRecruiter(id:number) : Observable<void> {
    return this.http.put<void>(`${this.apiURL}/recruiters/${id}/desactivate`, {});
  }

  activateRecruiter(id:number) : Observable<void> {
    return this.http.put<void>(`${this.apiURL}/recruiters/${id}/activate`, {});
  }

  getAllMessagesContact() {
    return this.http.get(`${this.apiURL2}/messages`)
  }
}
