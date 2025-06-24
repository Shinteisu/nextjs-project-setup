import React from 'react';
import {
  View,
  ActivityIndicator,
  Text,
  StyleSheet,
  ViewStyle,
} from 'react-native';
import { COLORS, SPACING, TYPOGRAPHY } from '../constants/theme';

interface LoadingProps {
  message?: string;
  fullscreen?: boolean;
  size?: 'small' | 'large';
  color?: string;
  style?: ViewStyle;
}

export default function Loading({
  message,
  fullscreen = false,
  size = 'large',
  color = COLORS.primary,
  style,
}: LoadingProps) {
  if (fullscreen) {
    return (
      <View style={[styles.fullscreen, style]}>
        <ActivityIndicator size={size} color={color} />
        {message && (
          <Text style={styles.message}>
            {message}
          </Text>
        )}
      </View>
    );
  }

  return (
    <View style={[styles.container, style]}>
      <ActivityIndicator size={size} color={color} />
      {message && (
        <Text style={styles.message}>
          {message}
        </Text>
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
  },
  message: {
    ...TYPOGRAPHY.body2,
    color: COLORS.textSecondary,
    marginTop: SPACING.md,
    textAlign: 'center',
  },
});
