import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Client } from '../../models/hr/client';
import { GenericCrudService } from '../generic.service';
import { Team, UserTeamListDto } from '../../models/hr/team';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class TeamsService extends GenericCrudService<Team> {
  constructor(http: HttpClient) {
    super(http, 'Team');
  }
  getTeamsByUserId(userId: string): Observable<UserTeamListDto[]> {
      return this.http.get<UserTeamListDto[]>(
        `${this.baseUrl}/user/${userId}`
      );
    }
}