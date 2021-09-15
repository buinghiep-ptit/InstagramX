import Timestamp from '@react-native-firebase/firestore';
import {MapBoxAddress} from '../common';

export type PostImage = {
  uri: string;
  width: number;
  height: number;
  extension: string;
  fullSize: boolean;
  tags: {
    x: number;
    y: number;
    width: number;
    height: number;
    username: string;
  }[];
};
export type Post = {
  userId?: string;
  content?: string;
  uid?: number;
  isVideo?: boolean;
  likes?: string[];
  commentList?: string[];
  permission?: number;
  create_at?: typeof Timestamp;
  source?: PostImage[];
  comments?: Comment[];
  tags?: string[];
  labels?: string[];
  tagUsername?: string[];
  notificationUsers?: string[];
  altText?: string;
  address?: MapBoxAddress;
  hashtags?: string[];
};
