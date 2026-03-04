import type { Config } from 'tailwindcss';

const config: Config = {
    content: [
          './pages/**/*.{js,ts,jsx,tsx,mdx}',
          './components/**/*.{js,ts,jsx,tsx,mdx}',
          './app/**/*.{js,ts,jsx,tsx,mdx}',
        ],
    theme: {
          extend: {
                  colors: {
                            midnight: '#0f0a1a',
                            orchid: '#8b5cf6',
                            teal: '#14b8a6',
                  },
                  fontFamily: {
                            serif: ['var(--font-playfair)', 'serif'],
                            sans: ['var(--font-raleway)', 'sans-serif'],
                  },
          },
    },
    plugins: [],
};

export default config;
