import type { SVGProps } from "react";
import { MessageCircle } from "lucide-react";
import { siteConfig } from "@/config/site";

function LinkedInIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M5.37 3.5A2.18 2.18 0 1 1 1 3.5a2.18 2.18 0 0 1 4.37 0ZM1.38 8.09h3.98V21H1.38V8.09Zm6.63 0h3.82v1.77h.05c.53-1.01 1.83-2.08 3.77-2.08 4.03 0 4.78 2.65 4.78 6.1V21h-3.98v-6.31c0-1.5-.03-3.44-2.1-3.44-2.1 0-2.42 1.64-2.42 3.33V21H8.01V8.09Z" />
    </svg>
  );
}

function GitHubIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M12 .7C5.63.7.47 5.86.47 12.23c0 5.1 3.3 9.42 7.88 10.95.58.1.79-.25.79-.56v-2.23c-3.2.7-3.88-1.36-3.88-1.36-.53-1.33-1.28-1.68-1.28-1.68-1.05-.72.08-.7.08-.7 1.16.08 1.77 1.19 1.77 1.19 1.03 1.77 2.7 1.26 3.37.96.1-.75.4-1.26.73-1.55-2.56-.29-5.25-1.28-5.25-5.7 0-1.26.45-2.29 1.19-3.1-.12-.29-.52-1.47.11-3.06 0 0 .97-.31 3.17 1.18a10.98 10.98 0 0 1 5.77 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.23 2.77.11 3.06.74.81 1.19 1.84 1.19 3.1 0 4.43-2.7 5.4-5.27 5.69.42.36.78 1.06.78 2.14v3.18c0 .31.21.67.79.56a11.54 11.54 0 0 0 7.88-10.95C23.53 5.86 18.37.7 12 .7Z" />
    </svg>
  );
}

function WhatsAppIcon(props: SVGProps<SVGSVGElement>) {
  return <MessageCircle strokeWidth={1.8} {...props} />;
}

const socialLinks = [
  {
    label: "LinkedIn",
    href: siteConfig.socialLinks.linkedin,
    icon: LinkedInIcon,
  },
  {
    label: "GitHub",
    href: siteConfig.socialLinks.github,
    icon: GitHubIcon,
  },
  {
    label: "WhatsApp",
    href: siteConfig.socialLinks.whatsapp,
    icon: WhatsAppIcon,
  },
];

export function SocialLinks() {
  return (
    <nav aria-label="Social profiles">
      <ul className="flex items-center gap-3">
        {socialLinks.map(({ label, href, icon: Icon }) => (
          <li key={label}>
            <a
              href={href}
              target="_blank"
              rel="noopener noreferrer me"
              aria-label={`Visit ${label}`}
              title={label}
              className="inline-flex size-10 items-center justify-center rounded-full border border-border bg-card text-muted-foreground transition-colors hover:border-primary/50 hover:bg-primary/5 hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            >
              <Icon aria-hidden="true" className="size-[18px]" />
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
