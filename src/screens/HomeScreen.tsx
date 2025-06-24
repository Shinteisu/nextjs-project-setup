import React, { useEffect, useState } from 'react';
import {
  View,
  StyleSheet,
  RefreshControl,
  ScrollView,
} from 'react-native';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { COLORS, SPACING } from '../constants/theme';
import { RootStackParamList } from '../navigation/types';
import { useStream } from '../hooks/useStream';
import { Stream } from '../types';

import Header from '../components/Header';
import StreamList from '../components/StreamList';
import Loading from '../components/Loading';
import ErrorMessage from '../components/ErrorMessage';

export default function HomeScreen() {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const {
    streams,
    featuredStreams,
    trendingStreams,
    fetchStreams,
    isLoading,
    error,
  } = useStream();

  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    fetchStreams();
  }, [fetchStreams]);

  const handleRefresh = async () => {
    setRefreshing(true);
    try {
      await fetchStreams();
    } finally {
      setRefreshing(false);
    }
  };

  const handleStreamPress = (stream: Stream) => {
    navigation.navigate('Stream', { streamId: stream.id });
  };

  if (isLoading && !streams.length) {
    return <Loading fullscreen message="Loading streams..." />;
  }

  if (error && !streams.length) {
    return (
      <ErrorMessage
        message="Failed to load streams"
        description={error}
        retry={fetchStreams}
        fullscreen
      />
    );
  }

  return (
    <View style={styles.container}>
      <Header title="Home" />
      
      <ScrollView
        style={styles.content}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={handleRefresh}
            tintColor={COLORS.primary}
          />
        }
      >
        {/* Featured Streams */}
        <View style={styles.section}>
          <StreamList
            streams={featuredStreams}
            onStreamPress={handleStreamPress}
            horizontal
            showsHorizontalScrollIndicator={false}
            variant="default"
          />
        </View>

        {/* Live Now */}
        <View style={styles.section}>
          <StreamList
            streams={streams.filter(stream => stream.isLive)}
            onStreamPress={handleStreamPress}
            variant="compact"
          />
        </View>

        {/* Trending */}
        <View style={styles.section}>
          <StreamList
            streams={trendingStreams}
            onStreamPress={handleStreamPress}
            variant="default"
          />
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
  section: {
    marginBottom: SPACING.lg,
  },
});
