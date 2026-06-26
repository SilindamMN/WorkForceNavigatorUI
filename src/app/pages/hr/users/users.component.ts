import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { User } from '../../../models/hr/user';
import { UsersService } from '../../../services/hr/users.service';
import { DrawerFormComponent } from '../../../shared/components/drawer-form/drawer-form.component';
import { GenericTableComponent } from '../../../shared/components/generic-table/generic-table.component';
import { FormField } from '../../../shared/models/form-field.model';

@Component({
  selector: 'app-users',
  imports: [CommonModule,RouterModule,DrawerFormComponent,GenericTableComponent],
  templateUrl: './users.component.html',
  styleUrl: './users.component.css'
})
export class UsersComponent implements OnInit {

  users : User[] = [];
  usersService = inject(UsersService);
  showDrawer = false;
  selectedUser: any = {};
  mode: 'create' | 'update' = 'create';

  ngOnInit(): void {
   this.loadUsers();   
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
  { key: 'gender', label: 'Gender', type: 'text' }
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
  UpdateUser(user:User):void{
    this.usersService.update(user,``).subscribe(()=>{
      this.users.push(user);
      this.loadUsers();
      this.showDrawer=false;
    })
  }
  deleteUser(user:any):void{
    this.users = this.users.filter(c=> c!== user);
    this.showDrawer =false;
  }
}