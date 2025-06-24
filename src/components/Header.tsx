import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ViewStyle,
  TextStyle,
} from 'react-native';
import { COLORS, SPACING, TYPOGRAPHY, LAYOUT } from '../constants/theme';
import { useNavigation } from '@react-navigation/native';

interface HeaderProps {
  title: string;
  leftComponent?: React.ReactNode;
  rightComponent?: React.ReactNode;
  showBack?: boolean;
  onBackPress?: () => void;
  containerStyle?: ViewStyle;
  titleStyle?: TextStyle;
}

export default function Header({
  title,
  leftComponent,
  rightComponent,
  showBack = false,
  onBackPress,
  containerStyle,
  titleStyle,
}: HeaderProps) {
  const navigation = useNavigation();

  const handleBackPress = () => {
    if (onBackPress) {
      onBackPress();
    } else if (navigation.canGoBack()) {
      navigation.goBack();
    }
  };

  return (
    <View style={[styles.container, containerStyle]}>
      <View style={styles.leftContainer}>
        {showBack ? (
          <TouchableOpacity
            style={styles.backButton}
            onPress={handleBackPress}
          >
            <Text style={styles.backButtonText}>←</Text>
          </TouchableOpacity>
        ) : (
          leftComponent
        )}
      </View>

      <View style={styles.titleContainer}>
        <Text 
          style={[styles.title, titleStyle]}
          numberOfLines={1}
        >
          {title}
        </Text>
      </View>

      <View style={styles.rightContainer}>
        {rightComponent}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 56,
    backgroundColor: COLORS.background,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.lightGray,
    paddingHorizontal: SPACING.md,
  },
  leftContainer: {
    flex: 1,
    alignItems: 'flex-start',
  },
  titleContainer: {
    flex: 2,
    alignItems: 'center',
  },
  rightContainer: {
    flex: 1,
    alignItems: 'flex-end',
  },
  title: {
    ...TYPOGRAPHY.h4,
    color: COLORS.primary,
  },
  backButton: {
    padding: SPACING.sm,
    marginLeft: -SPACING.sm,
  },
  backButtonText: {
    ...TYPOGRAPHY.h3,
    color: COLORS.primary,
  },
});
