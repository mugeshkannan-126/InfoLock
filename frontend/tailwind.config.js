/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        outfit: ['Outfit', 'sans-serif'],
        playfair: ['Poppins', 'serif'],
      },
      colors: {
        primary: {
          900: '#111827',
          800: '#1F2937',
        },
        accent: {
          500: '#3B82F6',
          600: '#2563EB',
        },
        secondary: {
          500: '#6366F1',
          600: '#4F46E5',
        },
        success: {
          500: '#10B981',
        },
        light: {
          100: '#E5E7EB',
        }
      }
    },
  },
  plugins: [],
}