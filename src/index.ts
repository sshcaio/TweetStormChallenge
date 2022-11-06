import Tweet from './app/Tweet';
import { tweetBasic, tweetBig, tweetBigger } from './tweet.texts';

export const stormer: Tweet = new Tweet({ text: tweetBigger, user: '@user' });
export const storm: Tweet = new Tweet({ text: tweetBig, user: '@user' });
export const normal: Tweet = new Tweet({ text: tweetBasic, user: '@user' });
