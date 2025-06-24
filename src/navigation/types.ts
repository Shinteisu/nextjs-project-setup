import { Stream } from '../types';

// Root Stack Navigator Types
export type RootStackParamList = {
  Home: undefined;
  Stream: { streamId: string };
  Live: undefined;
  Login: undefined;
  Register: undefined;
};

// Bottom Tab Navigator Types
export type BottomTabParamList = {
  HomeTab: undefined;
  DiscoverTab: undefined;
  LiveTab: undefined;
  ProfileTab: undefined;
};

// Navigation Props Types
export type RootStackNavigationProp = {
  navigate: (screen: keyof RootStackParamList, params?: any) => void;
  goBack: () => void;
  push: (screen: keyof RootStackParamList, params?: any) => void;
  replace: (screen: keyof RootStackParamList, params?: any) => void;
  reset: (state: any) => void;
};

export type BottomTabNavigationProp = {
  navigate: (screen: keyof BottomTabParamList) => void;
  goBack: () => void;
};

// Screen Props Types
export interface StreamScreenProps {
  route: {
    params: {
      streamId: string;
      stream?: Stream;
    };
  };
  navigation: RootStackNavigationProp;
}

export interface HomeScreenProps {
  navigation: RootStackNavigationProp;
}

export interface LiveScreenProps {
  navigation: RootStackNavigationProp;
}

export interface ProfileScreenProps {
  navigation: RootStackNavigationProp;
}

export interface DiscoverScreenProps {
  navigation: RootStackNavigationProp;
}

export interface LoginScreenProps {
  navigation: RootStackNavigationProp;
}

export interface RegisterScreenProps {
  navigation: RootStackNavigationProp;
}
