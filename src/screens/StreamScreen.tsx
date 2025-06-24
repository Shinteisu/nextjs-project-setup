import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  Dimensions,
} from 'react-native';
import { useRoute, useNavigation, RouteProp } from '@react-navigation/native';
import { COLORS, SPACING, TYPOGRAPHY } from '../constants/theme';
import { RootStackParamList } from '../navigation/types';
import { useStream } from '../hooks/useStream';
import { Stream } from '../types';

import Header from '../components/Header';
import Avatar from '../components/Avatar';
import Button from '../components/Button';
import Badge from '../components/Badge';
import Loading from '../components/Loading';
import ErrorMessage from '../components/ErrorMessage';

type StreamScreenRouteProp = RouteProp<RootStackParamList, 'Stream'>;

const { width } = Dimensions.get('window');
const VIDEO_HEIGHT = (width * 9) / 16; // 16:9 aspect ratio

export default function StreamScreen() {
  const route = useRoute<StreamScreenRouteProp>();
  const navigation = useNavigation();
  const { streamId } = route.params;
  const { fetchStreamById, isLoading, error } = useStream();
  const [stream, setStream] = useState<Stream | null>(null);

  useEffect(() => {
    const loadStream = async () => {
      try {
        const streamData = await fetchStreamById(streamId);
        setStream(streamData);
      } catch (err) {
        // Error will be handled by the useStream hook
      }
    };

    loadStream();
  }, [fetchStreamById, streamId]);

  const formatViewerCount = (count: number): string => {
    if (count >= 1000000) {
      return `${(count / 1000000).toFixed(1)}M`;
    }
    if (count >= 1000) {
      return `${(count / 1000).toFixed(1)}K`;
    }
    return count.toString();
  };

  const getStreamDuration = (startDate: Date): string => {
    const duration = Math.floor((Date.now() - startDate.getTime()) / 60000);
    if (duration >= 60) {
      const hours = Math.floor(duration / 60);
      const minutes = duration % 60;
      return `${hours}h ${minutes}m`;
    }
    return `${duration}m`;
  };

  if (isLoading) {
    return <Loading fullscreen message="Loading stream..." />;
  }

  if (error || !stream) {
    return (
      <ErrorMessage
        message="Failed to load stream"
        description={error || 'Stream not found'}
        retry={() => fetchStreamById(streamId)}
        fullscreen
      />
    );
  }

  return (
    <View style={styles.container}>
      <Header
        title={stream.streamer.username}
        showBack
        rightComponent={
          <Button
            title="Follow"
            variant="outline"
            size="small"
            onPress={() => {}}
          />
        }
      />

      <ScrollView style={styles.content}>
        {/* Stream Preview */}
        <View style={styles.videoContainer}>
          <Image
            source={{ uri: stream.thumbnailUrl }}
            style={styles.videoPlaceholder}
            resizeMode="cover"
          />
          {stream.isLive && (
            <View style={styles.streamInfo}>
              <Badge
                content="LIVE"
                variant="error"
                size="small"
              />
              <Badge
                content={formatViewerCount(stream.viewerCount)}
                variant="default"
                size="small"
              />
              <Badge
                content={getStreamDuration(stream.startedAt)}
                variant="default"
                size="small"
              />
            </View>
          )}
        </View>

        {/* Stream Details */}
        <View style={styles.details}>
          <Text style={styles.title}>{stream.title}</Text>
          
          <View style={styles.streamerInfo}>
            <Avatar
              source={stream.streamer.avatar}
              size="medium"
              status={stream.isLive ? 'online' : undefined}
            />
            <View style={styles.streamerText}>
              <Text style={styles.streamerName}>
                {stream.streamer.username}
              </Text>
              <Text style={styles.streamerStats}>
                {stream.streamer.followers.toLocaleString()} followers
              </Text>
            </View>
          </View>

          {stream.description && (
            <Text style={styles.description}>
              {stream.description}
            </Text>
          )}

          {stream.tags && stream.tags.length > 0 && (
            <View style={styles.tags}>
              {stream.tags.map((tag, index) => (
                <Badge
                  key={index}
                  content={tag}
                  variant="default"
                  size="small"
                />
              ))}
            </View>
          )}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  content: {
    flex: 1,
  },
  videoContainer: {
    position: 'relative',
    width: '100%',
    height: VIDEO_HEIGHT,
    backgroundColor: COLORS.black,
  },
  videoPlaceholder: {
    width: '100%',
    height: '100%',
  },
  streamInfo: {
    position: 'absolute',
    top: SPACING.sm,
    left: SPACING.sm,
    flexDirection: 'row',
    gap: SPACING.xs,
  },
  details: {
    padding: SPACING.md,
  },
  title: {
    ...TYPOGRAPHY.h3,
    color: COLORS.text,
    marginBottom: SPACING.md,
  },
  streamerInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SPACING.md,
  },
  streamerText: {
    marginLeft: SPACING.sm,
  },
  streamerName: {
    ...TYPOGRAPHY.body1,
    fontWeight: '600',
    color: COLORS.text,
  },
  streamerStats: {
    ...TYPOGRAPHY.body2,
    color: COLORS.textSecondary,
  },
  description: {
    ...TYPOGRAPHY.body2,
    color: COLORS.textSecondary,
    marginBottom: SPACING.md,
  },
  tags: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: SPACING.xs,
  },
});
