import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GenericCrudService } from '../generic.service';
import { LeaveAllocation } from '../../models/hr/leaveallocation';

@Injectable({ providedIn: 'root' })
export class LeaveAllocationsService extends GenericCrudService<LeaveAllocation> {
  constructor(http: HttpClient) {
    super(http, 'LeaveAllocation/');
  }
}