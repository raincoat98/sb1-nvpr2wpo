import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Platform } from 'react-native';
import Modal from 'react-native-modal';
import { X } from 'lucide-react-native';

interface CycleInputProps {
  visible: boolean;
  onClose: () => void;
  onSubmit: (data: any) => void;
}

export function CycleInput({ visible, onClose, onSubmit }: CycleInputProps) {
  const [lastPeriodDate, setLastPeriodDate] = useState('');
  const [cycleLength, setCycleLength] = useState('28');
  const [periodLength, setPeriodLength] = useState('5');
  const [goal, setGoal] = useState('general');

  const goals = [
    { key: 'general', label: '일반 관리', color: '#FF69B4' },
    { key: 'pregnancy', label: '임신 준비', color: '#9370DB' },
    { key: 'contraception', label: '피임', color: '#FF8C00' }
  ];

  const handleSubmit = () => {
    if (!lastPeriodDate || !cycleLength || !periodLength) {
      return;
    }

    const data = {
      lastPeriodDate,
      cycleLength: parseInt(cycleLength),
      periodLength: parseInt(periodLength),
      goal,
      createdAt: new Date().toISOString()
    };

    onSubmit(data);
  };

  return (
    <Modal
      isVisible={visible}
      onBackdropPress={onClose}
      onBackButtonPress={onClose}
      style={styles.modal}>
      <View style={styles.modalContent}>
        <View style={styles.modalHeader}>
          <Text style={styles.modalTitle}>주기 정보 입력</Text>
          <TouchableOpacity onPress={onClose} style={styles.closeButton}>
            <X size={24} color="#696969" strokeWidth={2} />
          </TouchableOpacity>
        </View>

        <View style={styles.inputSection}>
          <Text style={styles.label}>최근 생리 시작일</Text>
          <TextInput
            style={styles.dateInput}
            placeholder="YYYY-MM-DD"
            placeholderTextColor="#A0A0A0"
            value={lastPeriodDate}
            onChangeText={setLastPeriodDate}
          />
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
                    borderColor: goalItem.color
                  }
                ]}
                onPress={() => setGoal(goalItem.key)}>
                <Text style={[
                  styles.goalText,
                  goal === goalItem.key && styles.activeGoalText
                ]}>
                  {goalItem.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <TouchableOpacity
          style={[
            styles.submitButton,
            (!lastPeriodDate || !cycleLength || !periodLength) && styles.disabledButton
          ]}
          onPress={handleSubmit}
          disabled={!lastPeriodDate || !cycleLength || !periodLength}>
          <Text style={styles.submitButtonText}>저장하기</Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modal: {
    margin: 0,
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    padding: 20,
    maxHeight: '80%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 30,
    paddingBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  modalTitle: {
    fontSize: 20,
    fontFamily: 'Inter-SemiBold',
    color: '#2D2D2D',
  },
  closeButton: {
    padding: 4,
  },
  inputSection: {
    marginBottom: 20,
  },
  inputRow: {
    flexDirection: 'row',
    gap: 16,
    marginBottom: 20,
  },
  inputHalf: {
    flex: 1,
  },
  label: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#2D2D2D',
    marginBottom: 8,
  },
  input: {
    backgroundColor: '#F8F8F8',
    borderRadius: 10,
    padding: 16,
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#2D2D2D',
    borderWidth: 1,
    borderColor: '#E8E8E8',
  },
  dateInput: {
    backgroundColor: '#F8F8F8',
    borderRadius: 10,
    padding: 16,
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#2D2D2D',
    borderWidth: 1,
    borderColor: '#E8E8E8',
  },
  goalsContainer: {
    flexDirection: 'row',
    gap: 12,
  },
  goalButton: {
    flex: 1,
    backgroundColor: '#F8F8F8',
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderWidth: 2,
    borderColor: '#E8E8E8',
    alignItems: 'center',
  },
  goalText: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#696969',
  },
  activeGoalText: {
    color: '#FFFFFF',
  },
  submitButton: {
    backgroundColor: '#FF69B4',
    borderRadius: 15,
    paddingVertical: 16,
    alignItems: 'center',
    marginTop: 20,
    elevation: 3,
    shadowColor: '#FF69B4',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  disabledButton: {
    backgroundColor: '#D3D3D3',
    shadowOpacity: 0,
    elevation: 0,
  },
  submitButtonText: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#FFFFFF',
  },
});