import {StyleSheet, Platform, StatusBar} from 'react-native';
import colors from '../assets/theme/colors';

export default StyleSheet.create({
  PlatformSafeArea: {
    flex: 1,
    backgroundColor: colors.dark,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
});
