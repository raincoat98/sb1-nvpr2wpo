import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Platform } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Heart, Thermometer, Activity, Coffee } from 'lucide-react-native';

export default function HealthScreen() {
  const [selectedPeriod, setSelectedPeriod] = useState('period');

  const healthInfo = {
    period: {
      title: '생리 기간',
      color: '#FFB6C1',
      icon: Heart,
      tips: [
        '충분한 수분 섭취로 체내 독소를 배출하세요',
        '따뜻한 찜질팩으로 복부 통증을 완화하세요',
        '가벼운 요가나 스트레칭으로 몸의 긴장을 풀어주세요',
        '철분이 풍부한 음식을 섭취하세요',
        '충분한 휴식과 수면을 취하세요'
      ],
      symptoms: ['복부 통증', '요통', '피로감', '기분 변화', '부종']
    },
    fertile: {
      title: '가임기',
      color: '#E6E6FA',
      icon: Activity,
      tips: [
        '균형 잡힌 영양소 섭취로 몸 컨디션을 최적화하세요',
        '규칙적인 운동으로 혈액 순환을 개선하세요',
        '스트레스 관리에 더욱 신경 쓰세요',
        '충분한 엽산 섭취를 권장합니다',
        '금연과 금주로 건강한 생활을 유지하세요'
      ],
      symptoms: ['기초체온 상승', '분비물 증가', '에너지 증가', '집중력 향상']
    },
    ovulation: {
      title: '배란일',
      color: '#FFE4B5',
      icon: Thermometer,
      tips: [
        '기초체온이 약간 상승할 수 있습니다',
        '가임력이 가장 높은 시기입니다',
        '몸의 변화를 세심하게 관찰해보세요',
        '충분한 수분 섭취가 중요합니다',
        '과도한 운동은 피하고 적절한 휴식을 취하세요'
      ],
      symptoms: ['한쪽 난소 통증', '분비물 변화', '기초체온 상승', '성욕 증가']
    }
  };

  const periods = [
    { key: 'period', label: '생리 기간' },
    { key: 'fertile', label: '가임기' },
    { key: 'ovulation', label: '배란일' }
  ];

  const currentInfo = healthInfo[selectedPeriod];
  const IconComponent = currentInfo.icon;

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#FFE4E1', '#FFF0F5']}
        style={styles.header}>
        <Text style={styles.headerTitle}>건강 정보</Text>
        <Text style={styles.headerSubtitle}>주기별 건강 관리 가이드</Text>
      </LinearGradient>

      <View style={styles.periodSelector}>
        {periods.map((period) => (
          <TouchableOpacity
            key={period.key}
            style={[
              styles.periodButton,
              selectedPeriod === period.key && styles.activePeriodButton
            ]}
            onPress={() => setSelectedPeriod(period.key)}>
            <Text style={[
              styles.periodButtonText,
              selectedPeriod === period.key && styles.activePeriodButtonText
            ]}>
              {period.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={[styles.infoCard, { borderLeftColor: currentInfo.color }]}>
          <View style={styles.infoHeader}>
            <IconComponent size={24} color="#FF69B4" strokeWidth={2} />
            <Text style={styles.infoTitle}>{currentInfo.title}</Text>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>건강 관리 팁</Text>
            {currentInfo.tips.map((tip, index) => (
              <View key={index} style={styles.tipItem}>
                <View style={styles.tipBullet} />
                <Text style={styles.tipText}>{tip}</Text>
              </View>
            ))}
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>주요 증상</Text>
            <View style={styles.symptomsContainer}>
              {currentInfo.symptoms.map((symptom, index) => (
                <View key={index} style={styles.symptomChip}>
                  <Text style={styles.symptomText}>{symptom}</Text>
                </View>
              ))}
            </View>
          </View>
        </View>

        <View style={styles.emergencyCard}>
          <Text style={styles.emergencyTitle}>🚨 주의사항</Text>
          <Text style={styles.emergencyText}>
            심한 통증이나 비정상적인 증상이 지속될 경우 전문의와 상담하세요.
            이 앱은 의학적 조언을 대체할 수 없습니다.
          </Text>
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
  periodSelector: {
    flexDirection: 'row',
    margin: 20,
    backgroundColor: '#FFFFFF',
    borderRadius: 25,
    padding: 4,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  periodButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 20,
    alignItems: 'center',
  },
  activePeriodButton: {
    backgroundColor: '#FF69B4',
  },
  periodButtonText: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#696969',
  },
  activePeriodButtonText: {
    color: '#FFFFFF',
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  infoCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    padding: 20,
    marginBottom: 20,
    borderLeftWidth: 4,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  infoHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  infoTitle: {
    fontSize: 20,
    fontFamily: 'Inter-SemiBold',
    color: '#2D2D2D',
    marginLeft: 12,
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#2D2D2D',
    marginBottom: 12,
  },
  tipItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  tipBullet: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#FF69B4',
    marginTop: 8,
    marginRight: 12,
  },
  tipText: {
    flex: 1,
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#444444',
    lineHeight: 22,
  },
  symptomsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  symptomChip: {
    backgroundColor: '#FFE4E1',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    marginBottom: 8,
  },
  symptomText: {
    fontSize: 12,
    fontFamily: 'Inter-Medium',
    color: '#8B0000',
  },
  emergencyCard: {
    backgroundColor: '#FFF5F5',
    borderRadius: 15,
    padding: 20,
    marginBottom: 30,
    borderWidth: 1,
    borderColor: '#FFE4E1',
  },
  emergencyTitle: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#DC2626',
    marginBottom: 8,
  },
  emergencyText: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#6B7280',
    lineHeight: 20,
  },
});