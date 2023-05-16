const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  content: ['./src/**/*.{html,js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          100: '#f499af',
          300: '#E71E4D',
          400: '#E21A5F',
          500: '#D70466',
          600: '#5e012c',
          800: '#5e012c',
        },
      },
      screens: {
        '3xl': '1700px',
        '4xl': '1900px',
        '5xl': '2200px',
      },
      fontFamily: {
        sans: ['Inter', ...defaultTheme.fontFamily.sans],
      },
      fontSize: {
        '2xs': ['0.7rem', { lineHeight: '0.9rem' }],
      },
    },
  },
  safelist: [
    {
      pattern: /(bg|text)-(primary)-(100|800)/,
    },
    'bg-gray-100',
    'text-gray-800',
    'bg-red-100',
    'text-red-800',
    'bg-yellow-100',
    'text-yellow-800',
    'bg-green-100',
    'text-green-800',
    'bg-blue-100',
    'text-blue-800',
    'bg-indigo-100',
    'text-indigo-800',
    'bg-purple-100',
    'text-purple-800',
    'bg-pink-100',
    'text-pink-800',
    'bg-indigo-600',
    'bg-gray-300',
    'group-hover:bg-indigo-800',
    'bg-white',
    'border-2',
    'border-indigo-600',
    'border-gray-30',
    'group-hover:border-gray-400',
    'text-indigo-600',
    'text-gray-500',
    '"h-2.5',
    'w-2.5',
    'rounded-full',
    'group-hover:bg-gray-300',
  ],
  plugins: [
    require('@tailwindcss/aspect-ratio'),
    require('@tailwindcss/forms'),
  ],
}
