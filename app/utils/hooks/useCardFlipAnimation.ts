import {useEffect} from 'react';
import {
  Easing,
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from 'react-native-reanimated';

const FLIP_DURATION = 500;
const FLIP_ANGLE = 180;

const useCardFlipAnimation = (isFlipped: boolean) => {
  const rotation = useSharedValue(isFlipped ? FLIP_ANGLE : 0);

  useEffect(() => {
    rotation.value = withTiming(isFlipped ? FLIP_ANGLE : 0, {
      duration: FLIP_DURATION,
      easing: Easing.linear,
    });
  }, [isFlipped, rotation]);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{rotateY: `${rotation.value}deg`}],
    };
  });

  return animatedStyle;
};

export default useCardFlipAnimation;
