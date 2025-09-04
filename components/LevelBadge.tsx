import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import {
  Colors,
  Typography,
  Spacing,
  BorderRadius,
  Shadows,
} from '@/constants/theme';
import { Gamification } from '@/constants/theme';

interface LevelBadgeProps {
  level: number;
  currentXP: number;
  totalXP: number;
  onPress?: () => void;
}

export function LevelBadge({
  level,
  currentXP,
  totalXP,
  onPress,
}: LevelBadgeProps) {
  const currentLevelInfo = Gamification.levels.find((l) => l.level === level);
  const nextLevelInfo = Gamification.levels.find((l) => l.level === level + 1);

  const progress = nextLevelInfo
    ? ((currentXP - currentLevelInfo?.xpRequired || 0) /
        (nextLevelInfo.xpRequired - (currentLevelInfo?.xpRequired || 0))) *
      100
    : 100;

  const BadgeContent = (
    <View style={styles.container}>
      <LinearGradient
        colors={[
          currentLevelInfo?.color || Colors.primary,
          Colors.primaryLight,
        ]}
        style={styles.gradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <View style={styles.content}>
          <View style={styles.levelContainer}>
            <Text style={styles.levelText}>Lv.{level}</Text>
            <Text style={styles.levelName}>
              {currentLevelInfo?.name || '입문자'}
            </Text>
          </View>

          <View style={styles.xpContainer}>
            <View style={styles.xpBar}>
              <View
                style={[
                  styles.xpProgress,
                  {
                    width: `${Math.min(progress, 100)}%`,
                    backgroundColor: Colors.accent,
                  },
                ]}
              />
            </View>
            <Text style={styles.xpText}>
              {currentXP.toLocaleString()} /{' '}
              {nextLevelInfo?.xpRequired.toLocaleString() || 'MAX'} XP
            </Text>
          </View>
        </View>
      </LinearGradient>
    </View>
  );

  if (onPress) {
    return (
      <TouchableOpacity onPress={onPress} activeOpacity={0.8}>
        {BadgeContent}
      </TouchableOpacity>
    );
  }

  return BadgeContent;
}

const styles = StyleSheet.create({
  container: {
    borderRadius: BorderRadius.xl,
    overflow: 'hidden',
    ...Shadows.md,
  },
  gradient: {
    padding: Spacing.lg,
  },
  content: {
    alignItems: 'center',
  },
  levelContainer: {
    alignItems: 'center',
    marginBottom: Spacing.md,
  },
  levelText: {
    fontSize: Typography.fontSize['2xl'],
    fontFamily: Typography.fontFamily.bold,
    color: Colors.white,
    marginBottom: 2,
  },
  levelName: {
    fontSize: Typography.fontSize.sm,
    fontFamily: Typography.fontFamily.medium,
    color: 'rgba(255, 255, 255, 0.9)',
  },
  xpContainer: {
    width: '100%',
    alignItems: 'center',
  },
  xpBar: {
    width: '100%',
    height: 6,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    borderRadius: BorderRadius.full,
    overflow: 'hidden',
    marginBottom: Spacing.sm,
  },
  xpProgress: {
    height: '100%',
    borderRadius: BorderRadius.full,
  },
  xpText: {
    fontSize: Typography.fontSize.xs,
    fontFamily: Typography.fontFamily.medium,
    color: 'rgba(255, 255, 255, 0.8)',
  },
});
