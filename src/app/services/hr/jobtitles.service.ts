import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GenericCrudService } from '../generic.service';
import { JobTitle } from '../../models/hr/jobtitle';
import { Observable } from 'rxjs';
import { Seniority } from '../../models/enums/seniority';

@Injectable({ providedIn: 'root' })
export class JobTitleService extends GenericCrudService<JobTitle & { id: string | number }> {
  constructor(http: HttpClient) {
    super(http, 'JobTitle');
  } 
  getJobTitleByDepartmentId(departmentId: number, seniority :Seniority): Observable<JobTitle[]> {
    return this.http.get<JobTitle[]>(
      `${this.baseUrl}/Department/${departmentId}?seniority=${seniority}`
    );
  }

  AssignJobTitleToUser( username: string,jobTitleId: number): Observable<void> {
    return this.http.post<void>(`${this.baseUrl}/AssignJobTitle`, { username, jobTitleId });
  }
}