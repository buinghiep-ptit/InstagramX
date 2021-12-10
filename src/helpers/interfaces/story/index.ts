import Timestamp from '@react-native-firebase/firestore';
import {Animated} from 'react-native';
import {MapBoxAddress} from '../common';
import { UserInfo } from '../user';

export type Story = {
  userId?: string;
  uid?: number;
  permission?: number;
  create_at?: typeof Timestamp;
  source?: number;
  superImage?: StoryProcessedImage;
  seen?: 0 | 1;
  seenList?: string[];
  reactions?: string[];
  hashtags?: string[];
  address?: MapBoxAddress[];
  mention?: string[];
  messagesList?: string[];
};

export type ExtraStory = {
  storyList: Story[],
  ownUser: UserInfo
}

export type StoryList = ExtraStory[]

export type StoryProcessedImage = {
  uri: string;
  extension: string;
  width: number;
  height: number;
  base64: string;
  ratio: number;
  translateX: number;
  translateY: number;
  rotateDeg: number;
  texts: StoryText[];
  labels: StoryLabel[];
};

export type StoryText = {
  text: string;
  x: number;
  y: number;
  animX: Animated.Value;
  animY: Animated.Value;
  fontSize: number;
  width: number;
  height: number;
  textBg: boolean;
  textAlign: 'flex-start' | 'center' | 'flex-end';
  color: string;
  ratio: number;
  animRatio: Animated.Value;
  zIndex: number;
};

export type StoryLabel = {
  type: 'address' | 'people' | 'hashtag' | 'emoji';
  address_id?: string;
  text: string;
  x: number;
  y: number;
  animX: Animated.Value;
  animY: Animated.Value;
  fontSize: number;
  width: number;
  height: number;
  ratio: number;
  animRatio: Animated.Value;
  zIndex: number;
};
