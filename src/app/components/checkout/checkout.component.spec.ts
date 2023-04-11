import {calculeVat} from './calculateVat'; 

describe('calculeVat', () => {
  it("should return 0 if the input is negative", () => {
    const result = calculeVat(-1);
    expect(result).toBe(0);
  });
  
  it("should calculate VAT for positive inputs", () => {
    const result = calculeVat(100);
    expect(result).toBeCloseTo(123, 2); // expect 23% VAT to be added to the total
  });
});
