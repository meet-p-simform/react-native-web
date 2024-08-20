import { useWindowDimensions } from 'react-native';
import { checkBreakPoint, globalMetrics } from '../theme';

/**
 *
 * @returns {boolean} isMediumScreen - Checks whether the screen size is preferred for web or else.
 */
const useApplicationDimension = () => {
  const { width } = useWindowDimensions();
  //variable for check the screen width is Medium(best for Web) or not.
  const isMediumScreen = globalMetrics.isWeb && checkBreakPoint('md', width);

  return { isMediumScreen, width };
};

export default useApplicationDimension;
