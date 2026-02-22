import React from "react";

interface MainLoaderProps {
  /** Optional message to display below the spinner */
  message?: string;
}

/**
 * Full‑screen overlay loader with a spinning circle.
 * Used as a global fallback when the app or a section is loading.
 */
const MainLoader: React.FC<MainLoaderProps> = ({ message }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="flex flex-col items-center gap-4">
        <div className="w-16 h-16 border-4 border-t-transparent border-white rounded-full animate-spin" />
        {message && <span className="text-white text-sm">{message}</span>}
      </div>
    </div>
  );
};

export default MainLoader;
