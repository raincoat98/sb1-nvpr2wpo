import React, { createContext, useContext, useReducer, useEffect } from 'react';
import {
  GamificationState,
  UserProfile,
  Badge,
  Achievement,
  DailyMission,
  WeeklyChallenge,
  XPHistory,
} from '@/types/gamification';
import { Gamification } from '@/constants/theme';

// 초기 상태
const initialState: GamificationState = {
  userProfile: {
    id: '1',
    name: '사용자',
    level: 1,
    currentXP: 0,
    totalXP: 0,
    joinDate: new Date(),
    lastActive: new Date(),
  },
  badges: [
    {
      id: 'first_record',
      name: '첫 기록',
      description: '첫 번째 생리 기록',
      icon: '🎉',
      isEarned: false,
    },
    {
      id: 'streak_7',
      name: '꾸준함',
      description: '7일 연속 기록',
      icon: '🔥',
      isEarned: false,
    },
    {
      id: 'streak_30',
      name: '기록왕',
      description: '30일 연속 기록',
      icon: '👑',
      isEarned: false,
    },
    {
      id: 'vaccination',
      name: '예방 완료',
      description: '모든 접종 완료',
      icon: '💉',
      isEarned: false,
    },
    {
      id: 'health_master',
      name: '건강 마스터',
      description: '레벨 5 달성',
      icon: '🏆',
      isEarned: false,
    },
  ],
  achievements: [
    {
      id: 'record_10',
      title: '기록의 시작',
      description: '10번의 생리 기록',
      xpReward: 50,
      isCompleted: false,
      progress: 0,
      maxProgress: 10,
    },
    {
      id: 'record_50',
      title: '꾸준한 관리자',
      description: '50번의 생리 기록',
      xpReward: 100,
      isCompleted: false,
      progress: 0,
      maxProgress: 50,
    },
    {
      id: 'health_check_10',
      title: '건강 관심자',
      description: '10번의 건강 체크',
      xpReward: 75,
      isCompleted: false,
      progress: 0,
      maxProgress: 10,
    },
  ],
  dailyMissions: [
    {
      id: 'daily_record',
      title: '오늘 기록하기',
      description: '오늘의 생리 상태를 기록하세요',
      xpReward: 10,
      isCompleted: false,
      type: 'record',
    },
    {
      id: 'daily_health',
      title: '건강 체크',
      description: '오늘의 컨디션을 체크하세요',
      xpReward: 15,
      isCompleted: false,
      type: 'health',
    },
  ],
  weeklyChallenges: [
    {
      id: 'weekly_streak',
      title: '일주일 연속 기록',
      description: '7일 연속으로 기록하세요',
      xpReward: 100,
      badgeReward: 'streak_7',
      isCompleted: false,
      progress: 0,
      maxProgress: 7,
      startDate: new Date(),
      endDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    },
  ],
  xpHistory: [],
  currentStreak: 0,
  longestStreak: 0,
};

// 액션 타입
type GamificationAction =
  | { type: 'ADD_XP'; amount: number; source: string; description: string }
  | { type: 'LEVEL_UP'; newLevel: number }
  | { type: 'EARN_BADGE'; badgeId: string }
  | { type: 'COMPLETE_ACHIEVEMENT'; achievementId: string }
  | { type: 'COMPLETE_MISSION'; missionId: string }
  | { type: 'COMPLETE_CHALLENGE'; challengeId: string }
  | { type: 'UPDATE_STREAK'; current: number; longest: number }
  | { type: 'LOAD_DATA'; data: GamificationState };

// 리듀서
function gamificationReducer(
  state: GamificationState,
  action: GamificationAction
): GamificationState {
  switch (action.type) {
    case 'ADD_XP': {
      const newXP = state.userProfile.currentXP + action.amount;
      const newTotalXP = state.userProfile.totalXP + action.amount;

      // 레벨 체크
      const currentLevel = Gamification.levels.find(
        (level) =>
          newTotalXP >= level.xpRequired &&
          (Gamification.levels[Gamification.levels.indexOf(level) + 1]
            ?.xpRequired || Infinity) > newTotalXP
      );

      const newXPHistory: XPHistory = {
        id: Date.now().toString(),
        userId: state.userProfile.id,
        amount: action.amount,
        source: action.source as any,
        description: action.description,
        timestamp: new Date(),
      };

      return {
        ...state,
        userProfile: {
          ...state.userProfile,
          currentXP: newXP,
          totalXP: newTotalXP,
          level: currentLevel?.level || state.userProfile.level,
        },
        xpHistory: [newXPHistory, ...state.xpHistory],
      };
    }

    case 'LEVEL_UP':
      return {
        ...state,
        userProfile: {
          ...state.userProfile,
          level: action.newLevel,
        },
      };

    case 'EARN_BADGE':
      return {
        ...state,
        badges: state.badges.map((badge) =>
          badge.id === action.badgeId
            ? { ...badge, isEarned: true, earnedAt: new Date() }
            : badge
        ),
      };

    case 'COMPLETE_ACHIEVEMENT':
      return {
        ...state,
        achievements: state.achievements.map((achievement) =>
          achievement.id === action.achievementId
            ? { ...achievement, isCompleted: true, completedAt: new Date() }
            : achievement
        ),
      };

    case 'COMPLETE_MISSION':
      return {
        ...state,
        dailyMissions: state.dailyMissions.map((mission) =>
          mission.id === action.missionId
            ? { ...mission, isCompleted: true, completedAt: new Date() }
            : mission
        ),
      };

    case 'COMPLETE_CHALLENGE':
      return {
        ...state,
        weeklyChallenges: state.weeklyChallenges.map((challenge) =>
          challenge.id === action.challengeId
            ? { ...challenge, isCompleted: true, completedAt: new Date() }
            : challenge
        ),
      };

    case 'UPDATE_STREAK':
      return {
        ...state,
        currentStreak: action.current,
        longestStreak: action.longest,
      };

    case 'LOAD_DATA':
      return action.data;

    default:
      return state;
  }
}

// 컨텍스트 생성
const GamificationContext = createContext<{
  state: GamificationState;
  dispatch: React.Dispatch<GamificationAction>;
  addXP: (amount: number, source: string, description: string) => void;
  earnBadge: (badgeId: string) => void;
  completeAchievement: (achievementId: string) => void;
  completeMission: (missionId: string) => void;
  completeChallenge: (challengeId: string) => void;
  updateStreak: (current: number, longest: number) => void;
} | null>(null);

// 프로바이더 컴포넌트
export function GamificationProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [state, dispatch] = useReducer(gamificationReducer, initialState);

  // 헬퍼 함수들
  const addXP = (amount: number, source: string, description: string) => {
    dispatch({ type: 'ADD_XP', amount, source, description });
  };

  const earnBadge = (badgeId: string) => {
    dispatch({ type: 'EARN_BADGE', badgeId });
  };

  const completeAchievement = (achievementId: string) => {
    dispatch({ type: 'COMPLETE_ACHIEVEMENT', achievementId });
  };

  const completeMission = (missionId: string) => {
    dispatch({ type: 'COMPLETE_MISSION', missionId });
  };

  const completeChallenge = (challengeId: string) => {
    dispatch({ type: 'COMPLETE_CHALLENGE', challengeId });
  };

  const updateStreak = (current: number, longest: number) => {
    dispatch({ type: 'UPDATE_STREAK', current, longest });
  };

  // 로컬 스토리지에서 데이터 로드
  useEffect(() => {
    // TODO: AsyncStorage에서 데이터 로드
  }, []);

  // 데이터 저장
  useEffect(() => {
    // TODO: AsyncStorage에 데이터 저장
  }, [state]);

  return (
    <GamificationContext.Provider
      value={{
        state,
        dispatch,
        addXP,
        earnBadge,
        completeAchievement,
        completeMission,
        completeChallenge,
        updateStreak,
      }}
    >
      {children}
    </GamificationContext.Provider>
  );
}

// 훅
export function useGamification() {
  const context = useContext(GamificationContext);
  if (!context) {
    throw new Error(
      'useGamification must be used within a GamificationProvider'
    );
  }
  return context;
}
