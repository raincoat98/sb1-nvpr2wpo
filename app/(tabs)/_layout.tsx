import { Tabs } from 'expo-router';
import {
  Calendar,
  Heart,
  List,
  Settings,
  Target,
  Activity,
} from 'lucide-react-native';
import { Platform } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Colors, Spacing } from '@/constants/theme';

export default function TabLayout() {
  const insets = useSafeAreaInsets();

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: true,
        tabBarStyle: {
          backgroundColor: Colors.white,
          borderTopWidth: 1,
          borderTopColor: Colors.gray[200],
          height: Platform.OS === 'ios' ? 90 + insets.bottom : 80,
          paddingBottom: Platform.OS === 'ios' ? insets.bottom : 0,
          paddingTop: Platform.OS === 'ios' ? 8 : 4,
          paddingHorizontal: Spacing.sm,
        },
        tabBarActiveTintColor: Colors.primary,
        tabBarInactiveTintColor: Colors.gray[400],
        tabBarLabelStyle: {
          fontFamily: 'Inter-Medium',
          fontSize: 12,
          marginTop: 4,
          marginBottom: 2,
        },
        tabBarIconStyle: {
          marginTop: 4,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: '홈',
          tabBarIcon: ({ color }) => (
            <Calendar size={22} color={color} strokeWidth={2} />
          ),
        }}
      />
      <Tabs.Screen
        name="health"
        options={{
          title: '건강체크',
          tabBarIcon: ({ color }) => (
            <Activity size={22} color={color} strokeWidth={2} />
          ),
        }}
      />
      <Tabs.Screen
        name="goals"
        options={{
          title: '목표',
          tabBarIcon: ({ color }) => (
            <Target size={22} color={color} strokeWidth={2} />
          ),
        }}
      />
      <Tabs.Screen
        name="supplies"
        options={{
          title: '준비물',
          tabBarIcon: ({ color }) => (
            <List size={22} color={color} strokeWidth={2} />
          ),
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: '설정',
          tabBarIcon: ({ color }) => (
            <Settings size={22} color={color} strokeWidth={2} />
          ),
        }}
      />
    </Tabs>
  );
}
