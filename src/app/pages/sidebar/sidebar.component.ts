import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule,RouterModule],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {
roles: string[] = JSON.parse(localStorage.getItem('userInfo') || '{}').roles || [];
  toggleHR = false;
  toggleWork = false;
  toggleLeaves = false;
  toggleSystem = false;

  activeLink = 'Dashboard';

  setActive(label: string) {
    this.activeLink = label;
    console.log("check here "+this.roles)
  }
}