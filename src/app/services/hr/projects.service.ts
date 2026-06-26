import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Client } from '../../models/hr/client';
import { GenericCrudService } from '../generic.service';
import { Project } from '../../models/hr/project';

@Injectable({ providedIn: 'root' })
export class ProjectsService extends GenericCrudService<Project> {
  constructor(http: HttpClient) {
    super(http, 'Project');
  }
}