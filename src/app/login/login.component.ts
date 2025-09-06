import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  loginForm!: FormGroup;
  email = '';
  password = '';
  errorMessage = '';
  constructor(
    private fb: FormBuilder,
    private authenticationService: AuthenticationService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  login(): void {
    if (this.loginForm.invalid) {
      this.errorMessage = 'Veuillez remplir tous les champs correctement.';
      return;
    }

    const credentials = this.loginForm.value;

    this.authenticationService.loginAdmin(credentials).subscribe({
      next: (res: any) => {

        try {
          const payload = JSON.parse(atob(res.token.split('.')[1]));
          const role = payload.authorities?.[0];
          if (role !== 'ROLE_ADMIN') {
            this.errorMessage = "Accès refusé : seul un administrateur peut se connecter.";
            return;
          }
            localStorage.setItem('token', res.token);
            localStorage.setItem('user', JSON.stringify(res.user));
            localStorage.setItem('role', role);

            this.router.navigate(['/']).then(() => {
            location.reload(); 
          });
        } catch (e) {
          console.error('Erreur lors du décodage du token JWT', e);
          this.errorMessage = 'Token invalide, impossible de vérifier les droits.';
        }

      },
      error: () => {
        this.errorMessage = 'Email ou mot de passe invalide';
      },
    });
  }
}
