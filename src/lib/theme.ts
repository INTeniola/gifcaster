export const theme = {
  colors: {
    primary: '#8B5CF6', // Purple
    secondary: '#EC4899', // Pink
    background: {
      dark: '#0F172A', // Slate 900
      card: '#1E293B', // Slate 800
      hover: '#334155', // Slate 700
    },
    text: {
      primary: '#F8FAFC', // Slate 50
      secondary: '#94A3B8', // Slate 400
      muted: '#64748B', // Slate 500
    },
    border: {
      default: 'rgba(255, 255, 255, 0.1)',
      hover: 'rgba(255, 255, 255, 0.2)',
    },
    accent: {
      purple: '#8B5CF6',
      pink: '#EC4899',
      blue: '#3B82F6',
    }
  },
  animation: {
    transition: {
      fast: '150ms cubic-bezier(0.4, 0, 0.2, 1)',
      default: '200ms cubic-bezier(0.4, 0, 0.2, 1)',
      slow: '300ms cubic-bezier(0.4, 0, 0.2, 1)',
    }
  },
  spacing: {
    grid: {
      gap: '1rem',
      padding: '1.5rem',
    }
  }
};