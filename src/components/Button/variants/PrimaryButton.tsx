// src/components/Button/variants/PrimaryButton.tsx
/**
 * Primary Button Variant
 *
 * Accent background with brand primary text (e.g. main CTAs).
 */

import { ButtonBase, type ButtonProps } from "../Button";
import { renderButtonIcon } from "../utils";

export default function PrimaryButton({
  leftIcon,
  rightIcon,
  className = "",
  ...props
}: ButtonProps) {
  const variantClasses =
    "bg-accent text-primary transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl focus:ring-accent focus:-translate-y-0.5 focus:shadow-lg active:translate-y-0 active:shadow-lg";

  return (
    <ButtonBase
      {...props}
      className={`${variantClasses} ${className}`}
      leftIcon={renderButtonIcon(leftIcon, props.size)}
      rightIcon={renderButtonIcon(rightIcon, props.size)}
    />
  );
}
