import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClientService } from '../../../services/hr/clients.service';
import { DrawerFormComponent } from '../../../shared/components/drawer-form/drawer-form.component';
import { GenericTableComponent } from '../../../shared/components/generic-table/generic-table.component';
import { FormField } from '../../../shared/models/form-field.model';

@Component({
  selector: 'app-clients',
  standalone: true,
  imports: [
    CommonModule,
    DrawerFormComponent,
    GenericTableComponent
  ],
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.css']
})
export class ClientsComponent implements OnInit {

  // ================= DATA =================
  clients: any[] = [];

  clientService = inject(ClientService);

  // ================= DRAWER =================
  showDrawer = false;
  selectedClient: any = {};
  mode: 'create' | 'update' = 'create';

  // ================= TABLE CONFIG =================
  clientColumns = [
    { key: 'clientName', label: 'Client Name' },
    { key: 'email', label: 'Email' },
    { key: 'phone', label: 'Phone' },
    { key: 'fax', label: 'Fax' }
  ];

  // ================= FORM CONFIG =================
  clientFields: FormField[] = [
    { key: 'clientName', label: 'Client Name', type: 'text' },
    { key: 'email', label: 'Email', type: 'email' },
    { key: 'phone', label: 'Phone', type: 'text' },
    { key: 'fax', label: 'Fax', type: 'text' }
  ];

  ngOnInit(): void {
    this.loadClients();
  }

  loadClients(): void {
    this.clientService.getAll().subscribe(data => {
      this.clients = data;
    });
  }

  // ================= ACTIONS =================

  createClient(): void {
    this.mode = 'create';
    this.selectedClient = {};
    this.showDrawer = true;
  }

  editClient(client: any): void {
    this.mode = 'update';
    this.selectedClient = { ...client };
    this.showDrawer = true;
  }

  saveClient(client: any): void {
    this.clientService.create(client).subscribe(newClient => {
      this.clients.push(newClient);
      this.showDrawer = false;
    });
    this.showDrawer = false;
  }

  deleteClient(client: any): void {
    console.log('DELETE:', client);

    this.clients = this.clients.filter(c => c !== client);

    this.showDrawer = false;
  }
}