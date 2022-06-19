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
    parts.push(
      <Link key={parts.length} href={tweet.url}>
        {String(tweet.description).slice(position, url.start - position)}
      </Link>
    );

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

  if (position < tweet.description.length - 1) {
    parts.push(
      <Link key={parts.length} href={tweet.url}>
        {String(tweet.description).slice(position)}
      </Link>
    );
  }

  return (
    <div className="h-full grid grid-rows[auto_1fr_auto] grid-cols-2 gap-2">
      <Link
        href={tweet.url.match(/https:\/\/[^/]*twitter\.com\/[^/]+/)?.[0]}
        className="justify-self-start text-gray-400"
      >
        @{tweet.url.match(/twitter\.com\/([^/]+)/)?.[1]}
      </Link>
      <div className="flex flex-row gap-2 text-gray-400 justify-end">
        {dateFormatter.format(new Date(tweet.datePublished))}
        <Image
          src={require("../public/assets/logos/Twitter logo blue.svg")}
          alt="Twitter"
          layout="fixed"
          width={20}
          height={20}
        />
      </div>
      <div className="col-span-2 whitespace-pre-wrap">{parts}</div>
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
                // width={item.width}
                // height={item.height}
                sizes={sizes}
                layout="fill"
                className="rounded-xl"
                objectFit="cover"
                objectPosition="center"
              />
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
