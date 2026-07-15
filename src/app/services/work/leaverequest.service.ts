import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GenericCrudService } from '../generic.service';
import { CreateLeaveRequestDto, LeaveRequest, LeaveRequestDto, UpdateLeaveRequestDto } from '../../models/work/leaverequest';
import { Observable } from 'rxjs';
import { LeaveStatus } from '../../models/enums/gender';

@Injectable({ providedIn: 'root' })
export class LeaverequestService extends GenericCrudService<LeaveRequest,LeaveRequestDto> {
  constructor(http: HttpClient) {
    super(http, 'LeaveRequest/');
  }

processLeaveRequest(
  leaveRequestId: number,
  status: LeaveStatus
): Observable<  LeaveRequestDto> {
  return this.http.post<LeaveRequestDto>(
    `${this.baseUrl}ProcessLeaveRequest?leaveRequestId=${leaveRequestId}&status=${status}`,
    null
  );
}

updateLeaveRequest(
  leaveRequestId: number,
  leaveRequest: UpdateLeaveRequestDto
) {
  return this.http.put(
    `${this.baseUrl}UpdateLeaveRequest?leaveRequestId=${leaveRequestId}`,
    leaveRequest
  );
}
createLeaveRequest(leaveRequest: CreateLeaveRequestDto): Observable<CreateLeaveRequestDto> {
  return this.http.post<CreateLeaveRequestDto>(`${this.baseUrl}Create`, leaveRequest);
}
}