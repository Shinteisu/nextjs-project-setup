// User Types
export interface User {
  id: string;
  username: string;
  email: string;
  avatar?: string;
  bio?: string;
  followers: number;
  following: number;
  isStreaming: boolean;
  createdAt: Date;
}

// Stream Types
export interface Stream {
  id: string;
  title: string;
  description?: string;
  thumbnailUrl?: string;
  streamer: User;
  viewerCount: number;
  startedAt: Date;
  isLive: boolean;
  tags?: string[];
  category?: string;
}

// Category Types
export interface Category {
  id: string;
  name: string;
  imageUrl: string;
  description?: string;
  viewerCount: number;
  activeStreams: number;
}

// Chat Types
export interface ChatMessage {
  id: string;
  content: string;
  sender: User;
  timestamp: Date;
  type: 'text' | 'emote' | 'system';
}

// Stream Quality Types
export interface StreamQuality {
  label: string;
  bitrate: string | 'auto';
  resolution?: {
    width: number;
    height: number;
  };
}

// Stream Settings Types
export interface StreamSettings {
  title: string;
  description?: string;
  category?: string;
  tags?: string[];
  isPrivate: boolean;
  quality: StreamQuality;
  chatEnabled: boolean;
  chatDelay: number;
}

// API Response Types
export interface ApiResponse<T> {
  data: T;
  status: number;
  message?: string;
}

export interface PaginatedResponse<T> extends ApiResponse<T> {
  page: number;
  limit: number;
  total: number;
  hasMore: boolean;
}

// Error Types
export interface ApiError {
  code: string;
  message: string;
  details?: Record<string, string[]>;
}

// Component Props Types
export interface StreamCardProps {
  stream: Stream;
  onPress?: (stream: Stream) => void;
  variant?: 'default' | 'compact';
  style?: any;
}

export interface StreamListProps {
  streams: Stream[];
  onStreamPress?: (stream: Stream) => void;
  isLoading?: boolean;
  error?: string | null;
  onRefresh?: () => void;
  isRefreshing?: boolean;
  style?: any;
  contentContainerStyle?: any;
  variant?: 'default' | 'compact';
  horizontal?: boolean;
  showsHorizontalScrollIndicator?: boolean;
  showsVerticalScrollIndicator?: boolean;
}

// Theme Types
export interface ThemeColors {
  primary: string;
  secondary: string;
  background: string;
  surface: string;
  error: string;
  text: string;
  border: string;
  [key: string]: string;
}

export interface ThemeSpacing {
  xs: number;
  sm: number;
  md: number;
  lg: number;
  xl: number;
  [key: string]: number;
}

export interface Theme {
  colors: ThemeColors;
  spacing: ThemeSpacing;
}
