import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { TopbarComponent } from '../topbar/topbar.component';
import { DashboardComponent } from "../dashboard/dashboard.component";
import { NavbarComponent } from "../../shared/layout/navbar/navbar.component";

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    TopbarComponent,
    SidebarComponent,
    DashboardComponent,
    NavbarComponent
],
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent {}