// src/components/HamburgerMenuDrawer.tsx
/**
 * Mobile Menu Drawer Template
 *
 * Manages open/close state for mobile menu with checkbox-based hamburger button.
 */

import { useState } from "react";
import Modal from "@/components/Modal";
import PrimaryBigButton from "@/components/Button/PrimaryBigButton";
import Icon from "@/components/Icon";
import MobileMenuItem from "@/components/LoopComponents/Menu/MobileMenuItem";
import contactItems from "@/content/contact-us/contact-us.json";
import { ctaData, siteData, siteLogo } from "@/content/siteData";
import socialMediaLinks from "@/content/social-media/socialmedia.json";
import { formatPhoneNumber } from "@/utils/string";
import HamburgerButton from "./HamburgerButton";

interface MobileMenuDrawerProps {
  items: any[];
  className?: string;
  hamburgerTransform?: boolean;
  closeButton?: boolean;
}

export default function MobileMenuDrawer({
  items,
  className = "",
  hamburgerTransform = true,
  closeButton = false,
}: MobileMenuDrawerProps) {
  const [isOpen, setIsOpen] = useState(false);
  const phoneEntry = contactItems.find((item) => item.id === "phone");
  const phoneValue = phoneEntry?.description ?? "";
  const phoneHref = phoneValue
    ? `${phoneEntry?.linkPrefix || "tel:"}${phoneValue}`
    : undefined;
  const phoneLabel = phoneValue ? formatPhoneNumber(phoneValue) : "Call Us";

  const handleNavigate = () => {
    setIsOpen(false);
  };

  return (
    <>
      {/* Checkbox-based Hamburger Button */}
      <HamburgerButton
        isOpen={isOpen}
        onChange={setIsOpen}
        hamburgerTransform={hamburgerTransform}
        ariaLabel={isOpen ? "Close menu" : "Open menu"}
        id="mobile-menu-toggle"
      />

      {/* Mobile Menu Modal */}
      <Modal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        position="center"
        className="w-full max-w-full h-full bg-primary p-0 rounded-none"
        overlayClass="bg-black/50"
        closeButton={closeButton}
        closeButtonClass="absolute top-5 right-5 inline-flex h-12 w-12 items-center justify-center bg-accent text-primary shadow-lg transition-transform duration-200 hover:-translate-y-0.5"
        ariaLabel="Mobile navigation menu"
        ssr={false}
      >
        <nav
          className={`${className} h-full overflow-y-auto px-6 py-8 flex flex-col items-center`}
          aria-label="Mobile navigation"
        >
          <a
            href="/"
            className="mb-8 inline-flex flex-col items-center justify-center text-center"
            aria-label={siteData.title}
            onClick={handleNavigate}
          >
            <img
              src={siteLogo.src}
              alt={siteData.logoAlt}
              className="h-20 w-auto max-w-[220px] object-contain"
            />
            <span className="mt-3 max-w-[16rem] text-sm font-semibold uppercase tracking-[0.08em] text-on-primary">
              {siteData.tagline}
            </span>
          </a>

          <ul className="w-full max-w-sm space-y-2 text-center">
            {items.map((item) => (
              <MobileMenuItem
                key={item.slug || item.id}
                {...item}
                onNavigate={handleNavigate}
              />
            ))}
          </ul>

        {phoneHref && (
            <a
              href={phoneHref}
              onClick={handleNavigate}
              className="mt-5 inline-flex items-center justify-center gap-2 text-accent transition-[transform,opacity] duration-300 ease-out hover:-translate-y-0.5 hover:opacity-80 active:translate-y-0"
              aria-label={`Call ${phoneLabel}`}
              title={phoneLabel}
            >
              <Icon icon={phoneEntry?.icon || "fa6:phone"} size="md" className="text-current" />
              <span className="text-lg font-semibold">{phoneLabel}</span>
            </a>
          )}
          
          <div className="mt-8 w-full max-w-sm">
            <PrimaryBigButton
              href={ctaData.link}
              fullWidth
              onClick={handleNavigate}
            >
              {ctaData.text}
            </PrimaryBigButton>
          </div>

          <div className="mt-5 flex items-center justify-center gap-5">
            {socialMediaLinks.map((item) => (
              <a
                key={item.id}
                href={item.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center text-accent transition-[transform,opacity] duration-300 ease-out hover:-translate-y-0.5 hover:opacity-80 active:translate-y-0"
                aria-label={`Visit our ${item.title} page`}
                title={item.title}
              >
                <Icon icon={item.icon} size="md" className="text-current" />
              </a>
            ))}
          </div>
        </nav>
      </Modal>
    </>
  );
}
