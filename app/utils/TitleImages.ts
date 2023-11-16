import {ImageSourcePropType} from 'react-native';
import {tileImages} from '../assets/images';

type TileImagesSet = {
  [key: number]: ImageSourcePropType;
};

const generateTileImagesSet = (difficulty: number): TileImagesSet => {
  const tileImagesSet: TileImagesSet = {};
  for (let i = 1; i <= difficulty; i++) {
    tileImagesSet[i] = tileImages[i];
  }
  return tileImagesSet;
};

const tileImagesSets: Record<number, TileImagesSet> = {
  4: generateTileImagesSet(4),
  6: generateTileImagesSet(6),
  8: generateTileImagesSet(8),
};

export default tileImagesSets;
