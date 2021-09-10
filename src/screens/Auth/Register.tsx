import React, {useState} from 'react';
import {
  Alert,
  Animated,
  Easing,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import {Formik, FormikProps} from 'formik';
import * as yup from 'yup';
import colors from '../../assets/theme/colors';
import CustomButton from '../../components/commons/CustomButton';
import CustomInput from '../../components/commons/CustomInput';
import Icon from '../../components/commons/Icons';
import NavigationBar from '../../components/NavigationBar';
import withDismissKeyboard from '../../hooks/withDismissKeyboard';
import {navigate} from '../../navigations/rootNavigation';
import {STATUS_BAR_HEIGHT} from '../../utils';
import Metrics from '../../utils/Dementions';
import DatePicker, {MONTH_ALIAS} from '../../components/commons/DatePicker';
import SafeView from '../../utils/SafeView';
import {WelcomePropsRouteParams} from './Welcome';
import {auth} from '../../config';

import {
  AccessToken,
  AuthenticationToken,
  LoginManager,
} from 'react-native-fbsdk-next';

const DismissKeyboardView = withDismissKeyboard(View);
export interface IFormValuesFirstStep {
  phone: string;
  email: string;
}
export interface IFormValuesSecondStep {
  fullName: string;
  password: string;
  savePassword: boolean;
}
export interface IFormValuesThirdStep {
  date: number;
  month: number;
  year: number;
}

const Register = () => {
  const _loadingDeg = new Animated.Value(0);
  const _loadingOpacity = new Animated.Value(0);
  const [currentTab, setCurrentTab] = useState<number>(1);
  const _onToggleTab = (type: number): void => setCurrentTab(type);
  const [phone, setPhone] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [fullName, setFullName] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [savePassword, setSavePassword] = useState<boolean>(true);
  const [birthday, setBirthday] = useState<IFormValuesThirdStep>({
    date: 1,
    month: 1,
    year: 2020,
  });
  const [step, setStep] = useState<number>(1);

  const _startLoadingAnimation = (times: number) => {
    _loadingDeg.setValue(0);
    _loadingOpacity.setValue(1);
    setTimeout(() => {
      _loadingOpacity.setValue(0);
    }, 400 * times + 100);

    Animated.timing(_loadingDeg, {
      toValue: times,
      duration: 400 * times,
      useNativeDriver: true,
      easing: Easing.linear,
    }).start();
  };

  const _onValidatedFirstStep = (values: IFormValuesFirstStep) => {
    setEmail(values.email);
    setPhone(values.phone);
    setStep(step + 1);
  };
  const _onValidatedSecondStep = (values: IFormValuesSecondStep) => {
    setFullName(values.fullName);
    setPassword(values.password);
    setSavePassword(values.savePassword);
    setStep(step + 1);
  };
  const _onValidatedThirdStep = (values: IFormValuesThirdStep): void => {
    const selectedDate = new Date(
      `${MONTH_ALIAS[values.month]} ${values.date}, ${values.year}`,
    );
    if (
      selectedDate.getDate() != values.date ||
      selectedDate.getFullYear() != values.year ||
      selectedDate.getMonth() != values.month
    ) {
      Alert.alert('Error', 'Invalid birthday!');
      return;
    }
    if (
      Math.floor(
        (new Date().getTime() - selectedDate.getTime()) /
          (1000 * 60 * 60 * 24 * 365),
      ) > 5
    ) {
      /**
       * HANDLER CREATE HERE
       */
      const params: WelcomePropsRouteParams = {
        date: values.date,
        month: values.month,
        year: values.year,
        phone,
        email,
        fullName,
        password,
        savePassword,
      };
      navigate('Welcome', params);
    } else {
      Alert.alert('Error');
    }
  };
  const SchemaFirstStep = yup.object().shape(
    {
      phone: yup.string().when('email', {
        is: (email: string) => !email || currentTab === 1,
        then: yup
          .string()
          .min(6, 'Số điện thoại phải có ít nhất 6 ký tự.')
          .max(255, 'Too')
          .matches(/[0-9]{6,}/)
          .required('Bắt buộc.'),
      }),
      email: yup.string().when('phone', {
        is: (phone: string) => !phone || currentTab === 2,
        then: yup
          .string()
          .email('Vui lòng nhập email hợp lệ.')
          .required('Bắt buộc.'),
      }),
    },
    [['phone', 'email']],
  );

  const SchemaSecondStep = yup.object().shape({
    fullName: yup
      .string()
      .matches(/[a-zA-Z]+/)
      .required(),
    password: yup
      .string()
      .min(6, 'Mật khẩu phải có ít nhất 6 ký tự.')
      .required('Bắt buộc.'),
    savePassword: yup.boolean().required('Bắt buộc.'),
  });
  const SchemaThirdStep = yup.object().shape({
    date: yup.number().min(1).max(31).required(),
    month: yup.string().min(0).max(11).required(),
    year: yup.number().min(1900).max(2020).required(),
  });

  const _onLoginWithFacebook = async () => {
    try {
      const result = await LoginManager.logInWithPermissions([
        'public_profile',
        'email',
      ]);
      if (result.isCancelled) {
        throw 'User cancelled the login process';
      }
      const data = await AccessToken.getCurrentAccessToken();
      if (!data) {
        throw 'Something is wrong with the obtained token';
      }
      const fbCredential = auth.FacebookAuthProvider.credential(
        data.accessToken,
      );
      return await auth().signInWithCredential(fbCredential);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        barStyle="light-content"
        backgroundColor={colors.bg}
        translucent={true}
      />
      <NavigationBar
        iconLeft={<Icon name={'header-left'} fill={colors.white} />}
        callbackLeft={() => navigate('Login')}
      />
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardContainer}>
        {/* <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}> */}
        <DismissKeyboardView style={styles.innerView}>
          {step === 1 && (
            <>
              <Formik
                initialValues={{
                  phone: '',
                  email: '',
                }}
                onSubmit={_onValidatedFirstStep}
                validationSchema={SchemaFirstStep}
                validateOnBlur={false}
                validateOnChange={false}>
                {(formikProps: FormikProps<IFormValuesFirstStep>) => (
                  <>
                    <View>
                      <Text style={styles.txtTitleForm}>
                        Nhập số điện thoại hoặc email
                      </Text>
                    </View>
                    <View style={styles.formSignInWrapper}>
                      <View style={styles.tabsFormContainer}>
                        <TouchableOpacity
                          activeOpacity={0.8}
                          onPress={() => {
                            formikProps.setErrors({});
                            _onToggleTab(1);
                          }}
                          style={{
                            ...styles.tabItem,
                          }}>
                          <Text
                            style={{
                              ...styles.tabTitle,
                              color: currentTab === 1 ? '#FFF' : '#777',
                            }}>
                            Điện thoại
                          </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                          activeOpacity={0.8}
                          onPress={() => {
                            formikProps.setErrors({});
                            _onToggleTab(2);
                          }}
                          style={{
                            ...styles.tabItem,
                          }}>
                          <Text
                            style={{
                              ...styles.tabTitle,
                              color: currentTab === 2 ? '#FFF' : '#777',
                            }}>
                            Email
                          </Text>
                        </TouchableOpacity>
                        <View
                          style={{
                            ...styles.activeTabLine,
                            left: currentTab === 1 ? 0 : '50%',
                          }}
                        />
                      </View>

                      <View style={styles.inputContainer}>
                        {currentTab === 1 && (
                          <CustomInput
                            label="Phone number"
                            placeholder="Phone"
                            ele={
                              <TouchableOpacity style={styles.btnPhoneCode}>
                                <View style={styles.phoneCodeTitleWrapper}>
                                  <Text
                                    style={{
                                      fontWeight: '600',
                                      fontSize: 15,
                                      color: colors.blue,
                                    }}>
                                    VN +84
                                  </Text>
                                </View>
                              </TouchableOpacity>
                            }
                            icon={
                              formikProps.values.phone.length ? (
                                <TouchableOpacity
                                  onPress={() => {
                                    formikProps.setFieldValue('phone', '');
                                    formikProps.setErrors({});
                                  }}
                                  style={styles.iconWrapper}>
                                  <Icon
                                    name="close-circle"
                                    height={20}
                                    width={20}
                                  />
                                </TouchableOpacity>
                              ) : (
                                <View style={{height: 44}} />
                              )
                            }
                            iconPosition="right"
                            keyboardType="phone-pad"
                            returnKeyType="done"
                            error={
                              formikProps.touched.phone &&
                              formikProps.errors.phone
                            }
                            onChangeText={e => {
                              formikProps.handleChange('phone')(e);
                              formikProps.setFieldTouched(
                                'phone',
                                false,
                                false,
                              );
                            }}
                            value={formikProps.values.phone}
                            onBlur={formikProps.handleBlur('phone')}
                            onFocus={e => formikProps.setErrors({})}
                          />
                        )}
                        {currentTab === 2 && (
                          <CustomInput
                            label="Email address"
                            placeholder="Email"
                            icon={
                              formikProps.values.email.length ? (
                                <TouchableOpacity
                                  onPress={() => {
                                    formikProps.setFieldValue('email', '');
                                    formikProps.setErrors({});
                                  }}
                                  style={styles.iconWrapper}>
                                  <Icon
                                    name="close-circle"
                                    fill={colors.grey}
                                    height={20}
                                    width={20}
                                  />
                                </TouchableOpacity>
                              ) : (
                                <View style={{height: 44}} />
                              )
                            }
                            iconPosition="right"
                            keyboardType="email-address"
                            returnKeyType="done"
                            error={
                              formikProps.touched.email &&
                              formikProps.errors.email
                            }
                            onChangeText={e => {
                              formikProps.handleChange('email')(e);
                              formikProps.setFieldTouched(
                                'email',
                                false,
                                false,
                              );
                            }}
                            value={formikProps.values.email}
                            onBlur={formikProps.handleBlur('email')}
                            onFocus={() => formikProps.setErrors({})}
                          />
                        )}
                      </View>
                      <View style={{width: '100%'}}>
                        <CustomButton
                          loading={false}
                          onPress={() => {
                            formikProps.handleSubmit();
                          }}
                          disabled={
                            !formikProps.values.phone &&
                            !formikProps.values.email
                          }
                          color="blue"
                          title="Tiếp"
                        />
                      </View>
                    </View>
                  </>
                )}
              </Formik>

              <View style={styles.titleSocialWrapper}>
                <View style={styles.titleLine}></View>
                <View>
                  <Text style={styles.titleText}>{'Hoặc'}</Text>
                </View>
                <View style={styles.titleLine}></View>
              </View>

              <TouchableOpacity
                onPress={_onLoginWithFacebook}
                activeOpacity={0.8}
                style={styles.socialBtnWrapper}>
                <View style={styles.iconWrapperSocial}>
                  <Icon name="facebook" fill={colors.dark} />
                </View>
                <Text style={styles.btnTitle}>Tiếp tục với Facebook</Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={_onLoginWithFacebook}
                activeOpacity={0.8}
                style={styles.socialBtnWrapper}>
                <View style={styles.iconWrapperSocial}>
                  <Icon name="google" fill={colors.dark} />
                </View>
                <Text style={styles.btnTitle}>Tiếp tục với Google</Text>
              </TouchableOpacity>
            </>
          )}
          {step === 2 && (
            <Formik
              initialValues={{
                fullName: '',
                password: '',
                savePassword: true,
              }}
              onSubmit={_onValidatedSecondStep}
              validationSchema={SchemaSecondStep}
              validateOnBlur={false}
              validateOnChange={false}>
              {(formikProps: FormikProps<IFormValuesSecondStep>) => (
                <>
                  <View>
                    <Text style={styles.txtTitleForm}>Tên và mật khẩu</Text>
                  </View>
                  <View style={styles.inputContainer}>
                    <CustomInput
                      label="Full Name"
                      placeholder="Tên đầy đủ"
                      icon={
                        formikProps.values.fullName.length ? (
                          <TouchableOpacity
                            onPress={() => {
                              formikProps.setFieldValue('fullName', '');
                              formikProps.setErrors({fullName: undefined});
                            }}
                            style={styles.iconWrapper}>
                            <Icon
                              name="close-circle"
                              fill={colors.grey}
                              height={20}
                              width={20}
                            />
                          </TouchableOpacity>
                        ) : (
                          <View style={{height: 44}} />
                        )
                      }
                      iconPosition="right"
                      keyboardType="default"
                      returnKeyType="done"
                      error={
                        formikProps.touched.fullName &&
                        formikProps.errors.fullName
                      }
                      onChangeText={e => {
                        formikProps.handleChange('fullName')(e);
                        formikProps.setFieldTouched('fullName', false, false);
                      }}
                      value={formikProps.values.fullName}
                      onBlur={formikProps.handleBlur('fullName')}
                      onFocus={() =>
                        formikProps.setErrors({fullName: undefined})
                      }
                    />
                    <View style={{marginVertical: 8}} />
                    <CustomInput
                      label="Password"
                      placeholder="Mật khẩu"
                      icon={
                        formikProps.values.password.length ? (
                          <TouchableOpacity
                            onPress={() => {
                              formikProps.setFieldValue('password', '');
                              formikProps.setErrors({password: undefined});
                            }}
                            style={styles.iconWrapper}>
                            <Icon
                              name="close-circle"
                              fill={colors.grey}
                              height={20}
                              width={20}
                            />
                          </TouchableOpacity>
                        ) : (
                          <View style={{height: 44}} />
                        )
                      }
                      iconPosition="right"
                      keyboardType="default"
                      returnKeyType="done"
                      error={
                        formikProps.touched.password &&
                        formikProps.errors.password
                      }
                      onChangeText={e => {
                        formikProps.handleChange('password')(e);
                        formikProps.setFieldTouched('password', false, false);
                      }}
                      value={formikProps.values.password}
                      onBlur={formikProps.handleBlur('password')}
                      onFocus={() =>
                        formikProps.setErrors({password: undefined})
                      }
                    />

                    <TouchableOpacity
                      activeOpacity={0.8}
                      onPress={() => {
                        formikProps.setFieldValue(
                          'savePassword',
                          !formikProps.values.savePassword,
                        );
                      }}
                      style={{
                        marginTop: 16,
                        marginLeft: -3,
                        flexDirection: 'row',
                        alignItems: 'center',
                      }}>
                      <Icon
                        name="checkmark-square"
                        fill={
                          formikProps.values.savePassword
                            ? colors.blue
                            : colors.grey
                        }
                      />
                      <Text style={{paddingHorizontal: 4}}>Nhớ mật khẩu</Text>
                    </TouchableOpacity>
                  </View>
                  <View style={{width: '100%'}}>
                    <CustomButton
                      loading={false}
                      onPress={() => {
                        formikProps.handleSubmit();
                      }}
                      disabled={
                        !formikProps.values.fullName ||
                        !formikProps.values.password
                      }
                      color="blue"
                      title="Tiếp tục và đồng bộ danh bạ"
                    />
                  </View>
                </>
              )}
            </Formik>
          )}
          {step === 3 && (
            <ScrollView bounces={false} style={styles.step3ScrollView}>
              <Formik
                validateOnBlur={false}
                validateOnChange={false}
                onSubmit={_onValidatedThirdStep}
                validationSchema={SchemaThirdStep}
                initialValues={birthday}>
                {(formikProps: FormikProps<IFormValuesThirdStep>) => (
                  <View style={styles.step3Wrapper}>
                    {/* <View>
                                                <Image style={styles.birthdayIcon}
                                                    source={require('../../assets/images/rocket.png')} />
                                            </View> */}
                    <Text
                      style={{
                        marginVertical: 15,
                        fontWeight: '500',
                        fontSize: 18,
                      }}>
                      Thêm sinh nhật
                    </Text>
                    <View
                      style={{
                        width: Metrics.screenWidth - 48,
                        marginBottom: 15,
                      }}>
                      <Text
                        style={{
                          textAlign: 'center',
                        }}>
                        Thông tin này sẽ không có trên trang cá nhân công khai
                        của bạn. Tại sao tôi cần biết sinh nhật của mình?
                      </Text>
                    </View>
                    <View style={styles.birthdayInputWrapper}>
                      <View style={styles.birthdayInput}>
                        <Text>
                          {MONTH_ALIAS[formikProps.values.month]}{' '}
                          {formikProps.values.date}, {formikProps.values.year}{' '}
                        </Text>
                        <View style={styles.currentYear}>
                          <Text
                            style={{
                              color: isEnoughAge(formikProps) ? '#000' : 'red',
                            }}>
                            {getAges(formikProps)} Tuổi
                          </Text>
                        </View>
                      </View>
                      {!isEnoughAge(formikProps) && (
                        <Text
                          style={{
                            color: '#666',
                            marginVertical: 2.5,
                          }}>
                          You need to input your birthday.
                        </Text>
                      )}

                      <View style={{alignItems: 'center'}}>
                        <Text
                          style={{
                            marginVertical: 10,
                            textAlign: 'center',
                            color: '#666',
                          }}>
                          Use your own birthday, even if this account is for a
                          bussiness, a pet or something else.
                        </Text>
                      </View>
                    </View>
                    <TouchableOpacity
                      onPress={() => {
                        _startLoadingAnimation(1);
                        formikProps.handleSubmit();
                      }}
                      activeOpacity={0.8}
                      style={{
                        ...styles.btnNextStep,
                        width: Metrics.screenWidth - 48,
                      }}>
                      <Animated.Text
                        style={{
                          opacity: Animated.subtract(1, _loadingOpacity),
                          fontWeight: '600',
                          color: '#fff',
                        }}>
                        Tiếp
                      </Animated.Text>
                      <Animated.Image
                        style={{
                          ...styles.loadingIcon,
                          position: 'absolute',
                          opacity: _loadingOpacity,
                          transform: [
                            {
                              rotate: _loadingDeg.interpolate({
                                inputRange: [0, 100],
                                outputRange: ['0deg', '36000deg'],
                              }),
                            },
                          ],
                        }}
                        source={require('../../assets/images/png/loading.png')}
                      />
                    </TouchableOpacity>

                    <DatePicker
                      defaultDate={1}
                      defaultMonth="Jan"
                      defaultYear={2020}
                      onDateChange={(date: number) => {
                        formikProps.handleChange('date')(`${date}`);
                      }}
                      onMonthIndexChange={(index: number) => {
                        formikProps.handleChange('month')(`${index}`);
                      }}
                      onYearChange={(year: number) => {
                        formikProps.handleChange('year')(`${year}`);
                      }}
                    />
                  </View>
                )}
              </Formik>
            </ScrollView>
          )}
        </DismissKeyboardView>
        {/* </TouchableWithoutFeedback>    */}
      </KeyboardAvoidingView>
      {step === 1 && (
        <TouchableOpacity
          onPress={() => navigate('Login')}
          activeOpacity={1}
          style={styles.btnLogin}>
          <Text
            style={{
              textAlign: 'center',
              fontSize: 13,
              fontWeight: '600',
              color: colors.textTitle,
            }}>
            <Text
              style={{
                fontWeight: '500',
                color: colors.subTitle,
              }}>
              Bạn đã có tài khoản?
            </Text>{' '}
            Hãy đăng nhập.
          </Text>
        </TouchableOpacity>
      )}
      {step === 2 && (
        <View style={styles.syncContactDescription}>
          <Text
            style={{
              textAlign: 'center',
              color: '#666',
              fontWeight: '500',
              fontSize: 13,
            }}>
            Danh bạ của bạn sẽ được đồng bộ hóa định kỳ và lưu trữ trên máy chủ
            Instagram để bạn và những người khác tìm thấy bạn bè, cũng như chúng
            tôi có thể cung cấp dịch hiệu quả hơn. Để xóa người liên hệ, hãy đi
            tới Cài đặt và ngắt kết nối.
            <Text
              style={{
                color: '#000',
                fontWeight: '600',
              }}>
              {' '}
              Tìm hiểu thêm
            </Text>
          </Text>
        </View>
      )}
    </SafeAreaView>
  );
};

export default Register;

const styles = StyleSheet.create({
  container: SafeView.PlatformSafeArea,
  keyboardContainer: {
    flex: 1,
  },
  innerView: {
    width: Metrics.screenWidth - 48,
    flex: 1,
    alignSelf: 'center',
    alignItems: 'center',
  },
  txtTitleForm: {
    fontSize: 24,
    marginVertical: 8,
    fontWeight: '400',
    color: colors.white,
  },
  formSignInWrapper: {
    width: '100%',
    marginVertical: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tabsFormContainer: {
    flexDirection: 'row',
    width: '100%',
    borderBottomColor: colors.grey,
    borderBottomWidth: 0.5,
    position: 'relative', // or null
  },
  tabItem: {
    width: '50%',
    justifyContent: 'center',
    alignItems: 'center',
    height: 50,
  },
  activeTabLine: {
    height: 1,
    width: '50%',
    backgroundColor: '#fff',
    position: 'absolute',
    bottom: 0,
  },
  tabTitle: {
    fontWeight: '600',
    fontSize: 16,
  },
  inputFormContainer: {
    width: '100%',
    marginVertical: 16,
  },
  inputContainer: {
    width: '100%',
    marginVertical: 16,
  },
  inputWrapper: {
    borderWidth: 1,
    borderRadius: 6,
    borderStyle: 'solid',
    flexDirection: 'row',
  },
  btnPhoneCode: {
    height: 44,
    justifyContent: 'center',
    width: 92,
  },
  phoneCodeTitleWrapper: {
    paddingVertical: 6,
    borderRightWidth: 1,
    borderRightColor: colors.blur,
    alignItems: 'center',
  },
  inputPhone: {
    height: 44,
    flex: 1,
    paddingHorizontal: 16,
    fontSize: 15,
    color: colors.textTitle,
  },
  iconWrapper: {
    height: 44,
    paddingRight: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    color: 'red',
    marginVertical: 5,
  },
  btnLogin: {
    height: 50,
    borderTopColor: '#ddd',
    borderTopWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  syncContactDescription: {
    width: '100%',
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  step3ScrollView: {
    width: '100%',
  },
  step3Wrapper: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 20,
  },
  birthdayIcon: {
    height: 64,
    width: 64,
  },
  birthdayInputWrapper: {
    width: '100%',
    // paddingHorizontal: 24
  },
  birthdayInput: {
    position: 'relative',
    backgroundColor: 'rgb(242,242,242)',
    width: '100%',
    height: 44,
    justifyContent: 'center',
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 6,
    paddingHorizontal: 15,
  },
  currentYear: {
    position: 'absolute',
    paddingHorizontal: 15,
    height: 44,
    justifyContent: 'center',
    top: 0,
    right: 0,
  },
  btnNextStep: {
    width: '100%',
    height: 44,
    backgroundColor: '#318bfb',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 20,
    borderRadius: 6,
  },
  loadingIcon: {
    width: 36,
    height: 36,
  },
  titleSocialWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
    width: Metrics.screenWidth - 48,
  },
  titleLine: {
    width: Metrics.screenWidth / 3,
    borderTopColor: colors.blur,
    borderTopWidth: 0.5,
  },
  titleText: {
    color: '#777',
    textTransform: 'uppercase',
    fontWeight: '500',
    fontSize: 14,
  },
  socialBtnWrapper: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 8,
    width: Metrics.screenWidth - 48,
    borderRadius: 6,
    borderColor: colors.blur,
    borderWidth: 1,
    height: 44,
  },
  iconWrapperSocial: {
    backgroundColor: colors.white,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 2,
    borderRadius: 100,
  },
  btnTitle: {
    color: colors.white,
    fontWeight: '500',
    fontSize: 14,
    marginHorizontal: 8,
  },
});
function getAges(
  formikProps: FormikProps<IFormValuesThirdStep>,
): React.ReactNode {
  return Math.floor(
    (new Date().getTime() -
      new Date(
        `${MONTH_ALIAS[formikProps.values.month]} ${formikProps.values.date}, ${
          formikProps.values.year
        }`,
      ).getTime()) /
      (1000 * 60 * 60 * 24 * 365),
  );
}

function isEnoughAge(formikProps: FormikProps<IFormValuesThirdStep>) {
  return (
    Math.floor(
      (new Date().getTime() -
        new Date(
          `${MONTH_ALIAS[formikProps.values.month]} ${
            formikProps.values.date
          }, ${formikProps.values.year}`,
        ).getTime()) /
        (1000 * 60 * 60 * 24 * 365),
    ) > 5
  );
}
