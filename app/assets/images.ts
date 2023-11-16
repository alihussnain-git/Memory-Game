import {ImageSourcePropType} from 'react-native';

const path = '../../images/tileImages/';

type TileImages = {
  [key: number]: ImageSourcePropType;
};

export const tileImages: TileImages = {
  1: require(`${path}1.png`),
  2: require(`${path}2.png`),
  3: require(`${path}3.png`),
  4: require(`${path}4.png`),
  5: require(`${path}5.png`),
  6: require(`${path}6.png`),
  7: require(`${path}7.png`),
  8: require(`${path}8.png`),
};

export const defaultImage = require('../../images/tileImages/9.png');
