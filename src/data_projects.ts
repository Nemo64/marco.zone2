import { FeedLoader } from "./data";

export const loadProjects: FeedLoader = async () => [
  {
    "@type": "WebApplication",
    name: "Clip - In-browser video compression",
    url: "https://clip.marco.zone/",
    datePublished: "2022-01-14T00:00:00Z",
    image: "https://clip.marco.zone/og.png",
    description:
      "The easiest way to optimize videos.\n" +
      "No software installation necessary.",
  },
  {
    "@type": "WebApplication",
    name: "Texel - Text element editor",
    url: "https://texel.marco.zone/",
    datePublished: "2021-09-20T00:00:00Z",
    description:
      "A tool to easily view and edit text/translation files in your software projects.",
  },
];
