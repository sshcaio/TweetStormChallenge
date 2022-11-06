import ITweet from '../interfaces/ITweet';

class Tweet {
  public tweet: ITweet;
  public tweetStorm: ITweet[];

  constructor(newTweet: ITweet) {
    this.tweet = newTweet;
    this.tweetStorm = [];
  }

  public tweetLengthCounter(): number {
    const { text } = this.tweet;
    return text.length;
  }

  public stormLengthSetter(length: number): number {
    if (length <= 900) {
      return 132;
    }

    if (length >= 901 && length <= 10000) {
      return 130;
    }

    if (length >= 10001 && length <= 125000) {
      return 128;
    }

    if (length >= 125001 && length <= 1250000) {
      return 126;
    }

    return 0;
  }

  public stormSplitter(length: number, paging: number): void {
    const { text, user } = this.tweet;
    let remainingText = text;
    let remainingLength = length;
    let newPage: ITweet;

    for (let index = 0; remainingLength > paging; index++) {
      const page = remainingText.slice(0, paging);
      const pageEnding = page.lastIndexOf(' ');
      const checkPage = page.slice(0, pageEnding);
      newPage = {
        text: checkPage,
        user,
        page: index + 1,
      };

      remainingLength -= checkPage.length;
      remainingText = remainingText.slice(pageEnding + 1);
      this.tweetStorm.push(newPage);
    }

    newPage = {
      text: remainingText,
      user,
      page: this.tweetStorm.length + 1,
    };
    this.tweetStorm.push(newPage);

    this.tweetStorm.forEach((tweet) => tweet.totalPages = this.tweetStorm.length);
  }

  public stormer(): String | ITweet[] {
    const length = this.tweetLengthCounter();

    if (length <= 140) {
      return this.tweet.text;
    }

    const paging = this.stormLengthSetter(length);
    this.stormSplitter(length, paging);

    return this.tweetStorm;
  }

  public sendTweet(): String[] | String {
    const tweet = this.stormer() as ITweet[];

    if (typeof tweet === 'string') {
      return tweet;
    }

    const send = tweet.map((e) => `${e.text} [${e.page}]/[${e.totalPages}]`);
    return send;
  }
}

export default Tweet;
