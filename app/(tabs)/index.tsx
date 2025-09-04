import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView, Platform } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Calendar, CalendarProps } from 'react-native-calendars';
import {
  Plus,
  Heart,
  Calendar as CalendarIcon,
  Target,
  Activity,
} from 'lucide-react-native';
import { Card, Text, Button, FAB, useTheme } from 'react-native-paper';
import { CycleCalculator } from '@/components/CycleCalculator';
import { CycleInput } from '@/components/CycleInput';
import { DashboardCard } from '@/components/DashboardCard';
import { ProgressBar } from '@/components/ProgressBar';
import { LevelBadge } from '@/components/LevelBadge';
import { useGamification } from '@/contexts/GamificationContext';
import {
  Colors,
  Typography,
  Spacing,
  Gap,
  BorderRadius,
  Shadows,
} from '@/constants/theme';

export default function HomeScreen() {
  const [cycleData, setCycleData] = useState(null);
  const [periodRecords, setPeriodRecords] = useState([]);
  const [showInput, setShowInput] = useState(false);
  const [markedDates, setMarkedDates] = useState({});
  const { state: gamificationState, addXP } = useGamification();
  const theme = useTheme();

  useEffect(() => {
    generateMarkedDates();
  }, [cycleData, periodRecords]);

  const generateMarkedDates = () => {
    const marks = {};

    // Mark actual period records
    periodRecords.forEach((record) => {
      const startDate = new Date(record.startDate);
      for (let day = 0; day < record.duration; day++) {
        const periodDay = new Date(startDate);
        periodDay.setDate(startDate.getDate() + day);
        const dateString = periodDay.toISOString().split('T')[0];

        marks[dateString] = {
          color: Colors.period,
          textColor: Colors.white,
          marked: true,
          dotColor: Colors.period,
        };
      }
    });

    // If we have cycle data, also show predictions
    if (cycleData && periodRecords.length > 0) {
      const lastRecord = periodRecords[periodRecords.length - 1];
      const lastPeriodDate = new Date(lastRecord.startDate);

      // Calculate next 3 cycles
      for (let cycle = 1; cycle <= 3; cycle++) {
        const cycleStart = new Date(lastPeriodDate);
        cycleStart.setDate(
          lastPeriodDate.getDate() + cycle * cycleData.cycleLength
        );

        // Predicted period days (lighter red)
        for (let day = 0; day < cycleData.periodLength; day++) {
          const periodDay = new Date(cycleStart);
          periodDay.setDate(cycleStart.getDate() + day);
          const dateString = periodDay.toISOString().split('T')[0];

          if (!marks[dateString]) {
            marks[dateString] = {
              color: Colors.period + '80', // 50% opacity
              textColor: Colors.white,
              marked: true,
              dotColor: Colors.period + '80',
            };
          }
        }

        // Ovulation day (orange)
        const ovulationDay = new Date(cycleStart);
        ovulationDay.setDate(
          cycleStart.getDate() + Math.floor(cycleData.cycleLength / 2)
        );
        const ovulationString = ovulationDay.toISOString().split('T')[0];

        if (!marks[ovulationString]) {
          marks[ovulationString] = {
            color: Colors.ovulation,
            textColor: Colors.white,
            marked: true,
            dotColor: Colors.ovulation,
          };
        }

        // Fertile window (purple) - 5 days around ovulation
        for (let day = -2; day <= 2; day++) {
          const fertileDay = new Date(ovulationDay);
          fertileDay.setDate(ovulationDay.getDate() + day);
          const fertileDateString = fertileDay.toISOString().split('T')[0];

          if (!marks[fertileDateString]) {
            marks[fertileDateString] = {
              color: Colors.fertile,
              textColor: Colors.white,
              marked: true,
              dotColor: Colors.fertile,
            };
          }
        }
      }
    }

    setMarkedDates(marks);
  };

  const handleCycleSubmit = (data) => {
    setCycleData(data);

    // Add the period record
    const newRecord = {
      id: Date.now(),
      startDate: data.lastPeriodDate,
      duration: data.periodLength,
      cycleLength: data.cycleLength,
      createdAt: new Date().toISOString(),
    };

    setPeriodRecords((prev) => [...prev, newRecord]);
    setShowInput(false);

    // 생리 기록 시 경험치 추가
    addXP(10, 'period_record', '생리 기록 완료');
  };

  const handleRecordToday = () => {
    // 오늘 기록하기 버튼 클릭 시 경험치 추가
    addXP(5, 'symptom_record', '오늘 기록 완료');
  };

  const handleHealthCheck = () => {
    // 건강 체크 버튼 클릭 시 경험치 추가
    addXP(15, 'health_check', '건강 체크 완료');
  };

  return (
    <View style={styles.container}>
      <LinearGradient colors={Colors.gradients.header} style={styles.header}>
        <Text variant="headlineMedium" style={styles.headerTitle}>
          주기를 기록하고, 건강을 쌓다
        </Text>
        <Text variant="bodyLarge" style={styles.headerSubtitle}>
          오늘은 생리 3일차 ❤️
        </Text>
      </LinearGradient>

      <ScrollView
        style={styles.content}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* 레벨 배지 */}
        <View style={styles.levelBadgeContainer}>
          <LevelBadge
            level={gamificationState.userProfile.level}
            currentXP={gamificationState.userProfile.currentXP}
            totalXP={gamificationState.userProfile.totalXP}
          />
        </View>

        {/* 대시보드 카드들 */}
        <View style={styles.dashboardGrid}>
          <DashboardCard
            title="다음 생리까지"
            subtitle="예상일"
            value="D-25"
            icon={<CalendarIcon size={20} color={Colors.white} />}
            gradient={Colors.gradients.primary}
            style={styles.dashboardCard}
          />

          <DashboardCard
            title="현재 연속 기록"
            subtitle="일"
            value={gamificationState.currentStreak}
            icon={<Target size={20} color={Colors.white} />}
            gradient={Colors.gradients.secondary}
            style={styles.dashboardCard}
          />
        </View>

        {/* 목표 진행도 */}
        <View style={styles.progressContainer}>
          <Text variant="titleMedium" style={styles.progressTitle}>
            이번 주 목표
          </Text>
          <ProgressBar
            progress={75}
            label="주기 기록 7일 연속"
            color={Colors.gradients.health}
          />
        </View>

        {/* 액션 버튼들 */}
        <View style={styles.actionButtons}>
          <Button
            mode="contained"
            onPress={handleRecordToday}
            style={[styles.actionButton, styles.primaryButton]}
            contentStyle={styles.buttonContent}
            icon={() => <Heart size={20} color={Colors.white} />}
          >
            오늘 기록하기
          </Button>

          <Button
            mode="outlined"
            onPress={handleHealthCheck}
            style={[styles.actionButton, styles.secondaryButton]}
            contentStyle={styles.buttonContent}
            icon={() => <Activity size={20} color={Colors.primary} />}
            textColor={Colors.primary}
          >
            건강 체크
          </Button>
        </View>

        {/* 달력 섹션 */}
        <View style={styles.calendarContainer}>
          <View style={styles.calendarHeader}>
            <Text variant="titleLarge" style={styles.sectionTitle}>
              주기 달력
            </Text>
            <Button
              mode="text"
              onPress={() => setShowInput(true)}
              style={styles.addButton}
              icon={() => (
                <Plus size={16} color={Colors.primary} strokeWidth={2} />
              )}
            />
          </View>

          <Calendar
            style={styles.calendar}
            theme={{
              backgroundColor: Colors.white,
              calendarBackground: Colors.white,
              textSectionTitleColor: Colors.primary,
              selectedDayBackgroundColor: Colors.primary,
              selectedDayTextColor: Colors.white,
              todayTextColor: Colors.primary,
              dayTextColor: Colors.text.primary,
              textDisabledColor: Colors.gray[300],
              monthTextColor: Colors.primary,
              indicatorColor: Colors.primary,
              textDayFontFamily: Typography.fontFamily.regular,
              textMonthFontFamily: Typography.fontFamily.semiBold,
              textDayHeaderFontFamily: Typography.fontFamily.medium,
              textDayFontSize: Typography.fontSize.sm,
              textMonthFontSize: Typography.fontSize.lg,
              textDayHeaderFontSize: Typography.fontSize.xs,
            }}
            markingType={'period'}
            markedDates={markedDates}
            firstDay={1}
            showWeekNumbers={false}
          />
        </View>

        {!cycleData && periodRecords.length === 0 && (
          <View style={styles.welcomeContainer}>
            <Text variant="headlineSmall" style={styles.welcomeTitle}>
              첫 번째 주기를 입력해주세요
            </Text>
            <Text variant="bodyMedium" style={styles.welcomeSubtitle}>
              정확한 예측을 위해 최근 생리 정보가 필요합니다
            </Text>
            <Button
              mode="contained"
              onPress={() => setShowInput(true)}
              style={styles.startButton}
              contentStyle={styles.buttonContent}
              icon={() => (
                <Plus size={20} color={Colors.white} strokeWidth={2} />
              )}
            >
              시작하기
            </Button>
          </View>
        )}

        {cycleData && (
          <>
            <CycleCalculator cycleData={cycleData} />

            <View style={styles.legendContainer}>
              <Text variant="titleMedium" style={styles.legendTitle}>
                주기 안내
              </Text>
              <View style={styles.legendRow}>
                <View style={styles.legendItem}>
                  <View
                    style={[
                      styles.legendColor,
                      { backgroundColor: Colors.period },
                    ]}
                  />
                  <Text variant="bodyMedium" style={styles.legendText}>
                    생리 기간
                  </Text>
                </View>
                <View style={styles.legendItem}>
                  <View
                    style={[
                      styles.legendColor,
                      { backgroundColor: Colors.fertile },
                    ]}
                  />
                  <Text variant="bodyMedium" style={styles.legendText}>
                    가임기
                  </Text>
                </View>
                <View style={styles.legendItem}>
                  <View
                    style={[
                      styles.legendColor,
                      { backgroundColor: Colors.ovulation },
                    ]}
                  />
                  <Text variant="bodyMedium" style={styles.legendText}>
                    배란일
                  </Text>
                </View>
              </View>
            </View>
          </>
        )}
      </ScrollView>

      <CycleInput
        visible={showInput}
        onClose={() => setShowInput(false)}
        onSubmit={handleCycleSubmit}
      />
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
    padding: Spacing['2xl'],
    paddingBottom: Spacing['8xl'],
  },
  levelBadgeContainer: {
    marginBottom: Spacing['2xl'],
  },
  dashboardGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: Spacing['2xl'],
    gap: Gap.lg,
  },
  dashboardCard: {
    flex: 1,
  },
  progressContainer: {
    backgroundColor: Colors.white,
    borderRadius: BorderRadius.xl,
    padding: Spacing.xl,
    marginBottom: Spacing['2xl'],
    ...Shadows.md,
  },
  progressTitle: {
    fontSize: Typography.fontSize.lg,
    fontFamily: Typography.fontFamily.semiBold,
    color: Colors.text.primary,
    marginBottom: Spacing.lg,
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: Spacing['2xl'],
    gap: Gap.lg,
  },
  actionButton: {
    flex: 1,
    borderRadius: BorderRadius['2xl'],
    ...Shadows.md,
  },
  primaryButton: {
    backgroundColor: Colors.primary,
  },
  secondaryButton: {
    backgroundColor: Colors.white,
    borderWidth: 2,
    borderColor: Colors.primary,
  },
  buttonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: Spacing.xl,
    paddingHorizontal: Spacing['2xl'],
    gap: Gap.md,
  },
  sectionTitle: {
    fontSize: Typography.fontSize.lg,
    fontFamily: Typography.fontFamily.semiBold,
    color: Colors.text.primary,
    marginBottom: Spacing.md,
  },
  welcomeContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: Spacing['6xl'],
    gap: Spacing.xl,
  },
  welcomeTitle: {
    fontSize: Typography.fontSize['2xl'],
    fontFamily: Typography.fontFamily.bold,
    color: Colors.text.primary,
    textAlign: 'center',
    textShadowColor: 'rgba(0, 0, 0, 0.1)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  welcomeSubtitle: {
    fontSize: Typography.fontSize.base,
    fontFamily: Typography.fontFamily.regular,
    color: Colors.text.secondary,
    textAlign: 'center',
    lineHeight: Typography.lineHeight.relaxed * Typography.fontSize.base,
    paddingHorizontal: Spacing.xl,
  },
  startButton: {
    backgroundColor: Colors.primary,
    borderRadius: BorderRadius['2xl'],
    ...Shadows.lg,
  },
  calendarContainer: {
    backgroundColor: Colors.white,
    borderRadius: BorderRadius.xl,
    padding: Spacing.lg,
    marginBottom: Spacing.xl,
    ...Shadows.md,
  },
  calendarHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.md,
  },
  addButton: {
    minWidth: 32,
    minHeight: 32,
    borderRadius: BorderRadius.full,
    backgroundColor: Colors.primaryLight + '20',
  },
  calendar: {
    borderRadius: BorderRadius.lg,
  },
  legendContainer: {
    backgroundColor: Colors.white,
    borderRadius: BorderRadius.xl,
    padding: Spacing.xl,
    marginBottom: Spacing.xl,
    ...Shadows.md,
  },
  legendTitle: {
    fontSize: Typography.fontSize.lg,
    fontFamily: Typography.fontFamily.semiBold,
    color: Colors.text.primary,
    marginBottom: Spacing.lg,
  },
  legendRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    gap: Gap.md,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  legendColor: {
    width: 16,
    height: 16,
    borderRadius: BorderRadius.full,
    marginRight: Spacing.sm,
  },
  legendText: {
    fontSize: Typography.fontSize.sm,
    fontFamily: Typography.fontFamily.regular,
    color: Colors.text.primary,
  },
});
