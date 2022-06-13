import { Article, WebApplication } from "schema-dts";

export type FeedItem = (Article | WebApplication) & {
  name: string;
  image?: string;
  url: string;
  inLanguage?: string;
  description: string;
  datePublished: string;
};

export type FeedLoader = () => Promise<FeedItem[]>;
