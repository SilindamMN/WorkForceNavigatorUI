import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { GenericTableComponent } from '../../../shared/components/generic-table/generic-table.component';
import { DrawerFormComponent } from '../../../shared/components/drawer-form/drawer-form.component';
import { FormField } from '../../../shared/models/form-field.model';
import { Timesheet } from '../../../models/work/timesheet';
import { TimesheetService } from '../../../services/work/timesheet.service';

@Component({
  selector: 'app-timesheets',
  imports: [
    CommonModule,
    RouterModule,
    GenericTableComponent,
    DrawerFormComponent
  ],
  templateUrl: './timesheets.component.html',
  styleUrl: './timesheets.component.css'
})
export class TimesheetsComponent implements OnInit {

  timesheets: Timesheet[] = [];

  timesheetsService = inject(TimesheetService);

  showDrawer = false;

  selectedTimesheet: any = {};

  mode: 'create' | 'update' = 'create';

  ngOnInit(): void {
    this.loadTimesheets();
  }

  // ================= FORM CONFIG =================

  timesheetFields: FormField[] = [
    { key: 'teamName', label: 'Team Name', type: 'text' },
    { key: 'description', label: 'Description', type: 'text' },
    { key: 'departmentName', label: 'Department Name', type: 'text' }
  ];

  timesheetColumns = [
    { key: 'teamName', label: 'Team Name' },
    { key: 'description', label: 'Description' },
    { key: 'departmentName', label: 'Department Name' }
  ];

  loadTimesheets(): void {
    this.timesheetsService.getAll().subscribe(data => {
      this.timesheets = data;
    });
  }

  createTimesheet(): void {
    this.mode = 'create';
    this.selectedTimesheet = {};
    this.showDrawer = true;
  }

  editTimesheetShowDrawer(timesheet: Timesheet): void {
    this.mode = 'update';
    this.selectedTimesheet = { ...timesheet };
    this.showDrawer = true;
  }

  updateTimesheet(timesheet: Timesheet): void {
    this.timesheetsService.update(timesheet).subscribe(() => {
      this.loadTimesheets();
      this.showDrawer = false;
    });
  }

   saveDepartment(timesheet: Timesheet): void {
      this.timesheetsService.create(timesheet,'/CreateDepartment').subscribe(newClient => {
        this.timesheets.push(newClient);
        this.showDrawer = false;
      });
      this.showDrawer = false;
    }

  deleteTimesheet(timesheet: Timesheet): void {
    this.timesheets = this.timesheets.filter(t => t !== timesheet);
    this.showDrawer = false;
  }
}