import { TweetMedia, TweetUrl, TwitterFeedItem } from "../src/data_twitter";
import { Fragment, ReactNode } from "react";
import Image from "next/image";
import classNames from "classnames";
import { Link } from "./link";

const dateFormatter = new Intl.DateTimeFormat("en", {
  day: "numeric",
  month: "long",
  year: "numeric",
});

export function Tweet({
  tweet,
  sizes,
}: {
  tweet: TwitterFeedItem;
  sizes: string;
}) {
  const parts: ReactNode[] = [];
  const media: { url: TweetUrl; item: TweetMedia }[] = [];

  let position = 0;
  for (const url of tweet.tweetEntities?.urls ?? []) {
    const part = tweet.description.slice(position, url.start);
    if (part.length <= 5) {
      parts.push(<Fragment key={parts.length}>{part}</Fragment>);
    } else {
      parts.push(
        <Link key={parts.length} href={tweet.url}>
          {part}
        </Link>
      );
    }

    if (url.media_key && tweet.tweetMedia[url.media_key]) {
      const item = tweet.tweetMedia[url.media_key];
      media.push({ url, item });
    } else {
      parts.push(
        <Link
          key={parts.length}
          href={url.expanded_url}
          className="underline hover:no-underline"
        >
          {url.display_url}
        </Link>
      );
    }

    position = url.end;
  }

  if (position + 1 < tweet.description.length) {
    const part = tweet.description.slice(position);
    if (part.length <= 5) {
      parts.push(<Fragment key={parts.length}>{part}</Fragment>);
    } else {
      parts.push(
        <Link key={parts.length} href={tweet.url}>
          {part}
        </Link>
      );
    }
  }

  return (
    <div className="h-full grid grid-rows-[auto_1fr_auto] grid-cols-[1fr_auto] gap-2">
      <div className="flex flex-wrap gap-x-2 text-gray-400 justify-between">
        <Link href={tweet.url.match(/https:\/\/[^/]*twitter\.com\/[^/]+/)?.[0]}>
          @{tweet.url.match(/twitter\.com\/([^/]+)/)?.[1]}
        </Link>
        <time dateTime={tweet.datePublished}>
          {dateFormatter.format(new Date(tweet.datePublished))}
        </time>
      </div>
      <Image
        src={require("../public/assets/logos/twitter-logo-blue.svg")}
        alt=""
        layout="raw"
        className="self-center"
        width={20}
        height={20}
      />
      <p className="col-span-2 whitespace-pre-wrap">{parts}</p>
      <ul className="col-span-2 flex flex-wrap items-center">
        {media.map(({ item, url }, index) => (
          <li
            key={index}
            className={classNames({
              "shrink-0 rounded-xl relative aspect-video": true,
              "w-full": media.length === 1,
              "w-1/2": media.length > 1,
            })}
          >
            <Link href={url.url}>
              <Image
                key={media.length}
                src={"url" in item ? item.url : item.preview_image_url}
                width={item.width}
                height={item.height}
                sizes={sizes}
                layout="raw"
                className="rounded-xl object-cover w-full h-full"
              />
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
