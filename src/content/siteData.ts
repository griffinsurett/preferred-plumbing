// src/content/siteData.ts — site-wide strings + logo asset for Astro layouts
import { SITE_DOMAIN, SITE_URL } from "./siteDomain.js";
import siteLogo from "../assets/main-logo.png";

/** Resolved image for `<Image src={siteLogo} />` (header, etc.) */
export { siteLogo };

export const siteData = {
  title: "Preferred Plumbing",
  tagline: "Your Pipes Are Our Business.",
  legalName: "Preferred Plumbing",
  description:
    "Professional plumbing services you can count on. From emergency repairs to new installations, we deliver quality workmanship with honest pricing.",
  domain: SITE_DOMAIN,
  url: SITE_URL,
  location: "New Jersey, USA",
  address: "123 Main St, Springfield, NJ 07081",
  serviceAreaMessage: "Serving Lakewood NJ & surrounding areas",
  /** Accent strip under announcement bar (phone/email live in contact-us content) */
  topBarMessage: "24/7 emergency service, even on Shabbos!",
  /** Accessible name for the header logo (keep in sync with branding) */
  logoAlt: "Preferred Plumbing",
};

/**
 * Primary site CTA — used by the header button and the hero primary button
 * (`FrontPageHero` defaults to this; do not duplicate text/link elsewhere for those).
 */
export const ctaData = {
  text: "Get An Estimate",
  link: "/#contact-us-home",
} as const;
