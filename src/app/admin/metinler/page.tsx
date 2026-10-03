"use client";

import React, { useState, useMemo } from "react";
import styles from "../admin.module.css";
import { useSiteContent } from "@/context/SiteContentContext";
import { useToast } from "@/components/admin/Toast";
import { Save, Search, Type, Globe, Loader2, Edit3 } from "lucide-react";

type TranslationsType = Record<string, { tr: string; en: string; de: string; ar: string }>;

export default function AdminMetinlerPage() {
  const { content, updateSection } = useSiteContent();
  const { showToast } = useToast();

  const [translations, setTranslations] = useState<TranslationsType>(
    content.translations || {}
  );
  const [isSaving, setIsSaving] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const handleSave = async () => {
    try {
      setIsSaving(true);
      const success = await updateSection("translations", translations);

      if (success) {
        showToast("Tüm metinler ve çeviriler başarıyla güncellendi!", "success");
      } else {
        showToast("Kaydedilirken bir hata oluştu.", "error");
      }
    } catch {
      showToast("Sunucu hatası oluştu.", "error");
    } finally {
      setIsSaving(false);
    }
  };

  const handleTranslationChange = (key: string, lang: "tr" | "en" | "de" | "ar", value: string) => {
    setTranslations((prev) => ({
      ...prev,
      [key]: {
        ...prev[key],
        [lang]: value,
      },
    }));
  };

  const filteredKeys = useMemo(() => {
    return Object.keys(translations).filter((key) => {
      const lowerSearch = searchTerm.toLowerCase();
      if (key.toLowerCase().includes(lowerSearch)) return true;
      const t = translations[key];
      return (
        t.tr.toLowerCase().includes(lowerSearch) ||
        t.en.toLowerCase().includes(lowerSearch)
      );
    });
  }, [translations, searchTerm]);

  return (
    <div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: "24px",
          flexWrap: "wrap",
          gap: "16px",
        }}
      >
        <div>
          <h2 style={{ fontSize: "22px", fontWeight: 700, color: "#fff", margin: "0 0 6px" }}>
            Genel Metinler & Çeviriler
          </h2>
          <p style={{ fontSize: "13px", color: "rgba(255,255,255,0.5)", margin: 0 }}>
            Web sitesindeki her bir metni, butonu ve açıklamayı çoklu dil desteğiyle düzenleyin.
          </p>
        </div>

        <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
          <div className={styles.formGroup} style={{ marginBottom: 0, minWidth: "250px" }}>
            <div style={{ position: "relative" }}>
              <Search
                size={16}
                color="rgba(255,255,255,0.4)"
                style={{ position: "absolute", left: "12px", top: "12px" }}
              />
              <input
                type="text"
                placeholder="Metin veya anahtar kelime ara..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className={styles.formInput}
                style={{ paddingLeft: "36px" }}
              />
            </div>
          </div>
          <button
            type="button"
            onClick={handleSave}
            disabled={isSaving}
            className={styles.btnPrimary}
          >
            {isSaving ? <Loader2 size={16} className="animate-spin" /> : <Save size={16} />}
            <span>Yayına Al & Kaydet</span>
          </button>
        </div>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
        {filteredKeys.length === 0 ? (
          <div style={{ padding: "40px", textAlign: "center", color: "rgba(255,255,255,0.5)" }}>
            Aramanıza uygun metin bulunamadı.
          </div>
        ) : (
          filteredKeys.map((key) => (
            <div key={key} className={styles.card} style={{ padding: "20px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "16px" }}>
                <Type size={16} color="#d4af37" />
                <span style={{ fontSize: "14px", fontWeight: 600, color: "#fff", fontFamily: "monospace" }}>
                  {key}
                </span>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}>
                {/* Turkish */}
                <div>
                  <label className={styles.formLabel} style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                    <Globe size={14} /> Türkçe (TR)
                  </label>
                  <textarea
                    rows={2}
                    value={translations[key]?.tr || ""}
                    onChange={(e) => handleTranslationChange(key, "tr", e.target.value)}
                    className={styles.formTextarea}
                  />
                </div>
                {/* English */}
                <div>
                  <label className={styles.formLabel} style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                    <Globe size={14} /> İngilizce (EN)
                  </label>
                  <textarea
                    rows={2}
                    value={translations[key]?.en || ""}
                    onChange={(e) => handleTranslationChange(key, "en", e.target.value)}
                    className={styles.formTextarea}
                  />
                </div>
                {/* German */}
                <div>
                  <label className={styles.formLabel} style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                    <Globe size={14} /> Almanca (DE)
                  </label>
                  <textarea
                    rows={2}
                    value={translations[key]?.de || ""}
                    onChange={(e) => handleTranslationChange(key, "de", e.target.value)}
                    className={styles.formTextarea}
                  />
                </div>
                {/* Arabic */}
                <div>
                  <label className={styles.formLabel} style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                    <Globe size={14} /> Arapça (AR)
                  </label>
                  <textarea
                    rows={2}
                    dir="rtl"
                    value={translations[key]?.ar || ""}
                    onChange={(e) => handleTranslationChange(key, "ar", e.target.value)}
                    className={styles.formTextarea}
                  />
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
