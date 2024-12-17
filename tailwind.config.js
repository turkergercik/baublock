/** @type {import('tailwindcss').Config} */
module.exports = {

  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      flexGrow: {
        4: '2',
        1:"1"
      },
      keyframes: {
        'slide-in-right': {
          '0%': { transform: 'translateX(100%)' },
          '100%': { transform: 'translateX(0)' },
        },
        'slide-out-right': {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(100%)' },
        },
      },
      animation: {
        'slide-in-right': 'slide-in-right 0.5s ease-out forwards',
        'slide-out-right': 'slide-out-right 0.5s ease-out forwards',
      },
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      screens: {
        'custom': '800px',
      },
      typography: {
        DEFAULT: {
          css: {
            color:"red",
            h1: {
              
              color:"blue",
              fontSize: '2.5rem',
              fontWeight: '700',
            },
            p: {
              color:"blue",
              fontSize: '1.1rem',
              lineHeight: '1.8',
            },
            img: {
              borderRadius: '0.5rem',
            },
          },
        },
    },
  }
      
    },
    
  
  plugins: [  require('tailwind-scrollbar')({ nocompatible: true,preferredStrategy:'pseudoelements' }),require('@tailwindcss/typography')],
};
