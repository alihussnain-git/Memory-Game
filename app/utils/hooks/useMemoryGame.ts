import {useState, useRef, useCallback, useEffect} from 'react';

const TIMEOUT_DURATION = 1000; // Timeout duration in milliseconds

const useMemoryGame = () => {
  const [openCards, setOpenCards] = useState<number[]>([]);
  const [clearedCards, setClearedCards] = useState<number[]>([]);
  const [cardIds, setCardIds] = useState<number[]>([]);
  const [selectedDifficulty, setSelectedDifficulty] = useState<number>(0);
  const [shouldDisableAllCards, setShouldDisableAllCards] =
    useState<boolean>(false);
  const timeout = useRef<NodeJS.Timeout | null>(null);

  // disable all cards during a move
  const disable = useCallback(() => {
    setShouldDisableAllCards(true);
  }, []);

  // enable all cards
  const enable = useCallback(() => {
    setShouldDisableAllCards(false);
  }, []);

  // check if two cards make a match
  const isMatch = useCallback(
    (first: number, second: number) =>
      (first % selectedDifficulty) + 1 === (second % selectedDifficulty) + 1,
    [selectedDifficulty],
  );

  // check if a card is flipped
  const isFlipped = useCallback(
    (id: number) => clearedCards.includes(id) || openCards.includes(id),
    [clearedCards, openCards],
  );

  const isInactive = useCallback(
    (id: number) => clearedCards.includes(id),
    [clearedCards],
  );

  // valuate whether two open cards make a match
  const evaluate = useCallback(() => {
    const [first, second] = openCards;
    enable();
    if (isMatch(first, second)) {
      // If cards match, add them to the cleared cards
      setClearedCards(prev => [...prev, first, second]);
      setOpenCards([]);
      return;
    }
    // If cards don't match, flip them back after a timeout
    timeout.current = setTimeout(() => {
      setOpenCards([]);
    }, TIMEOUT_DURATION);
  }, [openCards, isMatch, enable]);

  const handleCardClick = useCallback(
    (id: number) => {
      if (openCards.length === 1) {
        // If one card is already open, disable other cards
        setOpenCards(prev => [...prev, id]);
        disable();
      } else {
        // If no cards are open, open the clicked card
        if (timeout.current) {
          clearTimeout(timeout.current);
        }
        setOpenCards([id]);
      }
    },
    [openCards.length, disable],
  );

  // generate card ids for a given difficulty
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

  // start new game
  const handClickNewGame = useCallback(() => {
    setCardIds([]);
    setOpenCards([]);
    setClearedCards([]);
    setSelectedDifficulty(0);
  }, []);

  // Effect to handle card evaluation when two cards are open
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
  }, [openCards, evaluate]);

  return {
    clearedCards,
    cardIds,
    selectedDifficulty,
    shouldDisableAllCards,
    handleCardClick,
    generateCardIds,
    handClickNewGame,
    isFlipped,
    isInactive,
  };
};

export default useMemoryGame;
