import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GenericCrudService } from '../generic.service';
import { LeaveRequest, LeaveRequestDto } from '../../models/work/leaverequest';

@Injectable({ providedIn: 'root' })
export class LeaverequestService extends GenericCrudService<LeaveRequest,LeaveRequestDto> {
  constructor(http: HttpClient) {
    super(http, 'LeaveRequest');
  }
}