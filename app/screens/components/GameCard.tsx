import React from 'react';
import {TouchableOpacity, Image, ImageSourcePropType} from 'react-native';
import Animated from 'react-native-reanimated';
import {defaultImage} from '../../assets/images';
import useCardFlipAnimation from '../../utils/hooks/useCardFlipAnimation';
import styles from '../styles';

type CardProps = {
  image: ImageSourcePropType;
  onClick: (id: number) => void;
  id: number;
  isInactive: boolean;
  isFlipped: boolean;
  isDisabled: boolean;
};

const GameCard: React.FC<CardProps> = ({
  isDisabled,
  onClick,
  id,
  isFlipped,
  image,
}) => {
  const animatedStyle = useCardFlipAnimation(isFlipped); // Use the new hook

  const handleClick = () => {
    if (!isFlipped && !isDisabled) {
      onClick(id);
    }
  };

  return (
    <TouchableOpacity
      style={[styles.card]}
      disabled={isDisabled}
      onPress={handleClick}>
      <Animated.View style={[styles.card, animatedStyle]}>
        <Image
          source={isFlipped ? image : defaultImage}
          style={[styles.cardImage, isFlipped && {transform: [{scaleX: -1}]}]}
        />
      </Animated.View>
    </TouchableOpacity>
  );
};

export default GameCard;
