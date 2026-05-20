export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        bg: '#1A1A1A',
        surface: '#242424',
        'surface-2': '#2A2A2A',
        border: '#2E2E2E',
        text: '#F0F0F0',
        'text-dim': '#B0B0B0',
        'text-mute': '#888888',
        teal: '#004D61',
        'teal-hover': '#005F77',
        ruby: '#822659',
        'ruby-hover': '#9D2F6B',
        green: '#3E5641',
        'green-hover': '#4D6B51',
      },
      fontFamily: {
        sans: ['Cabinet Grotesk', 'system-ui', 'sans-serif'],
      },
    },
  },
}