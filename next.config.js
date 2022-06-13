const classNames = require("classnames");
const globby = require("globby");
const { basename, join, relative } = require("path");
const { PHASE_DEVELOPMENT_SERVER } = require("next/constants");

const rewrites = globby(join(__dirname, "public/old/*.html")).then((files) =>
  files.map((file) => ({
    source: "/" + basename(file, ".html"),
    destination: "/" + relative(join(__dirname, "public"), file),
  }))
);

/** @type {(phase: string) => import('next').NextConfig} */
module.exports = (phase) => ({
  reactStrictMode: true,
  images: {
    domains: ["cdn-images-1.medium.com", "clip.marco.zone", "www.marco.zone"],
    imageSizes: [128, 256, 384],
    deviceSizes: [768, 1080],
  },
  async rewrites() {
    return await rewrites;
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        locale: false,
        headers: [
          {
            key: "Content-Security-Policy",
            value: [
              "default-src 'self'",
              "style-src 'self' 'unsafe-inline'",
              "script-src 'self'",
              `img-src 'self' 'unsafe-inline'`,
              // if matomo is configured, CSP needs to allow that as well
              // and safari, again, requires the ws: protocol for live reloading in dev mode
              `connect-src ${classNames(
                "'self' blob:",
                { "ws:": phase === PHASE_DEVELOPMENT_SERVER },
                process.env.NEXT_PUBLIC_MATOMO_URL
              )}`,

              "form-action 'none'",
              "frame-ancestors 'none'",
            ].join(";"),
          },
          {
            key: "Cross-Origin-Opener-Policy",
            value: "same-origin",
          },
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "X-Frame-Options",
            value: "deny",
          },
        ],
      },
      {
        source: `/(${(await rewrites)
          .map((rewrite) => rewrite.source.slice(1))
          .join("|")})`,
        locale: false,
        headers: [
          {
            key: "Content-Security-Policy",
            value: [
              "default-src 'self' 'unsafe-inline' https://cdn.ampproject.org",
              "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
              "font-src 'self' 'unsafe-inline' https://fonts.gstatic.com",
            ].join(";"),
          },
        ],
      },
    ];
  },
});
