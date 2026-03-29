// src/components/HamburgerButton.tsx
/**
 * Animated Hamburger Button (Checkbox-based)
 *
 * Uses a hidden checkbox for state control with pure CSS animations.
 * Three-line hamburger that transforms into a perfect X.
 */

import { memo } from "react";

export interface HamburgerButtonProps {
  isOpen: boolean;
  onChange: (isOpen: boolean) => void;
  hamburgerTransform?: boolean;
  className?: string;
  ariaLabel?: string;
  id?: string;
}

function HamburgerButton({
  isOpen,
  onChange,
  hamburgerTransform = true,
  className = "",
  ariaLabel = "Toggle menu",
  id = "hamburger-menu",
}: HamburgerButtonProps) {
  const shouldTransform = hamburgerTransform && isOpen;

  return (
    <div className={`relative z-[100000] ${className}`}>
      {/* Hidden checkbox - controls state */}
      <input
        type="checkbox"
        id={id}
        checked={isOpen}
        onChange={(e) => onChange(e.target.checked)}
        className="sr-only"
        aria-label={ariaLabel}
      />

      {/* Label styled as hamburger button */}
      <label
        htmlFor={id}
        className="group cursor-pointer p-2 text-accent hover:text-accent transition-colors inline-flex items-center justify-center gap-2"
      >
        <span className="font-tt-lakes text-[1.05rem] leading-none tracking-[0.08em] uppercase">
          Menu
        </span>
        <div className="w-7 h-6 relative flex items-center justify-center">
          {/* Top line */}
          <span
            className={`absolute h-[3px] w-full bg-current transition-all duration-300 ease-in-out origin-center ${
              shouldTransform ? "rotate-45" : "-translate-y-[9px]"
            }`}
          />

          {/* Middle line */}
          <span
            className={`absolute h-[3px] bg-current transition-all duration-300 ease-in-out ${
              shouldTransform ? "opacity-0 scale-0" : "opacity-100 scale-100"
            } ${shouldTransform ? "w-1/2" : "w-1/2 group-hover:w-full"}`}
          />

          {/* Bottom line */}
          <span
            className={`absolute h-[3px] w-full bg-current transition-all duration-300 ease-in-out origin-center ${
              shouldTransform ? "-rotate-45" : "translate-y-[9px]"
            }`}
          />
        </div>
      </label>
    </div>
  );
}

export default memo(HamburgerButton);
