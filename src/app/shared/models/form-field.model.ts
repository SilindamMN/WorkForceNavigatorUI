export interface FormField {
  key: string;
  label: string;
  type: 'text' | 'email' | 'number' | 'textarea' | 'dropdown';

  options?: any[];        
  optionValue?: string;   
  optionLabel?: string;   
}