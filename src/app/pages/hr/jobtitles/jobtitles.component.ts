import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { JobTitleService } from '../../../services/hr/jobtitles.service';
import { JobTitle } from '../../../models/hr/jobtitle';
import { GenericTableComponent } from '../../../shared/components/generic-table/generic-table.component';
import { DrawerFormComponent } from '../../../shared/components/drawer-form/drawer-form.component';
import { FormField } from '../../../shared/models/form-field.model';

@Component({
  selector: 'app-job-titles',
  imports: [CommonModule, RouterModule,GenericTableComponent,DrawerFormComponent],
  templateUrl: './jobtitles.component.html',
  styleUrl: './jobtitles.component.css'
})
export class JobTitlesComponent implements OnInit {

  jobTitles: JobTitle[] = [];

  jobTitlesService = inject(JobTitleService);

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
  { key: 'departmentName', label: 'Department Name', type: 'text' },
  { key: 'description', label: 'Description', type: 'text' },
  { key: 'seniority', label: 'Seniority', type: 'text' }
];
  loadJobTitles(): void {
    this.jobTitlesService.getAll().subscribe(data => {
      this.jobTitles = data;
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
    this.jobTitlesService.update(jobTitle).subscribe(() => {
      this.loadJobTitles();
      this.showDrawer = false;
    });
  }
   saveClient(jobtitle: any): void {
    this.jobTitlesService.create(jobtitle).subscribe(newClient => {
      this.jobTitles.push(newClient);
      this.showDrawer = false;
    });
    this.showDrawer = false;
  }
 ngOnInit(): void {
    this.loadJobTitles();
  }
  deleteJobTitle(jobTitle: any): void {
    this.jobTitles = this.jobTitles.filter(j => j !== jobTitle);
    this.showDrawer = false;
  }
}