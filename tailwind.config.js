/** @type {import('tailwindcss').Config} */
export default {
    content: ['index.html', './src/**/*.{js,ts,jsx,tsx}'],
    theme: {
      extend: {
        colors: {
          // Primary blue colors - gradient from light to dark
          'blue-50': '#E6F0FF',
          'blue-100': '#CCE0FF',
          'blue-200': '#99C2FF',
          'blue-300': '#66A3FF',
          'blue-400': '#3385FF',
          'blue-500': '#0066FF', // Base blue
          'blue-600': '#0052CC',
          'blue-700': '#003D99',
          'blue-800': '#002966',
          'blue-900': '#001433',
          
          // Primary red colors - gradient from light to dark
          'red-50': '#FFEBEB',
          'red-100': '#FFD6D6',
          'red-200': '#FFADAD',
          'red-300': '#FF8585',
          'red-400': '#FF5C5C',
          'red-500': '#FF3333', // Base red
          'red-600': '#CC2929',
          'red-700': '#991F1F',
          'red-800': '#661414',
          'red-900': '#330A0A',
          
          // Neutral colors
          'neutral-50': '#F9FAFB',
          'neutral-100': '#F3F4F6',
          'neutral-200': '#E5E7EB',
          'neutral-300': '#D1D5DB',
          'neutral-400': '#9CA3AF',
          'neutral-500': '#6B7280',
          'neutral-600': '#4B5563',
          'neutral-700': '#374151',
          'neutral-800': '#1F2937',
          'neutral-900': '#111827',
          
          // Success, warning, error feedback colors
          'success-light': '#ECFDF5',
          'success': '#10B981',
          'success-dark': '#047857',
          
          'warning-light': '#FFFBEB',
          'warning': '#F59E0B',
          'warning-dark': '#B45309',
          
          'error-light': '#FEF2F2',
          'error': '#EF4444',
          'error-dark': '#B91C1C',
          
          // Background colors
          'bg-primary': '#FFFFFF',
          'bg-secondary': '#F9FAFB',
          'bg-tertiary': '#F3F4F6',
          
          // Keep a few of your original colors for compatibility
          'primary': '#0066FF',
          'secondary': '#FF3333',
          'background': '#F9FAFB',
        },
        
        fontFamily: {
          sans: ['Poppins', 'Inter', 'system-ui', 'sans-serif'],
          poppins: ['Poppins', 'sans-serif'],
        },
        
        boxShadow: {
          'sm': '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
          'DEFAULT': '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
          'md': '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
          'lg': '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
          'xl': '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
          'inner': 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)',
          'navbar': '0px 1px 3px -2px rgba(0, 0, 0, 0.1)',
          'card': '0 0 10px rgba(0, 0, 0, 0.05)',
          'hover': '0 4px 12px rgba(0, 102, 255, 0.15)',
          'red-hover': '0 4px 12px rgba(255, 51, 51, 0.15)',
        },
        
        borderRadius: {
          'none': '0',
          'sm': '0.125rem',
          'DEFAULT': '0.25rem',
          'md': '0.375rem',
          'lg': '0.5rem',
          'xl': '0.75rem',
          '2xl': '1rem',
          '3xl': '1.5rem',
          'full': '9999px',
        },
        
        animation: {
          'spin-slow': 'spin 1.5s linear infinite',
          'slideInToLeft': 'slideInToLeft 0.5s ease-out forwards',
          'slideInFromTop': 'slideInFromTop 0.5s ease-out forwards',
          'slideOutFromBottom': 'slideOutFromBottom 0.5s ease-out forwards',
          'fadeIn': 'fadeIn 0.3s ease-out forwards',
          'pulse-subtle': 'pulse-subtle 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
          'bounce-subtle': 'bounce-subtle 1s infinite',
        },
        
        keyframes: {
          slideInToLeft: {
            '0%': { transform: 'translateX(100%)', opacity: '0' },
            '100%': { transform: 'translateX(0)', opacity: '1' }
          },
          slideInFromTop: {
            '0%': { transform: 'translateY(-10%)', opacity: '0' },
            '100%': { transform: 'translateY(0)', opacity: '1' }
          },
          slideOutFromBottom: {
            '0%': { transform: 'translateY(0)', opacity: '1' },
            '100%': { transform: 'translateY(-10%)', opacity: '0' }
          },
          fadeIn: {
            '0%': { opacity: '0' },
            '100%': { opacity: '1' }
          },
          'pulse-subtle': {
            '0%, 100%': { opacity: '1' },
            '50%': { opacity: '0.8' },
          },
          'bounce-subtle': {
            '0%, 100%': { transform: 'translateY(-3%)' },
            '50%': { transform: 'translateY(0)' },
          },
        },
        
        screens: {
          'xs': '480px',
          'sm': '640px',
          'md': '768px',
          'lg': '1024px',
          'xl': '1280px',
          '2xl': '1536px',
          // Keep your custom breakpoints
          'xsm': '450px',
          'xmd': '700px',
          'xlg': '1210px'
        },
        
        // Adding gradients
        backgroundImage: {
          'gradient-blue-to-purple': 'linear-gradient(135deg, #0066FF 0%, #6B46C1 100%)',
          'gradient-red-to-orange': 'linear-gradient(135deg, #FF3333 0%, #FF9933 100%)',
          'gradient-blue-light': 'linear-gradient(135deg, #E6F0FF 0%, #CCE0FF 100%)',
          'gradient-red-light': 'linear-gradient(135deg, #FFEBEB 0%, #FFD6D6 100%)',
          'gradient-neutral': 'linear-gradient(135deg, #F3F4F6 0%, #E5E7EB 100%)',
        },
      }
    },
    plugins: []
  };
