export class Client {
  id?: number;
  clientName: string;
  phone: string;
  fax: string;
  email: string;

  constructor() {
    this.id = undefined;
    this.clientName = '';
    this.phone = '';
    this.fax = '';
    this.email = '';
  }
}
export class ClientDetailsDto {
  id: number;
  clientName: string;
  email: string;
  phone: string;
  fax: string;
  departmentId: number;
  departmentName: string;
  projectNames: string[];

  constructor() {
    this.id = 0;
    this.clientName = '';
    this.email = '';
    this.phone = '';
    this.fax = '';
    this.departmentId = 0;
    this.departmentName = '';
    this.projectNames = [];
  }
}