import React from 'react';
import { GestureResponderEvent, StyleProp, ActivityIndicator, Text, View, ViewStyle, TouchableOpacity } from 'react-native'
import colors from '../../../assets/theme/colors';
import styles from './styles';

type ButtonProps = {
    title?: string,
    color?: string,
    disabled?: boolean,
    loading?: boolean,
    onPress?: (event: GestureResponderEvent) => void,
    style?: StyleProp<ViewStyle>,
}
const CustomButton = ({
    title,
    color,
    disabled,
    loading,
    onPress,
    style,
  }: ButtonProps) => {
    const getBgColor = () => {
      if (disabled) {
        return colors.blue;
      }
      if (color === 'blue') {
        return colors.blue;
      }
      if (color === 'danger') {
        return colors.danger;
      }
    } ;
  return (
    <TouchableOpacity
      disabled={disabled}
      onPress={onPress}
      activeOpacity={0.8}
      style={[styles.wrapper, {backgroundColor: getBgColor(), opacity: disabled ? 0.5 : 1}, style]}>
      <View style={[styles.loaderSection]}>
        {loading && (
          <ActivityIndicator
            color={colors.white}
          />
        ) }
        {title && (
          <Text
            style={{
              color: disabled ? colors.white : colors.white,
              paddingLeft: loading ? 5 : 0,
            }}>
            {loading ? '' : title}
          </Text>
        ) }
      </View>
    </TouchableOpacity>
  );
};

export default CustomButton;