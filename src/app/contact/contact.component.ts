import { Component } from '@angular/core';
import { AdminService } from '../services/admin.service';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [SidebarComponent, CommonModule],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css'
})
export class ContactComponent {
  messages:any;
  constructor(private adminService:AdminService){}

  ngOnInit() {
    this.getAllUserMessages();
  }

  getAllUserMessages() {
    console.log("messages " , this.messages);
    this.adminService.getAllMessagesContact().subscribe(
      (res:any) => {
        this.messages = res;
        console.log("message " , this.messages);
      }
    )
  }
}
