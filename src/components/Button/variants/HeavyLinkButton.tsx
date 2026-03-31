// src/components/Button/variants/HeavyLinkButton.tsx
/**
 * Heavy Link Button Variant
 *
 * Text-link treatment that keeps the TT Lakes button font and weight.
 */

import { ButtonBase, type ButtonProps } from "../Button";
import { renderButtonIcon } from "../utils";

export default function HeavyLinkButton({
  leftIcon,
  rightIcon,
  className = "",
  size = "md",
  children,
  ...props
}: ButtonProps) {
  const variantClasses =
    "bg-transparent text-primary normal-case tracking-normal px-0 py-0 rounded-none transition-opacity duration-200 hover:opacity-75 focus:ring-primary focus:ring-offset-2 focus:ring-offset-text";
  const wrappedLeftIcon = leftIcon ? (
    <span className="inline-flex items-center justify-center text-accent">
      {renderButtonIcon(leftIcon, size)}
    </span>
  ) : null;

  return (
    <ButtonBase
      {...props}
      className={`${variantClasses} ${className}`.trim()}
      leftIcon={wrappedLeftIcon}
      rightIcon={renderButtonIcon(rightIcon, size)}
      size={size}
    >
      {children}
    </ButtonBase>
  );
}
