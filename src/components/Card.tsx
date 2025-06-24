import React from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  ViewStyle,
  StyleProp,
} from 'react-native';
import { COLORS, SPACING, LAYOUT } from '../constants/theme';

interface CardProps {
  children: React.ReactNode;
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
  contentStyle?: StyleProp<ViewStyle>;
  variant?: 'default' | 'outlined' | 'elevated';
  disabled?: boolean;
}

export default function Card({
  children,
  onPress,
  style,
  contentStyle,
  variant = 'default',
  disabled = false,
}: CardProps) {
  const Container = onPress ? TouchableOpacity : View;

  const getVariantStyle = (): ViewStyle => {
    switch (variant) {
      case 'outlined':
        return styles.outlinedCard;
      case 'elevated':
        return styles.elevatedCard;
      default:
        return styles.defaultCard;
    }
  };

  return (
    <Container
      style={[
        styles.container,
        getVariantStyle(),
        disabled && styles.disabledCard,
        style,
      ]}
      onPress={onPress}
      disabled={disabled}
      activeOpacity={0.7}
    >
      <View style={[styles.content, contentStyle]}>
        {children}
      </View>
    </Container>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: LAYOUT.borderRadiusMedium,
    overflow: 'hidden',
    backgroundColor: COLORS.white,
  },
  content: {
    padding: SPACING.md,
  },
  defaultCard: {
    backgroundColor: COLORS.white,
  },
  outlinedCard: {
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: COLORS.lightGray,
  },
  elevatedCard: {
    backgroundColor: COLORS.white,
    ...LAYOUT.shadowLight,
  },
  disabledCard: {
    opacity: 0.5,
  },
});
