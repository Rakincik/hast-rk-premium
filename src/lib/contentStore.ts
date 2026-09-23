import fs from "fs";
import path from "path";
import { SiteContent } from "./types/content";
import { defaultSiteContent } from "./defaultContent";

export { defaultSiteContent };

const DATA_DIR = path.join(process.cwd(), "src", "data");
const CONTENT_FILE_PATH = path.join(DATA_DIR, "siteContent.json");

/**
 * Ensures data directory exists and returns content.
 */
export async function getContent(): Promise<SiteContent> {
  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }

    if (!fs.existsSync(CONTENT_FILE_PATH)) {
      fs.writeFileSync(CONTENT_FILE_PATH, JSON.stringify(defaultSiteContent, null, 2), "utf8");
      return defaultSiteContent;
    }

    const fileContent = fs.readFileSync(CONTENT_FILE_PATH, "utf8");
    const parsed = JSON.parse(fileContent) as SiteContent;

    // Deep merge with default in case new fields were added
    return {
      ...defaultSiteContent,
      ...parsed,
      hero: { ...defaultSiteContent.hero, ...(parsed.hero || {}) },
      settings: { ...defaultSiteContent.settings, ...(parsed.settings || {}) },
      stats: { ...defaultSiteContent.stats, ...(parsed.stats || {}) },
      founder: { ...defaultSiteContent.founder, ...(parsed.founder || {}) },
      projects: parsed.projects?.length ? parsed.projects : defaultSiteContent.projects,
      beforeAfter: parsed.beforeAfter?.length ? parsed.beforeAfter : defaultSiteContent.beforeAfter,
      services: parsed.services?.length ? parsed.services : defaultSiteContent.services,
      team: parsed.team?.length ? parsed.team : defaultSiteContent.team,
      articles: parsed.articles?.length ? parsed.articles : defaultSiteContent.articles,
      faq: parsed.faq?.length ? parsed.faq : defaultSiteContent.faq,
      testimonials: parsed.testimonials?.length ? parsed.testimonials : defaultSiteContent.testimonials,
    };
  } catch (error) {
    console.error("Error reading content file, falling back to default:", error);
    return defaultSiteContent;
  }
}

/**
 * Atomically updates content file on disk.
 */
export async function saveContent(newContent: Partial<SiteContent>): Promise<SiteContent> {
  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }

    const current = await getContent();
    const updated: SiteContent = {
      ...current,
      ...newContent,
    };

    const tempFilePath = `${CONTENT_FILE_PATH}.tmp`;
    fs.writeFileSync(tempFilePath, JSON.stringify(updated, null, 2), "utf8");
    fs.renameSync(tempFilePath, CONTENT_FILE_PATH);

    return updated;
  } catch (error) {
    console.error("Error saving content file:", error);
    throw error;
  }
}
