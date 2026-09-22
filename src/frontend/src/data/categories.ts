import type { Category } from "@/types";

export const categories: Category[] = [
  {
    slug: "it",
    name: "IT & Software",
    tagline: "Engineers, cloud architects and security specialists",
    icon: "Code2",
    professionalCount: 3,
  },
  {
    slug: "accounting",
    name: "Accounting & Tax",
    tagline: "CPAs, bookkeepers and tax advisors",
    icon: "Calculator",
    professionalCount: 2,
  },
  {
    slug: "engineering",
    name: "Engineering",
    tagline: "Mechanical, electrical and civil engineers",
    icon: "Cog",
    professionalCount: 2,
  },
  {
    slug: "architecture",
    name: "Architecture",
    tagline: "Licensed architects and interior designers",
    icon: "Ruler",
    professionalCount: 2,
  },
  {
    slug: "healthcare",
    name: "Healthcare",
    tagline: "Dietitians, physiotherapists and clinicians",
    icon: "HeartPulse",
    professionalCount: 2,
  },
  {
    slug: "tutoring",
    name: "Tutoring",
    tagline: "Subject tutors and exam coaches",
    icon: "GraduationCap",
    professionalCount: 2,
  },
  {
    slug: "design",
    name: "Design",
    tagline: "Brand, product and motion designers",
    icon: "Palette",
    professionalCount: 2,
  },
  {
    slug: "home-services",
    name: "Home Services",
    tagline: "Electricians, plumbers and renovation pros",
    icon: "Wrench",
    professionalCount: 1,
  },
  {
    slug: "consulting",
    name: "Consulting",
    tagline: "Strategy, operations and growth advisors",
    icon: "Briefcase",
    professionalCount: 1,
  },
  {
    slug: "wellness",
    name: "Wellness",
    tagline: "Coaches, therapists and nutrition experts",
    icon: "Sparkles",
    professionalCount: 1,
  },
];

export function getCategory(slug: string): Category | undefined {
  return categories.find((category) => category.slug === slug);
}
