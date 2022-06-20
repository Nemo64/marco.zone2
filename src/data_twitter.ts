import { FeedItem, FeedLoader } from "./data";
import { groupBy, keyBy } from "lodash-es";

interface Tweet {
  public_metrics: {
    retweet_count: number;
    reply_count: number;
    like_count: number;
    quote_count: number;
  };
  entities: {
    urls?: TweetUrl[];
    mentions?: {
      start: number;
      end: number;
      username: string;
      id: string;
    }[];
  };
  created_at: string;
  possibly_sensitive: boolean;
  id: string;
  text: string;
  lang: string;
}

export interface TweetUrl {
  start: number;
  end: number;
  url: string;
  expanded_url: string;
  display_url: string;
  media_key: string;
}

export type TweetMedia = Photo | AnimatedGif;

interface Photo {
  type: "photo";
  height: number;
  width: number;
  url: string;
  media_key: string;
}

interface AnimatedGif {
  type: "animated_gif";
  height: number;
  width: number;
  preview_image_url: string;
  media_key: string;
}

export type TwitterFeedItem = FeedItem & {
  tweetEntities: Tweet["entities"];
  tweetMedia: Record<string, TweetMedia>;
};

export async function loadTweets(): Promise<TwitterFeedItem[]> {
  if (!process.env.TWITTER_BEARER_TOKEN) {
    throw new Error("Environment variable TWITTER_BEARER_TOKEN is missing");
  }

  const response = await fetch(
    `https://api.twitter.com/2/users/21512453/tweets?${new URLSearchParams({
      max_results: "100",
      exclude: "replies,retweets",
      expansions: "attachments.media_keys",
      "tweet.fields":
        "attachments,created_at,entities,id,lang,possibly_sensitive,public_metrics,text",
      "media.fields": "height,media_key,type,preview_image_url,url,width",
    })}`,
    {
      headers: {
        Authorization: `Bearer ${process.env.TWITTER_BEARER_TOKEN}`,
        Accept: "application/json",
      },
    }
  );

  const timeline = (await response.json()) as {
    data: Tweet[];
    includes: { media: TweetMedia[] };
  };

  return timeline.data
    .filter(
      (tweet) =>
        tweet.lang === "en" &&
        !tweet.possibly_sensitive &&
        (tweet.public_metrics.like_count >= 1 ||
          tweet.public_metrics.retweet_count >= 1)
    )
    .map((tweet) => {
      const urls = tweet.entities?.urls ?? [];

      return {
        "@type": "SocialMediaPosting",
        headline: "",
        url: `https://twitter.com/TheTrueNemo/status/${tweet.id}`,
        description: tweet.text,
        datePublished: tweet.created_at,
        tweetEntities: tweet.entities,
        tweetMedia: keyBy(
          timeline.includes.media.filter((medium) =>
            urls.find((url) => url.media_key === medium.media_key)
          ),
          "media_key"
        ),
      };
    });
}
