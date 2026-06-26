export const GenderOptions = [
  'Female',
  'Male'
] as const;

export type Gender = typeof GenderOptions[number];

