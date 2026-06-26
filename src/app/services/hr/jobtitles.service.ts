import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Client } from '../../models/hr/client';
import { GenericCrudService } from '../generic.service';
import { JobTitle } from '../../models/hr/jobtitle';

@Injectable({ providedIn: 'root' })
export class JobTitleService extends GenericCrudService<JobTitle> {
  constructor(http: HttpClient) {
    super(http, 'JobTitle');
  }
}