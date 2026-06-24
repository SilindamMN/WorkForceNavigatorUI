import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClientService } from '../../../services/hr/clients.service';
import { Client } from '../../../core/models/hr/client';

@Component({
  selector: 'app-clients',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './clients.component.html',
  styleUrl: './clients.component.css'
})
export class ClientsComponent implements OnInit {

  clients: Client[] = [];
  pagedClients: Client[] = [];

  page = 1;
  pageSize = 12;
  collectionSize = 0;

  selectedClient: Client | null = null;

  clientService = inject(ClientService);

  ngOnInit(): void {
    this.loadClients();
  }

  loadClients(): void {
    this.clientService.getAll().subscribe({
      next: (data) => {
        this.clients = data;
        this.collectionSize = data.length;
        this.refreshClients();
      },
      error: (err) => console.error(err)
    });
  }

  refreshClients(): void {
    const start = (this.page - 1) * this.pageSize;
    const end = start + this.pageSize;
    this.pagedClients = this.clients.slice(start, end);
  }

  changePage(p: number): void {
    this.page = p;
    this.refreshClients();
  }

  openClient(client: Client): void {
    this.selectedClient = client;
  }

  closePanel(): void {
    this.selectedClient = null;
  }

  get totalPages(): number {
    return Math.ceil(this.collectionSize / this.pageSize);
  }

  get pages(): number[] {
    return Array(this.totalPages).fill(0).map((_, i) => i + 1);
  }
}