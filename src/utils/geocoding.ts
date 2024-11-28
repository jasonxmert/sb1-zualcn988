import { SearchResult } from '../types/location';

const NOMINATIM_API = 'https://nominatim.openstreetmap.org';
const RATE_LIMIT_MS = 1000;
let lastRequestTime = 0;

async function waitForRateLimit() {
  const timeSinceLastRequest = Date.now() - lastRequestTime;
  if (timeSinceLastRequest < RATE_LIMIT_MS) {
    await new Promise(resolve => setTimeout(resolve, RATE_LIMIT_MS - timeSinceLastRequest));
  }
  lastRequestTime = Date.now();
}

export async function searchLocation(query: string): Promise<SearchResult[]> {
  try {
    await waitForRateLimit();
    const params = new URLSearchParams({
      format: 'json',
      q: query,
      addressdetails: '1',
      limit: '5'
    });

    const response = await fetch(`${NOMINATIM_API}/search?${params}`, {
      headers: { 'User-Agent': 'PostcodeSearchApp/1.0' }
    });

    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    return await response.json();
  } catch (error) {
    console.error('Search error:', error);
    return [];
  }
}

export async function reverseGeocode(lat: number, lon: number): Promise<SearchResult | null> {
  try {
    await waitForRateLimit();
    const params = new URLSearchParams({
      format: 'json',
      lat: lat.toString(),
      lon: lon.toString(),
      addressdetails: '1'
    });

    const response = await fetch(`${NOMINATIM_API}/reverse?${params}`, {
      headers: { 'User-Agent': 'PostcodeSearchApp/1.0' }
    });

    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    return await response.json();
  } catch (error) {
    console.error('Reverse geocoding error:', error);
    return null;
  }
}

export function getTimezone(lat: number, lon: number): string {
  const offset = Math.round(lon / 15);
  const sign = offset >= 0 ? '+' : '-';
  const hours = Math.abs(offset).toString().padStart(2, '0');
  return `UTC${sign}${hours}:00`;
}

export function getCurrency(countryCode: string): string {
  const currencies: Record<string, string> = {
    US: 'USD', GB: 'GBP', EU: 'EUR', JP: 'JPY',
    CN: 'CNY', AU: 'AUD', CA: 'CAD', CH: 'CHF'
  };
  return currencies[countryCode] || 'USD';
}