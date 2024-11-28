import { Landmark } from '../types/landmarks';

export const europeanLandmarks: Record<string, Landmark[]> = {
  // Content remains the same as before...
};

// Helper function to get landmarks by country code
export function getLandmarksByCountry(countryCode: string): Landmark[] {
  if (!countryCode) return [];
  
  const upperCode = countryCode.toUpperCase();
  return europeanLandmarks[upperCode] || [];
}

// Helper function to get continent based on country code
export function getContinent(countryCode: string): string {
  const northernEurope = ['GB', 'IE', 'NO', 'SE', 'FI', 'DK', 'IS'];
  const westernEurope = ['FR', 'DE', 'NL', 'BE', 'CH', 'AT', 'LU'];
  const southernEurope = ['IT', 'ES', 'PT', 'GR', 'MT', 'VA', 'SM'];
  const easternEurope = ['PL', 'CZ', 'HU', 'RO', 'BG', 'SK', 'HR', 'SI'];

  const upperCode = countryCode.toUpperCase();

  if (northernEurope.includes(upperCode)) return 'Northern Europe';
  if (westernEurope.includes(upperCode)) return 'Western Europe';
  if (southernEurope.includes(upperCode)) return 'Southern Europe';
  if (easternEurope.includes(upperCode)) return 'Eastern Europe';

  return 'Other';
}