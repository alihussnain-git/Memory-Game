import React, {useState, useRef, useCallback, useEffect} from 'react';
import {Text, View} from 'react-native';
import {tileImagesSets} from '../utils/TitleImages';
import Button from '../components/Button';
import GameCard from './components/GameCard';
import styles from './styles';

const TIMEOUT_DURATION = 1000; // Timeout duration in milliseconds

const GameScreen: React.FC = () => {
  const [openCards, setOpenCards] = useState<number[]>([]);
  const [clearedCards, setClearedCards] = useState<number[]>([]);
  const [cardIds, setCardIds] = useState<number[]>([]);
  const [selectedDifficulty, setSelectedDifficulty] = useState<number>(0);

  const [shouldDisableAllCards, setShouldDisableAllCards] =
    useState<boolean>(false);
  const timeout = useRef<NodeJS.Timeout | null>(null);

  const disable = () => {
    setShouldDisableAllCards(true);
  };

  const enable = () => {
    setShouldDisableAllCards(false);
  };

  const isMatch = useCallback(
    (first: number, second: number) =>
      (first % selectedDifficulty) + 1 === (second % selectedDifficulty) + 1,
    [selectedDifficulty],
  );

  const isFlipped = useCallback(
    (id: number) => clearedCards.includes(id) || openCards.includes(id),
    [clearedCards, openCards],
  );

  const isInactive = useCallback(
    (id: number) => clearedCards.includes(id),
    [clearedCards],
  );

  const evaluate = useCallback(() => {
    const [first, second] = openCards;
    enable();
    if (isMatch(first, second)) {
      setClearedCards(prev => [...prev, first, second]);
      setOpenCards([]);
      return;
    }
    timeout.current = setTimeout(() => {
      setOpenCards([]);
    }, TIMEOUT_DURATION);
  }, [openCards, isMatch]);

  const handleCardClick = useCallback(
    (id: number) => {
      if (openCards.length === 1) {
        setOpenCards(prev => [...prev, id]);
        disable();
      } else {
        if (timeout.current) {
          clearTimeout(timeout.current);
        }
        setOpenCards([id]);
      }
    },
    [openCards.length],
  );

  const generateCardIds = useCallback((difficulty: number) => {
    const totalImages = difficulty * 2;
    const newCardIds = Array.from(
      {length: totalImages},
      (_, index) => index + 1,
    );
    newCardIds.sort(() => 0.5 - Math.random());
    setCardIds(newCardIds);
    setSelectedDifficulty(difficulty);
  }, []);

  const handClickNewGame = useCallback(() => {
    setCardIds([]);
    setOpenCards([]);
    setClearedCards([]);
    setSelectedDifficulty(0);
  }, []);

  useEffect(() => {
    let timeoutId: NodeJS.Timeout | null = null;
    if (openCards.length === 2) {
      timeoutId = setTimeout(evaluate, TIMEOUT_DURATION) as NodeJS.Timeout;
    }
    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [evaluate, openCards]);

  const renderRow = useCallback(
    (start: number, end: number) => (
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
    ),
    [
      cardIds,
      isFlipped,
      isInactive,
      handleCardClick,
      selectedDifficulty,
      shouldDisableAllCards,
    ],
  );

  const columns = selectedDifficulty / 2;
  const rows = cardIds.length / columns;
  const isGameComplete =
    cardIds.length !== 0 && clearedCards.length === cardIds.length;

  return (
    <View style={styles.board}>
      {!selectedDifficulty && (
        <>
          <Button onPress={() => generateCardIds(4)} text="Easy" />
          <Button onPress={() => generateCardIds(6)} text="Medium" />
          <Button onPress={() => generateCardIds(8)} text="Hard" />
        </>
      )}
      {selectedDifficulty !== 0 && !isGameComplete && (
        <>
          <Button onPress={handClickNewGame} text="New Game" />
          {[...Array(rows)].map((_, index) =>
            renderRow(index * columns, (index + 1) * columns),
          )}
        </>
      )}
      {isGameComplete && (
        <>
          <Text style={styles.completeGameText}>
            {'Congratulations!\nYou completed the game!'}
          </Text>
          <Button onPress={handClickNewGame} text="New Game" />
        </>
      )}
    </View>
  );
};

export default GameScreen;
