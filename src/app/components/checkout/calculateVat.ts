export function calculeVat(total: number): number {
    const taxRate = 0.23;
    const totalWithVat = total * (1 + taxRate);
    return totalWithVat < 0 ? 0 : totalWithVat;
  }