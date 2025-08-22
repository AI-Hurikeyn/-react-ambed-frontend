/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Original Ambed theme colors
        'ambed': {
          'base': '#a47c68',
          'black': '#3c3531',
        },
        // Additional colors from the original theme
        'primary': '#a47c68',
        'dark': '#3c3531',
      },
      fontFamily: {
        'rubik': ['Rubik', 'sans-serif'],
        'reey': ['Reey', 'cursive'],
      },
      screens: {
        // Match original WordPress breakpoints
        'sm': '576px',
        'md': '768px', 
        'lg': '992px',
        'xl': '1200px',
        '2xl': '1400px',
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '128': '32rem',
      },
      animation: {
        'float': 'float 3s ease-in-out infinite',
        'slide-in-right': 'slideInRight 1s ease-out',
        'fade-in-up': 'fadeInUp 1s ease-out',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        slideInRight: {
          '0%': { transform: 'translateX(100%)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
        fadeInUp: {
          '0%': { transform: 'translateY(30px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
  // Important: Let Tailwind coexist with vendor CSS
  corePlugins: {
    preflight: false, // Disable Tailwind's reset to preserve vendor styles
  }
}
