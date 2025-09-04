import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Switch,
  Platform,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { User, Bell, Calendar, Info, Trash2 } from 'lucide-react-native';
import {
  Colors,
  Typography,
  Spacing,
  BorderRadius,
  Shadows,
} from '@/constants/theme';

export default function SettingsScreen() {
  const [notifications, setNotifications] = useState({
    periodReminder: true,
    ovulationReminder: false,
    healthTips: true,
  });

  const toggleNotification = (key: keyof typeof notifications) => {
    setNotifications((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const settingsSections = [
    {
      title: '알림 설정',
      icon: Bell,
      items: [
        {
          id: 'periodReminder',
          title: '생리 예정일 알림',
          subtitle: '생리 예정일 1-2일 전 알림',
          type: 'switch',
          value: notifications.periodReminder,
          onPress: () => toggleNotification('periodReminder'),
        },
        {
          id: 'ovulationReminder',
          title: '배란일 알림',
          subtitle: '배란일 및 가임기 알림',
          type: 'switch',
          value: notifications.ovulationReminder,
          onPress: () => toggleNotification('ovulationReminder'),
        },
        {
          id: 'healthTips',
          title: '건강 팁 알림',
          subtitle: '주기별 건강 관리 팁',
          type: 'switch',
          value: notifications.healthTips,
          onPress: () => toggleNotification('healthTips'),
        },
      ],
    },
    {
      title: '주기 설정',
      icon: Calendar,
      items: [
        {
          id: 'editCycle',
          title: '주기 정보 수정',
          subtitle: '평균 주기 및 생리 기간 변경',
          type: 'button',
          onPress: () => console.log('Edit cycle'),
        },
        {
          id: 'cycleHistory',
          title: '주기 기록',
          subtitle: '과거 생리 기록 확인',
          type: 'button',
          onPress: () => console.log('Cycle history'),
        },
      ],
    },
    {
      title: '앱 정보',
      icon: Info,
      items: [
        {
          id: 'about',
          title: '앱 정보',
          subtitle: '버전 1.0.0',
          type: 'button',
          onPress: () => console.log('About'),
        },
        {
          id: 'privacy',
          title: '개인정보 처리방침',
          subtitle: '데이터 보호 정책',
          type: 'button',
          onPress: () => console.log('Privacy'),
        },
        {
          id: 'terms',
          title: '이용약관',
          subtitle: '서비스 이용 규정',
          type: 'button',
          onPress: () => console.log('Terms'),
        },
      ],
    },
  ];

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={Colors.gradients.header as any}
        style={styles.header}
      >
        <Text style={styles.headerTitle}>설정</Text>
        <Text style={styles.headerSubtitle}>개인화 및 앱 설정</Text>
      </LinearGradient>

      <ScrollView
        style={styles.content}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.profileCard}>
          <View style={styles.profileIcon}>
            <User size={32} color={Colors.primary} strokeWidth={2} />
          </View>
          <View style={styles.profileInfo}>
            <Text style={styles.profileName}>사용자</Text>
            <Text style={styles.profileSubtitle}>건강한 주기 관리 중</Text>
          </View>
        </View>

        {settingsSections.map((section) => {
          const IconComponent = section.icon;
          return (
            <View key={section.title} style={styles.sectionCard}>
              <View style={styles.sectionHeader}>
                <IconComponent
                  size={20}
                  color={Colors.primary}
                  strokeWidth={2}
                />
                <Text style={styles.sectionTitle}>{section.title}</Text>
              </View>

              {section.items.map((item) => (
                <TouchableOpacity
                  key={item.id}
                  style={styles.settingItem}
                  onPress={item.onPress}
                >
                  <View style={styles.settingInfo}>
                    <Text style={styles.settingTitle}>{item.title}</Text>
                    <Text style={styles.settingSubtitle}>{item.subtitle}</Text>
                  </View>
                  {item.type === 'switch' ? (
                    <Switch
                      value={item.value}
                      onValueChange={item.onPress}
                      trackColor={{
                        false: Colors.gray[200],
                        true: Colors.primaryLight,
                      }}
                      thumbColor={item.value ? Colors.primary : Colors.white}
                    />
                  ) : (
                    <Text style={styles.settingArrow}>›</Text>
                  )}
                </TouchableOpacity>
              ))}
            </View>
          );
        })}

        <TouchableOpacity style={styles.dangerCard}>
          <Trash2 size={20} color="#DC2626" strokeWidth={2} />
          <View style={styles.dangerInfo}>
            <Text style={styles.dangerTitle}>모든 데이터 삭제</Text>
            <Text style={styles.dangerSubtitle}>주기 기록 및 설정 초기화</Text>
          </View>
        </TouchableOpacity>

        <View style={styles.versionInfo}>
          <Text style={styles.versionText}>생리 달력 v1.0.0</Text>
          <Text style={styles.copyrightText}>건강한 여성을 위한 주기 관리</Text>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  header: {
    paddingTop: Platform.OS === 'ios' ? 60 : 40,
    paddingBottom: Spacing.xl,
    paddingHorizontal: Spacing.xl,
    borderBottomLeftRadius: BorderRadius['3xl'],
    borderBottomRightRadius: BorderRadius['3xl'],
  },
  headerTitle: {
    fontSize: Typography.fontSize['3xl'],
    fontFamily: Typography.fontFamily.bold,
    color: Colors.white,
    textAlign: 'center',
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
  headerSubtitle: {
    fontSize: Typography.fontSize.base,
    fontFamily: Typography.fontFamily.regular,
    color: Colors.white,
    textAlign: 'center',
    marginTop: Spacing.sm,
    opacity: 0.9,
    textShadowColor: 'rgba(0, 0, 0, 0.2)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  content: {
    flex: 1,
  },
  scrollContent: {
    padding: Spacing.xl,
    paddingBottom: Spacing['8xl'],
  },
  profileCard: {
    backgroundColor: Colors.white,
    borderRadius: BorderRadius.xl,
    padding: Spacing.xl,
    marginBottom: Spacing.xl,
    flexDirection: 'row',
    alignItems: 'center',
    ...Shadows.md,
  },
  profileIcon: {
    width: 60,
    height: 60,
    borderRadius: BorderRadius.full,
    backgroundColor: Colors.primaryLight + '20',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: Spacing.lg,
  },
  profileInfo: {
    flex: 1,
  },
  profileName: {
    fontSize: Typography.fontSize.lg,
    fontFamily: Typography.fontFamily.semiBold,
    color: Colors.text.primary,
    marginBottom: Spacing.xs,
  },
  profileSubtitle: {
    fontSize: Typography.fontSize.sm,
    fontFamily: Typography.fontFamily.regular,
    color: Colors.text.secondary,
  },
  sectionCard: {
    backgroundColor: Colors.white,
    borderRadius: BorderRadius.xl,
    padding: Spacing.xl,
    marginBottom: Spacing.xl,
    ...Shadows.md,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Spacing.lg,
  },
  sectionTitle: {
    fontSize: Typography.fontSize.lg,
    fontFamily: Typography.fontFamily.semiBold,
    color: Colors.text.primary,
    marginLeft: Spacing.md,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: Spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: Colors.gray[100],
  },
  settingInfo: {
    flex: 1,
  },
  settingTitle: {
    fontSize: Typography.fontSize.base,
    fontFamily: Typography.fontFamily.medium,
    color: Colors.text.primary,
    marginBottom: 2,
  },
  settingSubtitle: {
    fontSize: Typography.fontSize.sm,
    fontFamily: Typography.fontFamily.regular,
    color: Colors.text.secondary,
  },
  settingArrow: {
    fontSize: Typography.fontSize['2xl'],
    color: Colors.gray[300],
    fontFamily: Typography.fontFamily.regular,
  },
  dangerCard: {
    backgroundColor: Colors.error + '10',
    borderRadius: BorderRadius.xl,
    padding: Spacing.xl,
    marginBottom: Spacing.xl,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.error + '20',
  },
  dangerInfo: {
    marginLeft: Spacing.md,
    flex: 1,
  },
  dangerTitle: {
    fontSize: Typography.fontSize.base,
    fontFamily: Typography.fontFamily.medium,
    color: Colors.error,
    marginBottom: 2,
  },
  dangerSubtitle: {
    fontSize: Typography.fontSize.sm,
    fontFamily: Typography.fontFamily.regular,
    color: Colors.error,
    opacity: 0.8,
  },
  versionInfo: {
    alignItems: 'center',
  },
  versionText: {
    fontSize: Typography.fontSize.sm,
    fontFamily: Typography.fontFamily.medium,
    color: Colors.text.secondary,
    marginBottom: Spacing.xs,
  },
  copyrightText: {
    fontSize: Typography.fontSize.xs,
    fontFamily: Typography.fontFamily.regular,
    color: Colors.text.tertiary,
  },
});
