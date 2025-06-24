// Colors
export const COLORS = {
  // Brand Colors
  primary: '#007AFF',
  secondary: '#5856D6',
  accent: '#FF2D55',

  // UI Colors
  background: '#FFFFFF',
  surface: '#F2F2F7',
  error: '#FF3B30',
  success: '#34C759',
  warning: '#FF9500',
  info: '#5856D6',

  // Text Colors
  text: '#000000',
  textSecondary: '#3C3C43',
  textTertiary: '#787880',
  textInverse: '#FFFFFF',

  // Grayscale
  white: '#FFFFFF',
  lightGray: '#E5E5EA',
  gray: '#8E8E93',
  darkGray: '#636366',
  black: '#000000',

  // Border Colors
  border: '#C6C6C8',
  borderLight: '#E5E5EA',
  borderDark: '#8E8E93',

  // Overlay Colors
  overlay: 'rgba(0, 0, 0, 0.5)',
  modalBackground: 'rgba(0, 0, 0, 0.7)',

  // Status Colors
  online: '#34C759',
  offline: '#FF3B30',
  away: '#FF9500',
  busy: '#FF2D55',
} as const;

// Spacing
export const SPACING = {
  // Base Spacing
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 40,

  // Specific Spacing
  gutter: 16,
  section: 24,
} as const;

// Typography
export const TYPOGRAPHY = {
  h1: {
    fontSize: 32,
    lineHeight: 40,
    fontWeight: '700',
  },
  h2: {
    fontSize: 28,
    lineHeight: 36,
    fontWeight: '700',
  },
  h3: {
    fontSize: 24,
    lineHeight: 32,
    fontWeight: '600',
  },
  h4: {
    fontSize: 20,
    lineHeight: 28,
    fontWeight: '600',
  },
  body1: {
    fontSize: 16,
    lineHeight: 24,
    fontWeight: '400',
  },
  body2: {
    fontSize: 14,
    lineHeight: 20,
    fontWeight: '400',
  },
  caption: {
    fontSize: 12,
    lineHeight: 16,
    fontWeight: '400',
  },
  button: {
    fontSize: 16,
    lineHeight: 24,
    fontWeight: '600',
  },
} as const;

// Layout
export const LAYOUT = {
  // Screen
  screenPadding: SPACING.md,
  
  // Border Radius
  borderRadiusSmall: 4,
  borderRadiusMedium: 8,
  borderRadiusLarge: 12,
  borderRadiusXLarge: 16,
  borderRadiusRound: 999,

  // Shadows
  shadowLight: {
    shadowColor: COLORS.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  shadowMedium: {
    shadowColor: COLORS.black,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 4,
  },
  shadowHeavy: {
    shadowColor: COLORS.black,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.2,
    shadowRadius: 16,
    elevation: 8,
  },

  // Z-Index
  zIndex: {
    base: 0,
    above: 1,
    below: -1,
    modal: 1000,
    overlay: 900,
    dropdown: 800,
    tooltip: 700,
  },
} as const;

// Animation
export const ANIMATION = {
  // Durations
  duration: {
    fast: 200,
    normal: 300,
    slow: 500,
  },

  // Easings
  easing: {
    easeInOut: 'ease-in-out',
    easeIn: 'ease-in',
    easeOut: 'ease-out',
    linear: 'linear',
  },
} as const;

// Breakpoints
export const BREAKPOINTS = {
  phone: 0,
  tablet: 768,
  desktop: 1024,
} as const;
