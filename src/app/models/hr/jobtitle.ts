export class JobTitle {
  id?: any;
  title: string;
  departmentName: string;
  description: string;
  seniority: string;

  constructor() {
    this.id = undefined;
    this.title = '';
    this.departmentName = '';
    this.description = '';
    this.seniority = '';
  }
}export class JobTitleDto {
  title: string;
  departmentName: string;
  description: string;
  seniority: string;

  constructor() {
    this.title = '';
    this.departmentName = '';
    this.description = '';
    this.seniority = '';
  }
}