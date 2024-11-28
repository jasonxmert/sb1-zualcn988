import { Landmark } from '../types/landmarks';

const landmarksByCountry: Record<string, Landmark[]> = {
  TR: [
    {
      id: 'tr1',
      name: 'Hagia_Sophia',
      description: 'Historic mosque and former church in Istanbul',
      imageUrl: 'https://images.unsplash.com/photo-1636788471324-ce2eb19c4856?w=800'
    },
    {
      id: 'tr2',
      name: 'Blue_Mosque',
      description: 'Historic mosque in Istanbul',
      imageUrl: 'https://images.unsplash.com/photo-1641128324972-af3212f0f6bd?w=800'
    },
    {
      id: 'tr3',
      name: 'Topkapi_Palace',
      description: 'Ottoman-era palace in Istanbul',
      imageUrl: 'https://images.unsplash.com/photo-1584659545355-f07f6ed6ef2f?w=800'
    },
    {
      id: 'tr4',
      name: 'Grand_Bazaar',
      description: 'Historic covered market in Istanbul',
      imageUrl: 'https://images.unsplash.com/photo-1632744592415-ca3d6571dd56?w=800'
    },
    {
      id: 'tr5',
      name: 'Cappadocia',
      description: 'Famous for its unique rock formations',
      imageUrl: 'https://images.unsplash.com/photo-1642419032587-5ec50c39c54e?w=800'
    },
    {
      id: 'tr6',
      name: 'Ephesus',
      description: 'Ancient Greek city ruins near Izmir',
      imageUrl: 'https://images.unsplash.com/photo-1564088418107-5e68c53be03a?w=800'
    },
    {
      id: 'tr7',
      name: 'Pamukkale',
      description: 'Natural travertine terraces',
      imageUrl: 'https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?w=800'
    },
    {
      id: 'tr8',
      name: 'Anıtkabir',
      description: 'Mausoleum of Mustafa Kemal Atatürk in Ankara',
      imageUrl: 'https://images.unsplash.com/photo-1589831063344-8174848607bc?w=800'
    }
  ],
  GB: [
    {
      id: 'gb1',
      name: 'Big_Ben',
      description: 'Iconic clock tower in London',
      imageUrl: 'https://images.unsplash.com/photo-1529655683826-aba9b3e77383?w=800'
    },
    {
      id: 'gb2',
      name: 'Tower_Bridge',
      description: 'Famous bridge over the River Thames',
      imageUrl: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=800'
    },
    {
      id: 'gb3',
      name: 'Stonehenge',
      description: 'Prehistoric monument in Wiltshire',
      imageUrl: 'https://images.unsplash.com/photo-1564598519389-dfb9e69bf836?w=800'
    }
  ],
  FR: [
    {
      id: 'fr1',
      name: 'Eiffel_Tower',
      description: 'Iconic iron lattice tower in Paris',
      imageUrl: 'https://images.unsplash.com/photo-1511739001486-6bfe10ce785f?w=800'
    },
    {
      id: 'fr2',
      name: 'Palace_of_Versailles',
      description: 'Royal château in Versailles',
      imageUrl: 'https://images.unsplash.com/photo-1591289009723-aef022f0c272?w=800'
    },
    {
      id: 'fr3',
      name: 'Mont_Saint-Michel',
      description: 'Island commune in Normandy',
      imageUrl: 'https://images.unsplash.com/photo-1596394723269-b2cbca4e6313?w=800'
    }
  ],
  IT: [
    {
      id: 'it1',
      name: 'Colosseum',
      description: 'Ancient Roman amphitheater',
      imageUrl: 'https://images.unsplash.com/photo-1552832230-c0197dd311b5?w=800'
    },
    {
      id: 'it2',
      name: 'Venice_Canals',
      description: 'Historic canal network in Venice',
      imageUrl: 'https://images.unsplash.com/photo-1523906834658-6e24ef2386f9?w=800'
    },
    {
      id: 'it3',
      name: 'Leaning_Tower_of_Pisa',
      description: 'Famous leaning bell tower',
      imageUrl: 'https://images.unsplash.com/photo-1522918448933-b33e408a411a?w=800'
    }
  ]
};

export function getLandmarksByCountry(countryCode: string): Landmark[] {
  if (!countryCode) return [];
  
  const code = countryCode.toUpperCase();
  const landmarks = landmarksByCountry[code];
  
  if (!landmarks) {
    // Return default landmarks for the continent if country-specific ones aren't available
    const continentDefaults = {
      EU: landmarksByCountry.FR,
      AS: landmarksByCountry.TR, // Changed to Turkey for Asian defaults
      NA: landmarksByCountry.US,
      SA: landmarksByCountry.BR,
      AF: landmarksByCountry.EG,
      OC: landmarksByCountry.AU
    };
    
    // Determine continent based on country code
    const continentMap: Record<string, string[]> = {
      EU: ['GB', 'FR', 'DE', 'IT', 'ES', 'PT', 'NL', 'BE', 'CH', 'AT', 'SE', 'NO', 'DK', 'FI', 'PL'],
      AS: ['TR', 'CN', 'JP', 'KR', 'IN', 'TH', 'VN', 'SG', 'MY', 'ID'],
      NA: ['US', 'CA', 'MX'],
      SA: ['BR', 'AR', 'CO', 'PE', 'CL'],
      AF: ['EG', 'ZA', 'MA', 'KE', 'NG'],
      OC: ['AU', 'NZ']
    };
    
    const continent = Object.entries(continentMap)
      .find(([_, countries]) => countries.includes(code))?.[0];
    
    return continent ? (continentDefaults[continent as keyof typeof continentDefaults] || []) : [];
  }
  
  return landmarks;
}