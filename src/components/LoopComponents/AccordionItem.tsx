// src/components/LoopComponents/AccordionItem.tsx
import type { ReactNode } from "react";

export interface AccordionItemProps {
  id: string;
  title: string;
  description?: string;
  children?: ReactNode;
  className?: string;
  isExpanded: boolean;
  onToggle: () => void;
  headerClassName?: string;
  headerSlot?: ReactNode;
}

export default function AccordionItem({
  id,
  title,
  description,
  className = "",
  children,
  isExpanded,
  onToggle,
  headerClassName = "",
  headerSlot,
}: AccordionItemProps) {
  return (
    <div className={`border border-accent bg-accent rounded-lg overflow-hidden ${className}`}>
      <button
        type="button"
        className={`flex items-center justify-between p-4 bg-accent cursor-pointer hover:bg-accent/80 transition-colors w-full text-left ${headerClassName}`}
        onClick={onToggle}
        aria-expanded={isExpanded}
        aria-controls={`${id}-content`}
      >
          <span className="text-primary font-medium text-xl px-2">
            {isExpanded ? "−" : "+"}
          </span>
          {headerSlot ? (
            <div className="flex-1">{headerSlot}</div>
          ) : (
            <div className="flex-1">
              <h3 className="text-primary">{title}</h3>
            </div>
          )}
      </button>

      {isExpanded && children && (
        <div id={`${id}-content`} className="p-6">
          <div className="prose prose-surface max-w-none">{children}</div>
        </div>
      )}
    </div>
  );
}
