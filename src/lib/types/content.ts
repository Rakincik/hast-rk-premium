export interface HeroSlide {
  id: string;
  title1: string;
  title2: string;
  subtitle: string;
  mediaType: "video" | "image";
  mediaUrl: string;
  primaryBtnText: string;
  primaryBtnLink: string;
  secondaryBtnText: string;
  secondaryBtnLink: string;
  active: boolean;
}

export interface ProjectItem {
  id: number;
  title: string;
  category: string;
  categoryKey: string;
  image: string;
  gallery: string[];
  location: string;
  year: string;
  status: string;
  area: string;
  quoteType: string;
  description: string;
  techniques: string[];
  featuredOnHome?: boolean;
}

export interface BeforeAfterItem {
  id: string;
  tabLabel: string;
  title: string;
  location: string;
  status: string;
  techniques: string[];
  beforeImage: string;
  afterImage: string;
  quoteType: string;
}

export interface ServiceItem {
  id: number;
  index: string;
  title: string;
  desc: string;
  iconName: string;
  quoteType: string;
  deliverables: string[];
}

export interface TeamMember {
  id: number;
  name: string;
  role: string;
  email: string;
  image: string;
}

export interface ArticleItem {
  id: number;
  title: string;
  category: string;
  readTime: string;
  date: string;
  excerpt: string;
  image: string;
  content?: string;
}

export interface FaqItem {
  id: number;
  question: string;
  answer: string;
  category?: string;
}

export interface TestimonialItem {
  id: number;
  name: string;
  role: string;
  company: string;
  text: string;
  rating: number;
  project: string;
}

export interface SiteSettings {
  companyName: string;
  slogan: string;
  phone: string;
  phoneDisplay: string;
  whatsapp: string;
  email: string;
  address: string;
  workingHours: string;
  googleMapsUrl: string;
  socials: {
    instagram: string;
    linkedin: string;
    youtube?: string;
  };
  meta: {
    title: string;
    description: string;
    keywords: string;
    ogImage: string;
  };
  tracking: {
    googleAnalyticsId?: string;
    googleAdsId?: string;
  };
  logos: {
    original: string;
    white: string;
    gold: string;
    favicon: string;
  };
}

export interface FounderData {
  name: string;
  role: string;
  yearsExperience: string;
  image: string;
  tagline: string;
  title1: string;
  title2: string;
  paragraphs: string[];
  quote: string;
}

export interface AboutStats {
  yearsExperience: string;
  completedProjects: string;
  heritageHarmony: string;
  aboutTitle1: string;
  aboutTitle2: string;
  aboutDesc: string;
}

export interface QuotePackageDetail {
  id: string;
  name: string;
  tagline: string;
  multiplier: number;
  features: string[];
  isPopular?: boolean;
}

export interface QuoteServiceOption {
  id: string;
  name: string;
  desc: string;
  weight: number;
  isRecommended?: boolean;
}

export interface QuoteConfig {
  globalParameters?: {
    execRestorationBaseCost: number;
    execRenovationBaseCost: number;
    execStrengtheningBaseCost: number;
    execNewBaseCost: number;
    projTmmobBaseCost: number;
    inflationRate: number;
  };
  projectPackageTiers: Record<string, QuotePackageDetail>;
  executionPackageTiers: Record<string, QuotePackageDetail>;
  materialFactors: Record<string, { label: string; factor: number; desc: string }>;
  heritageFactors: Record<string, { label: string; factor: number; desc: string }>;
  locationFactors: Record<string, { label: string; factor: number; boardName: string; boardDuration: string; desc: string }>;
}

export interface SiteContent {
  hero: {
    mode: "single_video" | "carousel";
    videoUrl: string;
    slides: HeroSlide[];
  };
  settings: SiteSettings;
  stats: AboutStats;
  founder: FounderData;
  projects: ProjectItem[];
  beforeAfter: BeforeAfterItem[];
  services: ServiceItem[];
  team: TeamMember[];
  articles: ArticleItem[];
  faq: FaqItem[];
  testimonials: TestimonialItem[];
  translations?: Record<string, { tr: string; en: string; de: string; ar: string }>;
  quoteConfig?: QuoteConfig;
}
