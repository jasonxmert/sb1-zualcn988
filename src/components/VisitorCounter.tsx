import React from 'react';
import { useVisitorCount } from '../hooks/useVisitorCount';

export function VisitorCounter() {
  const { count, error } = useVisitorCount();

  if (error) {
    return null;
  }

  if (count === null) {
    return (
      <div className="text-sm text-gray-400">
        Loading visitors...
      </div>
    );
  }

  return (
    <div className="text-sm text-gray-400">
      Visitors: {count.toLocaleString()}
    </div>
  );
}