import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Calendar, Target, Heart } from 'lucide-react-native';

interface CycleCalculatorProps {
  cycleData: {
    lastPeriodDate: string;
    cycleLength: number;
    periodLength: number;
    goal: string;
  };
}

export function CycleCalculator({ cycleData }: CycleCalculatorProps) {
  const calculateDates = () => {
    const lastPeriod = new Date(cycleData.lastPeriodDate);
    const nextPeriod = new Date(lastPeriod);
    nextPeriod.setDate(lastPeriod.getDate() + cycleData.cycleLength);

    const ovulationDay = new Date(lastPeriod);
    ovulationDay.setDate(
      lastPeriod.getDate() + Math.floor(cycleData.cycleLength / 2)
    );

    const fertileStart = new Date(ovulationDay);
    fertileStart.setDate(ovulationDay.getDate() - 2);

    const fertileEnd = new Date(ovulationDay);
    fertileEnd.setDate(ovulationDay.getDate() + 2);

    return {
      nextPeriod: nextPeriod.toLocaleDateString('ko-KR'),
      ovulation: ovulationDay.toLocaleDateString('ko-KR'),
      fertileStart: fertileStart.toLocaleDateString('ko-KR'),
      fertileEnd: fertileEnd.toLocaleDateString('ko-KR'),
    };
  };

  const getDaysUntil = (targetDate: string) => {
    const today = new Date();
    const target = new Date(targetDate.split('.').reverse().join('-'));
    const diffTime = target.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const dates = calculateDates();
  const daysUntilPeriod = getDaysUntil(dates.nextPeriod);
  const daysUntilOvulation = getDaysUntil(dates.ovulation);

  const getPeriodStatus = () => {
    if (daysUntilPeriod <= 0) return { text: '생리 기간', color: '#DC143C' };
    if (daysUntilPeriod <= 3)
      return { text: `${daysUntilPeriod}일 후 생리 예정`, color: '#FF69B4' };
    if (daysUntilOvulation <= 2 && daysUntilOvulation >= -2)
      return { text: '가임기', color: '#9370DB' };
    return { text: '안정기', color: '#32CD32' };
  };

  const status = getPeriodStatus();

  return (
    <View style={styles.container}>
      <View style={[styles.statusCard, { borderLeftColor: status.color }]}>
        <Text style={[styles.statusText, { color: status.color }]}>
          {status.text}
        </Text>
      </View>

      <View style={styles.datesGrid}>
        <View style={styles.dateCard}>
          <Calendar size={20} color="#DC143C" strokeWidth={2} />
          <Text style={styles.dateLabel}>다음 생리</Text>
          <Text style={styles.dateValue}>{dates.nextPeriod}</Text>
          <Text style={styles.daysText}>
            {daysUntilPeriod > 0 ? `${daysUntilPeriod}일 후` : '진행 중'}
          </Text>
        </View>

        <View style={styles.dateCard}>
          <Target size={20} color="#FF8C00" strokeWidth={2} />
          <Text style={styles.dateLabel}>배란일</Text>
          <Text style={styles.dateValue}>{dates.ovulation}</Text>
          <Text style={styles.daysText}>
            {daysUntilOvulation > 0
              ? `${daysUntilOvulation}일 후`
              : daysUntilOvulation === 0
              ? '오늘'
              : '지남'}
          </Text>
        </View>

        <View style={styles.dateCard}>
          <Heart size={20} color="#9370DB" strokeWidth={2} />
          <Text style={styles.dateLabel}>가임기</Text>
          <Text style={styles.dateValue}>{dates.fertileStart}</Text>
          <Text style={styles.daysText}>~ {dates.fertileEnd}</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
  },
  statusCard: {
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
    alignItems: 'center',
  },
  statusText: {
    fontSize: 18,
    fontFamily: 'Inter-SemiBold',
  },
  datesGrid: {
    flexDirection: 'row',
    gap: 12,
  },
  dateCard: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    padding: 16,
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  dateLabel: {
    fontSize: 12,
    fontFamily: 'Inter-Medium',
    color: '#696969',
    marginTop: 8,
    marginBottom: 4,
  },
  dateValue: {
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
    color: '#2D2D2D',
    marginBottom: 4,
  },
  daysText: {
    fontSize: 11,
    fontFamily: 'Inter-Regular',
    color: '#A0A0A0',
  },
});
