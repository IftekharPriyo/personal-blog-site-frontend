export interface Project {
  title: string;
  slug: string;
  logo: string;
  summary: string;
  whyItExists: string;
  architecture: string;
  description: string;
  status: "Live" | "Private alpha" | "In progress" | "Prototype";
  year: string;
  productType: string;
  stack: string[];
  highlights: string[];
  links?: {
    label: string;
    href: string;
  }[];
  liveLink?: {
    label: string;
    href: string;
  };
}
