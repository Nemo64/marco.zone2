import type { GetStaticProps } from "next";
import Head from "next/head";
import Image from "next/image";
import { screens, width } from "../src/theme";
import classNames from "classnames";
import { FeedItem } from "../src/data";
import { loadMedium } from "../src/data_medium";
import { loadOldPosts } from "../src/data_old_posts";
import { loadProjects } from "../src/data_projects";
import { groupBy } from "lodash-es";
import { loadTweets, TwitterFeedItem } from "../src/data_twitter";
import { fallback } from "../src/util";
import { Tweet } from "../components/tweet";
import { Scroller } from "../components/scroller";
import { Link } from "../components/link";

const dateFormatter = new Intl.DateTimeFormat("en", {
  day: "numeric",
  month: "long",
  year: "numeric",
});

export const getStaticProps: GetStaticProps = async () => {
  const medium = loadMedium().catch(fallback([]));
  const oldPosts = loadOldPosts().catch(fallback([]));
  const selfPromotingLinks = Promise.all([medium, oldPosts]).then(
    (feeds) => new Set(feeds.flat().map((item) => item.url))
  );
  const projects = loadProjects().catch(fallback([]));
  const tweets = loadTweets()
    .catch(fallback([]))
    .then(async (tweets) => {
      const links = await selfPromotingLinks;
      return tweets.filter(({ tweetEntities }) => {
        return !tweetEntities.urls?.find(({ expanded_url }) => {
          return links.has(expanded_url);
        });
      });
    });

  const feed = (await Promise.all([medium, oldPosts, projects, tweets]))
    .flat()
    .sort((a, b) => Date.parse(b.datePublished) - Date.parse(a.datePublished));

  return {
    revalidate: 60, // 1 minute
    props: { feed },
  };
};

export default function Index({ feed }: { feed: FeedItem[] }): JSX.Element {
  const feedByYear = Object.entries(
    groupBy(feed, (item) => item.datePublished.slice(0, 4))
  ).sort((a, b) => parseFloat(b[0]) - parseFloat(a[0]));

  return (
    <>
      <Head>
        <title>marco.zone</title>
        <meta
          name="description"
          content="The online Profile of Marco Pfeiffer"
        />
      </Head>

      {feedByYear.map(([year, feed], index) => (
        <Year key={year} year={year} feed={feed} index={index} />
      ))}
    </>
  );
}

function Year({ year = "[year]", feed = [] as FeedItem[], index = 0 }) {
  const { articles, social } = groupBy(feed, (item) =>
    item["@type"] === "SocialMediaPosting" ? "social" : "articles"
  );
  return (
    <>
      <h2 className="mt-12 mb-2 px-2 mx-auto max-w-screen-sm">{year}</h2>
      <ul className="mb-12">
        {articles?.slice(0, 3).map((item) => (
          <li key={item.url} className="mx-auto max-w-screen-sm">
            <Article item={item} priority={index === 0} />
          </li>
        ))}
        {social?.length > 0 && (
          <li className="my-2">
            <SocialSlider items={social} />
          </li>
        )}
        {articles?.slice(3).map((item) => (
          <li key={item.url} className="mx-auto max-w-screen-sm">
            <Article item={item} priority={false} />
          </li>
        ))}
      </ul>
    </>
  );
}

function SocialSlider({ items = [] as FeedItem[] }) {
  return (
    <Scroller listClassName="px-[max(calc(50%-12rem),4rem)]">
      {items.map((item) => (
        <li
          key={item.url}
          className={`w-[24rem] max-w-full max-h-64 overflow-hidden p-4 snap-center break-words shrink-0 text-sm`}
        >
          {"tweetEntities" in item ? (
            <Tweet tweet={item as TwitterFeedItem} sizes={width[96]} />
          ) : (
            <p>{item.description}</p>
          )}
        </li>
      ))}
    </Scroller>
  );
}

function Article({ item = {} as FeedItem, priority = false }) {
  return (
    <Link
      href={item.url.replace(`${process.env.NEXT_PUBLIC_URL}/`, "/")}
      lang={item.inLanguage}
      className={classNames({
        "grid grid-cols-[auto_1fr] grid-rows-[auto_auto_1fr] gap-2 p-2 sm:rounded-2xl relative":
          true,
        "hover:bg-slate-200 hover:dark:bg-gray-600 motion-safe:md:hover:scale-105 hover:z-10 hover:shadow transition":
          true,
        "my-4 shadow":
          item["@type"].startsWith("Software") ||
          item["@type"].endsWith("Application"),
      })}
    >
      {item.image ? (
        <Image
          src={item.image}
          alt=""
          layout="raw"
          className="rounded-xl self-center sm:self-start sm:row-span-3 w-16 h-16 sm:w-32 sm:h-32 object-cover"
          sizes={`(min-width: ${screens.sm}) ${width[48 /* 32 * 1.5 */]}, ${width[24 /* 16 * 1.5 */]}`}
          width={parseFloat(width[48]) * 16}
          height={parseFloat(width[48]) * 16}
          priority={priority}
        />
      ) : (
        <div className="rounded-xl self-center sm:self-start sm:row-span-3 w-16 h-16 sm:w-32 sm:h-32 bg-slate-400/20" />
      )}
      <h3 className="-my-1 self-center text-xl font-light leading-snug">
        {item.headline}
      </h3>
      <div className="col-span-2 sm:col-span-1 font-light flex flex-col gap-2 whitespace-pre-wrap">
        {item.description.split(/\n{2,}/g).map((paragraph, i) => (
          <p key={i} className={i > 0 ? "opacity-60" : undefined}>
            {paragraph.trim()}
          </p>
        ))}
      </div>
      <ul className="col-span-2 sm:col-span-1 text-sm font-light flex flex-wrap items-baseline gap-1">
        <li
          className={classNames({
            "px-2 rounded-full bg-slate-400/20":
              !item["@type"].endsWith("Application"),
            "px-2 rounded-full bg-red-400/20":
              item["@type"].endsWith("Application"),
          })}
        >
          {item["@type"].replace(/([A-Z])/g, " $1")}
        </li>
        <li className="px-2 rounded-full bg-slate-400/20">
          {item.url?.match(/https?:\/\/(?:www\.)?([^\/]+)/)?.[1]}
        </li>
        <li>
          <time dateTime={item.datePublished}>
            {dateFormatter.format(new Date(item.datePublished))}
          </time>
        </li>
      </ul>
    </Link>
  );
}
