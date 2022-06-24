import { FeedLoader } from "./data";

export const loadProjects: FeedLoader = async () => [
  {
    "@type": "WebApplication",
    headline: "Clip - In-browser video compression",
    url: "https://clip.marco.zone/",
    datePublished: "2022-01-14T00:00:00Z",
    image: "https://clip.marco.zone/og.png",
    description:
      "The easiest way to optimize videos. " +
      "No software installation necessary.\n" +
      "\n" +
      "There were multiple reasons for this project:\n" +
      "- I figured that emscripten could theoretically be used to compile ffmpeg for the browser ~ and that someone already did that.\n" +
      "- I sometimes send video snapshots from gameplay over Discord, and Discord has a 6mb file limit.\n" +
      "- I was involved in some content sites that use videos and properly compressing videos for web usage has some pitfalls.\n" +
      "\n" +
      "So this web application was the combination of all these factors.\n" +
      "The idea is to just have a few dynamic presets, that properly optimize based on the source video for the best results" +
      "so that the user doesn't need deep knowledge about codecs, bitrates, container tweaks etc.",
  },
  {
    "@type": "WebApplication",
    headline: "Texel - Text element editor",
    url: "https://texel.marco.zone/",
    datePublished: "2021-09-20T00:00:00Z",
    description:
      "A tool to easily view and edit text/translation files in your software projects.\n" +
      "\n" +
      "This project was the result of the question on how to help someone " +
      "change text strings in a project with the least amount of integration effort. " +
      "Since everything I do, when integrating text changes, is just copying the text into translation files and committing them, " +
      "I thought that building a tool that could abstract away GIT and JSON/YAML files would be a good idea.\n" +
      "\n" +
      "I don't think I'll actually ever use this project like this, but I found another great use. " +
      "Modern Chrome allows a web application to access an entire folder, " +
      "so I implemented scanning a local project for translation files. " +
      "This is actually awesome, since it is easier to edit text in tables than in JSON files. " +
      "You just need a great translation extractor tool in your projects like i18next-parser.",
  },
  {
    "@type": "SoftwareApplication",
    headline: "Youtube Music fix volume ratio",
    url: "https://greasyfork.org/en/scripts/397686-youtube-music-fix-volume-ratio",
    datePublished: "2020-10-03T00:00:00Z",
    description:
      "Makes the YouTube music volume slider exponential so it's easier to select lower volumes.\n" +
      "\n" +
      "This was a small side project where I was just annoyed that YouTube Music is unusable as a background service " +
      "simply because you can't get it quiet enough.\n" +
      "\n" +
      "It is technically my most successful project to date but it's also less than 10 lines of codes. " +
      "Such is fait.",
  },
  {
    "@type": "SoftwareSourceCode",
    headline: "",
    url: "https://github.com/Nemo64/dbal-rds-data",
    datePublished: "2020-02-29T22:16:36Z",
    description:
      "A driver to use the aws aurora serverless rds data api in the doctrine database abstraction layer.",
  },
];
