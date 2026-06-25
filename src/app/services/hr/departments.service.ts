import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GenericCrudService } from '../generic.service';
import { Department } from '../../core/models/hr/department';

@Injectable({
  providedIn: 'root'
})
export class DepartmentsService extends GenericCrudService<Department> {

  constructor(http: HttpClient) {
    super(http,'Department');
  }
}