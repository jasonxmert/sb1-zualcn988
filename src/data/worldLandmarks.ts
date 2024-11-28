import { Landmark } from '../types/landmarks';

const worldLandmarks: Record<string, Landmark[]> = {
  GB: [
    {
      id: 'gb1',
      name: 'Big_Ben',
      description: 'Iconic clock tower in London',
      imageUrl: 'https://images.unsplash.com/photo-1529655683826-aba9b3e77383?w=800'
    }
  ],
  FR: [
    {
      id: 'fr1',
      name: 'Eiffel_Tower',
      description: 'Iconic iron lattice tower in Paris',
      imageUrl: 'https://images.unsplash.com/photo-1511739001486-6bfe10ce785f?w=800'
    }
  ],
  IT: [
    {
      id: 'it1',
      name: 'Colosseum',
      description: 'Ancient Roman amphitheater',
      imageUrl: 'https://images.unsplash.com/photo-1552832230-c0197dd311b5?w=800'
    }
  ]
};

const continentDefaults: Record<string, string> = {
  Europe: 'FR',
  Asia: 'CN',
  Americas: 'US',
  Africa: 'EG',
  Oceania: 'AU'
};

const continentMap: Record<string, string[]> = {
  Europe: ['GB', 'FR', 'DE', 'IT', 'ES', 'PT', 'NL'],
  Asia: ['CN', 'JP', 'KR', 'IN', 'TH', 'VN'],
  Americas: ['US', 'CA', 'MX', 'BR', 'AR'],
  Africa: ['EG', 'ZA', 'MA', 'KE', 'NG'],
  Oceania: ['AU', 'NZ']
};

export function getLandmarksByCountry(countryCode: string): Landmark[] {
  if (!countryCode) return [];
  const code = countryCode.toUpperCase();
  return worldLandmarks[code] || getDefaultLandmarks(code);
}

function getDefaultLandmarks(code: string): Landmark[] {
  const continent = Object.entries(continentMap)
    .find(([_, codes]) => codes.includes(code))?.[0];
  return continent ? worldLandmarks[continentDefaults[continent]] || [] : [];
}