export class User {
  id?: any;
  firstName: string;
  lastName: string;
  email: string;
  username: string;
  createdAt?: string;
  phoneNumber?: string | null;
  gender?: string | null;
  roles: string[];

  constructor() {
    this.id = undefined;
    this.firstName = '';
    this.lastName = '';
    this.email = '';
    this.username = '';
    this.createdAt = undefined;
    this.phoneNumber = null;
    this.gender = null;
    this.roles = [];
  }
}

// DTO without id and createdAt
export class UserDto {
  firstName: string;
  lastName: string;
  email: string;
  username: string;
  phoneNumber?: string | null;
  gender?: string | null;
  roles: string[];

  constructor() {
    this.firstName = '';
    this.lastName = '';
    this.email = '';
    this.username = '';
    this.phoneNumber = null;
    this.gender = null;
    this.roles = [];
  }
}