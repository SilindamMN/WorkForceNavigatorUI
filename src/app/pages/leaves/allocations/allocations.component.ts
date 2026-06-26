import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LeaveAllocation } from '../../../models/hr/leaveallocation';
import { LeaveAllocationsService } from '../../../services/hr/leaveallocations.service';
import { GenericTableComponent } from '../../../shared/components/generic-table/generic-table.component';
import { DrawerFormComponent } from '../../../shared/components/drawer-form/drawer-form.component';
import { FormField } from '../../../shared/models/form-field.model';

@Component({
  selector: 'app-leave-allocations',
  imports: [CommonModule, RouterModule,GenericTableComponent,DrawerFormComponent],
  templateUrl: './allocations.component.html',
  styleUrl: './allocations.component.css'
})
export class LeaveAllocationsComponent implements OnInit {

  leaveAllocations: LeaveAllocation[] = [];

  leaveAllocationsService = inject(LeaveAllocationsService);

  showDrawer = false;

  selectedLeaveAllocation: any = {};

  mode: 'create' | 'update' = 'create';

  ngOnInit(): void {
    this.loadLeaveAllocations();
  }
leaveAllocationColumns = [
  { key: 'firstName', label: 'First Name' },
  { key: 'lastName', label: 'Last Name' },
  { key: 'email', label: 'Email' },
  { key: 'username', label: 'Username' },
  { key: 'phoneNumber', label: 'Phone Number' },
  { key: 'gender', label: 'Gender' }
];
leaveAllocationFields: FormField[] = [
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
  loadLeaveAllocations(): void {
    this.leaveAllocationsService.getAll('LeaveAllocations').subscribe(data => {
      this.leaveAllocations = data;
    });
  }

  editLeaveAllocationShowDrawer(allocation: any): void {
    this.mode = 'update';
    this.selectedLeaveAllocation = { ...allocation };
    this.showDrawer = true;
  }

  updateLeaveAllocation(allocation: LeaveAllocation): void {
    this.leaveAllocationsService.update(allocation, ``).subscribe(() => {
      this.loadLeaveAllocations();
      this.showDrawer = false;
    });
  }
   createLeaveAllocation(): void {
    this.mode = 'create';
    this.selectedLeaveAllocation = {};
    this.showDrawer = true;
  }


  deleteLeaveAllocation(allocation: any): void {
    this.leaveAllocations = this.leaveAllocations.filter(a => a !== allocation);
    this.showDrawer = false;
  }
}