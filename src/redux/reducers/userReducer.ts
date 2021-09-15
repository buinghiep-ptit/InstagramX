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
const userReducer = (state = defaultUserState, action) => {
  return state;
};

export default userReducer;
