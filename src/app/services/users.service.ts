import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private apiURL= "http://localhost:8082/admin/user"

  constructor(private http:HttpClient) { }

  getAllUsers() {
    return this.http.get(this.apiURL+'/users');
  }
  getUserById(id:any) {
    return this.http.get(this.apiURL + '/' + JSON.stringify(id));
  }

  deleteUser(id:any) {
    return this.http.get(this.apiURL+ '/' + JSON.stringify(id));
  }
}
