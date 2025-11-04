
import React from 'react';
import { APP_COLORS } from '../constants';

interface PizzaProps {
  progress: number; // 0 to 1
  isRunning: boolean;
  isFocus: boolean;
  hasJustCompleted: boolean; // Flag to trigger completion animation
}

// Helper component for confetti particles
const Confetti: React.FC<{ cx: number; cy: number }> = ({ cx, cy }) => {
  const confettiCount = 25; // More confetti!
  const colors = [
    APP_COLORS.CONFETTI_COLOR_1,
    APP_COLORS.CONFETTI_COLOR_2,
    APP_COLORS.CONFETTI_COLOR_3,
    APP_COLORS.CONFETTI_COLOR_4,
    APP_COLORS.CONFETTI_COLOR_5,
  ];

  return (
    <>
      {Array.from({ length: confettiCount }).map((_, i) => {
        const angle = Math.random() * 2 * Math.PI;
        const distance = 40 + Math.random() * 80; // Wider spread
        const finalX = cx + distance * Math.cos(angle);
        const finalY = cy + distance * Math.sin(angle);
        const size = 3 + Math.random() * 6; // Slightly larger confetti
        const delay = Math.random() * 0.6; // Vary delay for more natural burst
        const color = colors[Math.floor(Math.random() * colors.length)];
        const rotation = Math.random() * 720; // Random initial rotation

        return (
          <circle
            key={i}
            cx={cx}
            cy={cy}
            r={size / 2}
            fill={color}
            className="confetti-drop"
            style={{
              animationDelay: `${delay}s`,
              '--final-x': `${finalX - cx}px`, // Translate from center, not absolute position
              '--final-y': `${finalY - cy}px`, // Translate from center
              '--start-rotate': `${rotation}deg`,
              '--end-rotate': `${rotation + 720}deg`, // Spin more
            } as React.CSSProperties}
            aria-hidden="true"
          />
        );
      })}
    </>
  );
};

const Pizza: React.FC<PizzaProps> = ({ progress, isRunning, isFocus, hasJustCompleted }) => {
  const size = 208; // Base size for the SVG viewBox
  const r = 90; // Radius for the main pizza area
  const cx = size / 2;
  const cy = size / 2;
  const numSlices = 8;
  const sliceAngle = 360 / numSlices; // Angle for each slice

  // Function to create an SVG path for a pizza slice
  const createSlicePath = (sliceIndex: number) => {
    const startAngle = sliceIndex * sliceAngle;
    const endAngle = (sliceIndex + 1) * sliceAngle;

    const startPoint = {
      x: cx + r * Math.cos((startAngle - 90) * Math.PI / 180),
      y: cy + r * Math.sin((startAngle - 90) * Math.PI / 180),
    };
    const endPoint = {
      x: cx + r * Math.cos((endAngle - 90) * Math.PI / 180),
      y: cy + r * Math.sin((endAngle - 90) * Math.PI / 180),
    };

    return [
      `M ${cx} ${cy}`, // Move to center
      `L ${startPoint.x} ${startPoint.y}`, // Line to start of arc
      `A ${r} ${r} 0 0 1 ${endPoint.x} ${endPoint.y}`, // Arc to end point
      `Z`, // Close path back to center
    ].join(' ');
  };

  // Determine how many slices are "eaten" based on progress
  const eatenSlicesCount = Math.floor(progress * numSlices);

  // Generate paths for all slices
  const slices = Array.from({ length: numSlices }).map((_, i) => {
    const isEaten = i < eatenSlicesCount;
    // More pronounced "eaten" animation: scale, rotate, and slight translate
    const eatenTransform = `scale(0.8) rotate(10deg) translate(8px, 8px)`;
    const transformOrigin = `${cx}px ${cy}px`; // Scale/rotate from center

    return (
      <path
        key={i}
        d={createSlicePath(i)}
        // Eaten slices are now a distinct PIZZA_EATEN_FILL with higher opacity
        fill={isEaten ? APP_COLORS.PIZZA_EATEN_FILL : APP_COLORS.PIZZA_SLICE_FILL}
        stroke={APP_COLORS.PIZZA_CRUST}
        strokeWidth="1"
        fillOpacity={isEaten ? 0.7 : 1} // Clearly distinguishable opacity
        style={{
          transition: 'all 0.5s ease-out', // Smooth transition for visual changes
          transform: isEaten ? eatenTransform : 'none',
          transformOrigin: transformOrigin,
        }}
      />
    );
  });

  return (
    <div className="relative w-full h-full flex items-center justify-center">
      <svg viewBox={`0 0 ${size} ${size}`} className="absolute inset-0 w-full h-full">
        <style>{`
          @keyframes bounce-fade-in-out {
            0% { opacity: 0; transform: scale(0.5) translateY(20px); }
            30% { opacity: 1; transform: scale(1.3) translateY(-5px); } /* More bounce */
            60% { opacity: 1; transform: scale(1.1) translateY(0); }
            100% { opacity: 0; transform: scale(0.7) translateY(-20px); }
          }
          .yay-animation {
            animation: bounce-fade-in-out 2s ease-out forwards;
          }

          @keyframes confetti-drop {
            0% {
              opacity: 1;
              transform: translate(0, 0) scale(1) rotate(var(--start-rotate));
            }
            100% {
              opacity: 0;
              transform: translate(var(--final-x), var(--final-y)) scale(0) rotate(var(--end-rotate));
            }
          }
          .confetti-drop {
            animation: confetti-drop 2s ease-out forwards; /* Confetti lasts longer */
          }
        `}</style>
        {/* plate shadow */}
        <circle cx={cx} cy={cy} r={98} fill={APP_COLORS.PIZZA_PLATE_SHADOW} />
        {/* crust base */}
        <circle cx={cx} cy={cy} r={92} fill={APP_COLORS.PIZZA_CRUST} />
        {/* Pizza base (sauce/cheese) */}
        <circle cx={cx} cy={cy} r={r} fill={APP_COLORS.WINDOW_BODY_OFF_WHITE} />

        {/* Individual slices */}
        {slices}

        {/* Completion Animation - YAY! text */}
        {hasJustCompleted && (
          <>
            <text
              x={cx}
              y={cy + 10} // Adjust position for larger text
              textAnchor="middle"
              fontSize="56" // Even larger font size
              fontWeight="900" // Bolder
              fontFamily="Fredoka, sans-serif" // Using Fredoka for playfulness
              fill={APP_COLORS.TEXT_DARK_BROWN}
              className="yay-animation"
            >
              YAY!
            </text>
            <Confetti cx={cx} cy={cy} />
          </>
        )}
      </svg>
    </div>
  );
};

export default Pizza;
