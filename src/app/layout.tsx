import type { Metadata } from "next";
import { Inter, JetBrains_Mono, Space_Grotesk } from "next/font/google";
import { WhoamiMascot } from "@/components/home/whoami-mascot";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { PageTransition } from "@/components/layout/page-transition";
import { RouteScrollManager } from "@/components/layout/route-scroll-manager";
import { ThemeProvider } from "@/components/layout/theme-provider";
import { JsonLd } from "@/components/shared/json-ld";
import { siteConfig } from "@/config/site";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
  fallback: ["system-ui", "sans-serif"],
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  display: "swap",
  fallback: ["Inter", "system-ui", "sans-serif"],
});

const jetBrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  display: "swap",
  fallback: ["ui-monospace", "SFMono-Regular", "monospace"],
});

const personId = `${siteConfig.url}/#person`;
const websiteJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": `${siteConfig.url}/#website`,
      url: siteConfig.url,
      name: siteConfig.name,
      description: siteConfig.description,
      inLanguage: "en",
      publisher: { "@id": personId },
    },
    {
      "@type": "Person",
      "@id": personId,
      name: siteConfig.author.name,
      url: siteConfig.author.url,
      jobTitle: siteConfig.author.jobTitle,
      sameAs: [
        siteConfig.socialLinks.linkedin,
        siteConfig.socialLinks.github,
      ],
      description:
        "Software engineer writing about software engineering, cloud, DevOps, and cybersecurity.",
    },
  ],
};

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  applicationName: siteConfig.name,
  title: {
    default: `${siteConfig.author.name} | Software Engineer, Cloud & Cybersecurity`,
    template: `%s | ${siteConfig.author.name}`,
  },
  description: siteConfig.description,
  authors: [{ name: siteConfig.author.name, url: siteConfig.author.url }],
  creator: siteConfig.author.name,
  publisher: siteConfig.author.name,
  category: "technology",
  robots: { index: true, follow: true },
  verification: process.env.GOOGLE_SITE_VERIFICATION
    ? { google: process.env.GOOGLE_SITE_VERIFICATION }
    : undefined,
  icons: {
    icon: [{ url: "/icon.svg", type: "image/svg+xml" }],
    shortcut: "/icon.svg",
  },
  openGraph: {
    title: `${siteConfig.author.name} | Software Engineer, Cloud & Cybersecurity`,
    description: siteConfig.description,
    type: "website",
    url: siteConfig.url,
    siteName: siteConfig.name,
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteConfig.author.name} | Software Engineer, Cloud & Cybersecurity`,
    description: siteConfig.description,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${inter.variable} ${spaceGrotesk.variable} ${jetBrainsMono.variable} h-full antialiased`}
    >
      <body
        suppressHydrationWarning
        className="min-h-full bg-background text-foreground"
      >
        <JsonLd data={websiteJsonLd} />
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <RouteScrollManager />
          <div className="flex min-h-screen flex-col">
            <SiteHeader />
            <main className="flex-1">
              <PageTransition>{children}</PageTransition>
            </main>
            <SiteFooter />
          </div>
          <WhoamiMascot />
        </ThemeProvider>
      </body>
    </html>
  );
}
