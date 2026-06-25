import { Component, EventEmitter, Input, Output, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-drawer-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './drawer-form.component.html',
  styleUrls: ['./drawer-form.component.css']
})
export class DrawerFormComponent implements OnChanges {
changePage(arg0: number) {
throw new Error('Method not implemented.');
}

  @Input() isOpen = false;
  @Input() mode: 'create' | 'update' = 'create';
  @Input() title = '';

  @Input() fields: any[] = [];
  @Input() model: any = {};

  @Output() saved = new EventEmitter<any>();
  @Output() updated = new EventEmitter<any>();
  @Output() deleted = new EventEmitter<any>();
  @Output() closed = new EventEmitter<void>();

  formData: any = {};

  ngOnChanges(changes: SimpleChanges): void {

    // ONLY reset form when model actually changes
    if (changes['model'] && this.model) {
      this.formData = { ...this.model };
    }

    // initialize empty form for create mode
    if (this.mode === 'create' && !this.model) {
      this.formData = {};
    }
  }

  save(): void {
    this.saved.emit(this.formData);
  }

  update(): void {
    this.updated.emit(this.formData);
  }

  delete(): void {
    this.deleted.emit(this.formData);
  }

  close(): void {
    this.closed.emit();
  }
}