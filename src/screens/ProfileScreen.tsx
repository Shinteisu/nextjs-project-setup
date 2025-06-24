import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Alert,
} from 'react-native';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { COLORS, SPACING } from '../constants/theme';
import { useAuthContext } from '../contexts/AuthContext';
import { RootStackParamList } from '../navigation/types';
import Header from '../components/Header';
import Button from '../components/Button';
import Avatar from '../components/Avatar';
import Card from '../components/Card';
import StreamList from '../components/StreamList';
import { mockStreams } from '../constants/mockData';

export default function ProfileScreen() {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const { user, logout } = useAuthContext();

  const handleLogout = () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Logout',
          style: 'destructive',
          onPress: async () => {
            try {
              await logout();
              navigation.navigate('Login');
            } catch (err) {
              console.error('Failed to logout:', err);
            }
          },
        },
      ],
    );
  };

  if (!user) {
    return (
      <View style={styles.container}>
        <Header title="Profile" />
        <View style={styles.content}>
          <Card variant="elevated" style={styles.authCard}>
            <Text style={styles.authTitle}>Join StreamApp</Text>
            <Text style={styles.authDescription}>
              Sign in to follow your favorite streamers, chat with others, and start your own streams!
            </Text>
            <Button
              title="Sign In"
              onPress={() => navigation.navigate('Login')}
              style={styles.authButton}
            />
            <Button
              title="Create Account"
              variant="outline"
              onPress={() => navigation.navigate('Register')}
            />
          </Card>
        </View>
      </View>
    );
  }

  const userStreams = mockStreams.filter(stream => stream.streamer.id === user.id);

  return (
    <View style={styles.container}>
      <Header
        title="Profile"
        rightComponent={
          <Button
            title="Settings"
            variant="ghost"
            onPress={() => Alert.alert('Coming Soon', 'Settings will be available soon!')}
          />
        }
      />
      <ScrollView style={styles.content}>
        <Card variant="elevated" style={styles.profileCard}>
          <View style={styles.profileHeader}>
            <Avatar
              source={user.avatar}
              size="xlarge"
              showBorder
            />
            <View style={styles.profileInfo}>
              <Text style={styles.username}>{user.username}</Text>
              <Text style={styles.bio}>{user.bio || 'No bio yet'}</Text>
              <View style={styles.stats}>
                <View style={styles.stat}>
                  <Text style={styles.statValue}>{user.followers}</Text>
                  <Text style={styles.statLabel}>Followers</Text>
                </View>
                <View style={styles.stat}>
                  <Text style={styles.statValue}>{user.following}</Text>
                  <Text style={styles.statLabel}>Following</Text>
                </View>
              </View>
            </View>
          </View>
          <View style={styles.actions}>
            <Button
              title="Edit Profile"
              variant="outline"
              onPress={() => Alert.alert('Coming Soon', 'Profile editing will be available soon!')}
              style={styles.actionButton}
            />
            <Button
              title="Logout"
              variant="danger"
              onPress={handleLogout}
              style={styles.actionButton}
            />
          </View>
        </Card>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Your Streams</Text>
          {userStreams.length > 0 ? (
            <StreamList
              streams={userStreams}
              variant="compact"
              onStreamPress={(stream) => navigation.navigate('Stream', { streamId: stream.id })}
            />
          ) : (
            <Card variant="outlined" style={styles.emptyCard}>
              <Text style={styles.emptyText}>You haven't streamed yet</Text>
              <Button
                title="Start Streaming"
                onPress={() => navigation.navigate('Live')}
                style={styles.startButton}
              />
            </Card>
          )}
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
  authCard: {
    margin: SPACING.md,
    padding: SPACING.lg,
  },
  authTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: COLORS.primary,
    marginBottom: SPACING.sm,
  },
  authDescription: {
    fontSize: 16,
    color: COLORS.gray,
    marginBottom: SPACING.lg,
  },
  authButton: {
    marginBottom: SPACING.md,
  },
  profileCard: {
    margin: SPACING.md,
    padding: SPACING.md,
  },
  profileHeader: {
    flexDirection: 'row',
    gap: SPACING.md,
    marginBottom: SPACING.md,
  },
  profileInfo: {
    flex: 1,
    justifyContent: 'center',
  },
  username: {
    fontSize: 24,
    fontWeight: '600',
    color: COLORS.primary,
    marginBottom: SPACING.xs,
  },
  bio: {
    fontSize: 16,
    color: COLORS.gray,
    marginBottom: SPACING.md,
  },
  stats: {
    flexDirection: 'row',
    gap: SPACING.lg,
  },
  stat: {
    alignItems: 'center',
  },
  statValue: {
    fontSize: 18,
    fontWeight: '600',
    color: COLORS.primary,
  },
  statLabel: {
    fontSize: 14,
    color: COLORS.gray,
  },
  actions: {
    flexDirection: 'row',
    gap: SPACING.sm,
  },
  actionButton: {
    flex: 1,
  },
  section: {
    padding: SPACING.md,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: COLORS.primary,
    marginBottom: SPACING.md,
  },
  emptyCard: {
    padding: SPACING.lg,
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 16,
    color: COLORS.gray,
    marginBottom: SPACING.md,
  },
  startButton: {
    minWidth: 200,
  },
});
