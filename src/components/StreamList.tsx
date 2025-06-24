import React from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  ListRenderItemInfo,
  RefreshControl,
  ViewStyle,
} from 'react-native';
import { Stream } from '../types';
import { COLORS, SPACING } from '../constants/theme';
import StreamCard from './StreamCard';
import ErrorMessage from './ErrorMessage';
import Loading from './Loading';

interface StreamListProps {
  streams: Stream[];
  onStreamPress?: (stream: Stream) => void;
  isLoading?: boolean;
  error?: string | null;
  onRefresh?: () => void;
  isRefreshing?: boolean;
  style?: ViewStyle;
  contentContainerStyle?: ViewStyle;
  variant?: 'default' | 'compact';
  horizontal?: boolean;
  showsHorizontalScrollIndicator?: boolean;
  showsVerticalScrollIndicator?: boolean;
}

export default function StreamList({
  streams,
  onStreamPress,
  isLoading,
  error,
  onRefresh,
  isRefreshing = false,
  style,
  contentContainerStyle,
  variant = 'default',
  horizontal = false,
  showsHorizontalScrollIndicator = false,
  showsVerticalScrollIndicator = true,
}: StreamListProps) {
  const renderItem = ({ item }: ListRenderItemInfo<Stream>) => (
    <StreamCard
      stream={item}
      onPress={() => onStreamPress?.(item)}
      variant={variant}
    />
  );

  if (isLoading) {
    return <Loading message="Loading streams..." />;
  }

  if (error) {
    return (
      <ErrorMessage
        message={error}
        retry={onRefresh}
      />
    );
  }

  if (streams.length === 0) {
    return (
      <ErrorMessage
        message="No streams available"
        retry={onRefresh}
      />
    );
  }

  return (
    <FlatList
      data={streams}
      renderItem={renderItem}
      keyExtractor={item => item.id}
      horizontal={horizontal}
      showsHorizontalScrollIndicator={showsHorizontalScrollIndicator}
      showsVerticalScrollIndicator={showsVerticalScrollIndicator}
      contentContainerStyle={[
        styles.contentContainer,
        horizontal && styles.horizontalContentContainer,
        contentContainerStyle,
      ]}
      style={[styles.container, style]}
      refreshControl={
        onRefresh ? (
          <RefreshControl
            refreshing={isRefreshing}
            onRefresh={onRefresh}
            tintColor={COLORS.primary}
          />
        ) : undefined
      }
    />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    padding: SPACING.md,
  },
  horizontalContentContainer: {
    paddingRight: SPACING.md,
  },
});
