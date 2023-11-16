import React from 'react';
import Button from '../../components/Button';

type DifficultySelectionProps = {
  onDifficultySelect: (difficulty: number) => void;
};

const DifficultySelection: React.FC<DifficultySelectionProps> = ({
  onDifficultySelect,
}) => {
  return (
    <>
      <Button onPress={() => onDifficultySelect(4)} text="Easy" />
      <Button onPress={() => onDifficultySelect(6)} text="Medium" />
      <Button onPress={() => onDifficultySelect(8)} text="Hard" />
    </>
  );
};

export default DifficultySelection;
