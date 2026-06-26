import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Client } from '../../models/hr/client';
import { GenericCrudService } from '../generic.service';
import { Team } from '../../models/hr/team';

@Injectable({ providedIn: 'root' })
export class TeamsService extends GenericCrudService<Team> {
  constructor(http: HttpClient) {
    super(http, 'Team');
  }
}