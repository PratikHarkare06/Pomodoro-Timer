import React from 'react';
import { APP_COLORS } from '../constants'; // Import APP_COLORS

interface DashedCrosshairProps {
  color?: string;
}

const DashedCrosshair: React.FC<DashedCrosshairProps> = ({ color = APP_COLORS.TEXT_GRAY_MEDIUM }) => { // Default to APP_COLORS.TEXT_GRAY_MEDIUM
  return (
    <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
      {/* Horizontal line */}
      <line x1="0" y1="50" x2="100" y2="50" stroke={color} strokeDasharray="3,3" strokeWidth="1" />
      {/* Vertical line */}
      <line x1="50" y1="0" x2="50" y2="100" stroke={color} strokeDasharray="3,3" strokeWidth="1" />
    </svg>
  );
};

export default DashedCrosshair;