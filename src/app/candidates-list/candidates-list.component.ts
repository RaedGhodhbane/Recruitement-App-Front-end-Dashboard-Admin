import { Component, OnInit } from '@angular/core';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { CandidatesService } from '../services/candidates.service';
import { CommonModule } from '@angular/common';
import { AdminService } from '../services/admin.service';

@Component({
  selector: 'app-candidates-list',
  standalone: true,
  imports: [SidebarComponent, CommonModule],
  templateUrl: './candidates-list.component.html',
  styleUrl: './candidates-list.component.css'
})
export class CandidatesListComponent implements OnInit{

  candidates:any;
  active:boolean = true;
  constructor(private candidateService:CandidatesService, private adminService:AdminService) { }

  ngOnInit(): void {
    this.getAllCandidates()
  }

  getAllCandidates() {
    this.candidateService.getAllCandidates().subscribe(
      (res:any) => {
        this.candidates = res;
        console.log("candidates", this.candidates)
      }
    )
  }


    activateCandidate(id:number): void {
    this.adminService.activateCandidate(id).subscribe({
      next: () => {
        alert('Compte candidat activé avec succès');
        this.candidates = this.candidates.map((c: { id: number; }) => c.id === id ? { ...c,active: true} : c);
      },
      error: (err) => {
        console.error(`Erreur lors de l'activation`, err);
      }
    })
  }
  
  desactivateCandidate(id:number): void {
    this.adminService.desactivateCandidate(id).subscribe({
      next: () => {
        alert('Compte candidat désactivé avec succès');
        this.candidates = this.candidates.map((c: { id: number; }) => c.id === id ? { ...c,active: false} : c);
      },
      error: (err) => {
        console.error('Erreur lors de la désactivation', err);
      }
    })
  }
}
