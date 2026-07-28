export interface Project {
  title: string;
  slug: string;
  summary: string;
  description: string;
  status: "Live" | "In progress" | "Prototype";
  year: string;
  role: string;
  stack: string[];
  highlights: string[];
  links?: {
    label: string;
    href: string;
  }[];
}
