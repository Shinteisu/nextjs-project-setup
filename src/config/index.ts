export const APP_CONFIG = {
  // API Configuration
  apiUrl: 'https://api.example.com',
  apiVersion: 'v1',
  apiTimeout: 10000,

  // Stream Configuration
  maxTitleLength: 100,
  maxDescriptionLength: 500,
  defaultStreamThumbnail: 'https://via.placeholder.com/1280x720',
  maxStreamDuration: 4 * 60 * 60, // 4 hours in seconds
  streamBufferSize: 1024 * 1024, // 1MB
  maxBitrate: 6000, // 6Mbps
  defaultStreamQuality: '720p',

  // Chat Configuration
  maxMessageLength: 200,
  chatDelay: 1000,
  maxEmotesPerMessage: 5,
  maxMessagesPerSecond: 3,

  // User Configuration
  minUsernameLength: 3,
  maxUsernameLength: 20,
  minPasswordLength: 8,
  maxBioLength: 160,
  maxFollowers: 1000000,

  // UI Configuration
  animationDuration: 300,
  toastDuration: 3000,
  imageQuality: 0.8,
  thumbnailSize: {
    width: 1280,
    height: 720,
  },
  avatarSizes: {
    small: 32,
    medium: 48,
    large: 64,
    xlarge: 128,
  },

  // Feature Flags
  enableChat: true,
  enableDonations: false,
  enableSubscriptions: false,
  enableClips: false,
  enableVOD: false,
  enableMultistream: false,

  // Cache Configuration
  maxCacheSize: 50 * 1024 * 1024, // 50MB
  cacheDuration: 24 * 60 * 60 * 1000, // 24 hours in milliseconds
  
  // Analytics Configuration
  analyticsEnabled: true,
  logLevel: 'info',
  errorReportingEnabled: true,

  // Social Integration
  socialPlatforms: ['twitter', 'discord', 'youtube'],
  shareBaseUrl: 'https://stream.example.com/s/',
} as const;

export const STREAM_QUALITIES = [
  { label: '1080p', bitrate: '6000', resolution: { width: 1920, height: 1080 } },
  { label: '720p', bitrate: '4000', resolution: { width: 1280, height: 720 } },
  { label: '480p', bitrate: '2000', resolution: { width: 854, height: 480 } },
  { label: '360p', bitrate: '1000', resolution: { width: 640, height: 360 } },
  { label: 'Auto', bitrate: 'auto' },
] as const;

export const CATEGORIES = [
  'Gaming',
  'Just Chatting',
  'Music',
  'Art',
  'Sports',
  'Education',
  'Technology',
] as const;

export const STREAM_TAGS = [
  'Beginner Friendly',
  'English',
  'Competitive',
  'Casual',
  'Educational',
  'Family Friendly',
  'Professional',
  'Entertainment',
  'Creative',
  'Music',
  'Gaming',
  'Technology',
  'Talk Show',
  'AMA',
] as const;

export default {
  APP_CONFIG,
  STREAM_QUALITIES,
  CATEGORIES,
  STREAM_TAGS,
};
