import { Gender, GenderOptions } from './../enums/gender';
export class User {
  id?: any;
  firstName: string;
  lastName: string;
  email: string;
  username: string;
  phoneNumber?: string | null;
  salary?: string | null;
  gender?: Gender | null;
  roles: string[];

  constructor() {
    this.id = undefined;
    this.firstName = '';
    this.lastName = '';
    this.email = '';
    this.username = '';
    this.phoneNumber = null;
    this.gender = this.gender;
    this.roles = [];
    this.salary = null;   }
}

// DTO without id and createdAt
export class UserDto {
  departmentId?: number | null;
  jobTitleId?: number | null;
  teamId?: number | null;
  firstName: string;
  lastName: string;
  email: string;
  username: string;
  phoneNumber?: string | null;
  salary?: string | null;
  jobTitle?: string | null;
  gender?: string | null;
  roles: string[];
  
  constructor() {
    this.departmentId = null;
    this.jobTitleId = null;
    this.teamId = null;
    this.jobTitle = null;
    this.salary = null;
    this.gender = null;
    this.roles = [];
    this.firstName = '';
    this.lastName = '';
    this.email = '';
    this.username = '';
    this.phoneNumber = null;
    this.salary = '';
    this.gender = null;
    this.roles = [];
  }

  
}export interface UpdateUserDetailsDto {
  firstName: string;
  lastName: string;
  gender: string;
  jobTitleId: number;
  teamId?: number | null;
  seniority?: string | null;
  salary?: number | null;
  phonenumber: string;
}