import {getStatusBarHeight} from 'react-native-status-bar-height';
export const STATUS_BAR_HEIGHT: number = getStatusBarHeight();

export const generateUsernameKeywords = (fullText: string): string[] => {
  const keywords: string[] = [];
  const splitedText = fullText.split('');
  splitedText.map((s, index) => {
    const temp = splitedText.slice(0, index + 1).join('');
    keywords.push(temp);
  });
  return Array.from(new Set(keywords));
};
