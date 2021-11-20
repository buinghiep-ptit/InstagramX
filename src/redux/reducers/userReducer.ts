import { Alert } from 'react-native';
import { userActionTypes } from '../../constant/actionTypes';
import {UserPayload} from '../../helpers/interfaces/user';

export const defaultUserState: UserPayload = {
  user: {},
  photos: [],
  tagPhotos: [],
  taggedPhotos: [],
  bookmarks: [],
  highlights: [],
  archive: {
    stories: [],
    posts: [],
  },
  setting: {
    notification: {
      notificationAccounts: {
        posts: [],
        story: [],
      },
      pauseAll: {
        active: false,
      },
      postStoryComment: {
        likes: 2,
        likesAndCommentOnPhotoOfYou: 2,
        photosOfYou: 1,
        comments: 2,
        commentsAndPins: 1,
        firstPostsAndStories: 1,
      },
      followingFollowers: {
        followerRequest: 1,
        acceptedFollowRequest: 1,
        friendsOnInstagram: 1,
        mentionsInBio: 1,
        recommendationsForOthers: 1,
        recommendationsFromOthers: 1,
      },
      directMessages: {
        messageRequests: 1,
        messages: 1,
        groupRequest: 1,
        videoChats: 2,
      },
      liveIGTV: {
        liveVideos: 1,
        igtvVideoUploads: 1,
        igtvViewCounts: 1,
      },
      fromInstagram: {
        reminders: 1,
        productAnnoucements: 1,
        supportRequests: 1,
      },
      emailAndSMSNotifications: {
        feedbackEmails: true,
        reminderEmails: true,
        productEmail: true,
        newsEmails: true,
        textSMSMessages: true,
      },
    },
    privacy: {
      comments: {
        blockUsers: [],
        filterMostReported: false,
        hideOffensive: true,
        manualFilter: false,
        specificWord: '',
      },
      tags: {
        allowTagFrom: 0,
        manualApproveTags: false,
        pendingTags: [],
      },
      activityStatus: {
        show: true,
      },
      accountPrivacy: {
        private: false,
      },
      story: {
        hideStoryFrom: [],
        allowMessageReplies: 0,
        saveToGallery: true,
        saveToArchive: true,
        allowResharing: false,
        allowSharing: true,
        shareYourStoryToFacebook: false,
      },
      mutedMessages: {
        mutedMessages: [],
      },
      mutedVideoCalls: {
        mutedVideoCalls: [],
      },
      restrictedAccounts: {
        restrictedAccounts: [],
      },
      blockedAccounts: {
        blockedAccounts: [],
      },
      mutedAccouts: {
        posts: [],
        story: [],
      },
      closeFriends: {
        closeFriends: [],
      },
    },
  },
  extraInfo: {
    unSuggestList: [],
    requestedList: [],
    posts: 0,
    followers: [],
    followings: [],
  },
  currentStory: [],
};

export interface UserRequestAction {
  type: string,
  payload: null,
}
export interface UserSuccessAction<T> {
  type: string,
  payload: T,
}
export interface UserErrorAction {
  type: string,
  payload: { 
    message: string 
  },
}

export type UserAction = 
  UserSuccessAction<UserPayload> 
  | UserRequestAction
  | UserErrorAction

const userReducer = (state: UserPayload = defaultUserState, action: UserAction): UserPayload => {
  switch (action.type) {
    case userActionTypes.REGISTER_REQUEST:
      action = <UserRequestAction>action;
      state = {...state, user: {} }
      return state;  
    case userActionTypes.REGISTER_SUCCESS:
      action = <UserSuccessAction<UserPayload>>action;
      state = { ...state, user:{...action.payload.user} }
      return state; 
    case userActionTypes.REGISTER_FAILURE:
      action = <UserErrorAction>action;
      const messageRegis = action.payload.message;
      Alert.alert('Error Register', messageRegis)
      return state; 

    case userActionTypes.LOGIN_REQUEST:
      action = <UserRequestAction>action;
      state = {...state, user: {} }
      return state;  
    case userActionTypes.LOGIN_SUCCESS:
      action = <UserSuccessAction<UserPayload>>action;
      state = { ...state, user:{...action.payload.user} }
      return state; 
    case userActionTypes.LOGIN_FAILURE:
      action = <UserErrorAction>action;
      const messageLogin = action.payload.message;
      Alert.alert('Error Login', messageLogin)
      return state; 

    default:
      return state;
  }
};

export default userReducer;
