// Single source of truth for site-wide metadata, reused by app/layout.tsx,
// app/sitemap.ts, app/robots.ts and app/opengraph-image.tsx so the name,
// description and URL only need to be correct in one place.
//
// NEXT_PUBLIC_SITE_URL should be set to the real deployed domain (e.g. on
// Vercel: Project Settings → Environment Variables). Until it's set, this
// falls back to a placeholder so the site still builds correctly — update
// it once you have a real domain for the OG/Twitter image URLs, sitemap and
// canonical links to resolve correctly for crawlers and link previews.
export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://dilshad-ansari-portfolio.vercel.app";

export const SITE_NAME = "Dilshad Ansari";
export const SITE_TITLE = "Dilshad Ansari — Full Stack Developer";
export const SITE_DESCRIPTION =
  "I build modern web applications, AI-powered products and interactive digital experiences. B.Sc. Information Technology graduate and Full Stack Web Developer based in Mumbai, India.";

export const SOCIAL_LINKS = {
  github: "https://github.com/Dilshadansariu",
  linkedin: "https://www.linkedin.com/in/dilshad-ansari-b7455224a/",
  email: "dilshadansariu@gmail.com",
};
