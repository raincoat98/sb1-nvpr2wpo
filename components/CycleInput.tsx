import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Platform,
} from 'react-native';
import Modal from 'react-native-modal';
import { X, Calendar } from 'lucide-react-native';
import {
  Colors,
  Typography,
  Spacing,
  Gap,
  BorderRadius,
  Shadows,
} from '@/constants/theme';
import { PeriodDatePicker } from './PeriodDatePicker';

interface CycleInputProps {
  visible: boolean;
  onClose: () => void;
  onSubmit: (data: any) => void;
}

export function CycleInput({ visible, onClose, onSubmit }: CycleInputProps) {
  const [lastPeriodDate, setLastPeriodDate] = useState<Date | null>(null);
  const [cycleLength, setCycleLength] = useState('28');
  const [periodLength, setPeriodLength] = useState('5');
  const [goal, setGoal] = useState('general');
  const [showDatePicker, setShowDatePicker] = useState(false);

  const goals = [
    { key: 'general', label: '일반 관리', color: Colors.primary },
    { key: 'pregnancy', label: '임신 준비', color: Colors.secondary },
    { key: 'contraception', label: '피임', color: Colors.accent },
  ];

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const handleDateSelect = (date: Date) => {
    setLastPeriodDate(date);
    setShowDatePicker(false);
  };

  const handleSubmit = () => {
    if (!lastPeriodDate || !cycleLength || !periodLength) {
      return;
    }

    const data = {
      lastPeriodDate: lastPeriodDate.toISOString(),
      cycleLength: parseInt(cycleLength),
      periodLength: parseInt(periodLength),
      goal,
      createdAt: new Date().toISOString(),
    };

    onSubmit(data);
  };

  return (
    <Modal
      isVisible={visible}
      onBackdropPress={onClose}
      onBackButtonPress={onClose}
      style={styles.modal}
    >
      <View style={styles.modalContent}>
        <View style={styles.modalHeader}>
          <Text style={styles.modalTitle}>주기 정보 입력</Text>
          <TouchableOpacity onPress={onClose} style={styles.closeButton}>
            <X size={24} color="#696969" strokeWidth={2} />
          </TouchableOpacity>
        </View>

        <View style={styles.inputSection}>
          <Text style={styles.label}>생리 시작일</Text>
          <TouchableOpacity
            style={styles.dateButton}
            onPress={() => setShowDatePicker(true)}
          >
            <Calendar size={20} color={Colors.primary} />
            <Text style={styles.dateText}>
              {lastPeriodDate
                ? formatDate(lastPeriodDate)
                : '날짜를 선택해주세요'}
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.inputRow}>
          <View style={styles.inputHalf}>
            <Text style={styles.label}>평균 주기 (일)</Text>
            <TextInput
              style={styles.input}
              placeholder="28"
              placeholderTextColor="#A0A0A0"
              keyboardType="numeric"
              value={cycleLength}
              onChangeText={setCycleLength}
            />
          </View>

          <View style={styles.inputHalf}>
            <Text style={styles.label}>생리 기간 (일)</Text>
            <TextInput
              style={styles.input}
              placeholder="5"
              placeholderTextColor="#A0A0A0"
              keyboardType="numeric"
              value={periodLength}
              onChangeText={setPeriodLength}
            />
          </View>
        </View>

        <View style={styles.inputSection}>
          <Text style={styles.label}>목표 선택</Text>
          <View style={styles.goalsContainer}>
            {goals.map((goalItem) => (
              <TouchableOpacity
                key={goalItem.key}
                style={[
                  styles.goalButton,
                  goal === goalItem.key && {
                    backgroundColor: goalItem.color,
                    borderColor: goalItem.color,
                  },
                ]}
                onPress={() => setGoal(goalItem.key)}
              >
                <Text
                  style={[
                    styles.goalText,
                    goal === goalItem.key && styles.activeGoalText,
                  ]}
                >
                  {goalItem.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <TouchableOpacity
          style={[
            styles.submitButton,
            (!lastPeriodDate || !cycleLength || !periodLength) &&
              styles.disabledButton,
          ]}
          onPress={handleSubmit}
          disabled={!lastPeriodDate || !cycleLength || !periodLength}
        >
          <Text style={styles.submitButtonText}>저장하기</Text>
        </TouchableOpacity>
      </View>

      <PeriodDatePicker
        visible={showDatePicker}
        onClose={() => setShowDatePicker(false)}
        onSubmit={handleDateSelect}
        initialDate={lastPeriodDate || new Date()}
      />
    </Modal>
  );
}

const styles = StyleSheet.create({
  modal: {
    margin: 0,
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: Colors.white,
    borderTopLeftRadius: BorderRadius['3xl'],
    borderTopRightRadius: BorderRadius['3xl'],
    padding: Spacing.xl,
    maxHeight: '80%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing['3xl'],
    paddingBottom: Spacing.lg,
    borderBottomWidth: 1,
    borderBottomColor: Colors.gray[200],
  },
  modalTitle: {
    fontSize: Typography.fontSize.xl,
    fontFamily: Typography.fontFamily.semiBold,
    color: Colors.text.primary,
  },
  closeButton: {
    padding: Spacing.xs,
  },
  inputSection: {
    marginBottom: Spacing.xl,
  },
  inputRow: {
    flexDirection: 'row',
    gap: Gap.lg,
    marginBottom: Spacing.xl,
  },
  inputHalf: {
    flex: 1,
  },
  label: {
    fontSize: Typography.fontSize.sm,
    fontFamily: Typography.fontFamily.medium,
    color: Colors.text.primary,
    marginBottom: Spacing.sm,
  },
  input: {
    backgroundColor: Colors.gray[50],
    borderRadius: BorderRadius.lg,
    padding: Spacing.lg,
    fontSize: Typography.fontSize.base,
    fontFamily: Typography.fontFamily.regular,
    color: Colors.text.primary,
    borderWidth: 1,
    borderColor: Colors.gray[200],
  },
  dateButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.primaryLight + '20',
    borderWidth: 2,
    borderColor: Colors.primaryLight,
    borderRadius: BorderRadius.lg,
    padding: Spacing.lg,
    gap: Gap.md,
  },
  dateText: {
    fontSize: Typography.fontSize.base,
    fontFamily: Typography.fontFamily.medium,
    color: Colors.primary,
    flex: 1,
  },
  goalsContainer: {
    flexDirection: 'row',
    gap: Gap.md,
  },
  goalButton: {
    flex: 1,
    backgroundColor: Colors.gray[50],
    borderRadius: BorderRadius.lg,
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.lg,
    borderWidth: 2,
    borderColor: Colors.gray[200],
    alignItems: 'center',
  },
  goalText: {
    fontSize: Typography.fontSize.sm,
    fontFamily: Typography.fontFamily.medium,
    color: Colors.text.secondary,
  },
  activeGoalText: {
    color: Colors.white,
  },
  submitButton: {
    backgroundColor: Colors.primary,
    borderRadius: BorderRadius.xl,
    paddingVertical: Spacing.lg,
    alignItems: 'center',
    marginTop: Spacing.xl,
    ...Shadows.lg,
  },
  disabledButton: {
    backgroundColor: Colors.gray[300],
    shadowOpacity: 0,
    elevation: 0,
  },
  submitButtonText: {
    fontSize: Typography.fontSize.base,
    fontFamily: Typography.fontFamily.semiBold,
    color: Colors.white,
  },
});
