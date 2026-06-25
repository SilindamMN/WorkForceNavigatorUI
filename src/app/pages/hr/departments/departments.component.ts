import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DepartmentsService } from '../../../services/hr/departments.service';
import { Department, DepartmentDto } from '../../../core/models/hr/department';
import { FormField } from '../../../shared/models/form-field.model';
import { DrawerFormComponent } from "../../../shared/components/drawer-form/drawer-form.component";
import { GenericTableComponent } from '../../../shared/components/generic-table/generic-table.component';

@Component({
  selector: 'app-departments',
  imports: [CommonModule, RouterModule,GenericTableComponent, DrawerFormComponent],
  templateUrl: './departments.component.html',
  styleUrl: './departments.component.css'
})
export class DepartmentsComponent implements OnInit   {
  departments : Department[] = [];  
   departmentService = inject(DepartmentsService);
     showDrawer = false;
  selectedClient: any = {};
 departmentFields: FormField[] = [
    { key: 'departmentName', label: 'Department Name', type: 'text' },
    { key: 'description', label: 'Description', type: 'text' }
  ];
  mode: 'create' | 'update' = 'create';
  ngOnInit(): void {
    this.loadDepartments();
  }
   loadDepartments(): void {
    this.departmentService.getAll().subscribe(data => {
      this.departments = data;
    }); 
}
 createDepartment(): void {
    this.mode = 'create';
    this.selectedClient = {};
    this.showDrawer = true;
  }
editClientShowDrawer(client: any): void {
    this.mode = 'update';
    this.selectedClient = { ...client };
    this.showDrawer = true;
  }
updateDepartment(department: Department): void {
  this.departmentService
    .update(department, `/UpdateDepartment`)
    .subscribe(() => {
      this.loadDepartments();
      this.showDrawer = false;
    });
}
 saveDepartment(department: DepartmentDto): void {
    this.departmentService.create(department,'/CreateDepartment').subscribe(newClient => {
      this.departments.push(newClient);
      this.showDrawer = false;
    });
    this.showDrawer = false;
  }

  deleteClient(department: any): void {
    console.log('DELETE:', department);

    this.departments = this.departments.filter(c => c !== department);

    this.showDrawer = false;
  }
}