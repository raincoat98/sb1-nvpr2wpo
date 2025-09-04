import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Platform } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Calendar, CalendarProps } from 'react-native-calendars';
import { Plus } from 'lucide-react-native';
import { CycleCalculator } from '@/components/CycleCalculator';
import { CycleInput } from '@/components/CycleInput';

export default function HomeScreen() {
  const [cycleData, setCycleData] = useState(null);
  const [showInput, setShowInput] = useState(false);
  const [markedDates, setMarkedDates] = useState({});

  useEffect(() => {
    if (cycleData) {
      generateMarkedDates();
    }
  }, [cycleData]);

  const generateMarkedDates = () => {
    if (!cycleData) return;

    const marks = {};
    const today = new Date();
    const lastPeriodDate = new Date(cycleData.lastPeriodDate);
    
    // Calculate next 3 cycles
    for (let cycle = 0; cycle < 3; cycle++) {
      const cycleStart = new Date(lastPeriodDate);
      cycleStart.setDate(lastPeriodDate.getDate() + (cycle * cycleData.cycleLength));
      
      // Period days (red)
      for (let day = 0; day < cycleData.periodLength; day++) {
        const periodDay = new Date(cycleStart);
        periodDay.setDate(cycleStart.getDate() + day);
        const dateString = periodDay.toISOString().split('T')[0];
        
        marks[dateString] = {
          color: '#FFB6C1',
          textColor: '#8B0000',
          marked: true,
          dotColor: '#DC143C'
        };
      }
      
      // Ovulation day (orange)
      const ovulationDay = new Date(cycleStart);
      ovulationDay.setDate(cycleStart.getDate() + Math.floor(cycleData.cycleLength / 2));
      const ovulationString = ovulationDay.toISOString().split('T')[0];
      
      marks[ovulationString] = {
        color: '#FFE4B5',
        textColor: '#FF4500',
        marked: true,
        dotColor: '#FF8C00'
      };
      
      // Fertile window (purple) - 5 days around ovulation
      for (let day = -2; day <= 2; day++) {
        const fertileDay = new Date(ovulationDay);
        fertileDay.setDate(ovulationDay.getDate() + day);
        const fertileDateString = fertileDay.toISOString().split('T')[0];
        
        if (!marks[fertileDateString]) {
          marks[fertileDateString] = {
            color: '#E6E6FA',
            textColor: '#4B0082',
            marked: true,
            dotColor: '#9370DB'
          };
        }
      }
    }

    setMarkedDates(marks);
  };

  const handleCycleSubmit = (data) => {
    setCycleData(data);
    setShowInput(false);
  };

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#FFE4E1', '#FFF0F5']}
        style={styles.header}>
        <Text style={styles.headerTitle}>생리 달력</Text>
        <Text style={styles.headerSubtitle}>건강한 주기 관리</Text>
      </LinearGradient>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {!cycleData ? (
          <View style={styles.welcomeContainer}>
            <Text style={styles.welcomeTitle}>첫 번째 주기를 입력해주세요</Text>
            <Text style={styles.welcomeSubtitle}>
              정확한 예측을 위해 최근 생리 정보가 필요합니다
            </Text>
            <TouchableOpacity
              style={styles.startButton}
              onPress={() => setShowInput(true)}>
              <Plus size={20} color="#FFFFFF" strokeWidth={2} />
              <Text style={styles.startButtonText}>시작하기</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <>
            <View style={styles.calendarContainer}>
              <Calendar
                style={styles.calendar}
                theme={{
                  backgroundColor: '#FFFFFF',
                  calendarBackground: '#FFFFFF',
                  textSectionTitleColor: '#FF69B4',
                  selectedDayBackgroundColor: '#FF69B4',
                  selectedDayTextColor: '#FFFFFF',
                  todayTextColor: '#FF69B4',
                  dayTextColor: '#2D2D2D',
                  textDisabledColor: '#D3D3D3',
                  monthTextColor: '#FF69B4',
                  indicatorColor: '#FF69B4',
                  textDayFontFamily: 'Inter-Regular',
                  textMonthFontFamily: 'Inter-SemiBold',
                  textDayHeaderFontFamily: 'Inter-Medium',
                  textDayFontSize: 14,
                  textMonthFontSize: 18,
                  textDayHeaderFontSize: 12,
                }}
                markingType={'period'}
                markedDates={markedDates}
                firstDay={1}
                showWeekNumbers={false}
              />
            </View>

            <CycleCalculator cycleData={cycleData} />

            <View style={styles.legendContainer}>
              <Text style={styles.legendTitle}>주기 안내</Text>
              <View style={styles.legendRow}>
                <View style={styles.legendItem}>
                  <View style={[styles.legendColor, { backgroundColor: '#FFB6C1' }]} />
                  <Text style={styles.legendText}>생리 기간</Text>
                </View>
                <View style={styles.legendItem}>
                  <View style={[styles.legendColor, { backgroundColor: '#E6E6FA' }]} />
                  <Text style={styles.legendText}>가임기</Text>
                </View>
                <View style={styles.legendItem}>
                  <View style={[styles.legendColor, { backgroundColor: '#FFE4B5' }]} />
                  <Text style={styles.legendText}>배란일</Text>
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
    backgroundColor: '#FFF',
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
  welcomeContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 60,
  },
  welcomeTitle: {
    fontSize: 24,
    fontFamily: 'Inter-SemiBold',
    color: '#2D2D2D',
    textAlign: 'center',
    marginBottom: 12,
  },
  welcomeSubtitle: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#696969',
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 40,
    paddingHorizontal: 20,
  },
  startButton: {
    backgroundColor: '#FF69B4',
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 25,
    elevation: 3,
    shadowColor: '#FF69B4',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  startButtonText: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#FFFFFF',
    marginLeft: 8,
  },
  calendarContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    padding: 15,
    marginBottom: 20,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  calendar: {
    borderRadius: 10,
  },
  legendContainer: {
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
  legendTitle: {
    fontSize: 18,
    fontFamily: 'Inter-SemiBold',
    color: '#2D2D2D',
    marginBottom: 15,
  },
  legendRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  legendColor: {
    width: 16,
    height: 16,
    borderRadius: 8,
    marginRight: 8,
  },
  legendText: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#2D2D2D',
  },
});