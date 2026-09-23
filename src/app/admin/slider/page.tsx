"use client";

import React, { useState } from "react";
import styles from "../admin.module.css";
import { useSiteContent } from "@/context/SiteContentContext";
import { useToast } from "@/components/admin/Toast";
import { SingleImageDropzone } from "@/components/admin/ImageUploadDropzone";
import { HeroSlide } from "@/lib/types/content";
import {
  Sliders,
  Plus,
  Trash2,
  Edit,
  Save,
  Video,
  Image as ImageIcon,
  CheckCircle2,
  X,
  Eye,
  Loader2,
} from "lucide-react";

export default function AdminSliderPage() {
  const { content, updateSection } = useSiteContent();
  const { showToast } = useToast();

  const [heroMode, setHeroMode] = useState<"single_video" | "carousel">(
    content.hero?.mode || "single_video"
  );
  const [videoUrl, setVideoUrl] = useState(
    content.hero?.videoUrl || "/bana_bu_görseli_web_sitemin_sl.mp4"
  );
  const [slides, setSlides] = useState<HeroSlide[]>(content.hero?.slides || []);

  const [editingSlide, setEditingSlide] = useState<HeroSlide | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const handleSaveAll = async () => {
    try {
      setIsSaving(true);
      const updatedHero = {
        mode: heroMode,
        videoUrl,
        slides,
      };

      const success = await updateSection("hero", updatedHero);
      if (success) {
        showToast("Hero ve Slayt ayarları başarıyla kaydedildi!", "success");
      } else {
        showToast("Kaydedilirken bir hata oluştu.", "error");
      }
    } catch {
      showToast("Sunucu hatası oluştu.", "error");
    } finally {
      setIsSaving(false);
    }
  };

  const handleOpenAdd = () => {
    const newSlide: HeroSlide = {
      id: `slide-${Date.now()}`,
      title1: "Yeni Başlık Satırı 1",
      title2: "Altın Vurgu Başlık",
      subtitle: "Buraya slayt açıklama metnini giriniz.",
      mediaType: "image",
      mediaUrl: "/projects/taksim-360/IMG_2860.JPG",
      primaryBtnText: "Projelerimizi İnceleyin",
      primaryBtnLink: "/projeler",
      secondaryBtnText: "İletişime Geç",
      secondaryBtnLink: "/iletisim",
      active: true,
    };
    setEditingSlide(newSlide);
    setIsModalOpen(true);
  };

  const handleEditSlide = (slide: HeroSlide) => {
    setEditingSlide({ ...slide });
    setIsModalOpen(true);
  };

  const handleDeleteSlide = (id: string) => {
    if (confirm("Bu slaytı silmek istediğinize emin misiniz?")) {
      const updated = slides.filter((s) => s.id !== id);
      setSlides(updated);
      showToast("Slayt silindi (Değişiklikleri kaydetmeyi unutmayın)", "info");
    }
  };

  const handleSaveModalSlide = () => {
    if (!editingSlide) return;

    const exists = slides.some((s) => s.id === editingSlide.id);
    let updated: HeroSlide[];
    if (exists) {
      updated = slides.map((s) => (s.id === editingSlide.id ? editingSlide : s));
    } else {
      updated = [...slides, editingSlide];
    }

    setSlides(updated);
    setIsModalOpen(false);
    setEditingSlide(null);
    showToast("Slayt güncellendi. Kaydet butonuna basarak yayınlayabilirsiniz.", "info");
  };

  const handleToggleSlideActive = (id: string) => {
    const updated = slides.map((s) => (s.id === id ? { ...s, active: !s.active } : s));
    setSlides(updated);
  };

  return (
    <div>
      {/* Page Title & Actions */}
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
            Hero & Slayt (Slider) Yönetimi
          </h2>
          <p style={{ fontSize: "13px", color: "rgba(255,255,255,0.5)", margin: 0 }}>
            Anasayfanın en üstünde yer alan ana karşılama videosunu, slayt metinlerini ve butonlarını düzenleyin.
          </p>
        </div>

        <div style={{ display: "flex", gap: "10px" }}>
          <button type="button" onClick={handleOpenAdd} className={styles.btnSecondary}>
            <Plus size={16} /> Yeni Slayt Ekle
          </button>
          <button
            type="button"
            onClick={handleSaveAll}
            disabled={isSaving}
            className={styles.btnPrimary}
          >
            {isSaving ? <Loader2 size={16} className="animate-spin" /> : <Save size={16} />}
            <span>Yayına Al & Kaydet</span>
          </button>
        </div>
      </div>

      {/* Mode Selector Card */}
      <div className={styles.card}>
        <div className={styles.cardHeader}>
          <div>
            <h3 className={styles.cardTitle}>
              <Sliders size={18} color="#d4af37" /> Karşılama (Hero) Modu
            </h3>
            <p className={styles.cardSubtitle}>
              Sitede arka planda sürekli dönen tekil video mu, yoksa geçişli görsel/video slaytı mı görünsün?
            </p>
          </div>
        </div>

        <div style={{ display: "flex", gap: "20px", flexWrap: "wrap", marginBottom: "20px" }}>
          <label
            style={{
              flex: "1",
              minWidth: "250px",
              padding: "16px",
              borderRadius: "12px",
              border:
                heroMode === "single_video"
                  ? "2px solid #d4af37"
                  : "1px solid rgba(255,255,255,0.1)",
              backgroundColor:
                heroMode === "single_video" ? "rgba(212, 175, 55, 0.08)" : "#0b0b10",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: "12px",
            }}
          >
            <input
              type="radio"
              name="heroMode"
              checked={heroMode === "single_video"}
              onChange={() => setHeroMode("single_video")}
              style={{ accentColor: "#d4af37" }}
            />
            <div>
              <div style={{ fontWeight: 600, color: "#fff", fontSize: "14px" }}>
                🎥 Tekil Sinematik Video
              </div>
              <div style={{ fontSize: "12px", color: "rgba(255,255,255,0.5)", marginTop: "2px" }}>
                Mevcut video loop oynatılır, ilk slayt başlığı üzerine yansıtılır.
              </div>
            </div>
          </label>

          <label
            style={{
              flex: "1",
              minWidth: "250px",
              padding: "16px",
              borderRadius: "12px",
              border:
                heroMode === "carousel"
                  ? "2px solid #d4af37"
                  : "1px solid rgba(255,255,255,0.1)",
              backgroundColor:
                heroMode === "carousel" ? "rgba(212, 175, 55, 0.08)" : "#0b0b10",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: "12px",
            }}
          >
            <input
              type="radio"
              name="heroMode"
              checked={heroMode === "carousel"}
              onChange={() => setHeroMode("carousel")}
              style={{ accentColor: "#d4af37" }}
            />
            <div>
              <div style={{ fontWeight: 600, color: "#fff", fontSize: "14px" }}>
                🖼️ Çoklu Slayt (Carousel Slayt)
              </div>
              <div style={{ fontSize: "12px", color: "rgba(255,255,255,0.5)", marginTop: "2px" }}>
                Farklı projeler ve görseller slayt geçişleriyle sırayla akar.
              </div>
            </div>
          </label>
        </div>

        {heroMode === "single_video" && (
          <div style={{ marginTop: "16px" }}>
            <SingleImageDropzone
              label="Sinematik Arka Plan Video Dosyası"
              helperText="Video dosyasını (.mp4, .webm) sürükleyip bırakabilir, kütüphaneden seçebilir veya yükleyebilirsiniz."
              acceptVideo={true}
              value={videoUrl}
              onChange={(url) => setVideoUrl(url)}
              height="180px"
            />
          </div>
        )}
      </div>

      {/* Slides List Card */}
      <div className={styles.card}>
        <div className={styles.cardHeader}>
          <div>
            <h3 className={styles.cardTitle}>
              <Sliders size={18} color="#d4af37" /> Slayt Listesi ({slides.length})
            </h3>
            <p className={styles.cardSubtitle}>
              Karşılama başlıkları, altın renkli vurgular ve alt metinler
            </p>
          </div>
          <button type="button" onClick={handleOpenAdd} className={styles.btnSecondary}>
            <Plus size={16} /> Slayt Ekle
          </button>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
          {slides.map((slide, index) => (
            <div
              key={slide.id}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "16px 20px",
                borderRadius: "12px",
                backgroundColor: "#0d0d12",
                border: "1px solid rgba(255, 255, 255, 0.08)",
                gap: "16px",
                flexWrap: "wrap",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "16px", flex: 1, minWidth: "260px" }}>
                <span
                  style={{
                    fontSize: "12px",
                    fontWeight: 700,
                    color: "#d4af37",
                    width: "28px",
                  }}
                >
                  #{index + 1}
                </span>

                <div
                  style={{
                    width: "60px",
                    height: "60px",
                    borderRadius: "8px",
                    overflow: "hidden",
                    backgroundColor: "#161622",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    border: "1px solid rgba(255,255,255,0.1)",
                    flexShrink: 0,
                  }}
                >
                  {slide.mediaType === "video" ? (
                    <Video size={24} color="#d4af37" />
                  ) : (
                    <img
                      src={slide.mediaUrl}
                      alt={slide.title1}
                      style={{ width: "100%", height: "100%", objectFit: "cover" }}
                    />
                  )}
                </div>

                <div>
                  <div style={{ fontSize: "14px", fontWeight: 600, color: "#fff" }}>
                    {slide.title1} <span style={{ color: "#d4af37" }}>{slide.title2}</span>
                  </div>
                  <div
                    style={{
                      fontSize: "12px",
                      color: "rgba(255, 255, 255, 0.5)",
                      marginTop: "3px",
                      maxWidth: "480px",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {slide.subtitle}
                  </div>
                  <div style={{ display: "flex", gap: "8px", marginTop: "6px", fontSize: "11px" }}>
                    <span style={{ color: "rgba(255,255,255,0.4)" }}>
                      Buton 1: <b>{slide.primaryBtnText}</b> ({slide.primaryBtnLink})
                    </span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <label className={styles.toggleLabel}>
                  <input
                    type="checkbox"
                    checked={slide.active}
                    onChange={() => handleToggleSlideActive(slide.id)}
                    style={{ display: "none" }}
                  />
                  <div
                    className={`${styles.toggleSwitch} ${
                      slide.active ? styles.toggleSwitchChecked : ""
                    }`}
                  >
                    <div
                      className={`${styles.toggleDot} ${
                        slide.active ? styles.toggleDotChecked : ""
                      }`}
                    />
                  </div>
                  <span style={{ fontSize: "12px", color: slide.active ? "#d4af37" : "rgba(255,255,255,0.4)" }}>
                    {slide.active ? "Aktif" : "Pasif"}
                  </span>
                </label>

                <button
                  type="button"
                  onClick={() => handleEditSlide(slide)}
                  className={styles.btnSecondary}
                  style={{ padding: "8px 12px" }}
                >
                  <Edit size={14} /> Düzenle
                </button>

                <button
                  type="button"
                  onClick={() => handleDeleteSlide(slide.id)}
                  className={styles.btnDanger}
                  style={{ padding: "8px 12px" }}
                >
                  <Trash2 size={14} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Edit/Add Slide Modal */}
      {isModalOpen && editingSlide && (
        <div className={styles.modalBackdrop}>
          <div className={styles.modalContent}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                marginBottom: "20px",
                paddingBottom: "14px",
                borderBottom: "1px solid rgba(255,255,255,0.08)",
              }}
            >
              <h3 style={{ margin: 0, fontSize: "17px", color: "#fff", fontWeight: 600 }}>
                {editingSlide.id ? "Slaytı Düzenle" : "Yeni Slayt Ekle"}
              </h3>
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                style={{
                  background: "transparent",
                  border: "none",
                  color: "rgba(255,255,255,0.5)",
                  cursor: "pointer",
                }}
              >
                <X size={20} />
              </button>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              <div className={styles.formRow}>
                <div className={styles.formGroup}>
                  <label className={styles.formLabel}>Başlık 1. Satır (Beyaz Yazı)</label>
                  <input
                    type="text"
                    value={editingSlide.title1}
                    onChange={(e) =>
                      setEditingSlide({ ...editingSlide, title1: e.target.value })
                    }
                    className={styles.formInput}
                    placeholder="Örn: Geçmişin Dokusuna,"
                  />
                </div>

                <div className={styles.formGroup}>
                  <label className={styles.formLabel}>Başlık 2. Satır (Altın Vurgu)</label>
                  <input
                    type="text"
                    value={editingSlide.title2}
                    onChange={(e) =>
                      setEditingSlide({ ...editingSlide, title2: e.target.value })
                    }
                    className={styles.formInput}
                    placeholder="Örn: Geleceğin İmzası"
                  />
                </div>
              </div>

              <div className={styles.formGroup}>
                <label className={styles.formLabel}>Slayt Alt Açıklama Metni</label>
                <textarea
                  rows={3}
                  value={editingSlide.subtitle}
                  onChange={(e) =>
                    setEditingSlide({ ...editingSlide, subtitle: e.target.value })
                  }
                  className={styles.formTextarea}
                  placeholder="Restorasyon, Rölöve, Mimari Tasarım..."
                />
              </div>

              <div className={styles.formGroup}>
                <label className={styles.formLabel}>Medya Türü</label>
                <select
                  value={editingSlide.mediaType}
                  onChange={(e) =>
                    setEditingSlide({
                      ...editingSlide,
                      mediaType: e.target.value as "image" | "video",
                    })
                  }
                  className={styles.formSelect}
                >
                  <option value="image">Görsel (Fotoğraf)</option>
                  <option value="video">Video (.mp4)</option>
                </select>
              </div>

              <SingleImageDropzone
                label="Slayt Medyası (Görsel veya Video)"
                helperText="Slayt görselini veya videosunu sürükleyip bırakın, tıklayarak seçin ya da Ctrl+V ile yapıştırın."
                acceptVideo={editingSlide.mediaType === "video"}
                value={editingSlide.mediaUrl}
                onChange={(url) => {
                  const isVid = url.endsWith(".mp4") || url.endsWith(".webm");
                  setEditingSlide({
                    ...editingSlide,
                    mediaUrl: url,
                    mediaType: isVid ? "video" : editingSlide.mediaType,
                  });
                }}
                height="180px"
              />

              <div className={styles.formRow}>
                <div className={styles.formGroup}>
                  <label className={styles.formLabel}>1. Buton Metni</label>
                  <input
                    type="text"
                    value={editingSlide.primaryBtnText}
                    onChange={(e) =>
                      setEditingSlide({ ...editingSlide, primaryBtnText: e.target.value })
                    }
                    className={styles.formInput}
                  />
                </div>
                <div className={styles.formGroup}>
                  <label className={styles.formLabel}>1. Buton Bağlantısı (Link)</label>
                  <input
                    type="text"
                    value={editingSlide.primaryBtnLink}
                    onChange={(e) =>
                      setEditingSlide({ ...editingSlide, primaryBtnLink: e.target.value })
                    }
                    className={styles.formInput}
                  />
                </div>
              </div>

              <div className={styles.formRow}>
                <div className={styles.formGroup}>
                  <label className={styles.formLabel}>2. Buton Metni</label>
                  <input
                    type="text"
                    value={editingSlide.secondaryBtnText}
                    onChange={(e) =>
                      setEditingSlide({ ...editingSlide, secondaryBtnText: e.target.value })
                    }
                    className={styles.formInput}
                  />
                </div>
                <div className={styles.formGroup}>
                  <label className={styles.formLabel}>2. Buton Bağlantısı (Link)</label>
                  <input
                    type="text"
                    value={editingSlide.secondaryBtnLink}
                    onChange={(e) =>
                      setEditingSlide({ ...editingSlide, secondaryBtnLink: e.target.value })
                    }
                    className={styles.formInput}
                  />
                </div>
              </div>
            </div>

            <div
              style={{
                display: "flex",
                justifyContent: "flex-end",
                gap: "10px",
                marginTop: "24px",
                paddingTop: "16px",
                borderTop: "1px solid rgba(255,255,255,0.08)",
              }}
            >
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className={styles.btnSecondary}
              >
                Vazgeç
              </button>
              <button
                type="button"
                onClick={handleSaveModalSlide}
                className={styles.btnPrimary}
              >
                Tamam
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
