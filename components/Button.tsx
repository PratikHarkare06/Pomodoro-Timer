import React from 'react';

interface ButtonProps {
  label: string;
  bgColor: string;
  textColor: string;
  borderColor?: string;
  onClick: () => void;
  className?: string;
}

const Button: React.FC<ButtonProps> = ({ label, bgColor, textColor, borderColor, onClick, className }) => {
  return (
    <button
      onClick={onClick}
      className={`
        py-3 px-8 sm:py-4 sm:px-12 rounded-2xl shadow-md
        font-bold text-lg sm:text-xl
        transition-transform duration-200 active:scale-95
        ${bgColor} ${textColor}
        ${borderColor ? `border-2 ${borderColor}` : ''}
        ${className}
      `}
    >
      {label}
    </button>
  );
};

export default Button;