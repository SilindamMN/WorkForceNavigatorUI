import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Client } from '../../models/hr/client';
import { GenericCrudService } from '../generic.service';
import { Team } from '../../models/hr/team';
import { Task, TaskDto } from '../../models/work/Task';

@Injectable({ providedIn: 'root' })
export class TasksService extends GenericCrudService<Task,TaskDto> {
  constructor(http: HttpClient) {
    super(http, 'Task');
  }
}