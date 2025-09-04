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
import {
  Trophy,
  Target,
  Star,
  Award,
  Calendar,
  Activity,
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

export default function GoalsScreen() {
  const { state: gamificationState } = useGamification();
  const [selectedTab, setSelectedTab] = useState<
    'missions' | 'achievements' | 'badges'
  >('missions');

  const tabs = [
    { key: 'missions', label: '미션', icon: Target },
    { key: 'achievements', label: '성취', icon: Trophy },
    { key: 'badges', label: '뱃지', icon: Award },
  ];

  const renderMissions = () => (
    <View style={styles.content}>
      <Text style={styles.sectionTitle}>일일 미션</Text>
      {gamificationState.dailyMissions.map((mission) => (
        <View key={mission.id} style={styles.missionCard}>
          <View style={styles.missionHeader}>
            <View style={styles.missionIcon}>
              <Target size={20} color={Colors.primary} />
            </View>
            <View style={styles.missionInfo}>
              <Text style={styles.missionTitle}>{mission.title}</Text>
              <Text style={styles.missionDescription}>
                {mission.description}
              </Text>
            </View>
            <View style={styles.missionReward}>
              <Text style={styles.rewardText}>+{mission.xpReward} XP</Text>
            </View>
          </View>
          <View style={styles.missionStatus}>
            {mission.isCompleted ? (
              <View style={styles.completedBadge}>
                <Text style={styles.completedText}>완료</Text>
              </View>
            ) : (
              <TouchableOpacity style={styles.startButton}>
                <Text style={styles.startButtonText}>시작하기</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
      ))}

      <Text style={styles.sectionTitle}>주간 챌린지</Text>
      {gamificationState.weeklyChallenges.map((challenge) => (
        <View key={challenge.id} style={styles.challengeCard}>
          <View style={styles.challengeHeader}>
            <View style={styles.challengeIcon}>
              <Calendar size={20} color={Colors.secondary} />
            </View>
            <View style={styles.challengeInfo}>
              <Text style={styles.challengeTitle}>{challenge.title}</Text>
              <Text style={styles.challengeDescription}>
                {challenge.description}
              </Text>
            </View>
            <View style={styles.challengeReward}>
              <Text style={styles.rewardText}>+{challenge.xpReward} XP</Text>
            </View>
          </View>
          <View style={styles.challengeProgress}>
            <View style={styles.progressBar}>
              <View
                style={[
                  styles.progressFill,
                  {
                    width: `${
                      (challenge.progress / challenge.maxProgress) * 100
                    }%`,
                  },
                ]}
              />
            </View>
            <Text style={styles.progressText}>
              {challenge.progress}/{challenge.maxProgress}
            </Text>
          </View>
        </View>
      ))}
    </View>
  );

  const renderAchievements = () => (
    <View style={styles.content}>
      {gamificationState.achievements.map((achievement) => (
        <View key={achievement.id} style={styles.achievementCard}>
          <View style={styles.achievementHeader}>
            <View style={styles.achievementIcon}>
              <Trophy
                size={24}
                color={
                  achievement.isCompleted ? Colors.accent : Colors.gray[400]
                }
              />
            </View>
            <View style={styles.achievementInfo}>
              <Text
                style={[
                  styles.achievementTitle,
                  achievement.isCompleted && styles.completedTitle,
                ]}
              >
                {achievement.title}
              </Text>
              <Text style={styles.achievementDescription}>
                {achievement.description}
              </Text>
            </View>
            <View style={styles.achievementReward}>
              <Text style={styles.rewardText}>+{achievement.xpReward} XP</Text>
            </View>
          </View>
          <View style={styles.achievementProgress}>
            <View style={styles.progressBar}>
              <View
                style={[
                  styles.progressFill,
                  {
                    width: `${
                      (achievement.progress / achievement.maxProgress) * 100
                    }%`,
                  },
                ]}
              />
            </View>
            <Text style={styles.progressText}>
              {achievement.progress}/{achievement.maxProgress}
            </Text>
          </View>
        </View>
      ))}
    </View>
  );

  const renderBadges = () => {
    const earnedBadges = gamificationState.badges.filter(
      (badge) => badge.isEarned
    );
    const totalBadges = gamificationState.badges.length;

    return (
      <View style={styles.content}>
        <View style={styles.badgesHeader}>
          <Text style={styles.badgesTitle}>뱃지 컬렉션</Text>
          <Text style={styles.badgesSubtitle}>
            {earnedBadges.length}/{totalBadges} 뱃지 획득
          </Text>
        </View>

        <View style={styles.badgesGrid}>
          {gamificationState.badges.map((badge) => (
            <View
              key={badge.id}
              style={[
                styles.badgeCard,
                badge.isEarned && styles.earnedBadgeCard,
                !badge.isEarned && styles.lockedBadgeCard,
              ]}
            >
              <View
                style={[styles.badgeIcon, badge.isEarned && styles.earnedBadge]}
              >
                <Text
                  style={[
                    styles.badgeEmoji,
                    !badge.isEarned && styles.lockedEmoji,
                  ]}
                >
                  {badge.icon}
                </Text>
              </View>
              <Text
                style={[
                  styles.badgeName,
                  !badge.isEarned && styles.lockedBadge,
                ]}
              >
                {badge.name}
              </Text>
              <Text
                style={[
                  styles.badgeDescription,
                  !badge.isEarned && styles.lockedText,
                ]}
              >
                {badge.description}
              </Text>
              {badge.isEarned && badge.earnedAt && (
                <Text style={styles.earnedDate}>
                  {badge.earnedAt.toLocaleDateString()}
                </Text>
              )}
              {!badge.isEarned && (
                <View style={styles.lockedOverlay}>
                  <Text style={styles.lockedLabel}>잠금</Text>
                </View>
              )}
            </View>
          ))}
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <LinearGradient colors={Colors.gradients.header} style={styles.header}>
        <Text style={styles.headerTitle}>목표 달성</Text>
        <Text style={styles.headerSubtitle}>게임화된 건강 관리</Text>
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
        {selectedTab === 'missions' && renderMissions()}
        {selectedTab === 'achievements' && renderAchievements()}
        {selectedTab === 'badges' && renderBadges()}
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
    paddingBottom: Spacing['8xl'],
  },
  content: {
    padding: Spacing.xl,
  },
  sectionTitle: {
    fontSize: Typography.fontSize.lg,
    fontFamily: Typography.fontFamily.semiBold,
    color: Colors.text.primary,
    marginBottom: Spacing.lg,
  },
  missionCard: {
    backgroundColor: Colors.white,
    borderRadius: BorderRadius.xl,
    padding: Spacing.lg,
    marginBottom: Spacing.lg,
    ...Shadows.md,
  },
  missionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Spacing.md,
  },
  missionIcon: {
    width: 40,
    height: 40,
    borderRadius: BorderRadius.lg,
    backgroundColor: Colors.primaryLight,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: Spacing.md,
  },
  missionInfo: {
    flex: 1,
  },
  missionTitle: {
    fontSize: Typography.fontSize.base,
    fontFamily: Typography.fontFamily.semiBold,
    color: Colors.text.primary,
    marginBottom: 2,
  },
  missionDescription: {
    fontSize: Typography.fontSize.sm,
    fontFamily: Typography.fontFamily.regular,
    color: Colors.text.secondary,
  },
  missionReward: {
    alignItems: 'flex-end',
  },
  rewardText: {
    fontSize: Typography.fontSize.sm,
    fontFamily: Typography.fontFamily.semiBold,
    color: Colors.accent,
  },
  missionStatus: {
    alignItems: 'flex-end',
  },
  completedBadge: {
    backgroundColor: Colors.success,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.xs,
    borderRadius: BorderRadius.full,
  },
  completedText: {
    fontSize: Typography.fontSize.xs,
    fontFamily: Typography.fontFamily.semiBold,
    color: Colors.white,
  },
  startButton: {
    backgroundColor: Colors.primary,
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.sm,
    borderRadius: BorderRadius.full,
  },
  startButtonText: {
    fontSize: Typography.fontSize.sm,
    fontFamily: Typography.fontFamily.semiBold,
    color: Colors.white,
  },
  challengeCard: {
    backgroundColor: Colors.white,
    borderRadius: BorderRadius.xl,
    padding: Spacing.lg,
    marginBottom: Spacing.lg,
    ...Shadows.md,
  },
  challengeHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Spacing.md,
  },
  challengeIcon: {
    width: 40,
    height: 40,
    borderRadius: BorderRadius.lg,
    backgroundColor: Colors.secondaryLight,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: Spacing.md,
  },
  challengeInfo: {
    flex: 1,
  },
  challengeTitle: {
    fontSize: Typography.fontSize.base,
    fontFamily: Typography.fontFamily.semiBold,
    color: Colors.text.primary,
    marginBottom: 2,
  },
  challengeDescription: {
    fontSize: Typography.fontSize.sm,
    fontFamily: Typography.fontFamily.regular,
    color: Colors.text.secondary,
  },
  challengeReward: {
    alignItems: 'flex-end',
  },
  challengeProgress: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  progressBar: {
    flex: 1,
    height: 6,
    backgroundColor: Colors.gray[200],
    borderRadius: BorderRadius.full,
    marginRight: Spacing.md,
  },
  progressFill: {
    height: '100%',
    backgroundColor: Colors.primary,
    borderRadius: BorderRadius.full,
  },
  progressText: {
    fontSize: Typography.fontSize.xs,
    fontFamily: Typography.fontFamily.medium,
    color: Colors.text.secondary,
  },
  achievementCard: {
    backgroundColor: Colors.white,
    borderRadius: BorderRadius.xl,
    padding: Spacing.lg,
    marginBottom: Spacing.lg,
    ...Shadows.md,
  },
  achievementHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Spacing.md,
  },
  achievementIcon: {
    width: 40,
    height: 40,
    borderRadius: BorderRadius.lg,
    backgroundColor: Colors.accentLight,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: Spacing.md,
  },
  achievementInfo: {
    flex: 1,
  },
  achievementTitle: {
    fontSize: Typography.fontSize.base,
    fontFamily: Typography.fontFamily.semiBold,
    color: Colors.text.primary,
    marginBottom: 2,
  },
  completedTitle: {
    color: Colors.success,
  },
  achievementDescription: {
    fontSize: Typography.fontSize.sm,
    fontFamily: Typography.fontFamily.regular,
    color: Colors.text.secondary,
  },
  achievementReward: {
    alignItems: 'flex-end',
  },
  achievementProgress: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  badgesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: Gap.lg,
  },
  badgeCard: {
    width: '48%',
    backgroundColor: Colors.white,
    borderRadius: BorderRadius.xl,
    padding: Spacing.xl,
    marginBottom: Spacing.lg,
    alignItems: 'center',
    minHeight: 140,
    ...Shadows.md,
  },
  earnedBadgeCard: {
    backgroundColor: Colors.accent + '10',
    borderWidth: 2,
    borderColor: Colors.accent + '30',
  },
  badgeIcon: {
    width: 80,
    height: 80,
    borderRadius: BorderRadius.full,
    backgroundColor: Colors.gray[100],
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: Spacing.lg,
    ...Shadows.sm,
  },
  earnedBadge: {
    backgroundColor: Colors.accentLight,
    borderWidth: 3,
    borderColor: Colors.accent,
    shadowColor: Colors.accent,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  badgeEmoji: {
    fontSize: 32,
  },
  badgeName: {
    fontSize: Typography.fontSize.base,
    fontFamily: Typography.fontFamily.bold,
    color: Colors.white,
    textAlign: 'center',
    marginBottom: Spacing.sm,
    lineHeight: Typography.lineHeight.tight * Typography.fontSize.base,
  },
  lockedBadge: {
    color: Colors.gray[400],
  },
  badgeDescription: {
    fontSize: Typography.fontSize.sm,
    fontFamily: Typography.fontFamily.regular,
    color: Colors.white,
    textAlign: 'center',
    marginBottom: Spacing.md,
    lineHeight: Typography.lineHeight.normal * Typography.fontSize.sm,
  },
  lockedText: {
    color: Colors.gray[300],
  },
  earnedDate: {
    fontSize: Typography.fontSize.xs,
    fontFamily: Typography.fontFamily.semiBold,
    color: Colors.white,
    backgroundColor: Colors.success + '20',
    paddingHorizontal: Spacing.sm,
    paddingVertical: Spacing.xs,
    borderRadius: BorderRadius.full,
  },
  lockedBadgeCard: {
    backgroundColor: Colors.gray[50],
    borderWidth: 2,
    borderColor: Colors.gray[200],
    opacity: 0.7,
  },
  lockedEmoji: {
    opacity: 0.5,
  },
  lockedOverlay: {
    position: 'absolute',
    top: Spacing.sm,
    right: Spacing.sm,
    backgroundColor: Colors.gray[400],
    paddingHorizontal: Spacing.sm,
    paddingVertical: Spacing.xs,
    borderRadius: BorderRadius.sm,
  },
  lockedLabel: {
    fontSize: Typography.fontSize.xs,
    fontFamily: Typography.fontFamily.semiBold,
    color: Colors.white,
  },
  badgesHeader: {
    marginBottom: Spacing.xl,
    alignItems: 'center',
  },
  badgesTitle: {
    fontSize: Typography.fontSize['2xl'],
    fontFamily: Typography.fontFamily.bold,
    color: Colors.white,
    marginBottom: Spacing.xs,
  },
  badgesSubtitle: {
    fontSize: Typography.fontSize.base,
    fontFamily: Typography.fontFamily.medium,
    color: Colors.white,
  },
});
