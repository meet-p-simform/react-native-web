import { extendTheme } from 'native-base';
import { Dimensions } from 'react-native';

const defaultWidth = Dimensions.get('window').width;

/**
 * An App Theme & Config file to implement NativeBase library more effectively
 */
const theme = extendTheme({
  variant: 'default',
  config: {
    initialColorMode: 'light'
  }
});

type ThemeType = typeof theme;
declare module 'native-base' {
  // It is mandatory to allow interface here, else props suggestions will not be supported while developing.

  interface ICustomTheme extends ThemeType {}
}

/**
 *
 * @param type nativeBase breakpoint type
 * @param width width of the window
 * @returns boolean value
 */
export const checkBreakPoint = (type: keyof typeof theme.breakpoints, width: number) => {
  const screenSize = width ?? defaultWidth;
  return theme?.breakpoints[type] <= screenSize;
};

export default theme;
