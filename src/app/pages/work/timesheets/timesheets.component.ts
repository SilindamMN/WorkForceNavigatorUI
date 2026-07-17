import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { GenericTableComponent } from '../../../shared/components/generic-table/generic-table.component';
import { DrawerFormComponent } from '../../../shared/components/drawer-form/drawer-form.component';
import { FormField } from '../../../shared/models/form-field.model';
import {  Timesheet, TimesheetSummary,  } from '../../../models/work/timesheet';
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
timesheets: TimesheetSummary[] = [];
timesheetDetails: Timesheet[] = [];

  timesheetsService = inject(TimesheetService);

  showDrawer = false;
selectedTimesheet: Timesheet[] = [];
weekOffSet = 0;
  mode: 'create' | 'update' = 'create';

  ngOnInit(): void {
    this.loadTimesheets();
  }

  // ================= FORM CONFIG =================

 timesheetFields: FormField[] = [
  { key: 'timesheetDate', label: 'Date', type: 'date' },
  { key: 'dayName', label: 'Day', type: 'text' },
  { key: 'username', label: 'Username', type: 'text' },
  { key: 'description', label: 'Description', type: 'text' },
  { key: 'timeSpent', label: 'Hours', type: 'number' },
  { key: 'projectName', label: 'Project', type: 'text' }
];

 timesheetColumns = [
  { key: 'date', label: 'Date' },
  { key: 'dayName', label: 'Day' },
  { key: 'totalHours', label: 'Total Hours' },
  { key: 'projectNames', label: 'Projects' }
];

  createTimesheet(): void {
    this.mode = 'create';
    this.selectedTimesheet = [];
    this.showDrawer = true;
  }

editTimesheetShowDrawer(day: string): void {
  this.timesheetsService.getTimesheetDetails(day).subscribe(data => {

    this.selectedTimesheet = data;

    this.showDrawer = true;
  });
}

  updateTimesheet(timesheet: Timesheet): void {
    this.timesheetsService.update(timesheet).subscribe(() => {
      this.loadTimesheets();
      this.showDrawer = false;
    });
  }

loadTimesheets(): void {
  this.timesheetsService
    .getTimesheetSummary(this.weekOffSet)
    .subscribe(data => {
      this.timesheets = data;
    });
}

handleButton(button: any): void {

  if (button.action === 'back') {
    this.weekOffSet--;
    this.loadTimesheets();
  }

  if (button.action === 'forward') {
    this.weekOffSet++;
    this.loadTimesheets();
  }
}

previousWeek(): void {
  this.weekOffSet--;
  this.loadTimesheets();
}

nextWeek(): void {
  this.weekOffSet++;
  this.loadTimesheets();
}

getTimesheetDetails(timesheetDate: string): void {
  this.timesheetsService.getTimesheetDetails(timesheetDate).subscribe(data => {
    this.timesheetDetails = data;
  });
}
/*
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
  */
}
