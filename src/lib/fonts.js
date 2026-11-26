import { Plus_Jakarta_Sans, Playfair_Display } from 'next/font/google';

// Self-hosted by next/font: no render-blocking request to Google Fonts. Exposed as CSS variables used by the stylesheets.
const jakarta = Plus_Jakarta_Sans({ subsets: ['latin'], variable: '--font-jakarta', display: 'swap' });
// Normal only: no stylesheet uses Playfair italic (the italics on the site are Plus Jakarta).
const playfair = Playfair_Display({ subsets: ['latin'], variable: '--font-playfair', display: 'swap' });

export const fontVariables = `${jakarta.variable} ${playfair.variable}`;
