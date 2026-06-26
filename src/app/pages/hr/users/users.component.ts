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

@Component({
  selector: 'app-users',
  imports: [CommonModule,RouterModule,DrawerFormComponent,GenericTableComponent],
  templateUrl: './users.component.html',
  styleUrl: './users.component.css'
})
export class UsersComponent implements OnInit {

  users : UserDto[] = [];
  usersService = inject(UsersService);
  jobTitlesService = inject(JobTitleService);
  showDrawer = false;
  selectedUser: any = {};
  mode: 'create' | 'update' = 'create';
  jobTitles: JobTitle[] = [];

  ngOnInit(): void {
   this.loadUsers();   
   this.loadJobTitles();
  }

  loadUsers(): void {
    this.usersService.getAll(`Users`).subscribe(data=>{
      this.users = data;
    })
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
  { key: 'jobTitle', label: 'JobTitle', type: 'dropdown',options :[]},
  { key: 'gender', label: 'Gender', type: 'dropdown' ,options :[...GenderOptions] }
];

     createUser(): void {
    this.mode = 'create';
    this.selectedUser = {};
    this.showDrawer = true;
  }

  editUserShowDrawer(user:any):void{
   this.mode = 'update';
   this.selectedUser = {...user};
   this.showDrawer = true;
  }
  UpdateUser(user: UserDto): void {
  this.usersService.updateByKey(user, user.username
  ).subscribe(() => {
    this.loadUsers();
    this.showDrawer = false;
  });
}
  deleteUser(user:any):void{
    this.users = this.users.filter(c=> c!== user);
    this.showDrawer =false;
  }
  loadJobTitles(): void {
  this.jobTitlesService.getAll().subscribe(data => {
    this.jobTitles = data;

    const field = this.userFields.find(f => f.key === 'jobTitle');
    if (field) {
      field.options = this.jobTitles.map(j => j.title);
    }});
  }
}