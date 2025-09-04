import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Platform,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { ShoppingBag, Coffee, Pill, Heart, Check } from 'lucide-react-native';
import {
  Colors,
  Typography,
  Spacing,
  BorderRadius,
  Shadows,
} from '@/constants/theme';

export default function SuppliesScreen() {
  const [checkedItems, setCheckedItems] = useState<Record<number, boolean>>({});

  const supplies = [
    {
      category: '생리용품',
      icon: ShoppingBag,
      color: Colors.primary,
      items: [
        { id: 1, name: '생리대 (일반형)', description: '낮 시간 사용' },
        { id: 2, name: '생리대 (야간형)', description: '밤 시간 및 많은 날' },
        { id: 3, name: '탐폰', description: '수영이나 운동시 편리' },
        { id: 4, name: '생리컵', description: '친환경적이고 경제적' },
        { id: 5, name: '팬티라이너', description: '생리 전후 사용' },
      ],
    },
    {
      category: '건강 관리',
      icon: Pill,
      color: Colors.secondary,
      items: [
        { id: 6, name: '진통제', description: '생리통 완화용' },
        { id: 7, name: '철분 보충제', description: '빈혈 예방' },
        { id: 8, name: '마그네슘', description: '근육 경련 완화' },
        { id: 9, name: '비타민 B6', description: 'PMS 증상 완화' },
      ],
    },
    {
      category: '편의용품',
      icon: Heart,
      color: Colors.accent,
      items: [
        { id: 10, name: '핫팩', description: '복부 및 허리 찜질용' },
        { id: 11, name: '편안한 속옷', description: '면 소재 권장' },
        { id: 12, name: '수분 보충', description: '따뜻한 차나 물' },
        {
          id: 13,
          name: '다크 초콜릿',
          description: '기분 개선 및 마그네슘 공급',
        },
      ],
    },
    {
      category: '차/음료',
      icon: Coffee,
      color: Colors.health,
      items: [
        { id: 14, name: '캐모마일 차', description: '진정 및 수면 도움' },
        { id: 15, name: '생강차', description: '메스꺼움 완화' },
        { id: 16, name: '라즈베리 잎 차', description: '자궁 건강 지원' },
        { id: 17, name: '따뜻한 물', description: '탈수 방지' },
      ],
    },
  ];

  const toggleItem = (itemId: number) => {
    setCheckedItems((prev) => ({
      ...prev,
      [itemId]: !prev[itemId],
    }));
  };

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={Colors.gradients.header as any}
        style={styles.header}
      >
        <Text style={styles.headerTitle}>준비물 체크리스트</Text>
        <Text style={styles.headerSubtitle}>생리 기간 동안 필요한 것들</Text>
      </LinearGradient>

      <ScrollView
        style={styles.content}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {supplies.map((category) => {
          const IconComponent = category.icon;
          return (
            <View key={category.category} style={styles.categoryCard}>
              <View style={styles.categoryHeader}>
                <IconComponent
                  size={20}
                  color={category.color}
                  strokeWidth={2}
                />
                <Text style={styles.categoryTitle}>{category.category}</Text>
              </View>

              {category.items.map((item) => (
                <TouchableOpacity
                  key={item.id}
                  style={styles.supplyItem}
                  onPress={() => toggleItem(item.id)}
                >
                  <View style={styles.itemInfo}>
                    <View style={styles.itemHeader}>
                      <Text style={styles.itemName}>{item.name}</Text>
                      <TouchableOpacity
                        style={[
                          styles.checkbox,
                          checkedItems[item.id] && styles.checkedCheckbox,
                        ]}
                        onPress={() => toggleItem(item.id)}
                      >
                        {checkedItems[item.id] && (
                          <Check size={16} color="#FFFFFF" strokeWidth={3} />
                        )}
                      </TouchableOpacity>
                    </View>
                    <Text style={styles.itemDescription}>
                      {item.description}
                    </Text>
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          );
        })}

        <View style={styles.tipCard}>
          <Text style={styles.tipTitle}>💡 준비 팁</Text>
          <Text style={styles.tipText}>
            생리 예정일 2-3일 전부터 미리 준비해두시면 갑작스러운 상황에도
            당황하지 않을 수 있어요. 개인의 몸 상태와 선호도에 맞는 제품을
            선택하세요.
          </Text>
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
  categoryCard: {
    backgroundColor: Colors.white,
    borderRadius: BorderRadius.xl,
    padding: Spacing.xl,
    marginBottom: Spacing.xl,
    ...Shadows.md,
  },
  categoryHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Spacing.lg,
  },
  categoryTitle: {
    fontSize: Typography.fontSize.lg,
    fontFamily: Typography.fontFamily.semiBold,
    color: Colors.text.primary,
    marginLeft: Spacing.md,
  },
  supplyItem: {
    borderBottomWidth: 1,
    borderBottomColor: Colors.gray[100],
    paddingVertical: Spacing.md,
  },
  itemInfo: {
    flex: 1,
  },
  itemHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.xs,
  },
  itemName: {
    fontSize: Typography.fontSize.base,
    fontFamily: Typography.fontFamily.medium,
    color: Colors.text.primary,
    flex: 1,
  },
  itemDescription: {
    fontSize: Typography.fontSize.sm,
    fontFamily: Typography.fontFamily.regular,
    color: Colors.text.secondary,
    lineHeight: Typography.lineHeight.relaxed * Typography.fontSize.sm,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: BorderRadius.full,
    borderWidth: 2,
    borderColor: Colors.gray[300],
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkedCheckbox: {
    backgroundColor: Colors.primary,
    borderColor: Colors.primary,
  },
  tipCard: {
    backgroundColor: Colors.accentLight + '20',
    borderRadius: BorderRadius.xl,
    padding: Spacing.xl,
    marginBottom: Spacing['3xl'],
    borderWidth: 1,
    borderColor: Colors.accentLight + '40',
  },
  tipTitle: {
    fontSize: Typography.fontSize.base,
    fontFamily: Typography.fontFamily.semiBold,
    color: Colors.accent,
    marginBottom: Spacing.md,
  },
  tipText: {
    fontSize: Typography.fontSize.sm,
    fontFamily: Typography.fontFamily.regular,
    color: Colors.text.secondary,
    lineHeight: Typography.lineHeight.relaxed * Typography.fontSize.sm,
  },
});
