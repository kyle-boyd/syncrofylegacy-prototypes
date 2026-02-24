/**
 * Syncrofy Design Tokens — Source of Truth
 *
 * This module is the single canonical reference for spacing, type, shadows, and
 * color palette. All components and theme layers (e.g. Emotion theme) MUST
 * import from here only. Do not redefine these values in Less, CSS, or other
 * theme files.
 *
 * Usage with Emotion:
 *   import { spacing2x, palette } from '@/tokens';
 *   // or use theme: theme.spacing.spacing2x, theme.palette.cerulean
 */

// =============================================================================
// SPACING & LAYOUT
// =============================================================================
// Use for padding, margins, and layout rhythm. Prefer spacing2x–spacing4x for
// component internals; cardPadding/cardGutter for card-style containers.

export const spacing = {
  cardPadding: '2em',
  cardGutter: '0.7em',
  spacing1x: '8px',
  spacing2x: '16px',
  spacing3x: '24px',
  spacing4x: '32px',
  spacing6x: '48px',
  spacing8x: '64px',
};

// Sub-8px and in-between; 3px/6px left as design debt where used
export const spacingSmall = {
  spacingQuarter: '2px',  // quarter unit
  spacingHalf: '4px',    // half unit
  spacing1_5x: '12px',   // between spacing1x and spacing2x
};

// =============================================================================
// TYPE SCALE (font sizes; px conversion assumes 16px = 1rem)
// =============================================================================

export const typeScale = {
  xxsFontSize: '0.7rem',   // 11.2px
  xsFontSize: '0.8rem',    // 12.8px
  smallFontSize: '0.9rem', // 14.4px
  normalFontSize: '1rem',  // 16px
  largeFontSize: '1.25rem', // 20px
  xlFontSize: '1.5rem',   // 24px
  xxlFontSize: '2rem',    // 32px
  hugeFontSize: '3rem',   // 48px
};

export const fontWeights = {
  thinFontWeight: '300',
  normalFontWeight: '400',
  semiBoldFontWeight: '600',
  boldFontWeight: '700',
};

export const lineHeights = {
  smallLineHeight: '15px',
  normalLineHeight: '19px',
  largeLineHeight: '24px',
  xlLineHeight: '30px',
  xxlLineHeight: '45px',
  hugeLineHeight: '57px',
};

// =============================================================================
// SHADOWS (elevation)
// =============================================================================
// z1: subtle; z2–z4: increasing elevation; zInner: inset (e.g. inputs).

export const shadows = {
  z1: '0 0 1px 0 rgba(0,0,0,.24), 0 1px 1px 0 rgba(0,0,0,.12)',
  z2: '0 0 0 1px rgba(0,0,0,.08), 0 3px 6px 0 rgba(0,0,0,.24)',
  z3: '0 0 0 1px rgba(0,0,0,.08), 0 6px 12px 0 rgba(0,0,0,.24)',
  z4: '0 0 0 1px rgba(0,0,0,.08), 0 16px 24px 0 rgba(0,0,0,.24)',
  zInner: 'inset 0 0 1px 0 rgba(0,0,0,.40), inset 0 1px 1px 0 rgba(0,0,0,.24)',
};

// =============================================================================
// BORDER RADIUS
// =============================================================================
export const radii = {
  radiusSmall: '2px',
  radiusMedium: '4px',
  radiusLarge: '8px',
  radiusPill: '100px',
};

// =============================================================================
// TABS (component-specific; no magic numbers in Tabs component)
// =============================================================================
export const tabTokens = {
  tabUnderlineThickness: '2px',
  tabSeparatorThickness: '1px',
  tabGap: spacing.spacing2x,
  tabUnderlineRadius: radii.radiusSmall,
};

// =============================================================================
// CONSTANTS (combined for theme compatibility)
// =============================================================================
// Flat object matching legacy constants.js for drop-in theme use.

export const constants = {
  ...spacing,
  ...spacingSmall,
  ...radii,
  ...tabTokens,
  ...typeScale,
  ...fontWeights,
  ...lineHeights,
  ...shadows,
};

// =============================================================================
// PALETTE — Neutrals (grays)
// =============================================================================

const d1 = '#515151';
const d2 = '#757575';
const l3 = '#d6d6d6';
const l4 = '#c1c1c1';

// =============================================================================
// PALETTE — Primaries, application, system, lights/darks
// =============================================================================
// cerulean/sky/teal: primary actions and links; orange: accent; system: status.

export const palette = {
  thunder: '#728297',
  mist: '#b7c3d4',
  stroke: '#e0e4ec',
  offWhite: '#FBFCFD',
  greyedOutText: '#8A94A0',
  cardSecondary: '#F5F6FB',
  cloud: '#f4f6fb',
  backgroundGray: 'rgb(234, 234, 234)',

  // Overlays
  backdrop: 'rgba(0, 0, 0, 0.32)',

  // Primaries — use for primary actions, links, key UI
  cerulean: '#0082bf',
  sky: '#37b0e8',
  teal: '#009191',
  orange: '#F2981B',
  pink: '#FCEDEC',
  lightOrange: '#FFEED7',
  grey: '#8A94A0',
  lightGrey: l4,
  darkGrey: d1,

  // Application — brand / app chrome
  sea: '#175374',
  night: '#0b3447',

  // System — success, error, warning
  red: '#cc1827',
  green: '#1c9900',
  yellow: '#FFCC00',

  // Lights
  white: '#fff',
  l1: '#f5f5f5',
  l2: '#eaeaea',
  l3,
  l4,

  // Darks
  black: '#282828',
  d1,
  d2,
  d3: '#a3a3a3',
  pureBlack: '#000',

  // Hovers — use for :hover states over base colors
  ceruleanHover: '#36a5d9',
  skyHover: '#59cbff',
  tealHover: '#31a8a8',
  orangeHover: '#ffa526',
  redHover: '#f23041',
  greenHover: '#4abf30',
  yellowHover: '#ffcf66',
  seaHover: '#0d709e',
  whiteSelected: '#CCEFFF',
  whiteHover: '#ddf0f8',
  lightOrangeHover: '#FDF3E5',
  lightGreyHover: l3,
  greyHover: '#ADB4BC',
  darkGreyHover: d2,
  pinkHover: '#FBF2F2',

  // Clicks — use for :active/pressed states
  ceruleanClick: '#086591',
  skyClick: '#4cc6ff',
  tealClick: '#067379',
  orangeClick: '#D87E00',
  redClick: '#f2182a',
  greenClick: '#167A00',
  yellowClick: '#f2b530',
  seaClick: '#076794',
  lightGreyClick: '#B7B7B7',
  greyClick: '#7D8691',
  darkGreyClick: '#474747',
  pinkClick: '#F3D6D8',
  whiteClick: '#CCEFFF',
  lightOrangeClick: '#FFE7C6',

  // Graph — chart series and data viz
  graphCerulean: '#008FCC',
  graphYellow: '#D9C300',
  graphGreen: '#00990F',
  graphRed: '#BF0039',
  graphPurple: '#8000FF',
  graphOrange: '#CC4B14',
  graphBlue: '#0014CC',
  graphCoral: '#2CCD9D',
  graphPink: '#DE00C8',
  graphLime: '#5CE617',
  graphHoverCerulean: '#30B8F2',
  graphHoverYellow: '#FFEC40',
  graphHoverGreen: '#29CC39',
  graphHoverRed: '#D92B5F',
  graphHoverPurple: '#AC59FF',
  graphHoverOrange: '#E67545',
  graphHoverBlue: '#4053FF',
  graphHoverCoral: '#66FFD1',
  graphHoverPink: '#FF69D7',
  graphHoverLime: '#91FF59',

  // Exceptions — pending / resolved / archived states
  pendingExceptionBackgroundInactive: 'RGB(255,101, .80)',
  pendingExceptionBackgroundActive: 'rgba(233, 84, 67, .1)',
  pendingExceptionBorderActive: 'rgba(233, 84, 67, 1)',
  pendingExceptionBorderHover: 'rgba(233, 84, 67, .5)',
  resolvedExceptionBackgroundInactive: 'rgba(55, 176, 232, .03)',
  resolvedExceptionBackgroundActive: 'rgba(55, 176, 232, .1)',
  resolvedExceptionBorderActive: 'rgba(55, 176, 232, 1)',
  resolvedExceptionBorderHover: 'rgba(55, 176, 232, .5)',
  archivedExceptionBackgroundInactive: 'RGBa(138,148,160, .03)',
  archivedExceptionBackgroundActive: 'RGBa(138,148,160, .1)',
  archivedExceptionBorderActive: 'RGBa(138,148,160, 1)',
  archivedExceptionBorderHover: 'RGBa(138,148,160, .5)',

  // Compliance exceptions
  metCompExceptionBackgroundActive: 'rgb(51 233 69 / 10%)',
  metCompExceptionBorderActive: 'rgb(51 233 69)',
  missedCompExceptionBackgroundActive: 'rgba(233, 84, 67, .1)',
  missedCompExceptionBorderActive: 'rgb(233, 84, 67)',
  atriskCompExceptionBackgroundActive: 'rgba(233 186 51 / 10%)',
  atriskCompExceptionBorderActive: 'rgb(233 186 51)',
  newCompExceptionBackgroundActive: 'RGB(234 234 234)',
  newCompExceptionBorderActive: 'RGB(234 234 234)',
};

// =============================================================================
// DEFAULT EXPORT — theme shape for Emotion ThemeProvider
// =============================================================================
// Use as: <ThemeProvider theme={tokens}>

export default {
  constants,
  palette,
  spacing,
  spacingSmall,
  radii,
  typeScale,
  fontWeights,
  lineHeights,
  shadows,
};
