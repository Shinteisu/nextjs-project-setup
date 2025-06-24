import { Stream, Category, User } from '../types';

// Mock Users
export const mockUsers: User[] = [
  {
    id: '1',
    username: 'GameMaster',
    email: 'gamemaster@example.com',
    avatar: 'https://via.placeholder.com/150',
    bio: 'Professional gamer and content creator',
    followers: 50000,
    following: 100,
    isStreaming: true,
    createdAt: new Date('2023-01-01'),
  },
  {
    id: '2',
    username: 'MusicLover',
    email: 'music@example.com',
    avatar: 'https://via.placeholder.com/150',
    bio: 'Sharing my love for music with the world',
    followers: 25000,
    following: 250,
    isStreaming: true,
    createdAt: new Date('2023-02-15'),
  },
  {
    id: '3',
    username: 'ArtisticSoul',
    email: 'artist@example.com',
    avatar: 'https://via.placeholder.com/150',
    bio: 'Digital artist and illustrator',
    followers: 15000,
    following: 300,
    isStreaming: false,
    createdAt: new Date('2023-03-20'),
  },
];

// Mock Categories
export const mockCategories: Category[] = [
  {
    id: 'gaming',
    name: 'Gaming',
    imageUrl: 'https://via.placeholder.com/300',
    description: 'Live gaming streams and gameplay content',
    viewerCount: 150000,
    activeStreams: 1200,
  },
  {
    id: 'music',
    name: 'Music',
    imageUrl: 'https://via.placeholder.com/300',
    description: 'Live music performances and production',
    viewerCount: 75000,
    activeStreams: 500,
  },
  {
    id: 'art',
    name: 'Art',
    imageUrl: 'https://via.placeholder.com/300',
    description: 'Digital art, illustrations, and creative content',
    viewerCount: 45000,
    activeStreams: 300,
  },
  {
    id: 'chatting',
    name: 'Just Chatting',
    imageUrl: 'https://via.placeholder.com/300',
    description: 'Casual conversations and community interaction',
    viewerCount: 200000,
    activeStreams: 2000,
  },
];

// Mock Streams
export const mockStreams: Stream[] = [
  {
    id: '1',
    title: 'Late Night Gaming Session',
    description: 'Join me for some competitive gameplay!',
    thumbnailUrl: 'https://via.placeholder.com/1280x720',
    streamer: mockUsers[0],
    viewerCount: 1500,
    startedAt: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
    isLive: true,
    category: 'gaming',
    tags: ['gaming', 'competitive', 'fps'],
  },
  {
    id: '2',
    title: 'Live Music Performance',
    description: 'Playing your favorite songs and taking requests',
    thumbnailUrl: 'https://via.placeholder.com/1280x720',
    streamer: mockUsers[1],
    viewerCount: 800,
    startedAt: new Date(Date.now() - 1 * 60 * 60 * 1000), // 1 hour ago
    isLive: true,
    category: 'music',
    tags: ['music', 'live', 'performance'],
  },
  {
    id: '3',
    title: 'Digital Art Creation',
    description: 'Creating a new character design',
    thumbnailUrl: 'https://via.placeholder.com/1280x720',
    streamer: mockUsers[2],
    viewerCount: 500,
    startedAt: new Date(Date.now() - 30 * 60 * 1000), // 30 minutes ago
    isLive: true,
    category: 'art',
    tags: ['art', 'digital', 'character-design'],
  },
  {
    id: '4',
    title: 'Community Chat & Games',
    description: 'Hanging out with the community',
    thumbnailUrl: 'https://via.placeholder.com/1280x720',
    streamer: mockUsers[0],
    viewerCount: 2000,
    startedAt: new Date(Date.now() - 45 * 60 * 1000), // 45 minutes ago
    isLive: true,
    category: 'chatting',
    tags: ['community', 'chat', 'games'],
  },
  {
    id: '5',
    title: 'Music Production Workshop',
    description: 'Learn the basics of music production',
    thumbnailUrl: 'https://via.placeholder.com/1280x720',
    streamer: mockUsers[1],
    viewerCount: 1200,
    startedAt: new Date(Date.now() - 15 * 60 * 1000), // 15 minutes ago
    isLive: true,
    category: 'music',
    tags: ['music', 'production', 'tutorial'],
  },
];
