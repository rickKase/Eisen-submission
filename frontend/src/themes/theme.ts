import { extendTheme } from '@chakra-ui/react';

const theme = extendTheme({
  styles: {
    global: {
      'html, body, #root': {
        margin: '0',
        padding: '0',
        fontFamily: '8xl Academy Engraved, sans-serif',
        height: '100%',
        backgroundColor: 'tertiary.default',
        WebkitFontSmoothing: 'antialiased',
        MozOsxFontSmoothing: 'grayscale',
        display: 'flex',
        flexDirection: 'column',
      },
      '#root': {
        flex: 1,
      },
      code: {
        fontFamily: `source-code-pro, Menlo, Monaco, Consolas, 'Courier New', monospace`,
      },
    },
  },
  colors: {
    primary: {
      default: '#8A3463',
      dark: '#483248',
      light: '#E6E6FA',
    },
    secondary: {
      default: '#BC4347',
    },
    tertiary: {
      default: '#2D4463',
    },
    white: {
      default: 'white'
    },
    black: {
      default: 'black'
    },
    blackAlpha: {
      900: 'rgba(0, 0, 0, 0.92)', // Customize if needed
      700: 'rgba(0, 0, 0, 0.72)', // Customize if needed
    },
  },
});

export default theme;
