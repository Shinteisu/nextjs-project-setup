import { useState, useCallback } from 'react';
import { Alert } from 'react-native';
import { Stream } from '../types';
import { APP_CONFIG } from '../config';
import { mockStreams } from '../constants/mockData';

interface StreamHookResult {
  // Stream Discovery
  streams: Stream[];
  featuredStreams: Stream[];
  trendingStreams: Stream[];
  fetchStreams: () => Promise<void>;
  fetchStreamById: (id: string) => Promise<Stream>;
  fetchStreamsByCategory: (categoryId: string) => Promise<Stream[]>;
  searchStreams: (query: string) => Promise<Stream[]>;
  
  // Stream Management
  currentStream: Stream | null;
  startStream: (title: string, description: string) => Promise<void>;
  endStream: () => Promise<void>;
  updateStreamInfo: (streamId: string, updates: Partial<Stream>) => Promise<void>;
  
  // State
  isLoading: boolean;
  error: string | null;
}

// Simulated API delay
const MOCK_DELAY = 1000;

export function useStream(): StreamHookResult {
  const [streams, setStreams] = useState<Stream[]>([]);
  const [currentStream, setCurrentStream] = useState<Stream | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Stream Discovery Methods
  const fetchStreams = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, MOCK_DELAY));
      setStreams(mockStreams);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch streams');
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const fetchStreamById = useCallback(async (id: string): Promise<Stream> => {
    try {
      setIsLoading(true);
      setError(null);

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, MOCK_DELAY));

      const stream = mockStreams.find(s => s.id === id);
      if (!stream) {
        throw new Error('Stream not found');
      }

      return stream;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch stream');
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const fetchStreamsByCategory = useCallback(async (categoryId: string): Promise<Stream[]> => {
    try {
      setIsLoading(true);
      setError(null);

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, MOCK_DELAY));

      const categoryStreams = mockStreams.filter(s => s.category === categoryId);
      return categoryStreams;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch category streams');
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const searchStreams = useCallback(async (query: string): Promise<Stream[]> => {
    try {
      setIsLoading(true);
      setError(null);

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, MOCK_DELAY));

      const searchQuery = query.toLowerCase();
      const searchResults = mockStreams.filter(stream => 
        stream.title.toLowerCase().includes(searchQuery) ||
        stream.streamer.username.toLowerCase().includes(searchQuery) ||
        stream.description?.toLowerCase().includes(searchQuery)
      );

      return searchResults;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to search streams');
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Stream Management Methods
  const startStream = useCallback(async (title: string, description: string) => {
    if (!title || !description) {
      setError('Title and description are required');
      return;
    }

    if (title.length > APP_CONFIG.maxTitleLength) {
      setError(`Title must be less than ${APP_CONFIG.maxTitleLength} characters`);
      return;
    }

    if (description.length > APP_CONFIG.maxDescriptionLength) {
      setError(`Description must be less than ${APP_CONFIG.maxDescriptionLength} characters`);
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      // TODO: Replace with actual API call
      const mockStream: Stream = {
        id: Math.random().toString(),
        title,
        description,
        thumbnailUrl: APP_CONFIG.defaultStreamThumbnail,
        streamer: {
          id: '1', // Replace with actual user ID
          username: 'CurrentUser',
          email: 'user@example.com',
          isStreaming: true,
          followers: 0,
          following: 0,
          createdAt: new Date(),
        },
        viewerCount: 0,
        startedAt: new Date(),
        isLive: true,
      };

      setCurrentStream(mockStream);
      Alert.alert('Success', 'Stream started successfully!');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to start stream');
      Alert.alert('Error', 'Failed to start stream. Please try again.');
    } finally {
      setIsLoading(false);
    }
  }, []);

  const endStream = useCallback(async () => {
    if (!currentStream) {
      setError('No active stream');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      // TODO: Replace with actual API call
      setCurrentStream(null);
      Alert.alert('Success', 'Stream ended successfully!');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to end stream');
      Alert.alert('Error', 'Failed to end stream. Please try again.');
    } finally {
      setIsLoading(false);
    }
  }, [currentStream]);

  const updateStreamInfo = useCallback(async (streamId: string, updates: Partial<Stream>) => {
    if (!streamId) {
      setError('Stream ID is required');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      // TODO: Replace with actual API call
      setCurrentStream(prev => prev ? { ...prev, ...updates } : null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update stream');
      Alert.alert('Error', 'Failed to update stream. Please try again.');
    } finally {
      setIsLoading(false);
    }
  }, []);

  const fetchStreamDetails = useCallback(async (streamId: string) => {
    if (!streamId) {
      setError('Stream ID is required');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      // TODO: Replace with actual API call
      // For now, we'll use mock data
      const mockStream: Stream = {
        id: streamId,
        title: 'Mock Stream',
        description: 'This is a mock stream',
        thumbnailUrl: APP_CONFIG.defaultStreamThumbnail,
        streamer: {
          id: '1',
          username: 'MockUser',
          email: 'mock@example.com',
          isStreaming: true,
          followers: 0,
          following: 0,
          createdAt: new Date(),
        },
        viewerCount: Math.floor(Math.random() * 1000),
        startedAt: new Date(),
        isLive: true,
      };

      setCurrentStream(mockStream);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch stream details');
      Alert.alert('Error', 'Failed to fetch stream details. Please try again.');
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Get featured streams (top 3 by viewer count)
  const featuredStreams = [...mockStreams]
    .sort((a, b) => b.viewerCount - a.viewerCount)
    .slice(0, 3);

  // Get trending streams (most recent 5)
  const trendingStreams = [...mockStreams]
    .sort((a, b) => b.startedAt.getTime() - a.startedAt.getTime())
    .slice(0, 5);

  return {
    // Stream Discovery
    streams,
    featuredStreams,
    trendingStreams,
    fetchStreams,
    fetchStreamById,
    fetchStreamsByCategory,
    searchStreams,
    
    // Stream Management
    currentStream,
    startStream,
    endStream,
    updateStreamInfo,
    
    // State
    isLoading,
    error,
  };
}
