import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { GenericTableComponent } from '../../../shared/components/generic-table/generic-table.component';
import { DrawerFormComponent } from '../../../shared/components/drawer-form/drawer-form.component';
import { FormField } from '../../../shared/models/form-field.model';
import { LeaverequestService } from '../../../services/work/leaverequest.service';
import { LeaveRequest } from '../../../models/work/leaverequest';

@Component({
  selector: 'app-leave-allocations',
  imports: [CommonModule, RouterModule,GenericTableComponent,DrawerFormComponent],
  templateUrl: './leave-requests.component.html',
  styleUrl: './leave-requests.component.css'
})
export class LeaveRequestsComponent implements OnInit {

  leaveRequests: LeaveRequest[] = [];

  leaveRequestsService = inject(LeaverequestService);

  showDrawer = false;

  selectedRequest: any = {};

  mode: 'create' | 'update' = 'create';

  ngOnInit(): void {
    this.loadRequests();
  }
leaveRequestColumns = [
  { key: 'firstName', label: 'First Name' },
  { key: 'lastName', label: 'Last Name' },
  { key: 'email', label: 'Email' },
  { key: 'username', label: 'Username' },
  { key: 'phoneNumber', label: 'Phone Number' },
  { key: 'gender', label: 'Gender' }
];
leaveRequestFields: FormField[] = [
  { key: 'firstName', label: 'First Name', type: 'text' },
  { key: 'lastName', label: 'Last Name', type: 'text' },
  { key: 'email', label: 'Email', type: 'email' },
  { key: 'username', label: 'Username', type: 'text' },
  { key: 'phoneNumber', label: 'Phone Number', type: 'text' },
  {
    key: 'gender',
    label: 'Gender',
    type: 'dropdown'
  }
];
  loadRequests(): void {
    this.leaveRequestsService.getAll().subscribe(data => {
      this.leaveRequests = data;
    });
  }

  editRequestShowDrawer(allocation: any): void {
    this.mode = 'update';
    this.selectedRequest = { ...allocation };
    this.showDrawer = true;
  }

  updateRequest(allocation: LeaveRequest): void {
    this.leaveRequestsService.update(allocation, ``).subscribe(() => {
      this.loadRequests();
      this.showDrawer = false;
    });
  }
   createRequest(): void {
    this.mode = 'create';
    this.selectedRequest = {};
    this.showDrawer = true;
  }


  deleteRequest(allocation: any): void {
    this.leaveRequests = this.leaveRequests.filter(a => a !== allocation);
    this.showDrawer = false;
  }
}