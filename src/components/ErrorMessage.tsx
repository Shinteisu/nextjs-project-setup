import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ViewStyle,
} from 'react-native';
import { COLORS, SPACING, TYPOGRAPHY } from '../constants/theme';
import Button from './Button';

interface ErrorMessageProps {
  message: string;
  description?: string;
  retry?: () => void;
  fullscreen?: boolean;
  style?: ViewStyle;
  containerStyle?: ViewStyle;
}

export default function ErrorMessage({
  message,
  description,
  retry,
  fullscreen = false,
  style,
  containerStyle,
}: ErrorMessageProps) {
  if (fullscreen) {
    return (
      <View style={[styles.fullscreen, style]}>
        <View style={[styles.content, containerStyle]}>
          <Text style={styles.message}>
            {message}
          </Text>
          {description && (
            <Text style={styles.description}>
              {description}
            </Text>
          )}
          {retry && (
            <Button
              title="Try Again"
              onPress={retry}
              variant="outline"
              style={styles.retryButton}
            />
          )}
        </View>
      </View>
    );
  }

  return (
    <View style={[styles.container, style, containerStyle]}>
      <Text style={styles.message}>
        {message}
      </Text>
      {description && (
        <Text style={styles.description}>
          {description}
        </Text>
      )}
      {retry && (
        <Button
          title="Try Again"
          onPress={retry}
          variant="outline"
          style={styles.retryButton}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: SPACING.lg,
    alignItems: 'center',
    justifyContent: 'center',
  },
  fullscreen: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.background,
    padding: SPACING.lg,
  },
  content: {
    alignItems: 'center',
    maxWidth: 300,
  },
  message: {
    ...TYPOGRAPHY.h4,
    color: COLORS.error,
    textAlign: 'center',
    marginBottom: SPACING.sm,
  },
  description: {
    ...TYPOGRAPHY.body2,
    color: COLORS.textSecondary,
    textAlign: 'center',
    marginBottom: SPACING.lg,
  },
  retryButton: {
    minWidth: 120,
  },
});
