import Timestamp from '@react-native-firebase/firestore';
import {Post, PostImage} from '../post';
import {Story} from '../story';

export type UserInfo = {
  email?: string;
  birthday?: {
    date: number;
    month: number;
    year: number;
  };
  followings?: string[];
  searchRecent?: SearchItem[];
  fullname?: string;
  phone?: string;
  username?: string;
  avatarURL?: string;
  bio?: string;
  website?: string;
  gender?: 0 | 1 | 2;
  storyNotificationList?: string[];
  postNotificationList?: string[];
  requestedList?: string[];
  unSuggestList?: string[];
};

interface IUserInfo {
  displayName: string | null;
  email: string | null;
  phoneNumber: string | null;
  photoURL: string | null;
  providerId: string;
  /**
   * The user's unique ID.
   */
  uid: string;
}
/**
 * type:
 * 1:user,
 * 2:hashtag
 * 3:place
 */
export type SearchItem = {
  type?: 1 | 2 | 3;
  username?: string;
  address?: string;
  hashtag?: string;
};

export type HashTag = {
  name?: string;
  followers?: string[];
  relatedTags?: string[];
  sources?: number[];
  stories?: number[];
  uid?: number;
  avatar?: PostImage;
};

export type ExtraInfo = {
  posts: number;
  followers: string[];
  followings: string[];
  requestedList: string[];
  unSuggestList: string[];
};

export type NotificationProperties =
  | 'notificationAccounts'
  | 'directMessages'
  | 'postStoryComment'
  | 'followingFollowers'
  | 'liveIGTV'
  | 'fromInstagram'
  | 'emailAndSMSNotifications';
export type PrivacyProperties =
  | 'comments'
  | 'tags'
  | 'activityStatus'
  | 'story'
  | 'accountPrivacy'
  | 'restrictedAccounts'
  | 'closeFriends'
  | 'blockedAccounts'
  | 'mutedMessages'
  | 'mutedVideoCalls';

export type NotificationLevel = 0 | 1 | 2;

export type PostStoryCommentOptions = {
  likes?: NotificationLevel;
  likesAndCommentOnPhotoOfYou?: NotificationLevel;
  photosOfYou?: NotificationLevel;
  comments?: NotificationLevel;
  commentsAndPins?: NotificationLevel;
  firstPostsAndStories?: NotificationLevel;
};

export type DirectMessagesOptions = {
  messageRequests?: NotificationLevel;
  messages?: NotificationLevel;
  groupRequest?: NotificationLevel;
  videoChats?: NotificationLevel;
};

export type LiveIGTVOptions = {
  liveVideos?: NotificationLevel;
  igtvVideoUploads?: NotificationLevel;
  igtvViewCounts?: NotificationLevel;
};
export type FromInstagramOptions = {
  reminders?: NotificationLevel;
  productAnnoucements?: NotificationLevel;
  supportRequests?: NotificationLevel;
};

export type EmailandSMSNotificationsOptions = {
  feedbackEmails?: boolean;
  reminderEmails?: boolean;
  productEmail?: boolean;
  newsEmails?: boolean;
  textSMSMessages?: boolean;
};

export type FollowingFollower = {
  followerRequest?: NotificationLevel;
  acceptedFollowRequest?: NotificationLevel;
  friendsOnInstagram?: NotificationLevel;
  mentionsInBio?: NotificationLevel;
  recommendationsForOthers?: NotificationLevel;
  recommendationsFromOthers?: NotificationLevel;
};

export type NotificationSetting = {
  notificationAccounts?: {
    posts?: string[];
    story?: string[];
  };
  pauseAll?: {
    active: boolean;
    from?: typeof Timestamp;
    duration?: number;
  };
  postStoryComment?: PostStoryCommentOptions;
  followingFollowers?: FollowingFollower;
  directMessages?: DirectMessagesOptions;
  liveIGTV?: LiveIGTVOptions;
  fromInstagram?: FromInstagramOptions;
  emailAndSMSNotifications?: EmailandSMSNotificationsOptions;
};

export type PrivacyCommentOptions = {
  blockUsers?: string[];
  hideOffensive?: boolean;
  manualFilter?: boolean;
  specificWord?: string;
  filterMostReported?: boolean;
};

export type PrivacyTagsOptions = {
  allowTagFrom?: 0 | 1 | 2;
  manualApproveTags?: boolean;
  pendingTags?: string[];
};

export type PrivacyStoryOptions = {
  hideStoryFrom?: string[];
  allowMessageReplies?: 0 | 1 | 2;
  saveToGallery?: boolean;
  saveToArchive?: boolean;
  allowResharing?: boolean;
  allowSharing?: boolean;
  shareYourStoryToFacebook?: boolean;
};

export type PrivacySetting = {
  comments?: PrivacyCommentOptions;
  tags?: PrivacyTagsOptions;
  activityStatus?: {
    show?: boolean;
  };
  accountPrivacy?: {
    private?: boolean;
  };
  mutedMessages?: {
    mutedMessages?: string[];
  };
  mutedVideoCalls?: {
    mutedVideoCalls?: string[];
  };
  blockedAccounts?: {
    blockedAccounts?: string[];
  };
  restrictedAccounts?: {
    restrictedAccounts?: string[];
  };
  mutedAccouts?: {
    posts?: string[];
    story?: string[];
  };
  closeFriends?: {
    closeFriends?: string[];
  };
  story?: PrivacyStoryOptions;
};
export type UserSetting = {
  notification?: NotificationSetting;
  privacy?: PrivacySetting;
};

export type Bookmark = {
  postId: number;
  previewUri: string;
  create_at: number;
};
export type BookmarkCollection = {
  name: string;
  bookmarks: Bookmark[];
  avatarIndex?: number;
  create_at: number;
};
export type StoryArchive = {
  uid: number;
  create_at: number;
  superId: number;
};
export type PostArchive = {
  uid: number;
  create_at: number;
  multiple: boolean;
  previewUri: string;
};
export type Highlight = {
  name: string;
  avatarUri: string;
  stories: StoryArchive[];
};
export type UserPayload = {
  user: {
    logined?: boolean;
    firebaseUser?: IUserInfo;
    userInfo?: UserInfo;
  };
  bookmarks?: BookmarkCollection[];
  setting?: UserSetting;
  photos?: Post[];
  tagPhotos?: Post[];
  taggedPhotos?: [];
  currentStory?: Story[];
  extraInfo?: ExtraInfo;
  archive?: {
    stories: StoryArchive[];
    posts: PostArchive[];
  };
  highlights?: Highlight[];
};
