import React, {useEffect} from 'react';
import {TouchableOpacity, Image, ImageSourcePropType} from 'react-native';
import Animated, {
  Easing,
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from 'react-native-reanimated';
import styles from '../styles';

type CardProps = {
  image: ImageSourcePropType;
  onClick: (id: number) => void;
  id: number;
  isInactive: boolean;
  isFlipped: boolean;
  isDisabled: boolean;
};

const FLIP_DURATION = 500;
const FLIP_ANGLE = 180;

const DEFAULT_IMAGE = require('../../images/tileImages/9.png');

const GameCard: React.FC<CardProps> = ({
  isDisabled,
  onClick,
  id,
  isFlipped,
  image,
}) => {
  const rotation = useSharedValue(isFlipped ? FLIP_ANGLE : 0);

  useEffect(() => {
    rotation.value = withTiming(isFlipped ? FLIP_ANGLE : 0, {
      duration: FLIP_DURATION,
      easing: Easing.linear,
    });
  }, [isFlipped, rotation]);

  const handleClick = () => {
    if (!isFlipped && !isDisabled) {
      rotation.value = withTiming(FLIP_ANGLE, {
        duration: FLIP_DURATION,
        easing: Easing.linear,
      });
      onClick(id);
    }
  };

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{rotateY: `${rotation.value}deg`}],
    };
  });

  return (
    <TouchableOpacity
      style={[styles.card]}
      disabled={isDisabled}
      onPress={handleClick}>
      <Animated.View style={[styles.card, animatedStyle]}>
        <Image
          source={isFlipped ? image : DEFAULT_IMAGE}
          style={[styles.cardImage, isFlipped && {transform: [{scaleX: -1}]}]}
        />
      </Animated.View>
    </TouchableOpacity>
  );
};

export default GameCard;
