import React from 'react';
import { TouchableWithoutFeedback, Keyboard, StyleSheet } from 'react-native';

const withDismissKeyboard = (InnerComponent) => {
    const DismissKeyboard = ({ children, ...props }) => {
      return (
            <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
              <InnerComponent {...props}>
                {children}
              </InnerComponent>
            </TouchableWithoutFeedback>
      );
    }
    return DismissKeyboard;
  };
export default withDismissKeyboard;