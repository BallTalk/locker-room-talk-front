export const theme = {
  colors: {
    primary: '#8B4513', // 가죽 색상
    secondary: '#D2B48C', // 밝은 가죽 색상
    background: '#FAF9F6', // 밝은 베이지
    text: {
      primary: '#333333',
      secondary: '#666666',
      light: '#999999'
    },
    accent: {
      pink: '#FFB6C1', // 여성스러운 핑크
      gold: '#D4AF37' // 고급스러운 골드
    },
    success: '#28a745', // 성공 메시지 색상
    error: '#dc3545' // 에러 메시지 색상
  },
  shadows: {
    leather: '0 4px 6px rgba(139, 69, 19, 0.1)',
    hover: '0 6px 12px rgba(139, 69, 19, 0.15)'
  },
  borderRadius: {
    small: '4px',
    medium: '8px',
    large: '12px'
  },
  spacing: {
    xs: '4px',
    sm: '8px',
    md: '16px',
    lg: '24px',
    xl: '32px',
    xxl: '48px',
  },
  breakpoints: {
    mobile: '320px',
    tablet: '768px',
    desktop: '1024px'
  }
} as const;

export type Theme = typeof theme; 