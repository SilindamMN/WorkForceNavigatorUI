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

  @Input() isOpen = false;
  @Input() mode: 'create' | 'update' = 'create';
  @Input() title = '';
  @Input() fields: any[] = [];
  @Input() model: any = {};

  @Output() saved = new EventEmitter<any>();
  @Output() updated = new EventEmitter<any>();
  @Output() deleted = new EventEmitter<any>();
  @Output() closed = new EventEmitter<void>();
  @Output() fieldChange = new EventEmitter<{ key: string; value: any }>();

  formData: any = {};

  ngOnChanges(changes: SimpleChanges): void {
  if (changes['isOpen'] && this.isOpen) {
    this.formData = this.model ? { ...this.model } : {};
  }
}

 onFieldChange(key: string, value: any): void {
  this.formData[key] = value;

  const field = this.fields.find(f => f.key === key);
  field?.resetFields?.forEach((resetKey: string) => {
    this.formData[resetKey] = null;
  });

  this.fieldChange.emit({ key, value });
}

  // NEW: resolve the value to bind/send, based on field.optionValue
  getOptionValue(field: any, opt: any): any {
    if (opt === null || opt === undefined) return opt;
    if (typeof opt === 'object') {
      return field.optionValue ? opt[field.optionValue] : opt.value ?? opt.id;
    }
    return opt; // plain string/number option
  }

  // NEW: resolve the display label, based on field.optionLabel
  getOptionLabel(field: any, opt: any): any {
    if (opt === null || opt === undefined) return '';
    if (typeof opt === 'object') {
      return field.optionLabel ? opt[field.optionLabel] : opt.label ?? opt.name;
    }
    return opt; // plain string/number option
  }

  save(): void { this.saved.emit(this.formData); }
  update(): void { this.updated.emit(this.formData); }
  delete(): void { this.deleted.emit(this.formData); }
  close(): void { this.closed.emit(); }
}