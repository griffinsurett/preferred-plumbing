// src/components/Button/PrimaryBigButton.tsx
/**
 * Shared large primary CTA for header and mobile navigation.
 *
 * Wraps the hybrid Button component so the same styling can be reused in Astro
 * and React call sites without duplicating class strings.
 */

import type { ReactNode } from "react";
import Button, { type ButtonComponentProps } from "./Button";
import { ctaData } from "@/content/siteData";

type PrimaryBigButtonProps = Omit<
  ButtonComponentProps,
  "variant" | "size" | "children"
> & {
  children?: ReactNode;
  fullWidth?: boolean;
};

export default function PrimaryBigButton({
  children = ctaData.text,
  className = "",
  fullWidth = false,
  ...props
}: PrimaryBigButtonProps) {
  const layoutClasses = fullWidth
    ? "w-full justify-center"
    : "shrink-0";

  return (
    <Button
      {...props}
      variant="primary"
      size="lg"
      className={`${layoutClasses} ${className}`.trim()}
    >
      {children}
    </Button>
  );
}
