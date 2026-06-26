import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GenericCrudService } from '../generic.service';
import { User } from '../../models/hr/user';

@Injectable({ providedIn: 'root' })
export class UsersService extends GenericCrudService<User> {
  constructor(http: HttpClient) {
    super(http, 'Auth/');
  }
}