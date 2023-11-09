import {Dimensions, StyleSheet} from 'react-native';
const windowWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
  newGameButton: {
    backgroundColor: 'blue',
    height: '8%',
    width: windowWidth * 0.4,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    marginBottom: 18,
  },
  newGameButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 18,
  },
});

export default styles;
