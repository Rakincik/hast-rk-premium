"use client";

import React, { useState } from "react";
import styles from "../admin.module.css";
import { useSiteContent } from "@/context/SiteContentContext";
import { useToast } from "@/components/admin/Toast";
import { SingleImageDropzone } from "@/components/admin/ImageUploadDropzone";
import { FounderData, AboutStats } from "@/lib/types/content";
import {
  Building,
  Save,
  Plus,
  Trash2,
  Loader2,
  UserCheck,
  TrendingUp,
} from "lucide-react";

export default function AdminAboutPage() {
  const { content, updateSection } = useSiteContent();
  const { showToast } = useToast();

  const [founder, setFounder] = useState<FounderData>(content.founder || {});
  const [stats, setStats] = useState<AboutStats>(content.stats || {});
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = async () => {
    try {
      setIsSaving(true);
      const fSuccess = await updateSection("founder", founder);
      const sSuccess = await updateSection("stats", stats);

      if (fSuccess && sSuccess) {
        showToast("Kurumsal ve Kurucu Mimar bilgileri başarıyla güncellendi!", "success");
      } else {
        showToast("Kaydedilirken hata oluştu.", "error");
      }
    } catch {
      showToast("Sunucu hatası oluştu.", "error");
    } finally {
      setIsSaving(false);
    }
  };

  const handleParagraphChange = (index: number, val: string) => {
    const updated = [...(founder.paragraphs || [])];
    updated[index] = val;
    setFounder({ ...founder, paragraphs: updated });
  };

  const handleAddParagraph = () => {
    setFounder({
      ...founder,
      paragraphs: [...(founder.paragraphs || []), "Yeni paragraf metni..."],
    });
  };

  const handleRemoveParagraph = (index: number) => {
    const updated = [...(founder.paragraphs || [])];
    updated.splice(index, 1);
    setFounder({ ...founder, paragraphs: updated });
  };

  return (
    <div>
      {/* Header */}
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
            Kurumsal Bilgiler & Kurucu Mimar Notu
          </h2>
          <p style={{ fontSize: "13px", color: "rgba(255,255,255,0.5)", margin: 0 }}>
            Y. Mimar Okan Hastürk portresini, felsefi notunu ve şirketin tecrübe istatistiklerini düzenleyin.
          </p>
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

      {/* Founder Section Card */}
      <div className={styles.card}>
        <div className={styles.cardHeader}>
          <div>
            <h3 className={styles.cardTitle}>
              <UserCheck size={18} color="#d4af37" /> Kurucu ve Baş Mimar (Okan Hastürk)
            </h3>
            <p className={styles.cardSubtitle}>
              Anasayfadaki 'Kurucu Mimarın Notu' bölümü içerikleri
            </p>
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          {/* Portrait & Info */}
          <div className={styles.formRow}>
            <div className={styles.formGroup} style={{ flex: 1 }}>
              <SingleImageDropzone
                label="Kurucu Portre Fotoğrafı"
                helperText="Y. Mimar Okan Hastürk portresini sürükleyip bırakın veya seçin."
                value={founder.image}
                onChange={(url) => setFounder({ ...founder, image: url })}
                height="190px"
              />
            </div>

            <div className={styles.formGroup} style={{ flex: 1 }}>
              <label className={styles.formLabel}>Kurucu İsim</label>
              <input
                type="text"
                value={founder.name}
                onChange={(e) => setFounder({ ...founder, name: e.target.value })}
                className={styles.formInput}
                placeholder="Okan HASTÜRK"
              />
              <div style={{ marginTop: "12px" }}>
                <label className={styles.formLabel}>Unvan / Rol</label>
                <input
                  type="text"
                  value={founder.role}
                  onChange={(e) => setFounder({ ...founder, role: e.target.value })}
                  className={styles.formInput}
                  placeholder="Y. Mimar · Kurucu"
                />
              </div>
            </div>
          </div>

          {/* Titles */}
          <div className={styles.formRow}>
            <div className={styles.formGroup}>
              <label className={styles.formLabel}>Bölüm Üst Rozeti</label>
              <input
                type="text"
                value={founder.tagline}
                onChange={(e) => setFounder({ ...founder, tagline: e.target.value })}
                className={styles.formInput}
                placeholder="Kurucu Mimarın Notu"
              />
            </div>
            <div className={styles.formGroup}>
              <label className={styles.formLabel}>Tecrübe Yılı Göstergesi</label>
              <input
                type="text"
                value={founder.yearsExperience}
                onChange={(e) => setFounder({ ...founder, yearsExperience: e.target.value })}
                className={styles.formInput}
                placeholder="20+"
              />
            </div>
          </div>

          <div className={styles.formRow}>
            <div className={styles.formGroup}>
              <label className={styles.formLabel}>Başlık 1. Satır</label>
              <input
                type="text"
                value={founder.title1}
                onChange={(e) => setFounder({ ...founder, title1: e.target.value })}
                className={styles.formInput}
              />
            </div>
            <div className={styles.formGroup}>
              <label className={styles.formLabel}>Başlık 2. Satır (Altın Vurgu)</label>
              <input
                type="text"
                value={founder.title2}
                onChange={(e) => setFounder({ ...founder, title2: e.target.value })}
                className={styles.formInput}
              />
            </div>
          </div>

          {/* Quote */}
          <div className={styles.formGroup}>
            <label className={styles.formLabel}>Felsefi Alıntı / Aforizma Sözü</label>
            <textarea
              rows={2}
              value={founder.quote}
              onChange={(e) => setFounder({ ...founder, quote: e.target.value })}
              className={styles.formTextarea}
            />
          </div>

          {/* Paragraphs */}
          <div className={styles.formGroup}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "8px" }}>
              <label className={styles.formLabel} style={{ margin: 0 }}>
                Kurucu Mektubu & Biyografi Paragrafları
              </label>
              <button
                type="button"
                onClick={handleAddParagraph}
                className={styles.btnSecondary}
                style={{ padding: "4px 10px", fontSize: "12px" }}
              >
                <Plus size={13} /> Paragraf Ekle
              </button>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
              {founder.paragraphs?.map((p, pIdx) => (
                <div key={pIdx} style={{ display: "flex", gap: "10px" }}>
                  <textarea
                    rows={3}
                    value={p}
                    onChange={(e) => handleParagraphChange(pIdx, e.target.value)}
                    className={styles.formTextarea}
                  />
                  <button
                    type="button"
                    onClick={() => handleRemoveParagraph(pIdx)}
                    className={styles.btnDanger}
                    style={{ padding: "0 12px", alignSelf: "stretch" }}
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Experience Stats Card */}
      <div className={styles.card}>
        <div className={styles.cardHeader}>
          <div>
            <h3 className={styles.cardTitle}>
              <TrendingUp size={18} color="#d4af37" /> Tecrübe & Başarı İstatistikleri
            </h3>
            <p className={styles.cardSubtitle}>
              Anasayfadaki 'Tarihe Duyulan Saygı' bölümü rakamları ve metinleri
            </p>
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          <div className={styles.formRow}>
            <div className={styles.formGroup}>
              <label className={styles.formLabel}>Başlık 1</label>
              <input
                type="text"
                value={stats.aboutTitle1}
                onChange={(e) => setStats({ ...stats, aboutTitle1: e.target.value })}
                className={styles.formInput}
                placeholder="Ustalık Eserimiz:"
              />
            </div>
            <div className={styles.formGroup}>
              <label className={styles.formLabel}>Başlık 2 (Altın Vurgu)</label>
              <input
                type="text"
                value={stats.aboutTitle2}
                onChange={(e) => setStats({ ...stats, aboutTitle2: e.target.value })}
                className={styles.formInput}
                placeholder="Tarihe Duyulan Saygı"
              />
            </div>
          </div>

          <div className={styles.formGroup}>
            <label className={styles.formLabel}>Açıklama Metni</label>
            <textarea
              rows={3}
              value={stats.aboutDesc}
              onChange={(e) => setStats({ ...stats, aboutDesc: e.target.value })}
              className={styles.formTextarea}
            />
          </div>

          <div className={styles.formRow}>
            <div className={styles.formGroup}>
              <label className={styles.formLabel}>Yıllık Tecrübe Rakamı</label>
              <input
                type="text"
                value={stats.yearsExperience}
                onChange={(e) => setStats({ ...stats, yearsExperience: e.target.value })}
                className={styles.formInput}
                placeholder="20+"
              />
            </div>
            <div className={styles.formGroup}>
              <label className={styles.formLabel}>Tamamlanan Proje Rakamı</label>
              <input
                type="text"
                value={stats.completedProjects}
                onChange={(e) => setStats({ ...stats, completedProjects: e.target.value })}
                className={styles.formInput}
                placeholder="150+"
              />
            </div>
            <div className={styles.formGroup}>
              <label className={styles.formLabel}>Tarihi Doku Uyumu Rakamı</label>
              <input
                type="text"
                value={stats.heritageHarmony}
                onChange={(e) => setStats({ ...stats, heritageHarmony: e.target.value })}
                className={styles.formInput}
                placeholder="%100"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
