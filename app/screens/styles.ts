import {Dimensions, StyleSheet} from 'react-native';
const screenHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
  board: {
    flex: 1,
    alignSelf: 'center',
    justifyContent: 'center',
  },
  row: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  difficultyButtons: {
    marginVertical: 16,
  },
  difficultyButtonText: {
    color: 'blue',
    fontWeight: 'bold',
    fontSize: 18,
  },
  newGameButton: {
    backgroundColor: 'blue',
    height: 36,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    marginBottom: 36,
  },
  newGameButtonText: {
    paddingHorizontal: 16,
    color: 'white',
    fontWeight: 'bold',
  },
  card: {
    marginHorizontal: 8,
    alignItems: 'center',
    justifyContent: 'center',
    aspectRatio: 1,
    height: screenHeight * 0.1, // Set to 10% of screen height
    borderRadius: 10,
  },
  cardImage: {
    aspectRatio: 1,
    height: '100%',
    width: '100%',
    borderRadius: 8,
    borderWidth: 2,
    borderColor: 'white',
  },
  completeGameText: {
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 16,
  },
});

export default styles;
