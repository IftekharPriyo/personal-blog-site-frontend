export const siteConfig = {
  name: "DevLog",
  url: (process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000").replace(
    /\/$/,
    "",
  ),
  description:
    "A technical journal about cloud, DevOps, cybersecurity, and software engineering.",
  navItems: [
    { label: "Home", href: "/" },
    { label: "Blog", href: "/blog" },
    { label: "About", href: "/about" },
  ],
};
