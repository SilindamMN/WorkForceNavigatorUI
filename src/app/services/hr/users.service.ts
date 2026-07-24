import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GenericCrudService } from '../generic.service';
import { UpdateUserDetailsDto, User } from '../../models/hr/user';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class UsersService extends GenericCrudService<User> {
  constructor(http: HttpClient) {
    super(http, 'users');
  }
 updateUserDetails(username: string, departmentId: number, dto: UpdateUserDetailsDto): Observable<UpdateUserDetailsDto> {
  return this.http.put<UpdateUserDetailsDto>(
    `${this.baseUrl}update?updateUsername=${username}&departmentId=${departmentId}`,
    dto
  );
}
}