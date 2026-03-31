// src/components/Button/utils.tsx
import { isValidElement, type ReactNode } from 'react';
import Icon from '@/components/Icon';
import type { IconSize } from '@/integrations/icons';
import type { IconType } from '@/content/schema';
import type { ButtonSize } from './Button';

function mapButtonSizeToIconSize(size?: ButtonSize): IconSize {
  return size ?? 'md';
}

export function renderButtonIcon(
  icon: IconType | ReactNode | undefined,
  size?: ButtonSize
): ReactNode {
  if (!icon) return null;

  const iconSize = mapButtonSizeToIconSize(size);
  if (isValidElement(icon)) return icon;
  if (typeof icon === 'string' || typeof icon === 'object') {
    return <Icon icon={icon as IconType} size={iconSize} />;
  }
  return null;
}
