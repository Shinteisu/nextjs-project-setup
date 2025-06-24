import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ViewStyle,
  TextStyle,
} from 'react-native';
import { COLORS, SPACING, TYPOGRAPHY, LAYOUT } from '../constants/theme';

type BadgeVariant = 'default' | 'primary' | 'success' | 'warning' | 'error';
type BadgeSize = 'small' | 'medium' | 'large';

interface BadgeProps {
  content?: string | number;
  variant?: BadgeVariant;
  size?: BadgeSize;
  dot?: boolean;
  containerStyle?: ViewStyle;
  textStyle?: TextStyle;
}

export default function Badge({
  content,
  variant = 'default',
  size = 'medium',
  dot = false,
  containerStyle,
  textStyle,
}: BadgeProps) {
  const getVariantStyle = (): ViewStyle => {
    switch (variant) {
      case 'primary':
        return styles.primaryBadge;
      case 'success':
        return styles.successBadge;
      case 'warning':
        return styles.warningBadge;
      case 'error':
        return styles.errorBadge;
      default:
        return styles.defaultBadge;
    }
  };

  const getSizeStyle = (): ViewStyle => {
    switch (size) {
      case 'small':
        return styles.smallBadge;
      case 'large':
        return styles.largeBadge;
      default:
        return styles.mediumBadge;
    }
  };

  const getTextSizeStyle = (): TextStyle => {
    switch (size) {
      case 'small':
        return styles.smallText;
      case 'large':
        return styles.largeText;
      default:
        return styles.mediumText;
    }
  };

  if (dot) {
    return (
      <View
        style={[
          styles.dot,
          getVariantStyle(),
          getSizeStyle(),
          containerStyle,
        ]}
      />
    );
  }

  return (
    <View
      style={[
        styles.container,
        getVariantStyle(),
        getSizeStyle(),
        containerStyle,
      ]}
    >
      <Text
        style={[
          styles.text,
          getTextSizeStyle(),
          textStyle,
        ]}
        numberOfLines={1}
      >
        {content}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: LAYOUT.borderRadiusRound,
    paddingHorizontal: SPACING.sm,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: LAYOUT.borderRadiusRound,
  },
  // Variants
  defaultBadge: {
    backgroundColor: COLORS.gray,
  },
  primaryBadge: {
    backgroundColor: COLORS.primary,
  },
  successBadge: {
    backgroundColor: COLORS.success,
  },
  warningBadge: {
    backgroundColor: COLORS.warning,
  },
  errorBadge: {
    backgroundColor: COLORS.error,
  },
  // Sizes
  smallBadge: {
    minWidth: 16,
    height: 16,
  },
  mediumBadge: {
    minWidth: 20,
    height: 20,
  },
  largeBadge: {
    minWidth: 24,
    height: 24,
  },
  // Text
  text: {
    color: COLORS.white,
    fontWeight: '600',
  },
  smallText: {
    ...TYPOGRAPHY.caption,
    fontSize: 10,
  },
  mediumText: {
    ...TYPOGRAPHY.caption,
  },
  largeText: {
    ...TYPOGRAPHY.body2,
  },
});
