
import React from 'react';
import { APP_COLORS } from '../constants';

interface HowToUseModalProps {
  onClose: () => void;
}

const HowToUseModal: React.FC<HowToUseModalProps> = ({ onClose }) => {
  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
      role="dialog"
      aria-modal="true"
      aria-labelledby="how-to-use-modal-title"
    >
      <div
        className="
          relative w-full max-w-md p-6 rounded-2xl shadow-lg
          flex flex-col items-center justify-center
        "
        style={{ backgroundColor: APP_COLORS.WINDOW_BODY_OFF_WHITE, border: `1px solid ${APP_COLORS.WINDOW_BORDER}` }}
      >
        <h2 id="how-to-use-modal-title" className="font-balsamiq text-2xl font-bold mb-4" style={{ color: APP_COLORS.TEXT_DARK_BROWN }}>
          How to Use
        </h2>
        <div className="text-center mb-6 text-sm" style={{ color: APP_COLORS.TEXT_GRAY_MEDIUM }}>
          <p className="mb-2">The Pomodoro Technique is a time management method that uses a timer to break down work into intervals, traditionally 25 minutes in length, separated by short breaks.</p>
          <p className="mb-2"><strong>Focus Session:</strong> Work for 25 minutes, then take a short break.</p>
          <p><strong>Break:</strong> Rest for 5 minutes before your next focus session.</p>
        </div>
        <button
          onClick={onClose}
          className="mt-6 px-6 py-2 rounded-xl text-white font-semibold"
          style={{ backgroundColor: APP_COLORS.BUTTON_PAUSE_BG }}
          aria-label="Close how to use guide"
        >
          Got it!
        </button>
      </div>
    </div>
  );
};

export default HowToUseModal;
