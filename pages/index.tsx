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
import { Fragment } from "react";

const dateFormatter = new Intl.DateTimeFormat("en", {
  day: "numeric",
  month: "long",
  year: "numeric",
});

export const getStaticProps: GetStaticProps = async () => {
  const feed = (
    await Promise.allSettled([loadMedium(), loadProjects(), loadOldPosts()])
  )
    .flatMap((item) => (item.status === "fulfilled" ? item.value : []))
    .sort((a, b) => Date.parse(b.datePublished) - Date.parse(a.datePublished));

  return {
    revalidate: 10 * 60, // 10 minutes
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

      <main className="mx-auto max-w-screen-sm">
        {feedByYear.map(([year, feed], yearIndex) => (
          <Fragment key={year}>
            <h2 className="mt-12 mb-2 px-2">{year}</h2>
            <ul className="mb-12" role="list">
              {feed.map((item, feedIndex) => (
                <li key={item.url}>
                  <a
                    href={item.url.replace("https://www.marco.zone/", "/")}
                    lang={item.inLanguage}
                    className={classNames({
                      "grid grid-cols-[auto_1fr] grid-rows-[auto_auto_1fr] gap-2 p-2 sm:rounded-2xl":
                        true,
                      "hover:bg-slate-400/20 motion-safe:md:hover:scale-105 hover:z-10 transition":
                        true,
                      "my-4 md:-mx-2 shadow-lg":
                        !item["@type"].endsWith("Article"),
                    })}
                  >
                    <div className="self-center sm:self-start sm:row-span-3 w-16 h-16 sm:w-32 sm:h-32 relative">
                      {item.image ? (
                        <Image
                          src={item.image}
                          alt=""
                          className="rounded-xl"
                          sizes={`(min-width: ${screens.sm}) ${width[48 /* 32 * 1.5 */]}, ${width[24 /* 16 * 1.5 */]}`}
                          layout="fill"
                          objectFit="cover"
                          objectPosition="center"
                          priority={yearIndex === 0 && feedIndex < 5}
                        />
                      ) : (
                        <div className="rounded-xl bg-slate-400/20 absolute inset-0" />
                      )}
                    </div>
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
                            item["@type"].endsWith("Article"),
                          "px-2 rounded-full bg-red-400/20":
                            !item["@type"].endsWith("Article"),
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
                  </a>
                </li>
              ))}
            </ul>
          </Fragment>
        ))}
      </main>
    </>
  );
}
