export class JobTitle {
  jobTitleId?: string;
  title: string;
  departmentName: string;
  description: string;
  seniority: string;

  constructor() {
    this.jobTitleId = '';
    this.title = '';
    this.departmentName = '';
    this.description = '';
    this.seniority = '';
  }
}export class JobTitleDto {
  jobTitleId?: number;
  title: string;
  departmentName: string;
  description: string;
  seniority: string;

  constructor() {
    this.jobTitleId = undefined;
    this.title = '';
    this.departmentName = '';
    this.description = '';
    this.seniority = '';
  }
}