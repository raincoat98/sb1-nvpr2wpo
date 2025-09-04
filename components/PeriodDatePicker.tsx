import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Platform,
} from 'react-native';
import { Calendar as RNCalendar } from 'react-native-calendars';
import { Calendar, X } from 'lucide-react-native';
import {
  Colors,
  Typography,
  Spacing,
  Gap,
  BorderRadius,
  Shadows,
} from '@/constants/theme';

interface PeriodDatePickerProps {
  visible: boolean;
  onClose: () => void;
  onSubmit: (date: Date) => void;
  initialDate?: Date;
}

export function PeriodDatePicker({
  visible,
  onClose,
  onSubmit,
  initialDate = new Date(),
}: PeriodDatePickerProps) {
  const [selectedDate, setSelectedDate] = useState(initialDate);

  const handleDateSelect = (day: any) => {
    const date = new Date(day.dateString);
    setSelectedDate(date);
  };

  const handleSubmit = () => {
    onSubmit(selectedDate);
    onClose();
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const getMarkedDates = () => {
    const dateString = selectedDate.toISOString().split('T')[0];
    return {
      [dateString]: {
        selected: true,
        selectedColor: Colors.primary,
        selectedTextColor: Colors.white,
      },
    };
  };

  if (!visible) return null;

  return (
    <View style={styles.overlay}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>생리 시작일 선택</Text>
          <TouchableOpacity onPress={onClose} style={styles.closeButton}>
            <X size={24} color={Colors.text.secondary} />
          </TouchableOpacity>
        </View>

        <View style={styles.content}>
          <Text style={styles.subtitle}>
            정확한 주기 예측을 위해 생리 시작일을 선택해주세요{'\n'}
            과거 기록이나 미래 예상일 모두 선택 가능합니다
          </Text>

          <View style={styles.calendarContainer}>
            <RNCalendar
              onDayPress={handleDateSelect}
              markedDates={getMarkedDates()}
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
                arrowColor: Colors.primary,
              }}
              minDate={'2020-01-01'}
              firstDay={1}
              showWeekNumbers={false}
            />
          </View>

          <View style={styles.selectedDateContainer}>
            <Calendar size={20} color={Colors.primary} />
            <Text style={styles.selectedDateText}>
              선택된 날짜: {formatDate(selectedDate)}
            </Text>
          </View>

          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.cancelButton} onPress={onClose}>
              <Text style={styles.cancelButtonText}>취소</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.submitButton}
              onPress={handleSubmit}
            >
              <Text style={styles.submitButtonText}>확인</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
  },
  container: {
    backgroundColor: Colors.white,
    borderRadius: BorderRadius['2xl'],
    margin: Spacing.xl,
    maxWidth: 400,
    width: '90%',
    ...Shadows.xl,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: Spacing.xl,
    borderBottomWidth: 1,
    borderBottomColor: Colors.gray[200],
  },
  title: {
    fontSize: Typography.fontSize.lg,
    fontFamily: Typography.fontFamily.bold,
    color: Colors.text.primary,
  },
  closeButton: {
    padding: Spacing.sm,
  },
  content: {
    padding: Spacing.xl,
  },
  subtitle: {
    fontSize: Typography.fontSize.sm,
    fontFamily: Typography.fontFamily.regular,
    color: Colors.text.secondary,
    textAlign: 'center',
    marginBottom: Spacing.xl,
    lineHeight: Typography.lineHeight.relaxed * Typography.fontSize.sm,
  },
  calendarContainer: {
    backgroundColor: Colors.white,
    borderRadius: BorderRadius.lg,
    marginBottom: Spacing.xl,
    overflow: 'hidden',
    ...Shadows.sm,
  },
  selectedDateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.primaryLight + '20',
    borderWidth: 2,
    borderColor: Colors.primaryLight,
    borderRadius: BorderRadius.xl,
    padding: Spacing.lg,
    marginBottom: Spacing.xl,
    gap: Gap.md,
  },
  selectedDateText: {
    fontSize: Typography.fontSize.base,
    fontFamily: Typography.fontFamily.semiBold,
    color: Colors.primary,
  },
  buttonContainer: {
    flexDirection: 'row',
    gap: Gap.md,
  },
  cancelButton: {
    flex: 1,
    backgroundColor: Colors.gray[100],
    borderRadius: BorderRadius.xl,
    padding: Spacing.lg,
    alignItems: 'center',
  },
  cancelButtonText: {
    fontSize: Typography.fontSize.base,
    fontFamily: Typography.fontFamily.semiBold,
    color: Colors.text.secondary,
  },
  submitButton: {
    flex: 1,
    backgroundColor: Colors.primary,
    borderRadius: BorderRadius.xl,
    padding: Spacing.lg,
    alignItems: 'center',
  },
  submitButtonText: {
    fontSize: Typography.fontSize.base,
    fontFamily: Typography.fontFamily.semiBold,
    color: Colors.white,
  },
});
