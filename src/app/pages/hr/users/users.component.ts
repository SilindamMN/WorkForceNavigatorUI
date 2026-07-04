import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { UsersService } from '../../../services/hr/users.service';
import { DrawerFormComponent } from '../../../shared/components/drawer-form/drawer-form.component';
import { GenericTableComponent } from '../../../shared/components/generic-table/generic-table.component';
import { FormField } from '../../../shared/models/form-field.model';
import { GenderOptions } from '../../../models/enums/gender';
import { UserDto } from '../../../models/hr/user';
import { JobTitleService } from '../../../services/hr/jobtitles.service';
import { JobTitle } from '../../../models/hr/jobtitle';
import { DepartmentsService } from '../../../services/hr/departments.service';
import { Department } from '../../../models/hr/department';
import { TeamsService } from '../../../services/hr/teams.service';
import { UserTeamListDto } from '../../../models/hr/team';

@Component({
  selector: 'app-users',
  imports: [CommonModule, RouterModule, DrawerFormComponent, GenericTableComponent],
  templateUrl: './users.component.html',
  styleUrl: './users.component.css'
})
export class UsersComponent implements OnInit {
  formData: any = {};
  users: UserDto[] = [];
  departments: Department[] = [];
  jobTitles: JobTitle[] = [];

  userTeams : UserTeamListDto[] = [];

  usersService = inject(UsersService);
  teamsService = inject(TeamsService);
  jobTitlesService = inject(JobTitleService);
  departmentService = inject(DepartmentsService);

  showDrawer = false;
  selectedUser: any = {};
  mode: 'create' | 'update' = 'create';

  ngOnInit(): void {
    this.loadUsers();
    this.loadDepartments();
  }

  // Called whenever ANY field in the drawer changes
  onFormChange(event: { key: string; value: any }): void {
    this.formData[event.key] = event.value;

    if (event.key === 'departmentId') {
      // reset job title whenever department changes
      this.formData.jobTitleId = null;
      this.selectedUser = { ...this.selectedUser, jobTitleId: null };

      if (event.value) {
        this.getJobTitleByDepartmentId(+event.value);
      } else {
        this.clearJobTitleOptions();
      }
    }
  }


  private clearJobTitleOptions(): void {
    this.jobTitles = [];
    const field = this.userFields.find(f => f.key === 'jobTitleId');
    if (field) field.options = [];
  }

  loadUsers(): void {
    this.usersService.getAll(`Users`).subscribe(data => {
      this.users = data;
    });
  }

  userColumns = [
    { key: 'firstName', label: 'First Name' },
    { key: 'lastName', label: 'Last Name' },
    { key: 'email', label: 'Email' },
    { key: 'username', label: 'Username' },
    { key: 'phoneNumber', label: 'Phone Number' },
    { key: 'gender', label: 'Gender' }
  ];

  // ================= FORM CONFIG =================
  userFields: FormField[] = [
  { key: 'firstName', label: 'First Name', type: 'text' },
  { key: 'lastName', label: 'Last Name', type: 'text' },
  { key: 'email', label: 'Email', type: 'email' },
  { key: 'username', label: 'Username', type: 'text' },
  { key: 'phoneNumber', label: 'Phone Number', type: 'text' },
  { key: 'salary', label: 'Salary', type: 'text' },
  { key: 'departmentId', label: 'Department', type: 'dropdown', options: [], optionValue: 'id', optionLabel: 'departmentName' },
  { key: 'userId', label: 'Team', type: 'dropdown', options: [], optionValue: 'id', optionLabel: 'teamName' },
  { key: 'jobTitleId', label: 'JobTitle', type: 'dropdown', options: [], optionValue: 'id', optionLabel: 'title' },
  { key: 'gender', label: 'Gender', type: 'dropdown', options: [...GenderOptions] } // plain strings, no optionValue/optionLabel needed
];

  createUser(): void {
    this.mode = 'create';
    this.selectedUser = {};
    this.clearJobTitleOptions();
    this.showDrawer = true;
  }

  editUserShowDrawer(user: any): void {
    this.mode = 'update';
    this.selectedUser = { ...user };
    this.showDrawer = true;

    // Pre-load the job titles for this user's existing department
    if (user.departmentId) {
      this.getJobTitleByDepartmentId(user.departmentId);
    }
    if(user.id){
      this.getTeamsByUserId(user.id);
    }
  }

  UpdateUser(user: UserDto): void {
    this.usersService.updateByKey(user, (user as any).username)
      .subscribe(() => {
        this.loadUsers();
        this.showDrawer = false;
      });
  }

  deleteUser(user: any): void {
    this.users = this.users.filter(c => c !== user);
    this.showDrawer = false;
  }

loadDepartments(): void {
  this.departmentService.getAll().subscribe(data => {
    this.departments = data;
    const field = this.userFields.find(f => f.key === 'departmentId');
    if (field) {
      field.options = data; // raw Department[] objects now — no manual mapping
    }
  });
}

  getTeamsByUserId(userId: string): void {
    this.teamsService.getTeamsByUserId(userId)
      .subscribe(data => {
      this.userTeams = data;
      const field = this.userFields.find(f => f.key === 'userId');
      if (field) {
        field.options = data; // raw JobTitle[] objects
      }
      });
  }

getJobTitleByDepartmentId(departmentId: number): void {
  this.jobTitlesService.getJobTitleByDepartmentId(departmentId)
    .subscribe(data => {
      this.jobTitles = data;
      const field = this.userFields.find(f => f.key === 'jobTitleId');
      if (field) {
        field.options = data; // raw JobTitle[] objects
      }
    });
  }
}