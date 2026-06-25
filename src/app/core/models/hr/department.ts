export class Department {
  id?: number;
  departmentName: string;
  description: string;

  constructor() {
    this.id = undefined;
    this.departmentName = '';
    this.description = '';
  }
}

// DTO without id
export class DepartmentDto {
  departmentName: string;
  description: string;

  constructor() {
    this.departmentName = '';
    this.description = '';
  }
}