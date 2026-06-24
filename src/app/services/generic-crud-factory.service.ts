import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { BaseEntity } from '../core/Constant/baseEntity';
import { GenericCrudService } from './generic.service';

@Injectable({
  providedIn: 'root' 
})
export class GenericCrudFactoryService {
  private http = inject(HttpClient);

  create<T extends BaseEntity>(endpoint: string): GenericCrudService<T> {
    return new GenericCrudService<T>(this.http, endpoint);
  }
}