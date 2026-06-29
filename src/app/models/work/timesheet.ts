export class Timesheet {
  id = 0;
  timesheetDate = new Date();
  username = '';
  description = '';
  timeSpent = 0;
  projectId = 0;
}

export class TimesheetDetail {
  description = '';
  timeSpent = 0;
  projectName = '';
}

export class GroupedTimesheetDetail {
  dayName = '';
  timesheetDate = new Date();
  username = '';
  timesheetDetails: TimesheetDetail[] = [];
}