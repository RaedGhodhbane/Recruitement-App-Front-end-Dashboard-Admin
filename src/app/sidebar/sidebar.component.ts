import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';
import { AdminService } from '../services/admin.service';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent implements OnInit{

  adminConnect : any;
  adminId : any;
  admin:any;
  constructor(private authService : AuthenticationService, private adminService:AdminService, private router:Router) {}

  ngOnInit(): void {
    this.adminConnect = JSON.parse(localStorage.getItem('user')!);
    this.adminId = this.adminConnect.id;
    this.getAdmin();

  }
  onLogout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
}
  getAdmin(){
    this.adminService.getAdminById(this.adminId).subscribe(
      (res:any) => {
        this.admin = res;
      }
    )
  }
}
