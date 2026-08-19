import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Client, ClientDetailsDto } from '../../models/hr/client';
import { GenericCrudService } from '../generic.service';

@Injectable({ providedIn: 'root' })
export class ClientService extends GenericCrudService<Client> {
  constructor(http: HttpClient) {
    super(http, 'clients');
  }
   getClientById(clientId: number) {
      return this.http.get<ClientDetailsDto[]>(
        `${this.baseUrl}/${clientId}`
      );
    }
}