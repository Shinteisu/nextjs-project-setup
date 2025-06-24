import React from 'react';
import {
  View,
  Image,
  StyleSheet,
  ViewStyle,
  ImageStyle,
  TouchableOpacity,
} from 'react-native';
import { COLORS, LAYOUT } from '../constants/theme';
import Badge from './Badge';

type AvatarSize = 'small' | 'medium' | 'large' | 'xlarge';
type AvatarStatus = 'online' | 'offline' | 'away' | 'busy';

interface AvatarProps {
  source?: string;
  size?: AvatarSize;
  status?: AvatarStatus;
  onPress?: () => void;
  containerStyle?: ViewStyle;
  imageStyle?: ImageStyle;
  showBorder?: boolean;
}

export default function Avatar({
  source,
  size = 'medium',
  status,
  onPress,
  containerStyle,
  imageStyle,
  showBorder = false,
}: AvatarProps) {
  const Container = onPress ? TouchableOpacity : View;

  const getContainerSizeStyle = (): ViewStyle => {
    switch (size) {
      case 'small':
        return styles.smallContainer;
      case 'large':
        return styles.largeContainer;
      case 'xlarge':
        return styles.xlargeContainer;
      default:
        return styles.mediumContainer;
    }
  };

  const getImageSizeStyle = (): ImageStyle => {
    switch (size) {
      case 'small':
        return styles.smallImage;
      case 'large':
        return styles.largeImage;
      case 'xlarge':
        return styles.xlargeImage;
      default:
        return styles.mediumImage;
    }
  };

  const getStatusColor = (): string => {
    switch (status) {
      case 'online':
        return COLORS.online;
      case 'offline':
        return COLORS.offline;
      case 'away':
        return COLORS.away;
      case 'busy':
        return COLORS.busy;
      default:
        return COLORS.gray;
    }
  };

  const getStatusSize = (): 'small' | 'medium' => {
    switch (size) {
      case 'xlarge':
      case 'large':
        return 'medium';
      default:
        return 'small';
    }
  };

  return (
    <Container
      style={[
        styles.container,
        getContainerSizeStyle(),
        showBorder && styles.bordered,
        containerStyle,
      ]}
      onPress={onPress}
      disabled={!onPress}
    >
      <Image
      source={source ? { uri: source } : undefined}
      defaultSource={{ uri: 'https://via.placeholder.com/100?text=?' }}
        style={[
          styles.image,
          getImageSizeStyle(),
          imageStyle,
        ]}
      />
      {status && (
        <View style={[
          styles.statusContainer,
          size === 'small' && styles.statusContainerSmall,
        ]}>
          <Badge
            dot
            variant="default"
            size={getStatusSize()}
            containerStyle={{ backgroundColor: getStatusColor() }}
          />
        </View>
      )}
    </Container>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'relative',
  },
  image: {
    backgroundColor: COLORS.lightGray,
  },
  bordered: {
    borderWidth: 2,
    borderColor: COLORS.white,
    borderRadius: LAYOUT.borderRadiusRound,
  },
  // Container Sizes
  smallContainer: {
    width: 32,
    height: 32,
  },
  mediumContainer: {
    width: 40,
    height: 40,
  },
  largeContainer: {
    width: 56,
    height: 56,
  },
  xlargeContainer: {
    width: 80,
    height: 80,
  },
  // Image Sizes
  smallImage: {
    width: 32,
    height: 32,
    borderRadius: 16,
  },
  mediumImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  largeImage: {
    width: 56,
    height: 56,
    borderRadius: 28,
  },
  xlargeImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  // Status
  statusContainer: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: COLORS.white,
    borderRadius: LAYOUT.borderRadiusRound,
    padding: 2,
  },
  statusContainerSmall: {
    padding: 1,
  },
});
