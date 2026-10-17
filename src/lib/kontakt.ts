/** "0152 – 044 85 100" → "tel:+4915204485100" */
export function tel(nummer: string): string {
  const ziffern = nummer.replace(/\D/g, '');
  return `tel:+49${ziffern.replace(/^0/, '')}`;
}
