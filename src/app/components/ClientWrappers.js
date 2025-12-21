"use client";

// Client-side components wrapper
// This file allows parent components to be Server Components
// while still using these interactive components

// Legacy components (preserved for other routes)
export { default as Nav } from './Nav';
export { default as HighlightText } from './HighlightText';
export { default as Marquee } from './Marquee';
export { default as StackSection } from './StackSection';
export { default as SoundToggle } from './SoundToggle';
export { default as SubscribeButton } from './SubscribeButton';

// New presentation components
export { default as PresentationContainer } from './PresentationContainer';
export { default as Section } from './Section';
export { default as ProgressBar } from './ProgressBar';
export { default as ProgressIndicator } from './ProgressIndicator';
export { default as NoiseOverlay } from './NoiseOverlay';
export { default as ExpandDrawer } from './ExpandDrawer';
export { default as LetterScramble } from './LetterScramble';
export { default as SpiralSVG } from './SpiralSVG';
