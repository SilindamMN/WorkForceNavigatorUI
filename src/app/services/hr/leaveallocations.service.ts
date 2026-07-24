import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GenericCrudService } from '../generic.service';
import { LeaveAllocation, LeaveAllocationDto } from '../../models/hr/leaveallocation';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class LeaveAllocationsService extends GenericCrudService<LeaveAllocation> {
  constructor(http: HttpClient) {
    super(http, 'leave-allocations/');
  }
  getLeaveAllocationsByUsername(username: string): Observable<LeaveAllocationDto[]> {
    return this.http.get<LeaveAllocationDto[]>(
      `${this.baseUrl}LeaveAllocationByUsereName?userName=${username}`
    );
  }
}