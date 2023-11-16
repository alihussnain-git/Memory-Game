import React from 'react';
import {View} from 'react-native';
import Button from '../components/Button';
import GameCard from './components/GameCard';
import GameCompletion from './components/GameCompletion';
import DifficultySelection from './components/DifficultySelection';
import styles from './styles';
import useMemoryGame from '../utils/hooks/useMemoryGame';
import tileImagesSets from '../utils/TitleImages';

const GameScreen: React.FC = () => {
  const {
    clearedCards,
    cardIds,
    selectedDifficulty,
    shouldDisableAllCards,
    handleCardClick,
    generateCardIds,
    handClickNewGame,
    isFlipped,
    isInactive,
  } = useMemoryGame();

  const renderRow = (start: number, end: number) => (
    <View style={styles.row} key={`row-${start}-${end}`}>
      {cardIds.slice(start, end).map(i => (
        <GameCard
          key={i}
          image={
            tileImagesSets[selectedDifficulty][(i % selectedDifficulty) + 1]
          }
          id={i}
          isDisabled={shouldDisableAllCards}
          isInactive={isInactive(i)}
          isFlipped={isFlipped(i)}
          onClick={handleCardClick}
        />
      ))}
    </View>
  );

  const columns = selectedDifficulty / 2;
  const rows = cardIds.length / columns;
  const isGameComplete =
    cardIds.length !== 0 && clearedCards.length === cardIds.length;
  const renderGame = selectedDifficulty !== 0 && !isGameComplete;

  return (
    <View style={styles.board}>
      {!selectedDifficulty && (
        <DifficultySelection onDifficultySelect={generateCardIds} />
      )}
      {renderGame && (
        <>
          <Button onPress={handClickNewGame} text="New Game" />
          {[...Array(rows)].map((_, index) =>
            renderRow(index * columns, (index + 1) * columns),
          )}
        </>
      )}
      {isGameComplete && <GameCompletion onNewGameClick={handClickNewGame} />}
    </View>
  );
};

export default GameScreen;
