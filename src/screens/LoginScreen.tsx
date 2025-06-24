import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  Alert,
} from 'react-native';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { COLORS, SPACING, TYPOGRAPHY } from '../constants/theme';
import { useAuthContext } from '../contexts/AuthContext';
import { RootStackParamList } from '../navigation/types';
import Header from '../components/Header';
import Input from '../components/Input';
import Button from '../components/Button';
import Card from '../components/Card';

export default function LoginScreen() {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const { login, isLoading } = useAuthContext();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    try {
      await login({ email, password });
      navigation.navigate('Home');
    } catch (err) {
      Alert.alert('Error', err instanceof Error ? err.message : 'Failed to login');
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.content}>
          <Header
            title="Login"
            showBack
          />

          <View style={styles.formContainer}>
            <Card variant="elevated" style={styles.card}>
              <Text style={styles.title}>Welcome Back!</Text>
              <Text style={styles.subtitle}>
                Sign in to continue streaming and connecting with others.
              </Text>

              <Input
                label="Email"
                value={email}
                onChangeText={setEmail}
                placeholder="Enter your email"
                keyboardType="email-address"
                autoCapitalize="none"
                autoComplete="email"
              />

              <Input
                label="Password"
                value={password}
                onChangeText={setPassword}
                placeholder="Enter your password"
                secureTextEntry
                autoCapitalize="none"
                autoComplete="password"
              />

              <Button
                title="Sign In"
                onPress={handleLogin}
                isLoading={isLoading}
                style={styles.loginButton}
              />

              <View style={styles.footer}>
                <Text style={styles.footerText}>Don't have an account? </Text>
                <Button
                  title="Sign Up"
                  variant="outline"
                  onPress={() => navigation.navigate('Register')}
                />
              </View>
            </Card>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
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
  formContainer: {
    flex: 1,
    justifyContent: 'center',
    padding: SPACING.lg,
  },
  card: {
    padding: SPACING.lg,
  },
  title: {
    ...TYPOGRAPHY.h2,
    color: COLORS.primary,
    marginBottom: SPACING.xs,
    textAlign: 'center',
  },
  subtitle: {
    ...TYPOGRAPHY.body1,
    color: COLORS.gray,
    marginBottom: SPACING.xl,
    textAlign: 'center',
  },
  loginButton: {
    marginTop: SPACING.lg,
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: SPACING.xl,
  },
  footerText: {
    ...TYPOGRAPHY.body2,
    color: COLORS.gray,
  },
});
