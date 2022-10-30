import { FeedItem, FeedLoader } from "./data";
import { Article } from "schema-dts";
import Parser from "rss-parser";

const parser = new Parser();

export async function loadMedium(): Promise<FeedItem[]> {
  const feed = await parser.parseURL("https://medium.com/@marco_pfeiffer/feed");

  const newItems: FeedItem[] = feed.items.map((item) => {
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

  return [...newItems, ...olderItems].filter(
    (item, index, list) =>
      index === list.findIndex(({ url }) => url === item.url)
  );
}

/**
 * Medium only shows the last 10 items in the rss feed.
 * So I duplicate them here whenever I feel like it to archive them.
 * Hopefully I'll find a way to avoid this in the future.
 */
const olderItems: FeedItem[] = [
  {
    "@type": "TechArticle",
    url: "https://betterprogramming.pub/dont-forget-setting-database-locks-on-your-orm-entities-9cf4c074706",
    headline: "Don’t Forget Setting Database Locks on Your Orm Entities",
    description:
      "A huge advantage of relational databases is transactions and locking. Don’t waste it by not using it",
    datePublished: "2022-06-14T12:55:21.000Z",
    image:
      "https://cdn-images-1.medium.com/max/481/1*0JclwTUovUvbLpZaGcja7Q.png",
  },
  {
    "@type": "TechArticle",
    url: "https://betterprogramming.pub/the-tick-pattern-a-solution-for-temporal-problems-in-state-machines-b78600772e8c",
    headline:
      "The “Tick” Pattern — A Solution for Temporal Problems in State Machines",
    description:
      "How to automate workflows that wait for external and time conditions without exploding complexity",
    datePublished: "2022-05-26T22:59:49.000Z",
    image: "https://cdn-images-1.medium.com/max/1024/0*wn5lkcZCm3rnYQiT",
  },
  {
    "@type": "TechArticle",
    url: "https://betterprogramming.pub/3-ways-on-how-to-use-elasticsearch-in-a-symfony-project-with-apiplatform-689674f6059e",
    headline:
      "3 Ways To Use ElasticSearch in a Symfony Project With ApiPlatform",
    description: "When your SQL Database does not cut it anymore.",
    datePublished: "2022-04-18T16:44:40.000Z",
    image: "https://cdn-images-1.medium.com/max/1024/0*OJGxuLkmitWCotIS",
  },
  {
    "@type": "TechArticle",
    url: "https://betterprogramming.pub/improve-phpunit-performance-by-parallelization-using-liuggio-fastest-ff0abc111078",
    headline:
      "Improve PHPUnit Performance  by Parallelization Using Liuggio-fastest",
    description:
      "Finally use your multi-core CPU to run your tests multiple times faster, even with complex test setups.",
    datePublished: "2022-02-23T15:32:44.000Z",
    image: "https://cdn-images-1.medium.com/max/1024/0*ixKVe6la2ir565A5",
  },
  {
    "@type": "TechArticle",
    url: "https://medium.com/@marco_pfeiffer/typescript-npm-package-quick-start-87b52c9305e4",
    headline: "TypeScript NPM package quick start",
    description:
      "Create a node project that is easily testable and maintainable with minimal setup overhead.",
    datePublished: "2022-02-08T14:16:07.000Z",
    image: "https://cdn-images-1.medium.com/max/1024/0*rwDpTW1EU2vOuX_Y",
  },
  {
    "@type": "TechArticle",
    url: "https://medium.com/@marco_pfeiffer/apple-implemented-the-biggest-improvement-to-bluetooth-audio-since-2009-2079abc607af",
    headline:
      "Apple implemented the biggest improvement to bluetooth audio since 2009",
    description:
      "Did you ever listen to music on bluetooth headphones and got a call? Did the quality get a lot worse? What happened to all those fancy bluetooth audio codes that every reviewer is always talking about?",
    datePublished: "2022-02-01T08:18:07.000Z",
    image: "https://cdn-images-1.medium.com/max/1024/0*20bTINccJ5AvQ8WC",
  },
  {
    "@type": "TechArticle",
    url: "https://medium.com/@marco_pfeiffer/manually-implement-oauth-client-functionality-in-symfony-1dcc8a80c680",
    headline: "Manually implement OAuth Client functionality in Symfony",
    description:
      "First of, use something like the KnpUOAuth2ClientBundle if it serves your need. Having documentation beats the best implementation in any case.",
    datePublished: "2021-12-13T08:02:29.000Z",
    image: "https://cdn-images-1.medium.com/max/1024/0*Mwv91DqyuI4nIelf",
  },
  {
    "@type": "TechArticle",
    url: "https://medium.com/@marco_pfeiffer/mastering-doctrine-orm-relations-571060c5b40e",
    headline: "Mastering Doctrine ORM relations",
    description:
      " There are only 2 types of relations. All other types are usually bugs.",
    datePublished: "2021-11-18T09:03:39.000Z",
    image: "https://cdn-images-1.medium.com/max/1024/0*zoOfHKoxg272Ru2d",
  },
  {
    "@type": "TechArticle",
    url: "https://medium.com/@marco_pfeiffer/doctrine-symfony-centralized-access-control-d1f4717734e5",
    headline: "Doctrine/Symfony centralized access control",
    description:
      "My current best shot at implementing none annoying, fine grained and scalable access control in a symfony application with a doctrine database.",
    datePublished: "2021-08-02T07:03:00.000Z",
    image:
      "https://cdn-images-1.medium.com/max/1024/1*CRF_Tbg8j4Bq5M3dUo514Q.jpeg",
  },
  {
    "@type": "TechArticle",
    url: "https://medium.com/@marco_pfeiffer/seamless-vps-docker-dev-environment-33d970b80b42",
    headline: "Seamless docker dev environment on a VPS",
    description:
      "Use cloud compute resources to improve the performance of your projects and also avoid the slow filesystem on Docker for mac.",
    datePublished: "2021-04-10T10:03:55.000Z",
    image:
      "https://cdn-images-1.medium.com/max/518/1*vQVvYmncDv0WNeFTGJJptw.gif",
  },
  {
    "@type": "TechArticle",
    headline: "Share an Aurora Serveless between services using CloudFormation",
    url: "https://www.marco.zone/shared-aurora-serverless-using-cloudformation",
    datePublished: "2020-08-16T17:17:00+02:00",
    image: "https://www.marco.zone/assets/aws-aurora.png",
    description:
      "Securely set up RDS Aurora Serverless and use custom resources in CloudFormation to create additional databases and users across multiple stages or even serv...",
  },
];
