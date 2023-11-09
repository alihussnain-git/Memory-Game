import React from 'react';
import {Text, TouchableOpacity} from 'react-native';
import styles from './styles';

type ButtonProps = {
  onPress: () => void;
  text: string;
};

const Button: React.FC<ButtonProps> = ({onPress, text}) => (
  <TouchableOpacity onPress={onPress} style={styles.newGameButton}>
    <Text style={styles.newGameButtonText}>{text}</Text>
  </TouchableOpacity>
);

export default Button;
