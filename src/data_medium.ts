import { FeedItem, FeedLoader } from "./data";
import { Article } from "schema-dts";
import Parser from "rss-parser";

const parser = new Parser();

export async function loadMedium(): Promise<FeedItem[]> {
  const feed = await parser.parseURL("https://medium.marco.zone/feed");

  return feed.items.map((item) => {
    const htmlContent = item["content:encoded"] ?? item.content ?? "";

    return {
      "@type": "TechArticle",
      url: item.link?.replace(/\?.*$/, "") ?? "https://medium.marco.zone/",
      headline: item.title ?? "[Title missing]",
      description: htmlContent
        .match(/<(p|h4)>(?!=)(.*?)<\/\1>/)[2]
        .replace(/<[^>]+>/g, " ")
        .replace(/\s{2,}/g, " "),
      datePublished: item.isoDate ?? new Date().toISOString(),
      image: htmlContent.match(/<img[^>]+src="([^"]+)"/)?.[1],
      // keywords: item.categories ?? [],
    };
  });
}
