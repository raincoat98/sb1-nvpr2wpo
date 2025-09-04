import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Switch, Platform } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { User, Bell, Calendar, Info, Trash2 } from 'lucide-react-native';

export default function SettingsScreen() {
  const [notifications, setNotifications] = useState({
    periodReminder: true,
    ovulationReminder: false,
    healthTips: true,
  });

  const toggleNotification = (key) => {
    setNotifications(prev => ({
      ...prev,
      [key]: !prev[key]
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
          onPress: () => toggleNotification('periodReminder')
        },
        {
          id: 'ovulationReminder',
          title: '배란일 알림',
          subtitle: '배란일 및 가임기 알림',
          type: 'switch',
          value: notifications.ovulationReminder,
          onPress: () => toggleNotification('ovulationReminder')
        },
        {
          id: 'healthTips',
          title: '건강 팁 알림',
          subtitle: '주기별 건강 관리 팁',
          type: 'switch',
          value: notifications.healthTips,
          onPress: () => toggleNotification('healthTips')
        }
      ]
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
          onPress: () => console.log('Edit cycle')
        },
        {
          id: 'cycleHistory',
          title: '주기 기록',
          subtitle: '과거 생리 기록 확인',
          type: 'button',
          onPress: () => console.log('Cycle history')
        }
      ]
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
          onPress: () => console.log('About')
        },
        {
          id: 'privacy',
          title: '개인정보 처리방침',
          subtitle: '데이터 보호 정책',
          type: 'button',
          onPress: () => console.log('Privacy')
        },
        {
          id: 'terms',
          title: '이용약관',
          subtitle: '서비스 이용 규정',
          type: 'button',
          onPress: () => console.log('Terms')
        }
      ]
    }
  ];

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#FFE4E1', '#FFF0F5']}
        style={styles.header}>
        <Text style={styles.headerTitle}>설정</Text>
        <Text style={styles.headerSubtitle}>개인화 및 앱 설정</Text>
      </LinearGradient>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.profileCard}>
          <View style={styles.profileIcon}>
            <User size={32} color="#FF69B4" strokeWidth={2} />
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
                <IconComponent size={20} color="#FF69B4" strokeWidth={2} />
                <Text style={styles.sectionTitle}>{section.title}</Text>
              </View>

              {section.items.map((item) => (
                <TouchableOpacity
                  key={item.id}
                  style={styles.settingItem}
                  onPress={item.onPress}>
                  <View style={styles.settingInfo}>
                    <Text style={styles.settingTitle}>{item.title}</Text>
                    <Text style={styles.settingSubtitle}>{item.subtitle}</Text>
                  </View>
                  {item.type === 'switch' ? (
                    <Switch
                      value={item.value}
                      onValueChange={item.onPress}
                      trackColor={{ false: '#F0F0F0', true: '#FFB6C1' }}
                      thumbColor={item.value ? '#FF69B4' : '#FFFFFF'}
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
    backgroundColor: '#FAFAFA',
  },
  header: {
    paddingTop: Platform.OS === 'ios' ? 60 : 40,
    paddingBottom: 20,
    paddingHorizontal: 20,
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
  },
  headerTitle: {
    fontSize: 28,
    fontFamily: 'Inter-Bold',
    color: '#8B0000',
    textAlign: 'center',
  },
  headerSubtitle: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#696969',
    textAlign: 'center',
    marginTop: 4,
  },
  content: {
    flex: 1,
    padding: 20,
  },
  profileCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    padding: 20,
    marginBottom: 20,
    flexDirection: 'row',
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  profileIcon: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#FFE4E1',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  profileInfo: {
    flex: 1,
  },
  profileName: {
    fontSize: 18,
    fontFamily: 'Inter-SemiBold',
    color: '#2D2D2D',
    marginBottom: 4,
  },
  profileSubtitle: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#696969',
  },
  sectionCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    padding: 20,
    marginBottom: 20,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: 'Inter-SemiBold',
    color: '#2D2D2D',
    marginLeft: 12,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F8F8F8',
  },
  settingInfo: {
    flex: 1,
  },
  settingTitle: {
    fontSize: 16,
    fontFamily: 'Inter-Medium',
    color: '#2D2D2D',
    marginBottom: 2,
  },
  settingSubtitle: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#696969',
  },
  settingArrow: {
    fontSize: 24,
    color: '#D3D3D3',
    fontFamily: 'Inter-Regular',
  },
  dangerCard: {
    backgroundColor: '#FFF5F5',
    borderRadius: 15,
    padding: 20,
    marginBottom: 20,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#FFE4E1',
  },
  dangerInfo: {
    marginLeft: 12,
    flex: 1,
  },
  dangerTitle: {
    fontSize: 16,
    fontFamily: 'Inter-Medium',
    color: '#DC2626',
    marginBottom: 2,
  },
  dangerSubtitle: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#991B1B',
  },
  versionInfo: {
    alignItems: 'center',
    marginBottom: 30,
  },
  versionText: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#696969',
    marginBottom: 4,
  },
  copyrightText: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: '#A0A0A0',
  },
});