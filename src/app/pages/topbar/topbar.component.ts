import { Component, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-topbar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.css']
})
export class TopbarComponent {

  toggleProfile = false;

  notificationCount = 4;
  messageCount = 2;

  toggleDropdown(event: Event) {
    event.stopPropagation();           // stop it from hitting the document listener below
    this.toggleProfile = !this.toggleProfile;
  }

  // close dropdown when clicking anywhere outside
  @HostListener('document:click')
  close() {
    this.toggleProfile = false;
  }

  viewProfile(event?: Event) {
    event?.stopPropagation();
    console.log('view profile clicked');
    this.toggleProfile = false;
  }

  logout(event?: Event) {
    event?.stopPropagation();
    console.log('logout clicked');
    this.toggleProfile = false;
  }
}