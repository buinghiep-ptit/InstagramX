import React, {ReactNode, useState} from 'react';
import {
  View,
  Text,
  TextInput,
  StyleProp,
  ViewStyle,
  NativeSyntheticEvent,
  TextInputFocusEventData,
} from 'react-native';
import colors from '../../../assets/theme/colors';
import styles from './styles';

type InputProps = {
  onChangeText?: (val: string) => void;
  error?: string;
  iconPosition?: string;
  icon?: ReactNode;
  ele?: ReactNode;
  style?: StyleProp<ViewStyle>;
  value?: string;
  label?: string;
  placeholder?: string;
  keyboardType?:
    | 'email-address'
    | 'default'
    | 'number-pad'
    | 'phone-pad'
    | 'numeric';
  returnKeyType?: 'default' | 'done' | 'search' | 'send';
  onBlur?: (event: NativeSyntheticEvent<TextInputFocusEventData>) => void;
  onFocus?: (event: NativeSyntheticEvent<TextInputFocusEventData>) => void;
};
const CustomInput = ({
  onChangeText,
  onBlur,
  onFocus,
  error,
  iconPosition,
  icon,
  ele,
  style,
  value,
  label,
  ...props
}: InputProps) => {
  const [focused, setFocused] = useState<boolean>(false);

  const getFlexDirection = () => {
    if (icon && iconPosition) {
      if (iconPosition === 'right') {
        return 'row';
      } else if (iconPosition === 'left') {
        return 'row-reverse';
      }
    }
  };

  const getBorderColor = () => {
    if (error) {
      return colors.danger;
    }

    if (focused) {
      return colors.focus;
    } else {
      return colors.blur;
    }
  };
  return (
    <>
      <View
        style={[
          styles.inputWrapper,
          {alignItems: icon ? 'center' : 'baseline'},
          {borderColor: getBorderColor(), flexDirection: getFlexDirection()},
        ]}>
        <View>{ele && ele}</View>
        <TextInput
          style={[styles.textInput, style]}
          onChangeText={onChangeText}
          value={value}
          autoFocus={true}
          onFocus={e => {
            onFocus(e);
            setFocused(true);
          }}
          onBlur={() => {
            setFocused(false);
          }}
          {...props}
        />
        <View>{icon && icon}</View>
      </View>

      {error && <Text style={styles.error}>{error}</Text>}
    </>
  );
};

export default CustomInput;
