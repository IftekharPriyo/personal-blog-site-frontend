const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000").replace(
  /\/$/,
  "",
);

export const siteConfig = {
  name: "DevLog",
  url: siteUrl,
  description:
    "Iftekhar Priyo's technical journal about software engineering, cloud, DevOps, and cybersecurity.",
  author: {
    name: "Iftekhar Priyo",
    jobTitle: "Software Engineer",
    url: `${siteUrl}/about`,
  },
  socialLinks: {
    linkedin: "https://www.linkedin.com/in/md-iftekhar-ali/",
    github: "https://github.com/IftekharPriyo",
    whatsapp: "https://wa.me/8801521429852",
  },
  navItems: [
    { label: "Home", href: "/" },
    { label: "Blog", href: "/blog" },
    { label: "About", href: "/about" },
  ],
};
