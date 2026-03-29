// src/components/Button/variants/SecondaryButton.tsx
/**
 * Secondary Button Variant
 *
 * Heading-colored background with primary text (e.g. second hero CTA).
 */

import { ButtonBase, type ButtonProps } from "../Button";
import { renderButtonIcon } from "../utils";

export default function SecondaryButton({
  leftIcon,
  rightIcon,
  className = "",
  ...props
}: ButtonProps) {
  const variantClasses =
    "bg-heading text-primary hover:brightness-110 focus:ring-primary focus:ring-offset-2 focus:ring-offset-bg transition-colors";

  return (
    <ButtonBase
      {...props}
      className={`${variantClasses} ${className}`}
      leftIcon={renderButtonIcon(leftIcon, props.size)}
      rightIcon={renderButtonIcon(rightIcon, props.size)}
    />
  );
}
