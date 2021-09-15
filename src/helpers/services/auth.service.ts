import {auth, firestore} from '../../config';
import {defaultUserState} from '../../redux/reducers/userReducer';
import {WelcomePropsRouteParams} from '../../screens/Auth/Welcome';
import {generateUsernameKeywords} from '../../utils';

export const DEFAULT_PHOTO_URI =
  'https://www.pavilionweb.com/wp-content/uploads/2017/03/man-300x300.png';

export type RegisterParams = WelcomePropsRouteParams & {username: string};

export const SignUpUser = (userData: RegisterParams) => {
  return new Promise((resolve, reject) => {
    auth()
      .createUserWithEmailAndPassword(userData.email, userData.password)
      .then(snapshot => {
        resolve('Đăng ký thành công!');
        snapshot.user.sendEmailVerification();
        firestore()
          .collection('users')
          .doc(userData.username)
          .set({
            email: userData.email,
            fullName: userData.fullName,
            keyword: generateUsernameKeywords(userData.username),
            phone: userData.phone,
            username: userData.username,
            birthday: {
              date: userData.date,
              month: userData.month,
              year: userData.year,
            },
            bio: '',
            gender: 2,
            followings: [userData.username],
            requestedList: [],
            searchRecent: [],
            storyNotificationList: [],
            postNotificationList: [],
            website: '',
            avatarURL: DEFAULT_PHOTO_URI,
            privacySetting: {
              ...defaultUserState.setting?.privacy,
            },
            notificationSetting: {
              ...defaultUserState.setting?.notification,
            },
          });
      })
      .catch(error => {
        reject(error);
      });
  });
};
