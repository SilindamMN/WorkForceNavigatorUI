import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {

  toggleHR = false;
  toggleWork = false;
  toggleLeaves = false;
  toggleSystem = false;

  activeLink = 'Dashboard';

  setActive(label: string) {
    this.activeLink = label;
  }
}