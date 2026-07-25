import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DepartmentsService } from '../../../services/hr/departments.service';
import { Department, DepartmentDto } from '../../../models/hr/department';
import { FormField } from '../../../shared/models/form-field.model';
import { DrawerFormComponent } from "../../../shared/components/drawer-form/drawer-form.component";
import { GenericTableComponent } from '../../../shared/components/generic-table/generic-table.component';

@Component({
  selector: 'app-departments',
  imports: [CommonModule, RouterModule, GenericTableComponent, DrawerFormComponent],
  templateUrl: './departments.component.html',
  styleUrl: './departments.component.css'
})
export class DepartmentsComponent implements OnInit {
  departments: Department[] = [];
  departmentService = inject(DepartmentsService);
  showDrawer = false;
  selectedDepartment: any = {};
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
    this.selectedDepartment = {};
    this.showDrawer = true;
  }
  editClientShowDrawer(client: any): void {
    this.mode = 'update';
    this.selectedDepartment = { ...client };
    this.showDrawer = true;
  }
  updateDepartment(department: Department): void {
    this.departmentService
      .update(department)
      .subscribe(() => {
        this.loadDepartments();
        this.showDrawer = false;
      });
  }
  saveDepartment(department: DepartmentDto): void {
    this.departmentService.create(department, '/create').subscribe(newClient => {
      this.departments.push(newClient);
      this.showDrawer = false;
    });
    this.showDrawer = false;
  }
  deleteDepartment(department: any): void {
    this.departmentService.delete(department.id).subscribe(() => {
      this.departments = this.departments.filter(c => c.id !== department.id);
      this.showDrawer = false;
    });
  }
}