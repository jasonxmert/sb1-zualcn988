import React from 'react';
import { Location } from '../types/location';
import { InteractiveMap } from './InteractiveMap';
import { LandmarksSlideshow } from './LandmarksSlideshow';
import { Ads } from './Ads';

interface MapComponentProps {
  selectedLocation: Location | null;
}

export function MapComponent({ selectedLocation }: MapComponentProps) {
  return (
    <div className="flex-1 container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto space-y-12">
        <InteractiveMap selectedLocation={selectedLocation} />
        <div className="h-[250px] w-full">
          <Ads position="bottom" />
        </div>
        <LandmarksSlideshow location={selectedLocation} />
      </div>
    </div>
  );
}