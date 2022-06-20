import { CreativeWork } from "schema-dts";

export interface FeedItem {
  "@type": CreativeWork["@type"];
  headline: string;
  image?: string;
  url: string;
  inLanguage?: string;
  description: string;
  datePublished: string;
}

type SchemaFeedItem = FeedItem & CreativeWork; // ensure the types are compatible

export type FeedLoader = () => Promise<FeedItem[]>;
