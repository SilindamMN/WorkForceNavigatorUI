export class LeaveAllocation {
  id?: any;
  numberOfDays: number;
  username: string;
  leaveName: string;
  firstName: string;
  lastName: string;

  constructor() {
    this.id = undefined;
    this.numberOfDays = 0;
    this.username = '';
    this.leaveName = '';
    this.firstName = '';
    this.lastName = '';
  }
}

// DTO without id
export class LeaveAllocationDto {
  numberOfDays: number;
  username: string;
  leaveName: string;
  firstName: string;
  lastName: string;

  constructor() {
    this.numberOfDays = 0;
    this.username = '';
    this.leaveName = '';
    this.firstName = '';
    this.lastName = '';
  }
}