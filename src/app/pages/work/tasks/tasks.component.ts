import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DrawerFormComponent } from '../../../shared/components/drawer-form/drawer-form.component';
import { GenericTableComponent } from '../../../shared/components/generic-table/generic-table.component';
import { FormField } from '../../../shared/models/form-field.model';
import { TasksService } from '../../../services/work/tasks.service';

@Component({
  selector: 'app-taskss',
  standalone: true,
  imports: [
    CommonModule,
    DrawerFormComponent,
    GenericTableComponent
  ],
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit {

  // ================= DATA =================
  taskss: any[] = [];

  tasksService = inject(TasksService);

  // ================= DRAWER =================
  showDrawer = false;
  selectedTask: any = {};
  mode: 'create' | 'update' = 'create';

  // ================= TABLE CONFIG =================
  tasksColumns = [
    { key: 'tasksName', label: 'Client Name' },
    { key: 'email', label: 'Email' },
    { key: 'phone', label: 'Phone' },
    { key: 'fax', label: 'Fax' }
  ];

  // ================= FORM CONFIG =================
  tasksFields: FormField[] = [
    { key: 'tasksName', label: 'Client Name', type: 'text' },
    { key: 'email', label: 'Email', type: 'email' },
    { key: 'phone', label: 'Phone', type: 'text' },
    { key: 'fax', label: 'Fax', type: 'text' }
  ];

  ngOnInit(): void {
    this.loadTasks();
  }

  loadTasks(): void {
    this.tasksService.getAll().subscribe(data => {
      this.taskss = data;
    });
  }

  // ================= ACTIONS =================

  createTask(): void {
    this.mode = 'create';
    this.selectedTask = {};
    this.showDrawer = true;
  }

  editClient(tasks: any): void {
    this.mode = 'update';
    this.selectedTask = { ...tasks };
    this.showDrawer = true;
  }

  saveClient(tasks: any): void {
    this.tasksService.create(tasks).subscribe(newTask => {
      this.taskss.push(newTask);
      this.showDrawer = false;
    });
    this.showDrawer = false;
  }

  deleteClient(tasks: any): void {
    console.log('DELETE:', tasks);

    this.taskss = this.taskss.filter(c => c !== tasks);

    this.showDrawer = false;
  }
}