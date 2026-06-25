export interface FormField {
  key: string;
  label: string;
  type: 'text' | 'email' | 'number' | 'textarea' | 'dropdown';

  // optional for dropdowns
  options?: { text: string; value: any }[];
}