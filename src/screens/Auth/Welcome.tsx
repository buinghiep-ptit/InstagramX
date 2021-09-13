import {RouteProp} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import React from 'react';
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import colors from '../../assets/theme/colors';
import CustomButton from '../../components/commons/CustomButton';
import { SignUpUser } from '../../helpers/authService';
import {AuthStackParamList} from '../../navigations/AuthStack';
import {navigate} from '../../navigations/rootNavigation';
import Metrics from '../../utils/Dementions';
import SafeView from '../../utils/SafeView';
import {
  IFormValuesFirstStep,
  IFormValuesSecondStep,
  IFormValuesThirdStep,
} from './Register';
export type WelcomePropsRouteParams = IFormValuesFirstStep &
  IFormValuesSecondStep &
  IFormValuesThirdStep;
type WelcomePropsRouteProp = RouteProp<AuthStackParamList, 'Welcome'>;

type WelcomeNavigationProp = StackNavigationProp<AuthStackParamList, 'Welcome'>;

type WelcomeProps = {
  navigation: WelcomeNavigationProp;
  route: WelcomePropsRouteProp;
};

const Welcome = ({route}: WelcomeProps) => {
    const { email, password, fullName, phone, year, month, date, savePassword } = route.params
  const _signUp = () => {
      SignUpUser(email, password)
        .then(data => {
            alert(data);
        })
        .catch(error => {
            alert(error);
        })
  }
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        barStyle="light-content"
        backgroundColor={colors.bg}
        translucent={true}
      />
      <View style={styles.innerView}>
        <Text style={styles.txtTitleForm}>
          Đăng ký dưới tên {email.split('@')[0]}?
        </Text>
        <Text
          style={{
            marginVertical: 8,
            textAlign: 'center',
            color: '#888',
            fontSize: 14,
            paddingHorizontal: 16,
          }}>
          Bạn có thể đổi tên người dùng của mình bất cứ lúc nào.
        </Text>
        <View style={{marginVertical: 16, width: '100%'}}>
          <CustomButton
            loading={false}
            onPress={_signUp}
            color="blue"
            title="Đăng ký"
          />
        </View>
        <Text
          style={{
            marginVertical: 8,
            textAlign: 'center',
            color: colors.blue,
            fontSize: 14,
            fontWeight: '500',
            paddingHorizontal: 16,
          }}>
          Đổi tên người dùng
        </Text>
      </View>
      <TouchableOpacity
        onPress={() => navigate('Login')}
        activeOpacity={1}
        style={styles.btnLogin}>
        <Text
          style={{
            textAlign: 'center',
            fontSize: 13,
            fontWeight: '600',
            color: colors.blue,
          }}>
          <Text
            style={{
              fontWeight: '500',
              color: colors.focus,
            }}>
            Bạn đã có tài khoản?
          </Text>{' '}
          Hãy đăng nhập.
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default Welcome;

const styles = StyleSheet.create({
  container: SafeView.PlatformSafeArea,
  innerView: {
    width: Metrics.screenWidth - 48,
    marginTop: 44,
    flex: 1,
    alignSelf: 'center',
    alignItems: 'center',
  },
  txtTitleForm: {
    fontSize: 22,
    marginVertical: 8,
    fontWeight: '400',
    color: colors.white,
  },
  btnLogin: {
    height: 50,
    borderTopColor: colors.blur,
    borderTopWidth: 0.5,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
