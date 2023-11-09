import {ImageSourcePropType} from 'react-native';

type TileImagesSet = {
  [key: number]: ImageSourcePropType;
};
export const tileImagesSets: Record<number, TileImagesSet> = {
  4: {
    1: require('../../images/tileImages/1.png'),
    2: require('../../images/tileImages/2.png'),
    3: require('../../images/tileImages/3.png'),
    4: require('../../images/tileImages/4.png'),
  },
  6: {
    1: require('../../images/tileImages/1.png'),
    2: require('../../images/tileImages/2.png'),
    3: require('../../images/tileImages/3.png'),
    4: require('../../images/tileImages/4.png'),
    5: require('../../images/tileImages/5.png'),
    6: require('../../images/tileImages/6.png'),
  },
  8: {
    1: require('../../images/tileImages/1.png'),
    2: require('../../images/tileImages/2.png'),
    3: require('../../images/tileImages/3.png'),
    4: require('../../images/tileImages/4.png'),
    5: require('../../images/tileImages/5.png'),
    6: require('../../images/tileImages/6.png'),
    7: require('../../images/tileImages/7.png'),
    8: require('../../images/tileImages/8.png'),
  },
};
