import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GenericCrudService } from '../generic.service';
import { Team, UserTeamListDto } from '../../models/hr/team';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class TeamsService extends GenericCrudService<Team> {
  constructor(http: HttpClient) {
    super(http, 'Team');
  }
    getUserTeamByDepartmentId(departmentId: number): Observable<UserTeamListDto[]> {
      return this.http.get<UserTeamListDto[]>(
        `${this.baseUrl}/by-department/?departmentId=${departmentId}`
      );
    }
    
}