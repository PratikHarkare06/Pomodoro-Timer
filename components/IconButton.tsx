
import React from 'react';

interface IconButtonProps {
  icon: React.FC<React.SVGProps<SVGSVGElement>>;
  label: string; // Visual label, can be empty
  ariaLabel?: string; // Explicit ARIA label for accessibility
  ariaHasPopup?: 'dialog' | 'menu' | 'listbox' | 'tree' | 'grid' | boolean; // Added for accessibility
  ariaExpanded?: boolean; // Added for accessibility
  bgColor: string;
  iconColor: string;
  onClick: () => void;
  className?: string;
  style?: React.CSSProperties; // Added for inline styles for border color
}

const IconButton: React.FC<IconButtonProps> = ({ icon: Icon, label, ariaLabel, ariaHasPopup, ariaExpanded, bgColor, iconColor, onClick, className, style }) => {
  return (
    <button
      onClick={onClick}
      className={`
        flex flex-col items-center justify-center p-3 sm:p-4 rounded-xl shadow-md
        transition-transform duration-200 active:scale-95
        ${bgColor} ${className}
      `}
      style={style} // Apply inline styles
      aria-label={ariaLabel || label} // Use explicit ariaLabel if provided, otherwise fallback to visual label
      aria-haspopup={ariaHasPopup}
      aria-expanded={ariaExpanded}
    >
      <Icon className={`w-8 h-8 sm:w-10 sm:h-10`} style={{ color: iconColor }} /> {/* Apply iconColor directly */}
      {label && ( // Only render text label if it's not empty
        <span className="text-sm sm:text-base font-semibold mt-1 text-center leading-tight" style={{ color: iconColor }}>
          {label}
        </span>
      )}
    </button>
  );
};

export default IconButton;
