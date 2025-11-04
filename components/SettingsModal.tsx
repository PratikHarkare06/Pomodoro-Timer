

import React, { useState, useEffect } from 'react';
import { APP_COLORS } from '../constants';

interface SettingsModalProps {
  initialFocusMinutes: number;
  initialBreakMinutes: number;
  onSave: (focusMinutes: number, breakMinutes: number) => void;
  onClose: () => void;
}

const SettingsModal: React.FC<SettingsModalProps> = ({ initialFocusMinutes, initialBreakMinutes, onSave, onClose }) => {
  const [localFocusMinutes, setLocalFocusMinutes] = useState(initialFocusMinutes);
  const [localBreakMinutes, setLocalBreakMinutes] = useState(initialBreakMinutes);
  const [error, setError] = useState('');

  // Update local state if initial props change
  useEffect(() => {
    setLocalFocusMinutes(initialFocusMinutes);
    setLocalBreakMinutes(initialBreakMinutes);
  }, [initialFocusMinutes, initialBreakMinutes]);

  const handleSave = () => {
    const focus = Math.floor(localFocusMinutes);
    const breakTime = Math.floor(localBreakMinutes);

    if (focus <= 0 || breakTime <= 0 || isNaN(focus) || isNaN(breakTime)) {
      setError('Please enter positive numbers for both focus and break times.');
      return;
    }
    setError('');
    onSave(focus, breakTime);
  };

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
      role="dialog"
      aria-modal="true"
      aria-labelledby="settings-modal-title"
    >
      <div
        className="
          relative w-full max-w-md p-6 rounded-2xl shadow-lg
          flex flex-col items-center
        "
        style={{ backgroundColor: APP_COLORS.WINDOW_BODY_OFF_WHITE, border: `1px solid ${APP_COLORS.WINDOW_BORDER}` }}
      >
        <h2 id="settings-modal-title" className="font-balsamiq text-2xl font-bold mb-6" style={{ color: APP_COLORS.TEXT_DARK_BROWN }}>
          Settings
        </h2>

        <div className="w-full space-y-4 mb-6">
          <div>
            <label htmlFor="focus-time" className="block text-sm font-medium mb-1" style={{ color: APP_COLORS.TEXT_DARK_BROWN }}>
              Focus Time (minutes)
            </label>
            <input
              id="focus-time"
              type="number"
              min="1"
              value={localFocusMinutes}
              onChange={(e) => setLocalFocusMinutes(Number(e.target.value))}
              className="w-full p-2 rounded-lg border focus:outline-none focus:ring-2"
              style={{
                backgroundColor: APP_COLORS.PROGRESS_BAR_BACKGROUND,
                borderColor: APP_COLORS.WINDOW_BORDER,
                color: APP_COLORS.TEXT_DARK_BROWN,
                '--tw-ring-color': APP_COLORS.ICON_SETTINGS_BORDER, // Custom ring color
              } as React.CSSProperties} // Cast to CSSProperties to allow custom properties
              aria-describedby="focus-time-error"
            />
          </div>
          <div>
            <label htmlFor="break-time" className="block text-sm font-medium mb-1" style={{ color: APP_COLORS.TEXT_DARK_BROWN }}>
              Break Time (minutes)
            </label>
            <input
              id="break-time"
              type="number"
              min="1"
              value={localBreakMinutes}
              onChange={(e) => setLocalBreakMinutes(Number(e.target.value))}
              className="w-full p-2 rounded-lg border focus:outline-none focus:ring-2"
              style={{
                backgroundColor: APP_COLORS.PROGRESS_BAR_BACKGROUND,
                borderColor: APP_COLORS.WINDOW_BORDER,
                color: APP_COLORS.TEXT_DARK_BROWN,
                '--tw-ring-color': APP_COLORS.ICON_SETTINGS_BORDER,
              } as React.CSSProperties}
              aria-describedby="break-time-error"
            />
          </div>
        </div>

        {error && (
          <p id="focus-time-error" className="text-red-600 text-sm mb-4" role="alert">
            {error}
          </p>
        )}

        <div className="flex gap-4 mt-2">
          <button
            onClick={handleSave}
            className="px-6 py-2 rounded-xl text-white font-semibold"
            style={{ backgroundColor: APP_COLORS.BUTTON_PAUSE_BG }}
            aria-label="Save settings"
          >
            Save
          </button>
          <button
            onClick={onClose}
            className="px-6 py-2 rounded-xl text-white font-semibold"
            style={{ backgroundColor: APP_COLORS.TEXT_LIGHT_GRAY }}
            aria-label="Cancel and close settings"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default SettingsModal;