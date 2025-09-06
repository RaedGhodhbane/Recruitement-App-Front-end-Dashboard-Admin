import { Component } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {

  constructor(private authService:AuthenticationService, private router:Router) {}

    onLogout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
