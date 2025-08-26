import { Component, OnInit } from '@angular/core';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { RecruitersService } from '../services/recruiters.service';
import { AdminService } from '../services/admin.service';

@Component({
  selector: 'app-recruiters-list',
  standalone: true,
  imports: [SidebarComponent, CommonModule],
  templateUrl: './recruiters-list.component.html',
  styleUrl: './recruiters-list.component.css'
})
export class RecruitersListComponent implements OnInit {

  recruiters:any;
  constructor(private recruitersService: RecruitersService, private adminService: AdminService) { }

  ngOnInit(): void {
    this.getAllRecruiters()
  }
  
  getAllRecruiters() {
    this.recruitersService.getAllRecruiters().subscribe(
      (res:any) => {
        this.recruiters = res
        console.log("recruiters", this.recruiters)
      }
    )
  }


    activateRecruiter(id:number): void {
    this.adminService.activateRecruiter(id).subscribe({
      next: () => {
        alert('Compte recruteur activé avec succès');
        this.recruiters = this.recruiters.map((r: { id: number; }) => r.id === id ? { ...r,active: true} : r);
      },
      error: (err) => {
        console.error(`Erreur lors de l'activation`, err);
      }
    })
  }
    desactivateRecruiter(id:number): void {
    this.adminService.desactivateRecruiter(id).subscribe({
      next: () => {
        alert('Compte recruiteur désactivé avec succès');
        this.recruiters = this.recruiters.map((r: { id: number; }) => r.id === id ? { ...r,active: false} : r);
      },
      error: (err) => {
        console.error('Erreur lors de la désactivation', err);
      }
    })
  }

}
