
import React, { useState, useEffect, useMemo, useRef } from 'react';
import ReactDOM from 'react-dom/client';
import {
  DEFAULT_FOCUS_TIME_MINUTES,
  DEFAULT_BREAK_TIME_MINUTES,
  APP_COLORS,
  GearIcon,
  LightbulbIcon,
  ResetIcon,
} from './constants';
import IconButton from './components/IconButton';
import Button from './components/Button';
import Pizza from './components/Pizza'; // Updated Pizza component
import DashedCrosshair from './components/DashedCrosshair'; // To add crosshair on pizza
import SettingsModal from './components/SettingsModal';
import HowToUseModal from './components/HowToUseModal';


const formatTime = (s: number) => {
  const m = Math.floor(s / 60)
    .toString()
    .padStart(2, "0");
  const sec = Math.floor(s % 60)
    .toString()
    .padStart(2, "0");
  return `${m}:${sec}`;
};

const CutePomodoro: React.FC = () => {
  // Durations (seconds)
  const [focusDurationSeconds, setFocusDurationSeconds] = useState(DEFAULT_FOCUS_TIME_MINUTES * 60);
  const [breakDurationSeconds, setBreakDurationSeconds] = useState(DEFAULT_BREAK_TIME_MINUTES * 60);

  const [isRunning, setIsRunning] = useState(false); // Start paused
  const [isFocus, setIsFocus] = useState(true);
  const [session, setSession] = useState(1);
  const [remaining, setRemaining] = useState(focusDurationSeconds);

  // State for post-completion animation
  const [hasJustCompleted, setHasJustCompleted] = useState(false);

  // Modal states
  const [showSettingsModal, setShowSettingsModal] = useState(false);
  const [showHowToUseModal, setShowHowToUseModal] = useState(false);

  // Audio refs
  const lofiAudioRef = useRef<HTMLAudioElement | null>(null);
  const sessionEndAudioRef = useRef<HTMLAudioElement | null>(null);
  const breakEndAudioRef = useRef<HTMLAudioElement | null>(null);

  // Initialize audio elements once with robust error handling
  useEffect(() => {
    const initAudio = (relativePath: string, loop = false, volume = 1.0) => {
      // Reverted to relative path for better compatibility across different server setups.
      // The browser's root should typically map to the 'public' folder.
      const audio = new Audio(); // Create audio element
      audio.src = relativePath; // Explicitly set the source
      audio.loop = loop;
      audio.volume = volume;
      audio.preload = 'auto'; // Attempt to preload audio data
      audio.load(); // Explicitly trigger load

      audio.onerror = (e) => {
        console.error(`Error loading audio from ${relativePath}:`, e);
        if (audio.networkState === audio.NETWORK_NO_SOURCE) {
          console.error(
            `CRITICAL ERROR: Audio file not found or no supported source: ${relativePath}. ` +
            `Please ensure the file exists at this path (e.g., 'public/audio/${relativePath.split('/').pop()}') ` +
            `and is a valid MP3. Double-check your project's 'public/audio/' folder structure.`
          );
        } else if (audio.error) {
          console.error(`Audio error code: ${audio.error.code}, message: ${audio.error.message}`);
        }
        console.warn(`Attempted to load audio from: ${audio.src}`); // Added for more context
      };
      return audio;
    };

    lofiAudioRef.current = initAudio('/audio/lofi_music.mp3', true, 0.5);
    sessionEndAudioRef.current = initAudio('/audio/session_end.mp3');
    breakEndAudioRef.current = initAudio('/audio/break_end.mp3');

    // Cleanup function to pause and nullify audio refs
    return () => {
      if (lofiAudioRef.current) {
        lofiAudioRef.current.pause();
        lofiAudioRef.current.currentTime = 0;
        lofiAudioRef.current = null;
      }
      sessionEndAudioRef.current = null;
      breakEndAudioRef.current = null;
    };
  }, []);

  // Control lofi music playback
  useEffect(() => {
    if (lofiAudioRef.current) {
      if (isRunning && isFocus) {
        lofiAudioRef.current.play().catch(e => console.error("Error playing lofi music:", e));
      } else {
        lofiAudioRef.current.pause();
      }
    }
  }, [isRunning, isFocus]);

  // Effect to update remaining time if durations change while paused
  useEffect(() => {
    if (!isRunning) {
      setRemaining(isFocus ? focusDurationSeconds : breakDurationSeconds);
    }
  }, [focusDurationSeconds, breakDurationSeconds, isFocus, isRunning]);


  // ticker
  useEffect(() => {
    if (!isRunning) return;
    const id = setInterval(() => {
      setRemaining((r) => {
        if (r <= 1) {
          // Trigger completion animation flag
          setHasJustCompleted(true);
          const completionTimeout = setTimeout(() => {
            setHasJustCompleted(false);
          }, 2000); // Animation lasts 2 seconds

          // Play sound notification before swapping modes
          if (isFocus && sessionEndAudioRef.current) {
            sessionEndAudioRef.current.play().catch(e => console.error("Error playing session end sound:", e));
          } else if (!isFocus && breakEndAudioRef.current) {
            breakEndAudioRef.current.play().catch(e => console.error("Error playing break end sound:", e));
          }

          // swap modes
          const nextIsFocus = !isFocus;
          setIsFocus(nextIsFocus);
          if (nextIsFocus) setSession((s) => s + 1); // Increment session count only for focus sessions
          return nextIsFocus ? focusDurationSeconds : breakDurationSeconds;
        }
        return r - 1;
      });
    }, 1000);
    return () => clearInterval(id);
  }, [isRunning, isFocus, focusDurationSeconds, breakDurationSeconds]);

  const total = isFocus ? focusDurationSeconds : breakDurationSeconds;
  const progress = useMemo(() => 1 - remaining / total, [remaining, total]);

  const reset = () => {
    setIsFocus(true);
    setSession(1);
    setRemaining(focusDurationSeconds); // Reset to current focus duration
    setIsRunning(false);
    setHasJustCompleted(false); // Clear completion animation on reset
    // Pause and reset lofi music on reset
    if (lofiAudioRef.current) {
      // Fix: Changed 'loofiAudioRef' to 'lofiAudioRef'
      lofiAudioRef.current.pause();
      lofiAudioRef.current.currentTime = 0;
    }
  };

  const onSaveSettings = (newFocusMinutes: number, newBreakMinutes: number) => {
    setFocusDurationSeconds(newFocusMinutes * 60);
    setBreakDurationSeconds(newBreakMinutes * 60);
    setShowSettingsModal(false); // Close modal after saving
  };

  // --- styles for warm grid background (moved to body in index.html, so only inner styles here)
  return (
    <div
      className="
        w-full max-w-3xl rounded-[28px] shadow-xl overflow-hidden
      "
      style={{
        backgroundColor: APP_COLORS.WINDOW_BODY_OFF_WHITE,
        border: `1px solid ${APP_COLORS.WINDOW_BORDER}`
      }}
      role="application"
      aria-label="Pomodoro Pizza Timer"
    >
      {/* Header ribbon */}
      <div className="relative">
        <div
          className="w-full px-6 py-4 sm:px-8 sm:py-5 flex items-center justify-center font-balsamiq text-lg sm:text-xl font-bold uppercase tracking-wide"
          style={{ backgroundColor: APP_COLORS.WINDOW_HEADER_GREEN, color: APP_COLORS.TEXT_DARK_BROWN }}
          aria-live="polite"
        >
          LET'S GET IT DONE, BABY!
        </div>
      </div>

      {/* Main Content Area */}
      <div className="relative p-6 sm:p-8 md:p-10 flex flex-col items-center">
        {/* Settings Icon Button (left side) */}
        <div className="absolute top-8 left-6 z-10">
          <IconButton
            icon={GearIcon}
            label="SETTINGS"
            bgColor={APP_COLORS.ICON_SETTINGS_BG}
            iconColor={APP_COLORS.TEXT_DARK_BROWN}
            onClick={() => setShowSettingsModal(true)}
            className="w-24 h-24 sm:w-28 sm:h-28 border-2"
            style={{ borderColor: APP_COLORS.ICON_SETTINGS_BORDER }}
            ariaLabel="Open settings"
            ariaHasPopup="dialog"
            ariaExpanded={showSettingsModal}
          />
        </div>

        {/* How To Use Icon Button (right side) */}
        <div className="absolute top-8 right-6 z-10">
          <IconButton
            icon={LightbulbIcon}
            label="HOW TO USE"
            bgColor={APP_COLORS.ICON_HOW_TO_USE_BG}
            iconColor={APP_COLORS.TEXT_DARK_BROWN}
            onClick={() => setShowHowToUseModal(true)}
            className="w-24 h-24 sm:w-28 sm:h-28 border-2"
            style={{ borderColor: APP_COLORS.ICON_HOW_TO_USE_BORDER }}
            ariaLabel="View how to use guide"
            ariaHasPopup="dialog"
            ariaExpanded={showHowToUseModal}
          />
        </div>

        {/* Pizza Progress Area */}
        <div className="relative w-52 h-52 sm:w-64 sm:h-64 mb-6">
          <Pizza
            progress={progress}
            isRunning={isRunning}
            isFocus={isFocus}
            hasJustCompleted={hasJustCompleted}
          />
          {/* crosshair on top of the pizza */}
          <DashedCrosshair color={APP_COLORS.PIZZA_CROSSHAIR} />
        </div>

        {/* Session Info */}
        <p
          className="
            text-center text-sm sm:text-base tracking-wider uppercase mb-3
          "
          style={{ color: APP_COLORS.TEXT_GRAY_MEDIUM }}
          aria-live="polite"
        >
          {isFocus ? 'FOCUS SESSION' : 'BREAK'} • SESSION {session}
        </p>

        {/* Timer Display */}
        <div
          className="
            text-[92px] leading-none font-balsamiq font-black select-none
          "
          style={{ color: APP_COLORS.TEXT_BLACKISH }}
          role="timer"
          aria-live="assertive"
          aria-label={`${isFocus ? 'Focus' : 'Break'} session, ${formatTime(remaining)} remaining`}
        >
          {formatTime(remaining)}
        </div>

        {/* Progress Bar */}
        <div
          className="w-full mt-4 h-3 rounded-full overflow-hidden"
          style={{ backgroundColor: APP_COLORS.PROGRESS_BAR_BACKGROUND }}
          role="progressbar"
          aria-valuenow={Math.round(progress * 100)}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label="Session progress"
        >
          <div
            className="h-full rounded-full transition-all"
            style={{
              width: `${progress * 100}%`,
              backgroundColor: APP_COLORS.PROGRESS_BAR_FILL,
            }}
          />
        </div>

        {/* Control Buttons */}
        <div className="mt-8 flex items-center justify-center gap-4">
          <button
            onClick={() => setIsRunning((r) => !r)}
            className="
              px-10 py-3 text-xl font-extrabold rounded-2xl shadow
              text-white tracking-wide relative w-40 sm:w-48
            "
            style={{ backgroundColor: APP_COLORS.BUTTON_PAUSE_BG }}
            aria-label={isRunning ? 'Pause timer' : 'Start timer'}
          >
            <span
              className="absolute -inset-1 rounded-3xl border-2 opacity-40"
              style={{ borderColor: APP_COLORS.BUTTON_PAUSE_BORDER_GLOW }}
            />
            <span className="relative">{isRunning ? 'PAUSE' : 'START'}</span>
          </button>

          <IconButton
            icon={ResetIcon}
            label="" // Label is now below the icon in the IconButton component
            ariaLabel="Reset session"
            bgColor={APP_COLORS.BUTTON_RESET_BG}
            iconColor={APP_COLORS.TEXT_DARK_BROWN}
            onClick={reset}
            className="w-16 h-16 sm:w-18 sm:h-18 rounded-full border-2 p-2"
            style={{ borderColor: APP_COLORS.BUTTON_RESET_BORDER }}
          />
        </div>
        <div className="mt-2 text-[10px] uppercase tracking-widest" style={{ color: APP_COLORS.TEXT_LIGHT_GRAY }}>
          RESET SESSION
        </div>
      </div>

      {/* Modals */}
      {showSettingsModal && (
        <SettingsModal
          initialFocusMinutes={focusDurationSeconds / 60}
          initialBreakMinutes={breakDurationSeconds / 60}
          onSave={onSaveSettings}
          onClose={() => setShowSettingsModal(false)}
        />
      )}
      {showHowToUseModal && <HowToUseModal onClose={() => setShowHowToUseModal(false)} />}
    </div>
  );
};

// Mount the React app
const rootElement = document.getElementById('root');
if (rootElement) {
  ReactDOM.createRoot(rootElement).render(<CutePomodoro />);
} else {
  console.error('Root element not found');
}