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
import { Seniority, SeniorityOptions } from '../../../models/enums/seniority';

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
  userTeams: UserTeamListDto[] = [];

  usersService = inject(UsersService);
  jobTitlesService = inject(JobTitleService);
  departmentService = inject(DepartmentsService);
  teamsService = inject(TeamsService);

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
        this.getJobTitleByDepartmentId(event.value, this.formData.seniority as Seniority);
        this.getUserTeamByDepartmentId(event.value);
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
    { key: 'gender', label: 'Gender' },
    { key: 'seniority', label: 'Seniority' }
  ];

  // ================= FORM CONFIG =================
  userFields: FormField[] = [
  { key: 'firstName', label: 'First Name', type: 'text' },
  { key: 'lastName', label: 'Last Name', type: 'text' },
  { key: 'email', label: 'Email', type: 'email' },
  { key: 'username', label: 'Username', type: 'text' },
  { key: 'phoneNumber', label: 'Phone Number', type: 'text' },
  { key: 'salary', label: 'Salary', type: 'text' },
  { key: 'seniority', label: 'Seniority', type: 'dropdown', options: [...SeniorityOptions] },
  { key: 'departmentId', label: 'Department', type: 'dropdown', options: [], optionValue: 'id', optionLabel: 'departmentName' },
  { key: 'jobTitleId', label: 'JobTitle', type: 'dropdown', options: [], optionValue: 'id', optionLabel: 'title' },
  { key: 'teamId', label: 'Team', type: 'dropdown', options: [], optionValue: 'id', optionLabel: 'teamName' },
  { key: 'gender', label: 'Gender', type: 'dropdown', options: [...GenderOptions] }
];

  createUser(): void {
    this.mode = 'create';
    this.selectedUser = {};
    this.clearJobTitleOptions();
    this.showDrawer = true;
  }

  editUserShowDrawer(user: any): void {
    this.showDrawer = true;
    this.mode = 'update';
    this.selectedUser = { ...user };
    if (user.departmentId) {
      this.getUserTeamByDepartmentId(user.departmentId);
       this.getJobTitleByDepartmentId(user.departmentId, user.seniority as Seniority);
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

getUserTeamByDepartmentId(departmentId: number): void {
  this.teamsService.getUserTeamByDepartmentId(departmentId)
    .subscribe(data =>{
    this.userTeams = data;
    const field = this.userFields.find(f => f.key === 'teamId');
    if (field) {
      field.options = data; // raw Team[] objects now — no manual mapping
    } });
}
getJobTitleByDepartmentId(departmentId: number, seniority: Seniority): void {
  this.jobTitlesService.getJobTitleByDepartmentId(departmentId, seniority)
    .subscribe(data => {
      this.jobTitles = data;
      const field = this.userFields.find(f => f.key === 'jobTitleId');
      if (field) {
        let options = data.at(0) ? data : [];

        const currentJobTitleId = this.selectedUser?.jobTitleId;
        if (currentJobTitleId && !options.some((o: any) => o.jobTitleId === currentJobTitleId)) {
          options = [
            {
              id: currentJobTitleId, title: this.selectedUser.jobTitleName,
              departmentName: '',
              description: '',
              seniority: ''
            },
            ...options
          ];
        }
        field.options = options;
      }
    });
}
}