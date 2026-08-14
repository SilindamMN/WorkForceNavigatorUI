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
@Input() customContent: any;
  @Input() isOpen = false;
  @Input() mode: 'create' | 'update' = 'create';
  @Input() title = '';
  @Input() fields: any[] = [];
  @Input() model: any = {};
  @Input() hideUpdate = false;
  @Input() hideDelete = false;
  @Input() customButtons: {
  label: string;
  action: string;
  class?: string;
}[] = [];
@Output() customButtonClick = new EventEmitter<{
  action: string;
  data: any;
}>();

onCustomButtonClick(action: string): void {
  this.customButtonClick.emit({
    action,
    data: this.formData
  });
}

  @Output() saved = new EventEmitter<any>();
  @Output() updated = new EventEmitter<any>();
  @Output() deleted = new EventEmitter<any>();
  @Output() closed = new EventEmitter<void>();
  @Output() fieldChange = new EventEmitter<{ key: string; value: any }>();

  formData: any = {};
  isMultiple = false;

ngOnChanges(changes: SimpleChanges): void {
  if (changes['model'] || (changes['isOpen'] && this.isOpen)) {
    this.isMultiple = Array.isArray(this.model);
    this.formData = this.isMultiple
      ? this.model.map((m: any) => this.normalizeDates({ ...m }))
      : this.normalizeDates({ ...this.model });
  }
}

private normalizeDates(data: any): any {
  this.fields
    .filter(field => field.type === 'date')
    .forEach(field => {
      const value = data[field.key];
      if (value) {
        data[field.key] = value.split('T')[0];
      }
    });
  return data;
}

 onFieldChange(key: string, value: any, index?: number): void {
  const target = this.isMultiple ? this.formData[index!] : this.formData;
  target[key] = value;

  const field = this.fields.find(f => f.key === key);
  field?.resetFields?.forEach((resetKey: string) => {
    target[resetKey] = null;
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
  update(): void { this.updated.emit(this.formData); console.log('Updated data:', this.formData); }
  delete(): void { this.deleted.emit(this.formData); }
  close(): void { this.closed.emit(); }
}