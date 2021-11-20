import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import colors from '../../assets/theme/colors';

export interface NavigationBarProps {
  iconLeft?: React.ReactNode;
  iconRight?: React.ReactNode;
  iconMiddle?: React.ReactNode;
  title?: string;
  callbackLeft?: () => void;
  callbackRight?: () => void;
}
const NavigationBar = ({
  iconLeft,
  iconRight,
  iconMiddle,
  callbackLeft,
  title,
  callbackRight,
}: NavigationBarProps) => {
  const _onCallBackLeft = () => {
    if (callbackLeft) callbackLeft();
  };
  const _onCallBackRight = () => {
    if (callbackRight) callbackRight();
  };
  return (
    <View style={styles.navigationBar}>
      <View style={styles.headerLeft}>
        <TouchableOpacity onPress={_onCallBackLeft} style={styles.iconWrapper}>
          {iconLeft && iconLeft}
        </TouchableOpacity>
        <View style={styles.middleWrapper}>{iconMiddle && iconMiddle}</View>
      </View>
      {iconRight && (
        <TouchableOpacity style={styles.headerRight} onPress={_onCallBackRight}>
          {iconRight}
        </TouchableOpacity>
      )}
    </View>
  );
};

export default NavigationBar;

const styles = StyleSheet.create({
  navigationBar: {
    backgroundColor: colors.white,
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: 44,
    width: '100%',
    paddingHorizontal: 8,
    alignItems: 'center',
    // shadowOpacity: 0.2,
    // shadowRadius: 8,
    // shadowOffset: {
    //   width: 0,
    //   height: 8,
    // },
    // shadowColor: colors.shadow,
    // elevation: 12,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingRight: 8,
  },
  middleWrapper: {
    marginHorizontal: 8,
  },
  iconWrapper: {
    height: 36,
    width: 36,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
