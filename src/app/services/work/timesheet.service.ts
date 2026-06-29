import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GenericCrudService } from '../generic.service';
import { Timesheet, TimesheetDetail } from '../../models/work/timesheet';

@Injectable({ providedIn: 'root' })
export class TimesheetService extends GenericCrudService<Timesheet,TimesheetDetail> {
  constructor(http: HttpClient) {
    super(http, 'Timesheet');
  }
}