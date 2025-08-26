import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RecruitersService {

  private apiURL = 'http://localhost:8082'

  constructor(private http:HttpClient) { }

  getAllRecruiters() {
    return this.http.get(`${this.apiURL}/recruiter/recruiters`)
  }
}
