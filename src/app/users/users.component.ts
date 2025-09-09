import { Component, OnInit } from '@angular/core';
import { SidebarComponent } from "../sidebar/sidebar.component";
import { UsersService } from '../services/users.service';
import { CommonModule } from '@angular/common';
import { NgxPaginationModule } from 'ngx-pagination';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [SidebarComponent, CommonModule, NgxPaginationModule],
  templateUrl: './users.component.html',
  styleUrl: './users.component.css'
})
export class UsersComponent implements OnInit{

  users:any;
  p: number = 1;
  constructor(private usersService: UsersService) {}

  ngOnInit(): void {
    this.getAllUsers();
  }

  getAllUsers() {
    this.usersService.getAllUsers().subscribe(
      (res:any) => {
        this.users = res;
        console.log("users", this.users);
      })
  }

  viewUser(id:number) {
    this.usersService.getUserById(id).subscribe(
      (res:any) => {
        console.log("Utilisateur trouvé :" , res);
      }

    )
  }
  
deleteUser(id: number) {
  if (confirm("Voulez-vous vraiment supprimer cet utilisateur ?")) {
    this.usersService.deleteUser(id).subscribe({
      next: () => {
        console.log("Utilisateur supprimé avec succès");
        this.users = this.users.filter((u: any) => u.id !== id);
      },
      error: (err) => {
        console.error("Erreur lors de la suppression :", err);
      }
    });
  }
}

}
