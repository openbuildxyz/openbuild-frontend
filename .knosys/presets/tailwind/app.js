const { nextui } = require('@nextui-org/react')
const { fontFamily } = require('tailwindcss/defaultTheme')

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './src/shared/components/**/*.{js,ts,jsx,tsx}',
    './src/domain/**/*.{js,ts,jsx,tsx}',
    './src/entry/**/*.{js,ts,jsx,tsx}',
    './src/app/**/*.{js,ts,jsx,tsx}',
    './node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    screens: {
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
      '2xl': '1536px',
      '3xl': '1920px',
    },
    extend: {
      dropShadow: {
        '3xl': '0 4px 12px rgba(0, 0, 0, 0.08)',
        '4xl': '0px 0px 24px rgba(0, 0, 0, 0.12)',
        'st': '0px -4px 14px 0px rgba(26, 26, 26, 0.08)',
      },
      fontFamily: {
        sans: ['var(--font-pt_mono)', ...fontFamily.sans],
      },
      backgroundImage: {
        'gradient-l-r':
          'linear-gradient(90deg, rgba(1, 219, 131, 0.6) 0%, transparent 40.29%, transparent 40.29%, transparent 100%)',
        'gradient-t-b': 'linear-gradient(180deg, #00FFA3 -21.21%, #F3FF65 100%)',
        'signin-gradient': 'radial-gradient(circle at 100% 0%, transparent 12px, #f1f1f1 0)',
        'signup-gradient': 'radial-gradient(circle at 0% 0%, transparent 12px, #f1f1f1 0)',
        'home-green-ball-gradient-l-r': 'linear-gradient(360deg, #00B56C 0%, rgba(1, 219, 131, 0.00) 100%)',
        'home-contributor-bg': 'linear-gradient(180deg, #F8F8F8 0%, rgba(248, 248, 248, 0.00) 100%)',
        'ticketLocation': 'linear-gradient(180deg, #ABEFD3 0%, #4BFBB4 100%)'
      },
      colors: {
        green: {
          DEFAULT: '#01DB83',
          50: '#d6f4ea',
          100: '#00A663',
        },
        yellow: {
          DEFAULT: '#FCF192',
          50: '#EFE37F',
        },
        orange: {
          DEFAULT: '#FDB17E',
          50: '#FDB17E',
        },
        red: {
          DEFAULT: '#E43150',
          50: '#E43150',
        },
        gray: {
          DEFAULT: '#1A1A1A',
          50: 'rgba(26, 26, 26, 0.8)',
          100: 'rgba(26, 26, 26, 0.6)',
          200: '#7C7C7C',
          300: '#F3F3F3',
          400: 'rgba(26, 26, 26, 0.06)',
          500: 'rgba(26, 26, 26, 0.4)',
          600: 'rgba(26, 26, 26, 0.1)',
          700: '#282828',
          800: 'rgba(26, 26, 26, 0.04)',
          900: '#EFEFEF',
          1000: '#f8f8f8',
          1100: 'rgba(26, 26, 26, 0.2)',
          1200: '#ebebeb',
          1300: 'rgba(26, 26, 26, 0.7)',
          1400: '#F1F1F1',
        },
        global: {
          main: '#051613',
          'bg-secondary': '#173C32',
          primary: '#F3FF65',
        },
      },
      borderRadius: {
        none: '0',
        DEFAULT: '8px',
        md: '4px',
        lg: '12px',
        xl: '16px',
        '2xl': '20px',
      },
      keyframes: {
        // shimmer: {
        //   '100%': {
        //     transform: 'translateX(100%)',
        //   },
        // },
        // barrage: {
        //   from: {
        //     transform: 'translateX(0px)',
        //   },
        //   to: {
        //     transform: 'translateX(-100px)',
        //   },
        // },
      },
      animation: {
        'spin-10s': 'spin 10s linear infinite'
        // barrage: 'barrage linear 5s infinite',
      },
      aspectRatio: {
        '19/10': '19 / 10',
      },
    },
  },
  plugins: [
    require('daisyui'),
    nextui({
      themes: {
        light: {
          colors: {
            background: '#FFFFFF', // or DEFAULT
            foreground: '#1a1a1a', // or 50 to 900 DEFAULT
            primary: {
              foreground: '#FFFFFF',
              DEFAULT: '#1a1a1a',
            },
            // ... rest of the colors
          },
        },
      }
    })
  ],
  daisyui: {
    themes: [
      // {'dark': {
      //   'primary': '#793ef9',
      //   'primary-focus': '#570df8',
      //   'primary-content': '#ffffff',
      //   'secondary': '#f000b8',
      //   'secondary-focus': '#bd0091',
      //   'secondary-content': '#ffffff',
      //   'accent': '#37cdbe',
      //   'accent-focus': '#2aa79b',
      //   'accent-content': '#ffffff',
      //   'neutral': '#2a2e37',
      //   'neutral-focus': '#16181d',
      //   'neutral-content': '#ffffff',
      //   'base-100': '#3d4451',
      //   'base-200': '#2a2e37',
      //   'base-300': '#16181d',
      //   'base-content': '#ebecf0',
      //   'info': '#66c6ff',
      //   'success': '#87d039',
      //   'warning': '#e2d562',
      //   'error': '#ff6f6f'
      // }},
      {'light': {
        'primary': '#1a1a1a',
        'primary-content': '#fff',
        'base-100': '#fff',
        'base-200': '#f8f8f8',
        'base-300': '#ebebeb',
        'base-content': 'rgba(26, 26, 26, 0.06)',
      }},
    ]
  }
  // require('@tailwindcss/line-clamp')
}
