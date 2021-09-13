import {StyleSheet} from 'react-native';
import colors from '../../../assets/theme/colors';

export default StyleSheet.create({
  inputContainer: {
    // paddingVertical: 16
  },
  inputWrapper: {
    borderWidth: 0.5,
    borderRadius: 6,
    backgroundColor: '#242526',
  },
  textInput: {
    height: 44,
    flex: 1,
    paddingHorizontal: 16,
    fontSize: 15,
    color: colors.white,
  },
  error: {
    color: colors.danger,
    paddingTop: 6,
    fontSize: 14,
    fontWeight: '400',
  },
});
