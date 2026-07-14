export interface FormField {
  key: string;
  label: string;
  type: 'text' | 'email' | 'number' | 'textarea' | 'dropdown' | 'date' | 'checkbox' | 'radio' | 'password' | 'file';

  options?: any[];        
  optionValue?: string;   
  optionLabel?: string;   
}