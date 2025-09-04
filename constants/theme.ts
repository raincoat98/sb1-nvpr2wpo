// 브랜드 아이덴티티 컬러 시스템 - 보라색 팔레트
export const Colors = {
  // 메인 컬러 (Primary) - 보라색
  primary: '#8b5cf6', // Violet 400 - 메인 보라색
  primaryLight: '#a78bfa', // Violet 300 - 라이트 보라색
  primaryDark: '#7c3aed', // Violet 600 - 진한 보라색

  // 서브 컬러 (Secondary) - 인디고
  secondary: '#6366f1', // Indigo 500 - 인디고
  secondaryLight: '#818cf8', // Indigo 400 - 라이트 인디고
  secondaryDark: '#4f46e5', // Indigo 600 - 진한 인디고

  // 포인트 컬러 (Accent) - 진한 보라색
  accent: '#5b21b6', // Purple 800 - 매우 진한 보라색
  accentLight: '#7c3aed', // Violet 600 - 진한 보라색
  accentDark: '#4c1d95', // Purple 900 - 더 진한 보라색

  // 건강 컬러 - 세이지 그린 (대비를 위해 유지)
  health: '#52C41A', // 세이지 그린
  healthLight: '#73D13D',
  healthDark: '#389E0D',

  // 상태별 컬러
  period: '#8b5cf6', // 생리 기간 - 메인 보라색
  fertile: '#a78bfa', // 가임기 - 라이트 보라색
  ovulation: '#7c3aed', // 배란일 - 진한 보라색

  // 중성 컬러
  white: '#FFFFFF',
  black: '#000000',
  gray: {
    50: '#f9fafb',
    100: '#f3f4f6',
    200: '#e5e7eb', // 연한 회색 보더
    300: '#d1d5db',
    400: '#9ca3af', // 연한 회색 텍스트
    500: '#6b7280', // 중간 회색 텍스트
    600: '#4b5563',
    700: '#374151', // 진한 회색 텍스트
    800: '#1f2937',
    900: '#111827',
  },

  // 시스템 컬러
  success: '#10B981',
  warning: '#F59E0B',
  error: '#EF4444',
  info: '#3B82F6',

  // 배경 컬러
  background: '#f3e8ff', // 연한 보라색 배경 (Purple 50)
  surface: '#FFFFFF',
  card: '#FFFFFF',
  backgroundSecondary: '#e0e7ff', // 연한 인디고 배경 (Indigo 100)

  // 텍스트 컬러
  text: {
    primary: '#374151', // 진한 회색 텍스트 (Gray 700)
    secondary: '#6b7280', // 중간 회색 텍스트 (Gray 500)
    tertiary: '#9ca3af', // 연한 회색 텍스트 (Gray 400)
    white: '#ffffff',
    purple: '#5b21b6', // 매우 진한 보라색 (Purple 800)
  },

  // 보더 컬러
  border: {
    light: '#e5e7eb', // 연한 회색 보더 (Gray 200)
    purple: '#a855f7', // 보라색 보더 (Purple 500)
  },

  // 투명도 효과
  overlay: {
    white20: 'rgba(255, 255, 255, 0.2)', // 반투명 흰색 (버튼 배경)
    purple15: 'rgba(139, 92, 246, 0.15)', // 반투명 보라색 (그림자)
    purple30: 'rgba(139, 92, 246, 0.3)', // 버튼 그림자
    purple40: 'rgba(139, 92, 246, 0.4)', // 호버 효과 그림자
  },

  // 그라데이션 - 보라색 팔레트
  gradients: {
    // 헤더: linear-gradient(135deg, #8b5cf6 0%, #6366f1 100%)
    header: ['#8b5cf6', '#6366f1'],
    // 선택된 날짜: linear-gradient(135deg, #8b5cf6, #6366f1)
    selected: ['#8b5cf6', '#6366f1'],
    // 버튼: linear-gradient(135deg, #8b5cf6, #7c3aed)
    button: ['#8b5cf6', '#7c3aed'],
    // 배경: linear-gradient(135deg, #f3e8ff 0%, #e0e7ff 100%)
    background: ['#f3e8ff', '#e0e7ff'],
    // 이벤트 카드: linear-gradient(135deg, #f3e8ff, #e0e7ff)
    card: ['#f3e8ff', '#e0e7ff'],
    // 기존 그라데이션들
    primary: ['#8b5cf6', '#a78bfa'],
    secondary: ['#6366f1', '#818cf8'],
    health: ['#52C41A', '#73D13D'],
    accent: ['#7c3aed', '#5b21b6'],
    soft: ['#f3e8ff', '#e0e7ff'],
  },
};

// 타이포그래피
export const Typography = {
  fontFamily: {
    regular: 'Inter-Regular',
    medium: 'Inter-Medium',
    semiBold: 'Inter-SemiBold',
    bold: 'Inter-Bold',
  },
  fontSize: {
    xs: 12,
    sm: 14,
    base: 16,
    lg: 18,
    xl: 20,
    '2xl': 24,
    '3xl': 28,
    '4xl': 32,
    '5xl': 36,
  },
  lineHeight: {
    tight: 1.2,
    normal: 1.4,
    relaxed: 1.6,
  },
};

// 스페이싱
export const Spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  '2xl': 24,
  '3xl': 32,
  '4xl': 40,
  '5xl': 48,
  '6xl': 64,
};

// Gap (Flexbox gap)
export const Gap = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  '2xl': 24,
  '3xl': 32,
  '4xl': 40,
  '5xl': 48,
  '6xl': 64,
};

// 보더 라디우스
export const BorderRadius = {
  none: 0,
  sm: 4,
  md: 8,
  lg: 12,
  xl: 16,
  '2xl': 20,
  '3xl': 24,
  full: 9999,
};

// 그림자
export const Shadows = {
  sm: {
    shadowColor: '#8b5cf6',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  md: {
    shadowColor: '#8b5cf6',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  lg: {
    shadowColor: '#8b5cf6',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 4,
  },
  xl: {
    shadowColor: '#8b5cf6',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.2,
    shadowRadius: 16,
    elevation: 8,
  },
};

// 게임화 관련 상수
export const Gamification = {
  // 경험치 시스템
  xp: {
    periodRecord: 10, // 생리 기록
    symptomRecord: 5, // 증상 기록
    healthCheck: 15, // 건강 체크
    vaccination: 20, // 접종 완료
    streak: 25, // 연속 기록
  },

  // 레벨 시스템
  levels: [
    {
      level: 1,
      name: '주기 관리 입문자',
      xpRequired: 0,
      color: Colors.gray[400],
    },
    { level: 2, name: '건강 관심자', xpRequired: 100, color: Colors.primary },
    { level: 3, name: '주기 챌린저', xpRequired: 250, color: Colors.secondary },
    { level: 4, name: '웰니스 마스터', xpRequired: 500, color: Colors.health },
    { level: 5, name: '건강 전문가', xpRequired: 1000, color: Colors.accent },
  ],

  // 뱃지 시스템
  badges: [
    {
      id: 'first_record',
      name: '첫 기록',
      description: '첫 번째 생리 기록',
      icon: '🎉',
    },
    {
      id: 'streak_7',
      name: '꾸준함',
      description: '7일 연속 기록',
      icon: '🔥',
    },
    {
      id: 'streak_30',
      name: '기록왕',
      description: '30일 연속 기록',
      icon: '👑',
    },
    {
      id: 'vaccination',
      name: '예방 완료',
      description: '모든 접종 완료',
      icon: '💉',
    },
    {
      id: 'health_master',
      name: '건강 마스터',
      description: '레벨 5 달성',
      icon: '🏆',
    },
  ],
};

// 애니메이션 설정
export const Animation = {
  duration: {
    fast: 200,
    normal: 300,
    slow: 500,
  },
  easing: {
    ease: 'ease',
    easeIn: 'ease-in',
    easeOut: 'ease-out',
    easeInOut: 'ease-in-out',
  },
};
