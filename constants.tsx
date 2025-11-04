
import React from 'react';

export const DEFAULT_FOCUS_TIME_MINUTES = 25; // Default 25 minutes
export const DEFAULT_BREAK_TIME_MINUTES = 5; // Default 5 minutes

// export const PIZZA_FULL_IMAGE_URL = '/images/full_pizza.png'; // Removed: Pizza is now entirely SVG-rendered

export const APP_COLORS = {
  // Background
  BACKGROUND_BEIGE_LIGHT: '#F2E6CF', // Light pastel beige, matching the grid background
  // Note: The subtle grid line background from the original image cannot be replicated
  // using only Tailwind CSS utility classes without inline styles or complex structures,
  // which are prohibited by the prompt. A solid background color is used instead.

  // Window
  WINDOW_HEADER_GREEN: '#A2B88E', // Sage green pastel
  WINDOW_BODY_OFF_WHITE: '#FFF8EF', // Creamy off-white for main card body
  WINDOW_BORDER: '#E5D7BF', // Light brown for card border

  // Header Circles (used for simple design elements, now matching the palette)
  CIRCLE_RED: '#FFCAD4', // Soft blush pink
  CIRCLE_YELLOW: '#FBE8A0', // Soft pastel yellow
  CIRCLE_GREEN: '#A2B88E', // Matching header green

  // Text
  TEXT_DARK_BROWN: '#3C3A2E', // Soft dark brown
  TEXT_BLACKISH: '#1E1C18', // Even darker brown for timer numbers
  TEXT_GRAY_MEDIUM: '#6B665B', // Muted gray for session info
  TEXT_LIGHT_GRAY: '#8A8378', // Even lighter gray for reset session label

  // Progress Bar
  PROGRESS_BAR_BACKGROUND: '#E9E0D3', // Light beige
  PROGRESS_BAR_FILL: '#F1A4BE', // Blush pink

  // Buttons
  BUTTON_PAUSE_BG: '#5C4B8A', // Dark purple
  BUTTON_PAUSE_BORDER_GLOW: '#B9ACD1', // Pastel purple for border glow
  BUTTON_RESET_BG: '#D7D0C7', // Muted light gray for reset button
  BUTTON_RESET_BORDER: '#BFB6AA', // Slightly darker muted gray for reset button border

  // Icon Buttons (Settings, How To Use)
  ICON_SETTINGS_BG: '#D9E0C9', // Lighter sage green
  ICON_SETTINGS_BORDER: '#C5CFB1', // Slightly darker sage green for border
  ICON_HOW_TO_USE_BG: '#E8C5C5', // Blush pink
  ICON_HOW_TO_USE_BORDER: '#D1AAAA', // Slightly darker blush pink for border

  // Pizza colors (only keeping plate, crust, and progress stroke)
  PIZZA_PLATE_SHADOW: '#EFE5D7',
  PIZZA_CRUST: '#F3D6A2',
  PIZZA_SLICE_FILL: '#FFCAD4', // Color for uneaten slices
  PIZZA_EATEN_FILL: '#D7D0C7', // New color for eaten slices (muted light gray)
  PIZZA_CROSSHAIR: '#C8B9A0', // Beige for the crosshair

  // Confetti Colors
  CONFETTI_COLOR_1: '#FFD1DC', // Pastel Pink
  CONFETTI_COLOR_2: '#A2D4AB', // Soft Green
  CONFETTI_COLOR_3: '#FFF3B0', // Light Yellow
  CONFETTI_COLOR_4: '#C9EEFF', // Light Blue
  CONFETTI_COLOR_5: '#DDA0DD', // Plum
};

// SVG Icons (from CutePomodoro, with strokeWidth 1.5 for hand-drawn feel)
export const GearIcon: React.FC<React.SVGProps<SVGSVGElement>> = ({ className = '', ...props }) => (
  <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.5" {...props}>
    <path d="M12 8.5a3.5 3.5 0 1 1 0 7 3.5 3.5 0 0 1 0-7Z" />
    <path d="M12 2v3M12 19v3M3.6 6.4l2.1 2.1M18.3 17.6l2.1 2.1M2 12h3M19 12h3M6.4 20.4l2.1-2.1M17.6 5.7l2.1-2.1" />
  </svg>
);

export const LightbulbIcon: React.FC<React.SVGProps<SVGSVGElement>> = ({ className = '', ...props }) => (
  <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.5" {...props}>
    <path d="M8 17h8M9 20h6" />
    <path d="M12 2a7 7 0 0 0-4 12c.6.6 1 1.6 1 2.5V17h6v-.5c0-.9.4-1.9 1-2.5A7 7 0 0 0 12 2Z" />
  </svg>
);

export const ResetIcon: React.FC<React.SVGProps<SVGSVGElement>> = ({ className = '', ...props }) => (
  <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.5" {...props}>
    <path d="M4 4v6h6" />
    <path d="M20 12a8 8 0 1 1-4.7-7.3" />
  </svg>
);
