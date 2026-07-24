import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Client } from '../../models/hr/client';
import { GenericCrudService } from '../generic.service';

@Injectable({ providedIn: 'root' })
export class ClientService extends GenericCrudService<Client> {
  constructor(http: HttpClient) {
    super(http, 'clients');
  }
}