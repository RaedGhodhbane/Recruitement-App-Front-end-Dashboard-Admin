import { Component, OnInit } from '@angular/core';
import { SidebarComponent } from "../sidebar/sidebar.component";
import { AdminService } from '../services/admin.service';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [SidebarComponent, CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit{

  adminConnect: any;
  adminId:any;
  admin:any;
  editingIndex: number | null = null;
  changePasswordForm!: FormGroup;
  candidateId!: number;
  userConnect!: any;
  selectedFile : File | null = null;
  adminForm!: FormGroup;

  successMessage = '';
  errorMessage = '';
  fileToUpload!: File[];
  constructor(private adminService:AdminService, private fb:FormBuilder) {}

  ngOnInit(): void {
    this.adminConnect = JSON.parse(localStorage.getItem('user')!);
    this.adminId = this.adminConnect.id;
    this.getAdmin();
    this.changePasswordForm = this.fb.group({
    currentPassword: ['', Validators.required],
    newPassword: ['', Validators.required],
    confirmPassword: ['', Validators.required]
    });
    this.adminForm = this.fb.group({
      firstName: ['', Validators.required],
      name: ['', Validators.required],
      email: ['', Validators.required],
      gender:['', Validators.required],
      birthdate:[''],
      address:['', Validators.required],
      city:['', Validators.required],
      state:['', Validators.required],
      country:['', Validators.required],
      phone:['', Validators.required],
      imageFile:['',Validators.required]
    })
  }
 
  getAdmin() {
    this.adminService.getAdminById(this.adminId).subscribe(
      (res:any) => {
        this.admin = res

      this.adminForm.patchValue({
      firstName: this.admin.firstName,
      name: this.admin.name,
      email: this.admin.email,
      dateOfBirth: this.admin.birthdate,
      address: this.admin.address,
      city: this.admin.city,
      state: this.admin.state,
      country: this.admin.country,
      phone: this.admin.phone,
      imageFile:this.admin.imageFile
    });
      }
    )
  }

// formatDateForInput(dateString: string | null): string | null {
//   if (!dateString) return null;
//   return dateString.split('T')[0];
// }
 updateAdmin() {
let formData = new FormData();
formData.append("firstName", this.adminForm.value.firstName);
formData.append("name", this.adminForm.value.name);
formData.append("email", this.adminForm.value.email);
formData.append("gender", this.adminForm.value.gender);

let birthdate = this.adminForm.value.birthdate;
if (birthdate) {
  formData.append("birthdate", birthdate);
}
console.log(birthdate);

formData.append("address", this.adminForm.value.address);
formData.append("city", this.adminForm.value.city);
formData.append("state", this.adminForm.value.state);
formData.append("country", this.adminForm.value.country);
formData.append("phone", this.adminForm.value.phone);
if (this.fileToUpload?.length) {
formData.append("imageFile", this.fileToUpload[0]);
}
  const updatedAdmin = this.admin;
  const adminId = updatedAdmin.id;

  this.adminService.updateAdminInfo(formData, adminId).subscribe({
    next: (res) => {
      console.log('Admin est mis à jour sur le serveur', res);

      this.admin = res;
      localStorage.setItem('user', JSON.stringify(this.admin));

      Swal.fire({
        icon: 'success',
        title: 'Succès',
        text: 'Profil mis à jour avec succès'
      });
    },
    error: (err) => {
      console.error('Erreur de mise à jour', err);
      Swal.fire({
        icon: 'error',
        title: 'Erreur',
        text: 'Impossible de mettre à jour le profil'
      });
    }
  });
}


  onSubmit() {
  if (this.changePasswordForm.invalid) return;

  if (this.changePasswordForm.value.newPassword !== this.changePasswordForm.value.confirmPassword) {
    Swal.fire({
      icon: 'error',
      title: 'Erreur',
      text: 'Les mots de passe ne correspondent pas !'
    });
    return;
  }

  const payload = {
    currentPassword: this.changePasswordForm.value.currentPassword,
    newPassword: this.changePasswordForm.value.newPassword,
    confirmPassword: this.changePasswordForm.value.confirmPassword
  };

  this.adminService.changePassword(this.adminId, payload).subscribe({
    next: (res) => {
      Swal.fire({
        icon: 'success',
        title: 'Succès',
        text: res.message
      });
      console.log("res",res);
      this.changePasswordForm.reset();
    },
    error: (err) => {
      Swal.fire({
        icon: 'error',
        title: 'Erreur',
        text: err.error?.message || "Une erreur est survenue"
      });
    }
  });
}

  onFileSelected(event: any) {
    this.fileToUpload = event.target.files as File[];
    console.log(this.fileToUpload);
  }






}
