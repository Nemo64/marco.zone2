import { FeedLoader } from "./data";

/*

Generated using this code from the old site

$$('article.post-list__item').map(post => ({
  "@type": "TechArticle",
  headline: post.querySelector('h2').textContent.trim(),
  url: post.querySelector('a').href,
  datePublished: post.querySelector('time').getAttribute('datetime'),
  image: post.querySelector('amp-img')?.getAttribute('srcset').match(/\S+.(png|jpg)/)[0].replace(/resized\/\d+\//, '').replace(/https:\/\/.*assets/, 'https://www.marco.zone/assets'),
  description: post.querySelector('.post-list__bodytext').textContent.trim()
}))

Then right click and "Copy Object" in Chrome's dev tool.

 */

export const loadOldPosts: FeedLoader = async () => [
  {
    "@type": "TechArticle",
    headline: "Share an Aurora Serveless between services using CloudFormation",
    url: "https://www.marco.zone/shared-aurora-serverless-using-cloudformation",
    datePublished: "2020-08-16T17:17:00+02:00",
    image: "https://www.marco.zone/assets/aws-aurora.png",
    description:
      "Securely set up RDS Aurora Serverless and use custom resources in CloudFormation to create additional databases and users across multiple stages or even serv...",
  },
  {
    "@type": "TechArticle",
    headline: "Configure https for the official docker php apache images",
    url: "https://www.marco.zone/official-docker-php-apache-https",
    datePublished: "2020-05-25T10:50:00+02:00",
    image: "https://www.marco.zone/assets/docker-moby-logo.png",
    description: "Here is what to do to get quick and dirty https working.",
  },
  {
    "@type": "TechArticle",
    headline: "Configure symfony for a serverless lambda environment in bref",
    url: "https://www.marco.zone/configure-symfony-for-serverless-lambda",
    datePublished: "2020-05-10T20:00:00+02:00",
    image: "https://www.marco.zone/assets/aws-lambda.png",
    description:
      "A guide on how to configure everything in the full multipage symfony skeleton to run on aws lambda, with code snippets, to get you started.",
  },
  {
    "@type": "TechArticle",
    headline:
      "Static resource distribution on a aws serverless multipage application",
    url: "https://www.marco.zone/asset-distribution-on-a-aws-serverless-multipage-application",
    datePublished: "2020-04-05T21:00:00+02:00",
    image: "https://www.marco.zone/assets/aws-cloudfront.png",
    description:
      "Hosting a multipage application has never been simpler but aws and serverless aren't build for that use case. But, when configured correctly, it is actually ...",
  },
  {
    "@type": "TechArticle",
    headline: "Docker for mac uses over 100% cpu while doing nothing",
    url: "https://www.marco.zone/docker-uses-over-100-percent-cpu",
    datePublished: "2020-04-04T20:00:00+02:00",
    image: "https://www.marco.zone/assets/docker-moby-logo.png",
    description:
      "I use a docker for mac which has some performance problems. But it seems the interface in the background might also have some flaws.",
  },
  {
    "@type": "TechArticle",
    headline: "TYPO3 Canonical-Url",
    url: "https://www.marco.zone/typo3-canonical-url",
    datePublished: "2018-06-28T19:43:00+02:00",
    inLanguage: "de",
    description:
      "Eine echte Canonical Url in TYPO3 die sich nicht durch AdWords Parameter und Ähnlichem austricksen lässt und keine Sicherheitslücken öffnet.",
  },
  {
    "@type": "TechArticle",
    headline: "TYPO3 Css/Js-Spam verhindern",
    url: "https://www.marco.zone/typo3-css-js-spam-verhindern",
    datePublished: "2018-04-25T17:00:00+02:00",
    inLanguage: "de",
    description:
      "TYPO3 kombiniert normalerweise alle css/js Dateien zu einer Datei. Dies hat jedoch einen großen Hacken.",
  },
  {
    "@type": "TechArticle",
    headline: "TYPO3 Erweiterungs Wunschliste",
    url: "https://www.marco.zone/typo3-erweiterungs-wunschliste",
    datePublished: "2018-03-24T21:36:00+01:00",
    inLanguage: "de",
    description:
      "Eine Sammelstelle für TYPO3 Erweiterungen die ich unbedingt haben will und irgendwann vielleicht auch baue.",
  },
  {
    "@type": "TechArticle",
    headline: "Formular-Finisher zum TYPO3 Backend-Editor hinzufügen",
    url: "https://www.marco.zone/typo3-formular-finisher-zum-editor-hinzufuegen",
    datePublished: "2017-08-05T22:00:00+02:00",
    inLanguage: "de",
    description:
      "Der umständliche und undokumentierte Weg eigene Finisher in den neuen TYPO3 8.7 Formular-Editor hinzuzufügen.",
  },
  {
    "@type": "TechArticle",
    headline: "Composer und Bower über Docker ausführen",
    url: "https://www.marco.zone/composer-und-bower-ueber-docker",
    datePublished: "2017-04-18T09:00:00+02:00",
    inLanguage: "de",
    description:
      "Composer und Bower via Docker so einrichten als wären sie nativ auf dem Mac installiert.",
  },
  {
    "@type": "TechArticle",
    headline: "Jira Performance optimieren durch AdBlock",
    url: "https://www.marco.zone/jira-adblock-regeln",
    datePublished: "2017-04-06T13:00:00+02:00",
    inLanguage: "de",
    description:
      "Jira ist langsam und, wie viele moderne Webseiten, überladen. Ich hab versucht Jira mit AdBlock etwas benutzbarer zu bekommen.",
  },
  {
    "@type": "TechArticle",
    headline: 'MacBook Pro 13" (2016) Bildschirm Rant',
    url: "https://www.marco.zone/macbook-pro-2016-bildschirm-rant",
    datePublished: "2017-01-15T00:00:00+01:00",
    inLanguage: "de",
    description:
      "Das MacBook Pro hat viele schwächen. Hier ist noch eine die mich wahnsinnig macht und scheinbar niemandem auffällt.",
  },
  {
    "@type": "TechArticle",
    headline: "HTML Bilder in Responsive Websites",
    url: "https://www.marco.zone/html-bilder-in-responsive-websites",
    datePublished: "2015-12-02T20:00:00+01:00",
    inLanguage: "de",
    description:
      "Einige Ansätze Bilder in Webseiten zu verwalten, die sich an die Bildschirmgröße anpassen müssen.",
  },
  {
    "@type": "TechArticle",
    headline: "Progressiver HTML Blocksatz mit Silbentrennung",
    url: "https://www.marco.zone/progressiver-html-blocksatz-mit-silbentrennung",
    datePublished: "2015-11-04T20:00:00+01:00",
    inLanguage: "de",
    description:
      "Einige Browser unterstützen Silbentrennung über CSS. Hier ein Trick für Blocksatz wenn Silbentrennung vorhanden ist.",
  },
  {
    "@type": "TechArticle",
    headline: "Ein Blog mit Jekyll und Gulp",
    url: "https://www.marco.zone/ein-blog-mit-jekyll-und-gulp",
    datePublished: "2015-11-03T20:00:00+01:00",
    inLanguage: "de",
    description:
      "Beste Webentwicklungsumgebung die ich je auf die Beine gestellt hab, doch war das Einrichten (mit meinen Ansprüchen) nicht so einfach wie ich dachte.",
  },
];
