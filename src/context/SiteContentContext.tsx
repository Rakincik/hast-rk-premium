"use client";

import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import { SiteContent } from "@/lib/types/content";
import { defaultSiteContent } from "@/lib/defaultContent";

interface SiteContentContextType {
  content: SiteContent;
  isLoading: boolean;
  refreshContent: () => Promise<void>;
  updateSection: (section: keyof SiteContent, data: unknown) => Promise<boolean>;
}

const SiteContentContext = createContext<SiteContentContextType>({
  content: defaultSiteContent,
  isLoading: false,
  refreshContent: async () => {},
  updateSection: async () => false,
});

export function SiteContentProvider({
  children,
  initialContent,
}: {
  children: React.ReactNode;
  initialContent?: SiteContent;
}) {
  const [content, setContent] = useState<SiteContent>(initialContent || defaultSiteContent);
  const [isLoading, setIsLoading] = useState(false);

  const refreshContent = useCallback(async () => {
    try {
      setIsLoading(true);
      const res = await fetch("/api/content", { cache: "no-store" });
      if (res.ok) {
        const data = await res.json();
        setContent(data);
      }
    } catch (err) {
      console.error("Failed to load site content:", err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    refreshContent();
  }, [refreshContent]);

  const updateSection = async (section: keyof SiteContent, data: unknown): Promise<boolean> => {
    try {
      const res = await fetch("/api/admin/content", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ section, data }),
      });

      if (res.ok) {
        const resData = await res.json();
        if (resData.content) {
          setContent(resData.content);
        } else {
          setContent((prev) => ({ ...prev, [section]: data }));
        }
        return true;
      }
      return false;
    } catch (err) {
      console.error(`Error updating section ${section}:`, err);
      return false;
    }
  };

  return (
    <SiteContentContext.Provider
      value={{
        content,
        isLoading,
        refreshContent,
        updateSection,
      }}
    >
      {children}
    </SiteContentContext.Provider>
  );
}

export function useSiteContent() {
  const context = useContext(SiteContentContext);
  if (!context) {
    throw new Error("useSiteContent must be used within a SiteContentProvider");
  }
  return context;
}
