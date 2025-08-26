import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CandidatesService {
  private apiURL = 'http://localhost:8082'
  constructor(private http:HttpClient) { }

    getAllCandidates() {
    return this.http.get(`${this.apiURL}/candidate/candidates`)
  }
}
