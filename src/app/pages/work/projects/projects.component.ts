import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Project } from '../../../models/hr/project';
import { ProjectsService } from '../../../services/hr/projects.service';
import { DrawerFormComponent } from '../../../shared/components/drawer-form/drawer-form.component';
import { GenericTableComponent } from '../../../shared/components/generic-table/generic-table.component';
import { FormField } from '../../../shared/models/form-field.model';

@Component({
  selector: 'app-projects',
  imports: [CommonModule, RouterModule, DrawerFormComponent, GenericTableComponent],
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.css'
})
export class ProjectsComponent implements OnInit {

  projects: Project[] = [];

  projectsService = inject(ProjectsService);

  showDrawer = false;

  selectedProject: any = {};

  mode: 'create' | 'update' = 'create';

  ngOnInit(): void {
    this.loadProjects();
  }

  loadProjects(): void {
    this.projectsService.getAll().subscribe(data => {
      this.projects = data;
    });
  }

  // ================= TABLE CONFIG =================
  projectColumns = [
    { key: 'projectName', label: 'Project Name' },
    { key: 'clientName', label: 'Client Name' },
    { key: 'teamName', label: 'Team' },
    { key: 'description', label: 'Description' },
  ];

  // ================= FORM CONFIG =================
  projectFields: FormField[] = [
    { key: 'projectName', label: 'Project Name', type: 'text' },
    { key: 'clientName', label: 'Client Name', type: 'text' },
    { key: 'teamName', label: 'Team Name', type: 'text' },
    { key: 'description', label: 'Description', type: 'text' },
    { key: 'startDate', label: 'Start Date', type: 'text' },
    { key: 'endDate', label: 'End Date', type: 'text' }
  ];

  createProject(): void {
    this.mode = 'create';
    this.selectedProject = {};
    this.showDrawer = true;
  }

  editProjectShowDrawer(project: any): void {
    this.mode = 'update';
    this.selectedProject = { ...project };
    this.showDrawer = true;
  }

  updateProject(project: Project): void {
    this.projectsService.update(project, ``).subscribe(() => {
      this.loadProjects();
      this.showDrawer = false;
    });
  }

  deleteProject(project: any): void {
    this.projects = this.projects.filter(p => p !== project);
    this.showDrawer = false;
  }
}