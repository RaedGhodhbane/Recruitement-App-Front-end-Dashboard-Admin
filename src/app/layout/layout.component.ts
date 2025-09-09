import { Component, OnInit } from '@angular/core';
import { SidebarComponent } from "../sidebar/sidebar.component";
import { AdminService } from '../services/admin.service';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [SidebarComponent],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css'
})
export class LayoutComponent implements OnInit{

  totalEmployees = 0;
  totalActivated = 0;
  totalDesactivated = 0;


  constructor(private adminService: AdminService) {}

  ngOnInit(): void {
    this.loadStats();
  }

   loadStats(): void {
    this.adminService.getAllCandidates().subscribe(candidates => {
      this.adminService.getAllRecruiters().subscribe(recruiters => {
        const all = [...candidates, ...recruiters];

        this.totalEmployees = all.length;
        this.totalActivated = all.filter(u => u.active === true).length;
        this.totalDesactivated = all.filter(u => u.active === false).length;
      });
    });
  }
}
