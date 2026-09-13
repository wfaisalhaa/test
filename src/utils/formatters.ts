import { Currency } from '../types';
import { CURRENCY_RATES } from '../data/mockData';

export function formatPrice(amount: number, currency: Currency = 'SAR'): string {
  if (amount === 0) return 'مجاناً';
  const config = CURRENCY_RATES[currency] || CURRENCY_RATES.SAR;
  const converted = amount * config.rate;
  
  if (currency === 'USD') {
    return `$${Math.round(converted)}`;
  }
  return `${Math.round(converted).toLocaleString('ar-SA')} ${config.symbol}`;
}

export function calculateDiscountPercentage(price: number, originalPrice?: number): number | null {
  if (!originalPrice || originalPrice <= price) return null;
  return Math.round(((originalPrice - price) / originalPrice) * 100);
}
