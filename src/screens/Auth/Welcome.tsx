import {RouteProp} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import React, {useEffect, useRef, useState} from 'react';
import {
  Alert,
  AlertButton,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import colors from '../../assets/theme/colors';
import CustomButton from '../../components/commons/CustomButton';
import CustomInput from '../../components/commons/CustomInput';
import {firestore} from '../../config';
import {SignUpUser} from '../../helpers/services/auth.service';
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
  const {email} = route.params;

  const [username, setUsername] = useState<string>(email.split('@')[0]);
  const [usernameError, setUsernameError] = useState<boolean>(false);
  const [changingUsername, setChangingUsername] = useState<boolean>(false);

  const typingTimeoutRef = useRef<NodeJS.Timeout>();
  useEffect(() => {
    const usr: string = route.params.email.split('@')[0];
    checkExistUsername(usr, setUsernameError, setChangingUsername);
    return () => {
      if (typingTimeoutRef.current) clearTimeout(typingTimeoutRef.current);
    };
  }, []);

  const _validateUsername = (usrname: string) => {
    if (typingTimeoutRef.current) clearTimeout(typingTimeoutRef.current);
    typingTimeoutRef.current = setTimeout(() => {
      checkExistUsername(usrname, setUsernameError);
    }, 200);
  };

  const _signUp = async () => {
    try {
      const data = await SignUpUser({...route.params, username});
      alert(data);
    } catch (error) {
      alert(error);
    }
  };

  const _onClickChangeUsername = (): void => {
    setChangingUsername(true);
  };
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        barStyle="light-content"
        backgroundColor={colors.bg}
        translucent={true}
      />
      <View style={styles.innerView}>
        <Text style={styles.txtTitleForm}>Đăng ký dưới tên {username}?</Text>
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
        {!changingUsername && (
          <TouchableOpacity onPress={_onClickChangeUsername}>
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
          </TouchableOpacity>
        )}
        {changingUsername && (
          <View style={styles.inputContainer}>
            <CustomInput
              label="Username"
              placeholder="Tên người dùng"
              keyboardType="default"
              returnKeyType="done"
              icon={
                usernameError ? (
                  <Text style={{color: 'red', paddingRight: 16, fontSize: 20}}>
                    ✕
                  </Text>
                ) : (
                  <Text
                    style={{color: 'green', paddingRight: 16, fontSize: 20}}>
                    ✓
                  </Text>
                )
              }
              iconPosition="right"
              error={usernameError && 'Bạn không thể sử dụng tên này'}
              onChangeText={e => {
                setUsername(e.toLowerCase());
                _validateUsername(e.toLowerCase());
              }}
              value={username}
              onBlur={() => {}}
              onFocus={() => {}}
            />
          </View>
        )}
      </View>
      <View style={styles.bottomInfo}>
        <Text
          style={{
            textAlign: 'center',
            fontSize: 13,
            fontWeight: '400',
            color: colors.focus,
          }}>
          Bằng cách nhấn Đăng ký, bạn đã đồng ý với các{' '}
          <Text
            style={{
              color: colors.focus,
              fontWeight: '600',
            }}>
            Điều khoản, Chính sách dữ liệu và Chính sách cookies của chúng tối
          </Text>
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
  bottomInfo: {
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 25,
  },
  btnLogin: {
    height: 50,
    borderTopColor: colors.blur,
    borderTopWidth: 0.5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputContainer: {
    width: '100%',
    marginVertical: 16,
  },
});
function checkExistUsername(
  usr: string,
  setUsernameError: React.Dispatch<React.SetStateAction<boolean>>,
  setChangingUsername?: React.Dispatch<React.SetStateAction<boolean>>,
) {
  const pattern = /^[a-zA-Z0-9._]{4,}$/g;
  if (!pattern.test(usr)) return setUsernameError(true);
  firestore()
    .collection('users')
    .where('username', '==', usr.trim())
    .get()
    .then(snap => {
      if (snap.size > 0) {
        setUsernameError(true);
        if (setChangingUsername) {
          const buttonGroup: AlertButton[] = [
            {
              text: 'Chọn tên khác',
              onPress: () => setChangingUsername(true),
            },
          ];
          Alert.alert(
            'Tên người dùng đã tồn tại',
            'Hãy sử dụng một tên khác',
            buttonGroup,
          );
        }
      } else setUsernameError(false);
    })
    .catch(e => e);
}
