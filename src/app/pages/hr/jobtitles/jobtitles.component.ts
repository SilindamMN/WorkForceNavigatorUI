import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { JobTitleService } from '../../../services/hr/jobtitles.service';
import { JobTitle, JobTitleDto } from '../../../models/hr/jobtitle';
import { GenericTableComponent } from '../../../shared/components/generic-table/generic-table.component';
import { DrawerFormComponent } from '../../../shared/components/drawer-form/drawer-form.component';
import { FormField } from '../../../shared/models/form-field.model';
import { DepartmentsService } from '../../../services/hr/departments.service';
import { Department, DepartmentDto } from '../../../models/hr/department';
import { SeniorityOptions } from '../../../models/enums/seniority';

@Component({
  selector: 'app-job-titles',
  imports: [CommonModule, RouterModule,GenericTableComponent,DrawerFormComponent],
  templateUrl: './jobtitles.component.html',
  styleUrl: './jobtitles.component.css'
})
export class JobTitlesComponent implements OnInit {

  jobTitles: JobTitle[] = [];
  departments: Department[] = [];

  jobTitlesService = inject(JobTitleService);
  departmentsService = inject(DepartmentsService);

  showDrawer = false;

  selectedJobTitle: any = {};

  mode: 'create' | 'update' = 'create';
jobTitleColumns = [
  { key: 'title', label: 'Title' },
  { key: 'departmentName', label: 'Department' },
  { key: 'description', label: 'Description' },
  { key: 'seniority', label: 'Seniority' }
];
  // ================= FORM CONFIG =================
  jobTitleFields: FormField[] = [
  { key: 'title', label: 'Title', type: 'text' },
  { key: 'description', label: 'Description', type: 'text' },
  { key: 'departmentId', label: 'Department', type: 'dropdown', options: [], optionValue: 'id', optionLabel: 'departmentName' },
    { key: 'seniority', label: 'Seniority', type: 'dropdown', options: [...SeniorityOptions] },
    
];

   jobTitleUpdaeFields: FormField[] = [
  { key: 'timesheetDate', label: 'Date', type: 'date' },
  { key: 'description', label: 'Description', type: 'text' },
  { key: 'timeSpent', label: 'Hours', type: 'number' },
{ key: 'projectId', label: 'Project', type: 'dropdown', options: [], optionValue: 'projectId', optionLabel: 'projectName' }];

  loadJobTitles(): void {
    this.jobTitlesService.getAll().subscribe(data => {
      this.jobTitles = data;
    });
  }

  loadDepartments(): void {
    this.departmentsService.getAll().subscribe(data => {
      this.departments = data;
      const field = this.jobTitleFields.find(x=>x.key === 'departmentId');
      if(field){
        field.options = data;
      }
    });
  }
   createJobTitle(): void {
    this.mode = 'create';
    this.selectedJobTitle = {};
    this.showDrawer = true;
  }

  editJobTitleShowDrawer(jobTitle: any): void {
    this.mode = 'update';
    this.selectedJobTitle = { ...jobTitle };
    this.showDrawer = true;
  }

 updateJobTitle(jobTitle: JobTitle & { id: string | number }): void {
  const payload = { ...jobTitle, id: jobTitle.id ?? (jobTitle as any).jobTitleId };
  this.jobTitlesService.update(payload).subscribe(() => {
    this.loadJobTitles();
    this.showDrawer = false;
  });
}

   saveJobTitle(jobtitle: JobTitleDto): void {
    this.jobTitlesService.CreateJobTitle(jobtitle).subscribe(newClient => {
      this.jobTitles.push(newClient);
      this.showDrawer = false;
    });
    this.showDrawer = false;
  }
 ngOnInit(): void {
    this.loadJobTitles();
    this.loadDepartments();
  }
 
 deleteJobTitle(jobTitle: any): void {
  const id = jobTitle.id ?? jobTitle.jobTitleId;
  this.jobTitlesService.delete(id).subscribe(() => {
    this.jobTitles = this.jobTitles.filter(j => (j.jobTitleId ?? (j as any).jobTitleId) !== id);
    this.showDrawer = false;
  });
}
}