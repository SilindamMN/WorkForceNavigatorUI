import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface OptionalButton {
  label: string;
  action: string;
}

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
  @Input() pageSize = 10;

  @Input() optionalButtons: OptionalButton[] = [];

  @Output() create = new EventEmitter<void>();
  @Output() rowClick = new EventEmitter<any>();
  @Output() optionalButtonClick = new EventEmitter<OptionalButton>();

  page = 1;

  get pagedData(): any[] {
    const start = (this.page - 1) * this.pageSize;
    return this.data.slice(start, start + this.pageSize);
  }

  get totalPages(): number {
    return Math.ceil(this.data.length / this.pageSize);
  }

  get pages(): number[] {
    return Array.from({ length: this.totalPages }, (_, i) => i + 1);
  }

  changePage(page: number): void {
    if (page < 1 || page > this.totalPages) return;
    this.page = page;
  }

  onCreate(): void {
    this.create.emit();
  }

  onRowClick(row: any): void {
    this.rowClick.emit(row);
  }

  onOptionalButtonClick(button: OptionalButton): void {
    this.optionalButtonClick.emit(button);
  }
}