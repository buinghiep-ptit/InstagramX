import React from 'react';
import {
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
  Image,
  ActivityIndicator,
} from 'react-native';

const SocialButton = ({
  buttonTitle,
  btnType,
  color,
  Icon,
  backgroundColor,
  flexType,
  ...rest
}) => {
  let bgColor = backgroundColor;
  return (
    <TouchableOpacity style={styles.buttonContainer} {...rest}>
      <View style={styles.iconWrapper}>{Icon}</View>
      <View></View>
    </TouchableOpacity>
  );
};

export default SocialButton;

const styles = StyleSheet.create({
  buttonContainer: {
    borderRadius: 100,
    borderWidth: 1,
    borderColor: '#E4E9F2',
    marginHorizontal: 8,
  },
  iconWrapper: {
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    fontWeight: 'bold',
  },
});
