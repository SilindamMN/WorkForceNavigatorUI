import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GenericCrudService } from '../generic.service';
import { AddMemberDto, Team, UserTeamListDto } from '../../models/hr/team';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class TeamsService extends GenericCrudService<Team> {
  constructor(http: HttpClient) {
    super(http, 'teams');
  }
    getUserTeamByDepartmentId(departmentId: number): Observable<UserTeamListDto[]> {
      return this.http.get<UserTeamListDto[]>(
        `${this.baseUrl}/by-department/?departmentId=${departmentId}`
      );
    }
    
    addMemberToTeam(request: AddMemberDto): Observable<any> {
  return this.http.post<any>(
    `${this.baseUrl}/add-member`,
    request
  );
}
}