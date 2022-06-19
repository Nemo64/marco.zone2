import { CreativeWork } from "schema-dts";

export type FeedItem = CreativeWork & {
  headline: string;
  image?: string;
  url: string;
  inLanguage?: string;
  description: string;
  datePublished: string;
};

export type FeedLoader = () => Promise<FeedItem[]>;
