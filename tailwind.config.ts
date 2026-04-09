import type { Config } from 'tailwindcss';

export default {
  content: [
    './app.vue',
    './components/**/*.{vue,js,ts}',
    './composables/**/*.{js,ts}',
    './pages/**/*.vue',
    './plugins/**/*.{js,ts}',
  ],
  theme: {
    extend: {
      colors: {
        bgPrimary: '#0a0a0a',
        bgSecondary: '#0c0c0c',
        bgAlt: '#f5f5f5',
        textPrimary: '#111111',
        textSecondary: '#666666',
        textMuted: '#999999',
        borderLight: '#e5e5e5',
        accentLine: '#06c755',
      },
      fontFamily: {
        sans: ['"Noto Sans JP"', 'sans-serif'],
      },
      boxShadow: {
        soft: '0 24px 80px rgba(0, 0, 0, 0.08)',
      },
    },
  },
  plugins: [],
} satisfies Config;
