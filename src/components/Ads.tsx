import React from 'react';

interface AdsProps {
  position: 'left' | 'right' | 'bottom';
}

export function Ads({ position }: AdsProps) {
  return (
    <div className="w-full h-full" />
  );
}