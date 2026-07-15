import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { GenericTableComponent } from '../../../shared/components/generic-table/generic-table.component';
import { DrawerFormComponent } from '../../../shared/components/drawer-form/drawer-form.component';
import { FormField } from '../../../shared/models/form-field.model';
import { LeaverequestService } from '../../../services/work/leaverequest.service';
import { LeaveRequest, LeaveRequestDto, UpdateLeaveRequestDto } from '../../../models/work/leaverequest';
import { LeaveAllocationsService } from '../../../services/hr/leaveallocations.service';
import { LeaveAllocationDto } from '../../../models/hr/leaveallocation';
import { LeaveStatus } from '../../../models/enums/gender';

@Component({
  selector: 'app-leave-allocations',
  imports: [CommonModule, RouterModule,GenericTableComponent,DrawerFormComponent],
  templateUrl: './leave-requests.component.html',
  styleUrl: './leave-requests.component.css'
})
export class LeaveRequestsComponent implements OnInit {

  leaveRequests: LeaveRequest[] = [];
  userLeaveAllocations: LeaveAllocationDto[] = [];

  leaveRequestsService = inject(LeaverequestService);
  leaveAllocationsService = inject(LeaveAllocationsService);

  showDrawer = false;

  selectedRequest: any = {};

  mode: 'create' | 'update' = 'create';
  processButtonValue :string = '';

 customButtons = [
    {
      label: 'Process',
      action: 'process',
      class: 'process-btn'
    }
  ];

  ngOnInit(): void {
    this.loadRequests();
  }
leaveRequestColumns = [
  { key: 'firstName', label: 'First Name' },
  { key: 'lastName', label: 'Last Name' },
  { key: 'leaveName', label: 'Leave Type' },
  { key: 'startDate', label: 'Start Date' },
  { key: 'endDate', label: 'End Date' },
  { key: 'requestedDate', label: 'Requested Date' },
  { key: 'status', label: 'Status' },
  { key: 'numberOfDays', label: 'Number of Days' }
];
leaveRequestFields: FormField[] = [
  { key: 'firstName', label: 'First Name', type: 'text' },
  { key: 'lastName', label: 'Last Name', type: 'text' },
  { key: 'leaveName', label: 'Leave Type', type: 'dropdown' },
  { key: 'requestedDate', label: 'Requested Date', type: 'date' },
  { key: 'startDate', label: 'Start Date', type: 'date' },
  { key: 'endDate', label: 'End Date', type: 'date' },
  {
    key: 'status',
    label: 'Status',
    type: 'dropdown',
    options: [
      { label: 'Pending', value: 'Pending' },
      { label: 'Approved', value: 'Approved' },
      { label: 'Rejected', value: 'Rejected' }
    ]
  },
  { key: 'numberOfDays', label: 'Number of Days', type: 'number' }
];
  loadRequests(): void {
    this.leaveRequestsService.getAll("LeaveRequests").subscribe(data => {
      this.leaveRequests = data;
    });
  }

  editRequestShowDrawer(user: any): void {  console.log("chec"+user);

    this.mode = 'update';
    this.selectedRequest = { ...user };
    this.getLeaveAllocationsByUsername(this.selectedRequest.firstName);
    this.showDrawer = true;
  }

  updateRequest(leaveRequestId: number, leaveRequest: UpdateLeaveRequestDto): void {
    this.leaveRequestsService.updateLeaveRequest(leaveRequestId, leaveRequest).subscribe(() => {
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

onCustomButtonClick(event: { action: string; data: any }): void {
  switch (event.action) {
    case 'process':
      this.processLeaveRequest(event.data.id, event.data.status);
      break;
  }
}
  processLeaveRequest(leaveRequestId: number,status: LeaveStatus): void {
    this.leaveRequestsService.processLeaveRequest(leaveRequestId,status).subscribe(() => {
      this.loadRequests();
    });
  }

getLeaveAllocationsByUsername(username: string): void {
  this.leaveAllocationsService
    .getLeaveAllocationsByUsername(username)
    .subscribe(data => {

      const field = this.leaveRequestFields.find(f => f.key === 'leaveName');

      if (field) {
        let options = [...data];

        const currentLeaveName = this.selectedRequest?.leaveName;

        if (
          currentLeaveName &&
          !options.some(o => o.leaveName === currentLeaveName)
        ) {
          options.unshift({
            leaveName: currentLeaveName,
            numberOfDays: this.selectedRequest?.numberOfDays || 0,
          });
        }

        field.options = options;
        field.optionLabel = 'leaveName';
        field.optionValue = 'leaveName'; // or 'id' if you want to save the ID
      }
    });
}
}