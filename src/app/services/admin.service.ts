import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  private apiURL = "http://localhost:8082/admin";
  constructor(private http: HttpClient) { }

  getAdminById(idAdmin:any) {
    return this.http.get(`${this.apiURL}/${idAdmin}`);
  }

  updateAdminInfo(admin:any,idAdmin:any) {
    return this.http.put(`${this.apiURL}/updateadmin/${idAdmin}`, admin);
  }
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
    return this.http.get(`${this.apiURL}/contact/messages`);
  }

  changePassword(adminId: number, data: any): Observable<any> {
    return this.http.put(`${this.apiURL}/${adminId}/change-password`, data);
  }
}
