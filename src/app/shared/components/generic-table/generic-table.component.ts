import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-generic-table',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './generic-table.component.html',
  styleUrls: ['./generic-table.component.css']
})
export class GenericTableComponent {

  @Input() data: any[] = [];
  @Input() columns: { key: string; label: string }[] = [];
  @Input() pageSize = 12;

  // pagination
  page = 1;

  // core events
  @Output() rowClick = new EventEmitter<any>();
  @Output() create = new EventEmitter<void>();

  // action events (scalable → 11+ supported)
  @Output() edit = new EventEmitter<any>();
  @Output() delete = new EventEmitter<any>();

  get pagedData(): any[] {
    const start = (this.page - 1) * this.pageSize;
    return this.data.slice(start, start + this.pageSize);
  }

  get totalPages(): number {
    return Math.ceil(this.data.length / this.pageSize);
  }

  get pages(): number[] {
    return Array(this.totalPages).fill(0).map((_, i) => i + 1);
  }

  changePage(p: number): void {
    if (p < 1 || p > this.totalPages) return;
    this.page = p;
  }

  // events
  onRowClick(row: any): void {
    this.rowClick.emit(row);
  }

  onCreate(): void {
    this.create.emit();
  }

  onEdit(row: any, event: Event): void {
    event.stopPropagation();
    this.edit.emit(row);
  }

  onDelete(row: any, event: Event): void {
    event.stopPropagation();
    this.delete.emit(row);
  }
}