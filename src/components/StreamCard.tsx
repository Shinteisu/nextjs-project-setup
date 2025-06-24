import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ViewStyle,
} from 'react-native';
import { COLORS, SPACING, TYPOGRAPHY, LAYOUT } from '../constants/theme';
import { Stream } from '../types';
import Avatar from './Avatar';
import Badge from './Badge';
import Card from './Card';

interface StreamCardProps {
  stream: Stream;
  onPress?: () => void;
  style?: ViewStyle;
  variant?: 'default' | 'compact';
}

export default function StreamCard({
  stream,
  onPress,
  style,
  variant = 'default',
}: StreamCardProps) {
  const {
    title,
    description,
    thumbnailUrl,
    streamer,
    viewerCount,
    isLive,
    startedAt,
  } = stream;

  const formatViewerCount = (count: number): string => {
    if (count >= 1000000) {
      return `${(count / 1000000).toFixed(1)}M`;
    }
    if (count >= 1000) {
      return `${(count / 1000).toFixed(1)}K`;
    }
    return count.toString();
  };

  const getStreamDuration = (): string => {
    const now = new Date();
    const duration = now.getTime() - startedAt.getTime();
    const hours = Math.floor(duration / (1000 * 60 * 60));
    const minutes = Math.floor((duration % (1000 * 60 * 60)) / (1000 * 60));

    if (hours > 0) {
      return `${hours}h ${minutes}m`;
    }
    return `${minutes}m`;
  };

  if (variant === 'compact') {
    return (
      <Card
        variant="outlined"
        onPress={onPress}
        style={[styles.compactContainer, style]}
      >
        <View style={styles.compactContent}>
          <Image
            source={{ uri: thumbnailUrl }}
            style={styles.compactThumbnail}
          />
          <View style={styles.compactInfo}>
            <Text style={styles.compactTitle} numberOfLines={1}>
              {title}
            </Text>
            <Text style={styles.streamerName} numberOfLines={1}>
              {streamer.username}
            </Text>
            <View style={styles.stats}>
              <Badge
                content={formatViewerCount(viewerCount)}
                variant={isLive ? 'error' : 'default'}
                size="small"
              />
              {isLive && (
                <Text style={styles.duration}>
                  {getStreamDuration()}
                </Text>
              )}
            </View>
          </View>
        </View>
      </Card>
    );
  }

  return (
    <Card
      variant="elevated"
      onPress={onPress}
      style={[styles.container, style]}
    >
      <View style={styles.thumbnailContainer}>
        <Image
          source={{ uri: thumbnailUrl }}
          style={styles.thumbnail}
        />
        <View style={styles.overlay}>
          <View style={styles.badges}>
            {isLive && (
              <Badge
                content="LIVE"
                variant="error"
                size="small"
                containerStyle={styles.liveBadge}
              />
            )}
            <Badge
              content={formatViewerCount(viewerCount)}
              variant="default"
              size="small"
            />
          </View>
          {isLive && (
            <Text style={styles.duration}>
              {getStreamDuration()}
            </Text>
          )}
        </View>
      </View>

      <View style={styles.content}>
        <View style={styles.header}>
          <Avatar
            source={streamer.avatar}
            size="small"
            status={isLive ? 'online' : undefined}
          />
          <View style={styles.titleContainer}>
            <Text style={styles.title} numberOfLines={2}>
              {title}
            </Text>
            <Text style={styles.streamerName} numberOfLines={1}>
              {streamer.username}
            </Text>
          </View>
        </View>

        {description && (
          <Text style={styles.description} numberOfLines={2}>
            {description}
          </Text>
        )}
      </View>
    </Card>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: SPACING.md,
  },
  thumbnailContainer: {
    position: 'relative',
    aspectRatio: 16 / 9,
    borderTopLeftRadius: LAYOUT.borderRadiusMedium,
    borderTopRightRadius: LAYOUT.borderRadiusMedium,
    overflow: 'hidden',
  },
  thumbnail: {
    width: '100%',
    height: '100%',
    backgroundColor: COLORS.lightGray,
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    padding: SPACING.sm,
    justifyContent: 'space-between',
  },
  badges: {
    flexDirection: 'row',
    gap: SPACING.xs,
  },
  liveBadge: {
    paddingHorizontal: SPACING.sm,
  },
  duration: {
    ...TYPOGRAPHY.caption,
    color: COLORS.white,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    paddingHorizontal: SPACING.xs,
    paddingVertical: 2,
    borderRadius: LAYOUT.borderRadiusSmall,
    alignSelf: 'flex-start',
  },
  content: {
    padding: SPACING.md,
  },
  header: {
    flexDirection: 'row',
    gap: SPACING.sm,
    marginBottom: SPACING.sm,
  },
  titleContainer: {
    flex: 1,
  },
  title: {
    ...TYPOGRAPHY.body1,
    fontWeight: '600',
    color: COLORS.primary,
    marginBottom: SPACING.xs,
  },
  streamerName: {
    ...TYPOGRAPHY.body2,
    color: COLORS.gray,
  },
  description: {
    ...TYPOGRAPHY.body2,
    color: COLORS.textSecondary,
  },
  // Compact variant styles
  compactContainer: {
    marginBottom: SPACING.sm,
  },
  compactContent: {
    flexDirection: 'row',
    gap: SPACING.sm,
  },
  compactThumbnail: {
    width: 120,
    height: 68,
    borderRadius: LAYOUT.borderRadiusSmall,
    backgroundColor: COLORS.lightGray,
  },
  compactInfo: {
    flex: 1,
    justifyContent: 'space-between',
  },
  compactTitle: {
    ...TYPOGRAPHY.body2,
    fontWeight: '600',
    color: COLORS.primary,
    marginBottom: SPACING.xs,
  },
  stats: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.xs,
  },
});
