import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Alert,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { COLORS, SPACING, TYPOGRAPHY } from '../constants/theme';
import { useStream } from '../hooks/useStream';
import { useAuthContext } from '../contexts/AuthContext';

import Header from '../components/Header';
import Input from '../components/Input';
import Button from '../components/Button';
import Card from '../components/Card';
import ErrorMessage from '../components/ErrorMessage';
import { APP_CONFIG } from '../config';

export default function LiveScreen() {
  const navigation = useNavigation();
  const { user } = useAuthContext();
  const { startStream, endStream, currentStream, isLoading } = useStream();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleStartStream = async () => {
    if (!user) {
      Alert.alert(
        'Sign In Required',
        'You need to sign in to start streaming',
        [
          { text: 'Cancel', style: 'cancel' },
          { text: 'Sign In', onPress: () => navigation.navigate('Login') },
        ]
      );
      return;
    }

    if (!title.trim()) {
      Alert.alert('Error', 'Please enter a stream title');
      return;
    }

    try {
      await startStream(title, description);
      Alert.alert('Success', 'Stream started successfully!');
    } catch (err) {
      Alert.alert('Error', err instanceof Error ? err.message : 'Failed to start stream');
    }
  };

  const handleEndStream = async () => {
    try {
      await endStream();
      Alert.alert('Success', 'Stream ended successfully!');
      setTitle('');
      setDescription('');
    } catch (err) {
      Alert.alert('Error', err instanceof Error ? err.message : 'Failed to end stream');
    }
  };

  if (!user) {
    return (
      <View style={styles.container}>
        <Header title="Go Live" />
        <ErrorMessage
          message="Sign in to start streaming"
          description="Create an account or sign in to start your own live stream"
          containerStyle={{ marginTop: SPACING.lg }}
        />
        <View style={styles.authButtons}>
          <Button
            title="Sign In"
            onPress={() => navigation.navigate('Login')}
            style={styles.authButton}
          />
          <Button
            title="Create Account"
            variant="outline"
            onPress={() => navigation.navigate('Register')}
            style={styles.authButton}
          />
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Header title="Go Live" />
      
      <ScrollView style={styles.content}>
        <Card variant="elevated" style={styles.formCard}>
          {currentStream ? (
            <>
              <Text style={styles.title}>Currently Streaming</Text>
              <Text style={styles.streamTitle}>{currentStream.title}</Text>
              <Text style={styles.stats}>
                {currentStream.viewerCount} viewers • Started {
                  new Date(currentStream.startedAt).toLocaleTimeString()
                }
              </Text>
              <Button
                title="End Stream"
                variant="danger"
                onPress={handleEndStream}
                isLoading={isLoading}
                style={styles.button}
              />
            </>
          ) : (
            <>
              <Text style={styles.title}>Start Streaming</Text>
              <Input
                label="Stream Title"
                value={title}
                onChangeText={setTitle}
                placeholder="Enter your stream title"
                maxLength={APP_CONFIG.maxTitleLength}
              />
              <Input
                label="Description (Optional)"
                value={description}
                onChangeText={setDescription}
                placeholder="Describe your stream"
                multiline
                numberOfLines={3}
                maxLength={APP_CONFIG.maxDescriptionLength}
              />
              <Button
                title="Start Stream"
                onPress={handleStartStream}
                isLoading={isLoading}
                style={styles.button}
              />
            </>
          )}
        </Card>

        <Card variant="outlined" style={styles.infoCard}>
          <Text style={styles.infoTitle}>Streaming Guidelines</Text>
          <Text style={styles.infoText}>
            • Ensure you have a stable internet connection{'\n'}
            • Use appropriate titles and descriptions{'\n'}
            • Follow our community guidelines{'\n'}
            • Be respectful to your viewers{'\n'}
            • Have fun!
          </Text>
        </Card>
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
    padding: SPACING.md,
  },
  formCard: {
    padding: SPACING.lg,
    marginBottom: SPACING.md,
  },
  title: {
    ...TYPOGRAPHY.h3,
    color: COLORS.primary,
    marginBottom: SPACING.lg,
  },
  streamTitle: {
    ...TYPOGRAPHY.h4,
    color: COLORS.text,
    marginBottom: SPACING.xs,
  },
  stats: {
    ...TYPOGRAPHY.body2,
    color: COLORS.textSecondary,
    marginBottom: SPACING.lg,
  },
  button: {
    marginTop: SPACING.md,
  },
  infoCard: {
    padding: SPACING.lg,
  },
  infoTitle: {
    ...TYPOGRAPHY.h4,
    color: COLORS.text,
    marginBottom: SPACING.sm,
  },
  infoText: {
    ...TYPOGRAPHY.body2,
    color: COLORS.textSecondary,
    lineHeight: 24,
  },
  authButtons: {
    padding: SPACING.lg,
  },
  authButton: {
    marginBottom: SPACING.md,
  },
});
