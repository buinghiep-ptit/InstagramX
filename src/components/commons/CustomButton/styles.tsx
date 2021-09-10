import {StyleSheet} from 'react-native';
import colors from '../../../assets/theme/colors';

export default StyleSheet.create({
  wrapper: {
    width: '100%',
    height: 44,
    borderRadius: 6,
    alignItems: 'center',
    justifyContent: 'space-evenly'
  },
  loaderSection: {
    flexDirection: 'row'
  },
  textInput: {
    flex: 1,
    width: '100%'
  },
  error: {
    color: colors.danger,
    paddingTop: 4,
    fontSize: 12
  }
});