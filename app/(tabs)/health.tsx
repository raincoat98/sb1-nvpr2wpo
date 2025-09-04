import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Platform,
  Switch,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import {
  Heart,
  Thermometer,
  Activity,
  Coffee,
  Shield,
  CheckCircle,
  Calendar,
} from 'lucide-react-native';
import { useGamification } from '@/contexts/GamificationContext';
import {
  Colors,
  Typography,
  Spacing,
  Gap,
  BorderRadius,
  Shadows,
} from '@/constants/theme';

export default function HealthScreen() {
  const [selectedPeriod, setSelectedPeriod] = useState('period');
  const [selectedTab, setSelectedTab] = useState<
    'info' | 'vaccination' | 'records'
  >('info');
  const { addXP } = useGamification();

  // 접종 관리 상태
  const [vaccinations, setVaccinations] = useState({
    hpv: { completed: false, doses: 0, totalDoses: 3 },
    gardasil: { completed: false, doses: 0, totalDoses: 3 },
    cervicalCancer: { completed: false, doses: 0, totalDoses: 2 },
    mmr: { completed: false, doses: 0, totalDoses: 2 },
    hepatitisB: { completed: false, doses: 0, totalDoses: 3 },
    hepatitisA: { completed: false, doses: 0, totalDoses: 2 },
    flu: { completed: false, doses: 0, totalDoses: 1 },
    tdap: { completed: false, doses: 0, totalDoses: 1 },
  });

  const handleVaccinationComplete = (type: keyof typeof vaccinations) => {
    setVaccinations((prev) => ({
      ...prev,
      [type]: {
        ...prev[type],
        doses: prev[type].doses + 1,
        completed: prev[type].doses + 1 >= prev[type].totalDoses,
      },
    }));

    // 접종 완료 시 경험치 추가
    addXP(20, 'vaccination', `${type} 접종 완료`);
  };

  const handleVaccinationReset = (type: keyof typeof vaccinations) => {
    setVaccinations((prev) => ({
      ...prev,
      [type]: {
        ...prev[type],
        doses: 0,
        completed: false,
      },
    }));
  };

  const handleVaccinationEdit = (
    type: keyof typeof vaccinations,
    newDoses: number
  ) => {
    const totalDoses = vaccinations[type].totalDoses;
    setVaccinations((prev) => ({
      ...prev,
      [type]: {
        ...prev[type],
        doses: Math.min(newDoses, totalDoses),
        completed: newDoses >= totalDoses,
      },
    }));
  };

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
        '충분한 휴식과 수면을 취하세요',
      ],
      symptoms: ['복부 통증', '요통', '피로감', '기분 변화', '부종'],
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
        '금연과 금주로 건강한 생활을 유지하세요',
      ],
      symptoms: ['기초체온 상승', '분비물 증가', '에너지 증가', '집중력 향상'],
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
        '과도한 운동은 피하고 적절한 휴식을 취하세요',
      ],
      symptoms: ['한쪽 난소 통증', '분비물 변화', '기초체온 상승', '성욕 증가'],
    },
  };

  const periods = [
    { key: 'period', label: '생리 기간' },
    { key: 'fertile', label: '가임기' },
    { key: 'ovulation', label: '배란일' },
  ];

  const currentInfo = healthInfo[selectedPeriod as keyof typeof healthInfo];
  const IconComponent = currentInfo.icon;

  const tabs = [
    { key: 'info', label: '건강 정보', icon: Heart },
    { key: 'vaccination', label: '접종 관리', icon: Shield },
    { key: 'records', label: '건강 기록', icon: Activity },
  ];

  const renderHealthInfo = () => (
    <View style={styles.content}>
      <View style={styles.periodSelector}>
        {periods.map((period) => (
          <TouchableOpacity
            key={period.key}
            style={[
              styles.periodButton,
              selectedPeriod === period.key && styles.activePeriodButton,
            ]}
            onPress={() => setSelectedPeriod(period.key)}
          >
            <Text
              style={[
                styles.periodButtonText,
                selectedPeriod === period.key && styles.activePeriodButtonText,
              ]}
            >
              {period.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <View style={[styles.infoCard, { borderLeftColor: currentInfo.color }]}>
        <View style={styles.infoHeader}>
          <IconComponent size={24} color={Colors.primary} strokeWidth={2} />
          <Text style={styles.infoTitle}>{currentInfo.title}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>건강 관리 팁</Text>
          {currentInfo.tips.map((tip: string, index: number) => (
            <View key={index} style={styles.tipItem}>
              <View style={styles.tipBullet} />
              <Text style={styles.tipText}>{tip}</Text>
            </View>
          ))}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>주요 증상</Text>
          <View style={styles.symptomsContainer}>
            {currentInfo.symptoms.map((symptom: string, index: number) => (
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
          심한 통증이나 비정상적인 증상이 지속될 경우 전문의와 상담하세요. 이
          앱은 의학적 조언을 대체할 수 없습니다.
        </Text>
      </View>
    </View>
  );

  const renderVaccination = () => (
    <View style={styles.content}>
      <View style={styles.vaccinationCard}>
        <View style={styles.vaccinationHeader}>
          <Shield size={24} color={Colors.health} />
          <Text style={styles.vaccinationTitle}>예방 접종 관리</Text>
        </View>

        <View style={styles.vaccinationItem}>
          <View style={styles.vaccinationInfo}>
            <Text style={styles.vaccinationName}>HPV 백신</Text>
            <Text style={styles.vaccinationDescription}>자궁경부암 예방</Text>
            <Text style={styles.vaccinationDoses}>
              {vaccinations.hpv.doses}/{vaccinations.hpv.totalDoses}차 완료
            </Text>
          </View>
          <View style={styles.vaccinationActions}>
            {vaccinations.hpv.completed ? (
              <View style={styles.completedBadge}>
                <CheckCircle size={20} color={Colors.success} />
                <Text style={styles.completedText}>완료</Text>
              </View>
            ) : (
              <TouchableOpacity
                style={styles.vaccinationButton}
                onPress={() => handleVaccinationComplete('hpv')}
              >
                <Text style={styles.vaccinationButtonText}>접종 완료</Text>
              </TouchableOpacity>
            )}
            <View style={styles.vaccinationEditActions}>
              <TouchableOpacity
                style={styles.editButton}
                onPress={() => handleVaccinationReset('hpv')}
              >
                <Text style={styles.editButtonText}>리셋</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.editButton}
                onPress={() => {
                  const newDoses =
                    vaccinations.hpv.doses > 0 ? vaccinations.hpv.doses - 1 : 0;
                  handleVaccinationEdit('hpv', newDoses);
                }}
              >
                <Text style={styles.editButtonText}>-1</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        <View style={styles.vaccinationItem}>
          <View style={styles.vaccinationInfo}>
            <Text style={styles.vaccinationName}>가다실 (Gardasil)</Text>
            <Text style={styles.vaccinationDescription}>HPV 4가 백신</Text>
            <Text style={styles.vaccinationDoses}>
              {vaccinations.gardasil.doses}/{vaccinations.gardasil.totalDoses}차
              완료
            </Text>
          </View>
          <View style={styles.vaccinationActions}>
            {vaccinations.gardasil.completed ? (
              <View style={styles.completedBadge}>
                <CheckCircle size={20} color={Colors.success} />
                <Text style={styles.completedText}>완료</Text>
              </View>
            ) : (
              <TouchableOpacity
                style={styles.vaccinationButton}
                onPress={() => handleVaccinationComplete('gardasil')}
              >
                <Text style={styles.vaccinationButtonText}>접종 완료</Text>
              </TouchableOpacity>
            )}
            <View style={styles.vaccinationEditActions}>
              <TouchableOpacity
                style={styles.editButton}
                onPress={() => handleVaccinationReset('gardasil')}
              >
                <Text style={styles.editButtonText}>리셋</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.editButton}
                onPress={() => {
                  const newDoses =
                    vaccinations.gardasil.doses > 0
                      ? vaccinations.gardasil.doses - 1
                      : 0;
                  handleVaccinationEdit('gardasil', newDoses);
                }}
              >
                <Text style={styles.editButtonText}>-1</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        <View style={styles.vaccinationItem}>
          <View style={styles.vaccinationInfo}>
            <Text style={styles.vaccinationName}>자궁경부암 백신</Text>
            <Text style={styles.vaccinationDescription}>추가 예방 접종</Text>
            <Text style={styles.vaccinationDoses}>
              {vaccinations.cervicalCancer.doses}/
              {vaccinations.cervicalCancer.totalDoses}차 완료
            </Text>
          </View>
          <View style={styles.vaccinationActions}>
            {vaccinations.cervicalCancer.completed ? (
              <View style={styles.completedBadge}>
                <CheckCircle size={20} color={Colors.success} />
                <Text style={styles.completedText}>완료</Text>
              </View>
            ) : (
              <TouchableOpacity
                style={styles.vaccinationButton}
                onPress={() => handleVaccinationComplete('cervicalCancer')}
              >
                <Text style={styles.vaccinationButtonText}>접종 완료</Text>
              </TouchableOpacity>
            )}
            <View style={styles.vaccinationEditActions}>
              <TouchableOpacity
                style={styles.editButton}
                onPress={() => handleVaccinationReset('cervicalCancer')}
              >
                <Text style={styles.editButtonText}>리셋</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.editButton}
                onPress={() => {
                  const newDoses =
                    vaccinations.cervicalCancer.doses > 0
                      ? vaccinations.cervicalCancer.doses - 1
                      : 0;
                  handleVaccinationEdit('cervicalCancer', newDoses);
                }}
              >
                <Text style={styles.editButtonText}>-1</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        <View style={styles.vaccinationItem}>
          <View style={styles.vaccinationInfo}>
            <Text style={styles.vaccinationName}>MMR 백신</Text>
            <Text style={styles.vaccinationDescription}>
              홍역, 볼거리, 풍진 예방
            </Text>
            <Text style={styles.vaccinationDoses}>
              {vaccinations.mmr.doses}/{vaccinations.mmr.totalDoses}차 완료
            </Text>
          </View>
          <View style={styles.vaccinationActions}>
            {vaccinations.mmr.completed ? (
              <View style={styles.completedBadge}>
                <CheckCircle size={20} color={Colors.success} />
                <Text style={styles.completedText}>완료</Text>
              </View>
            ) : (
              <TouchableOpacity
                style={styles.vaccinationButton}
                onPress={() => handleVaccinationComplete('mmr')}
              >
                <Text style={styles.vaccinationButtonText}>접종 완료</Text>
              </TouchableOpacity>
            )}
            <View style={styles.vaccinationEditActions}>
              <TouchableOpacity
                style={styles.editButton}
                onPress={() => handleVaccinationReset('mmr')}
              >
                <Text style={styles.editButtonText}>리셋</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.editButton}
                onPress={() => {
                  const newDoses =
                    vaccinations.mmr.doses > 0 ? vaccinations.mmr.doses - 1 : 0;
                  handleVaccinationEdit('mmr', newDoses);
                }}
              >
                <Text style={styles.editButtonText}>-1</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        <View style={styles.vaccinationItem}>
          <View style={styles.vaccinationInfo}>
            <Text style={styles.vaccinationName}>B형 간염 백신</Text>
            <Text style={styles.vaccinationDescription}>간염 예방</Text>
            <Text style={styles.vaccinationDoses}>
              {vaccinations.hepatitisB.doses}/
              {vaccinations.hepatitisB.totalDoses}차 완료
            </Text>
          </View>
          <View style={styles.vaccinationActions}>
            {vaccinations.hepatitisB.completed ? (
              <View style={styles.completedBadge}>
                <CheckCircle size={20} color={Colors.success} />
                <Text style={styles.completedText}>완료</Text>
              </View>
            ) : (
              <TouchableOpacity
                style={styles.vaccinationButton}
                onPress={() => handleVaccinationComplete('hepatitisB')}
              >
                <Text style={styles.vaccinationButtonText}>접종 완료</Text>
              </TouchableOpacity>
            )}
            <View style={styles.vaccinationEditActions}>
              <TouchableOpacity
                style={styles.editButton}
                onPress={() => handleVaccinationReset('hepatitisB')}
              >
                <Text style={styles.editButtonText}>리셋</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.editButton}
                onPress={() => {
                  const newDoses =
                    vaccinations.hepatitisB.doses > 0
                      ? vaccinations.hepatitisB.doses - 1
                      : 0;
                  handleVaccinationEdit('hepatitisB', newDoses);
                }}
              >
                <Text style={styles.editButtonText}>-1</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        <View style={styles.vaccinationItem}>
          <View style={styles.vaccinationInfo}>
            <Text style={styles.vaccinationName}>A형 간염 백신</Text>
            <Text style={styles.vaccinationDescription}>A형 간염 예방</Text>
            <Text style={styles.vaccinationDoses}>
              {vaccinations.hepatitisA.doses}/
              {vaccinations.hepatitisA.totalDoses}차 완료
            </Text>
          </View>
          <View style={styles.vaccinationActions}>
            {vaccinations.hepatitisA.completed ? (
              <View style={styles.completedBadge}>
                <CheckCircle size={20} color={Colors.success} />
                <Text style={styles.completedText}>완료</Text>
              </View>
            ) : (
              <TouchableOpacity
                style={styles.vaccinationButton}
                onPress={() => handleVaccinationComplete('hepatitisA')}
              >
                <Text style={styles.vaccinationButtonText}>접종 완료</Text>
              </TouchableOpacity>
            )}
            <View style={styles.vaccinationEditActions}>
              <TouchableOpacity
                style={styles.editButton}
                onPress={() => handleVaccinationReset('hepatitisA')}
              >
                <Text style={styles.editButtonText}>리셋</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.editButton}
                onPress={() => {
                  const newDoses =
                    vaccinations.hepatitisA.doses > 0
                      ? vaccinations.hepatitisA.doses - 1
                      : 0;
                  handleVaccinationEdit('hepatitisA', newDoses);
                }}
              >
                <Text style={styles.editButtonText}>-1</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        <View style={styles.vaccinationItem}>
          <View style={styles.vaccinationInfo}>
            <Text style={styles.vaccinationName}>독감 백신</Text>
            <Text style={styles.vaccinationDescription}>인플루엔자 예방</Text>
            <Text style={styles.vaccinationDoses}>
              {vaccinations.flu.doses}/{vaccinations.flu.totalDoses}차 완료
            </Text>
          </View>
          <View style={styles.vaccinationActions}>
            {vaccinations.flu.completed ? (
              <View style={styles.completedBadge}>
                <CheckCircle size={20} color={Colors.success} />
                <Text style={styles.completedText}>완료</Text>
              </View>
            ) : (
              <TouchableOpacity
                style={styles.vaccinationButton}
                onPress={() => handleVaccinationComplete('flu')}
              >
                <Text style={styles.vaccinationButtonText}>접종 완료</Text>
              </TouchableOpacity>
            )}
            <View style={styles.vaccinationEditActions}>
              <TouchableOpacity
                style={styles.editButton}
                onPress={() => handleVaccinationReset('flu')}
              >
                <Text style={styles.editButtonText}>리셋</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.editButton}
                onPress={() => {
                  const newDoses =
                    vaccinations.flu.doses > 0 ? vaccinations.flu.doses - 1 : 0;
                  handleVaccinationEdit('flu', newDoses);
                }}
              >
                <Text style={styles.editButtonText}>-1</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        <View style={styles.vaccinationItem}>
          <View style={styles.vaccinationInfo}>
            <Text style={styles.vaccinationName}>Tdap 백신</Text>
            <Text style={styles.vaccinationDescription}>
              파상풍, 디프테리아, 백일해 예방
            </Text>
            <Text style={styles.vaccinationDoses}>
              {vaccinations.tdap.doses}/{vaccinations.tdap.totalDoses}차 완료
            </Text>
          </View>
          <View style={styles.vaccinationActions}>
            {vaccinations.tdap.completed ? (
              <View style={styles.completedBadge}>
                <CheckCircle size={20} color={Colors.success} />
                <Text style={styles.completedText}>완료</Text>
              </View>
            ) : (
              <TouchableOpacity
                style={styles.vaccinationButton}
                onPress={() => handleVaccinationComplete('tdap')}
              >
                <Text style={styles.vaccinationButtonText}>접종 완료</Text>
              </TouchableOpacity>
            )}
            <View style={styles.vaccinationEditActions}>
              <TouchableOpacity
                style={styles.editButton}
                onPress={() => handleVaccinationReset('tdap')}
              >
                <Text style={styles.editButtonText}>리셋</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.editButton}
                onPress={() => {
                  const newDoses =
                    vaccinations.tdap.doses > 0
                      ? vaccinations.tdap.doses - 1
                      : 0;
                  handleVaccinationEdit('tdap', newDoses);
                }}
              >
                <Text style={styles.editButtonText}>-1</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>

      <View style={styles.reminderCard}>
        <Calendar size={20} color={Colors.primary} />
        <View style={styles.reminderInfo}>
          <Text style={styles.reminderTitle}>다음 접종 알림</Text>
          <Text style={styles.reminderText}>
            정기적인 건강 검진과 예방 접종을 통해 건강을 관리하세요
          </Text>
        </View>
      </View>
    </View>
  );

  const renderHealthRecords = () => (
    <View style={styles.content}>
      <View style={styles.recordCard}>
        <Text style={styles.recordTitle}>오늘의 건강 체크</Text>

        <View style={styles.recordItem}>
          <Thermometer size={20} color={Colors.primary} />
          <Text style={styles.recordLabel}>체온</Text>
          <Text style={styles.recordValue}>36.5°C</Text>
        </View>

        <View style={styles.recordItem}>
          <Activity size={20} color={Colors.primary} />
          <Text style={styles.recordLabel}>체중</Text>
          <Text style={styles.recordValue}>55kg</Text>
        </View>

        <View style={styles.recordItem}>
          <Heart size={20} color={Colors.primary} />
          <Text style={styles.recordLabel}>기분</Text>
          <Text style={styles.recordValue}>😊 좋음</Text>
        </View>

        <TouchableOpacity style={styles.recordButton}>
          <Text style={styles.recordButtonText}>기록 수정하기</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={Colors.gradients.header as any}
        style={styles.header}
      >
        <Text style={styles.headerTitle}>건강 체크</Text>
        <Text style={styles.headerSubtitle}>종합 건강 관리</Text>
      </LinearGradient>

      <View style={styles.tabContainer}>
        {tabs.map((tab) => {
          const IconComponent = tab.icon;
          return (
            <TouchableOpacity
              key={tab.key}
              style={[styles.tab, selectedTab === tab.key && styles.activeTab]}
              onPress={() => setSelectedTab(tab.key as any)}
            >
              <IconComponent
                size={20}
                color={
                  selectedTab === tab.key ? Colors.white : Colors.gray[500]
                }
              />
              <Text
                style={[
                  styles.tabText,
                  selectedTab === tab.key && styles.activeTabText,
                ]}
              >
                {tab.label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {selectedTab === 'info' && renderHealthInfo()}
        {selectedTab === 'vaccination' && renderVaccination()}
        {selectedTab === 'records' && renderHealthRecords()}
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
  tabContainer: {
    flexDirection: 'row',
    margin: Spacing.xl,
    backgroundColor: Colors.white,
    borderRadius: BorderRadius['2xl'],
    padding: Spacing.xs,
    ...Shadows.md,
  },
  tab: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.sm,
    borderRadius: BorderRadius.xl,
  },
  activeTab: {
    backgroundColor: Colors.primary,
  },
  tabText: {
    fontSize: Typography.fontSize.sm,
    fontFamily: Typography.fontFamily.medium,
    color: Colors.gray[500],
    marginLeft: Spacing.xs,
  },
  activeTabText: {
    color: Colors.white,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: Spacing['6xl'],
  },
  content: {
    padding: Spacing.xl,
  },
  periodSelector: {
    flexDirection: 'row',
    marginBottom: Spacing.xl,
    backgroundColor: Colors.white,
    borderRadius: BorderRadius['2xl'],
    padding: Spacing.xs,
    ...Shadows.md,
  },
  periodButton: {
    flex: 1,
    paddingVertical: Spacing.md,
    borderRadius: BorderRadius.xl,
    alignItems: 'center',
  },
  activePeriodButton: {
    backgroundColor: Colors.primary,
  },
  periodButtonText: {
    fontSize: Typography.fontSize.sm,
    fontFamily: Typography.fontFamily.medium,
    color: Colors.gray[500],
  },
  activePeriodButtonText: {
    color: Colors.white,
  },
  infoCard: {
    backgroundColor: Colors.white,
    borderRadius: BorderRadius.xl,
    padding: Spacing.xl,
    marginBottom: Spacing.xl,
    borderLeftWidth: 4,
    ...Shadows.md,
  },
  infoHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Spacing.xl,
  },
  infoTitle: {
    fontSize: Typography.fontSize.xl,
    fontFamily: Typography.fontFamily.semiBold,
    color: Colors.text.primary,
    marginLeft: Spacing.md,
  },
  section: {
    marginBottom: Spacing.xl,
  },
  sectionTitle: {
    fontSize: Typography.fontSize.base,
    fontFamily: Typography.fontFamily.semiBold,
    color: Colors.text.primary,
    marginBottom: Spacing.md,
  },
  tipItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: Spacing.sm,
  },
  tipBullet: {
    width: 6,
    height: 6,
    borderRadius: BorderRadius.sm,
    backgroundColor: Colors.primary,
    marginTop: Spacing.sm,
    marginRight: Spacing.md,
  },
  tipText: {
    flex: 1,
    fontSize: Typography.fontSize.sm,
    fontFamily: Typography.fontFamily.regular,
    color: Colors.text.secondary,
    lineHeight: Typography.lineHeight.relaxed * Typography.fontSize.sm,
  },
  symptomsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Gap.sm,
  },
  symptomChip: {
    backgroundColor: Colors.primaryLight,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    borderRadius: BorderRadius['2xl'],
    marginBottom: Spacing.sm,
  },
  symptomText: {
    fontSize: Typography.fontSize.xs,
    fontFamily: Typography.fontFamily.medium,
    color: Colors.white,
  },
  emergencyCard: {
    backgroundColor: Colors.error + '10',
    borderRadius: BorderRadius.xl,
    padding: Spacing.xl,
    marginBottom: Spacing['3xl'],
    borderWidth: 1,
    borderColor: Colors.error + '20',
  },
  emergencyTitle: {
    fontSize: Typography.fontSize.base,
    fontFamily: Typography.fontFamily.semiBold,
    color: Colors.error,
    marginBottom: Spacing.sm,
  },
  emergencyText: {
    fontSize: Typography.fontSize.sm,
    fontFamily: Typography.fontFamily.regular,
    color: Colors.text.secondary,
    lineHeight: Typography.lineHeight.relaxed * Typography.fontSize.sm,
  },
  vaccinationCard: {
    backgroundColor: Colors.white,
    borderRadius: BorderRadius.xl,
    padding: Spacing.xl,
    marginBottom: Spacing.xl,
    ...Shadows.md,
  },
  vaccinationHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Spacing.xl,
  },
  vaccinationTitle: {
    fontSize: Typography.fontSize.lg,
    fontFamily: Typography.fontFamily.semiBold,
    color: Colors.text.primary,
    marginLeft: Spacing.md,
  },
  vaccinationItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    paddingVertical: Spacing.lg,
    borderBottomWidth: 1,
    borderBottomColor: Colors.gray[100],
  },
  vaccinationInfo: {
    flex: 1,
  },
  vaccinationName: {
    fontSize: Typography.fontSize.base,
    fontFamily: Typography.fontFamily.semiBold,
    color: Colors.text.primary,
    marginBottom: 2,
  },
  vaccinationDescription: {
    fontSize: Typography.fontSize.sm,
    fontFamily: Typography.fontFamily.regular,
    color: Colors.text.secondary,
    marginBottom: 2,
  },
  vaccinationDoses: {
    fontSize: Typography.fontSize.xs,
    fontFamily: Typography.fontFamily.medium,
    color: Colors.health,
  },
  vaccinationActions: {
    alignItems: 'flex-end',
    minWidth: 120,
  },
  vaccinationEditActions: {
    flexDirection: 'row',
    marginTop: Spacing.sm,
    gap: Gap.xs,
    justifyContent: 'flex-end',
  },
  editButton: {
    backgroundColor: Colors.gray[200],
    paddingHorizontal: Spacing.sm,
    paddingVertical: Spacing.xs,
    borderRadius: BorderRadius.md,
    minWidth: 40,
    alignItems: 'center',
  },
  editButtonText: {
    fontSize: Typography.fontSize.xs,
    fontFamily: Typography.fontFamily.medium,
    color: Colors.gray[600],
  },
  completedBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.success,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    borderRadius: BorderRadius.full,
  },
  completedText: {
    fontSize: Typography.fontSize.xs,
    fontFamily: Typography.fontFamily.semiBold,
    color: Colors.white,
    marginLeft: Spacing.xs,
  },
  vaccinationButton: {
    backgroundColor: Colors.health,
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.sm,
    borderRadius: BorderRadius.full,
  },
  vaccinationButtonText: {
    fontSize: Typography.fontSize.sm,
    fontFamily: Typography.fontFamily.semiBold,
    color: Colors.white,
  },
  reminderCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.white,
    borderRadius: BorderRadius.xl,
    padding: Spacing.lg,
    marginBottom: Spacing.xl,
    ...Shadows.md,
  },
  reminderInfo: {
    flex: 1,
    marginLeft: Spacing.md,
  },
  reminderTitle: {
    fontSize: Typography.fontSize.base,
    fontFamily: Typography.fontFamily.semiBold,
    color: Colors.text.primary,
    marginBottom: 2,
  },
  reminderText: {
    fontSize: Typography.fontSize.sm,
    fontFamily: Typography.fontFamily.regular,
    color: Colors.text.secondary,
  },
  recordCard: {
    backgroundColor: Colors.white,
    borderRadius: BorderRadius.xl,
    padding: Spacing.xl,
    marginBottom: Spacing.xl,
    ...Shadows.md,
  },
  recordTitle: {
    fontSize: Typography.fontSize.lg,
    fontFamily: Typography.fontFamily.semiBold,
    color: Colors.text.primary,
    marginBottom: Spacing.lg,
  },
  recordItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: Spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: Colors.gray[100],
  },
  recordLabel: {
    flex: 1,
    fontSize: Typography.fontSize.base,
    fontFamily: Typography.fontFamily.medium,
    color: Colors.text.primary,
    marginLeft: Spacing.md,
  },
  recordValue: {
    fontSize: Typography.fontSize.base,
    fontFamily: Typography.fontFamily.semiBold,
    color: Colors.primary,
  },
  recordButton: {
    backgroundColor: Colors.primary,
    paddingVertical: Spacing.lg,
    borderRadius: BorderRadius.xl,
    alignItems: 'center',
    marginTop: Spacing.lg,
  },
  recordButtonText: {
    fontSize: Typography.fontSize.base,
    fontFamily: Typography.fontFamily.semiBold,
    color: Colors.white,
  },
});
