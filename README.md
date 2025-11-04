# 🍕 Cute Pomodoro Pizza Timer 🍅

A delightful and minimalist Pomodoro timer designed to help you focus and boost productivity with a charming pizza theme, complete with aesthetic animations and soothing lofi music.

## ✨ Features

*   **Cozy Pastel UI:** A warm and inviting user interface with a soft pastel color palette (beige, sage green, blush pink, cream, soft brown).
*   **Dynamic Pizza Progress:** A large circular pizza graphic at the center visually represents your session progress. Slices are "eaten" one by one with smooth animations as time passes.
*   **Aesthetic Completion Animations:** Celebrate each completed session with a cheerful "YAY!" text animation and a vibrant confetti burst effect emanating from the pizza.
*   **Big, Bold Countdown Timer:** A prominent, handwritten-style timer display shows the remaining time for your focus or break session.
*   **Configurable Session Durations:** Customize your focus and break times (in minutes) via an intuitive "SETTINGS" modal.
*   **Lofi Background Music:** Soft lofi music plays during focus sessions and fades out during breaks to aid concentration (requires audio files).
*   **Sound Notifications:** Distinct audio cues signal the end of a focus session and the beginning/end of a break (requires audio files).
*   **Informative "How To Use" Guide:** A modal provides a brief explanation of the Pomodoro Technique.
*   **Responsive Design:** Adapts beautifully to various screen sizes.
*   **Accessibility:** Includes ARIA attributes for an improved experience for all users.

## 🚀 Technologies Used

*   **React:** Frontend library for building the user interface.
*   **TypeScript:** For type-safe JavaScript.
*   **TailwindCSS:** A utility-first CSS framework for rapid UI development.
*   **SVG Animations:** Custom SVG graphics and CSS keyframe animations for dynamic visual effects.

## 🛠️ Setup and Running Locally

To get this project up and running on your local machine, follow these steps:

### Prerequisites

Make sure you have Node.js and npm (Node Package Manager) or yarn installed on your system.

*   [Node.js](https://nodejs.org/en/) (includes npm)

### 1. Clone the repository

```bash
git clone <repository-url> # Replace <repository-url> with your project's actual URL
cd cute-pomodoro-pizza-timer # Or whatever your project folder is named
```

### 2. Install dependencies

```bash
npm install
# or
yarn install
```

### 3. **CRITICAL: Add Static Assets (Audio and Image Files)**

The application uses local audio files for music and sound notifications, and SVG for the pizza animations. These files **must be placed in specific locations** within your project for the application to find them. If these files are missing or incorrectly placed, you will encounter "CRITICAL ERROR: Audio file not found" or "Image not found" errors in your browser's console, and the corresponding features will not work.

**Directory Structure for Assets:**

Your project structure needs to look like this:

```
your-project-folder/
├── public/
│   ├── index.html
│   └── audio/                  <-- ⚠️ THIS FOLDER MUST BE HERE ⚠️
│       ├── lofi_music.mp3      <-- Your lofi background music
│       ├── session_end.mp3     <-- Sound for focus session completion
│       └── break_end.mp3       <-- Sound for break session completion
│   └── images/                 <-- ⚠️ THIS FOLDER MUST BE HERE ⚠️
│       └── full_pizza.png      <-- The pizza image (if switching back to image-based pizza)
├── src/
│   ├── index.tsx
│   ├── components/
│   │   ├── Pizza.tsx
│   │   └── ... (other components)
│   └── constants.tsx
└── ... (other project files like package.json)
```

**Actions you MUST take:**

1.  **Create `public/audio/` folder:** Inside your project's `public` directory, create a new folder named `audio`.
2.  **Add Audio Files:** Download or create three MP3 files: `lofi_music.mp3`, `session_end.mp3`, and `break_end.mp3`. Place them **exactly** in the `public/audio/` folder.
    *   **Crucial:** File names are case-sensitive! Ensure they match `lofi_music.mp3`, `session_end.mp3`, `break_end.mp3`.
    *   Ensure they are valid MP3 files (test playing them in a media player).
3.  **(Optional but Recommended) Create `public/images/` folder:** Although the current pizza is SVG-based, if you ever switch back to an image-based pizza (like the previous `full_pizza.png`), this folder would be needed.

### 4. Start the development server

```bash
npm start
# or
yarn start
```

This will usually open the application in your default web browser at `http://localhost:3000` (or a similar address).

## 🚀 Usage

1.  **Start/Pause:** Click the large "START" (or "PAUSE") button at the bottom to begin or pause the timer.
2.  **Pizza Progress:** Watch the pizza slices animate away as your session progresses.
3.  **Completion Animation:** When a session ends, enjoy the "YAY!" text and confetti burst.
4.  **Reset:** Click the "RESET SESSION" button to reset the timer, session count, and pause the timer.
5.  **Settings:** Click the "SETTINGS" button on the left to open a modal where you can customize the duration of your focus and break sessions.
6.  **How To Use:** Click the "HOW TO USE" button on the right for a quick guide on the Pomodoro Technique.
7.  **Lofi Music:** Lofi music will play automatically during focus sessions if the audio file (`lofi_music.mp3`) is present and your browser allows autoplay after initial user interaction.

## 🙏 Design Inspiration

The core concept and initial aesthetic were inspired by a user request for a "cute, minimalist Pomodoro timer app interface with a warm pastel color palette." This project aims to bring that vision to life with enhanced animations and functionality.
