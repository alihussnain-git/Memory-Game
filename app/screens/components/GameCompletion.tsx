import React from 'react';
import {Text} from 'react-native';
import Button from '../../components/Button';
import styles from '../styles';

type GameCompletionProps = {
  onNewGameClick: () => void;
};

const GameCompletion: React.FC<GameCompletionProps> = ({onNewGameClick}) => {
  return (
    <>
      <Text style={styles.completeGameText}>
        {'Congratulations!\nYou completed the game!'}
      </Text>
      <Button onPress={onNewGameClick} text="New Game" />
    </>
  );
};

export default GameCompletion;
