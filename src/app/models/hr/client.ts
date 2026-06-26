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