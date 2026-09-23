"use client";

import React, { useState } from "react";
import styles from "../admin.module.css";
import { useSiteContent } from "@/context/SiteContentContext";
import { useToast } from "@/components/admin/Toast";
import MediaPickerModal from "@/components/admin/MediaPickerModal";
import { ArticleItem } from "@/lib/types/content";
import {
  BookOpen,
  Plus,
  Trash2,
  Edit,
  Save,
  Image as ImageIcon,
  CheckCircle2,
  X,
  Loader2,
  Calendar,
  Clock,
} from "lucide-react";

export default function AdminJournalPage() {
  const { content, updateSection } = useSiteContent();
  const { showToast } = useToast();

  const [articles, setArticles] = useState<ArticleItem[]>(content.articles || []);
  const [editingArticle, setEditingArticle] = useState<ArticleItem | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [mediaPickerOpen, setMediaPickerOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const handleSaveAll = async () => {
    try {
      setIsSaving(true);
      const success = await updateSection("articles", articles);
      if (success) {
        showToast("Journal makaleleri başarıyla kaydedildi!", "success");
      } else {
        showToast("Kaydedilirken hata oluştu.", "error");
      }
    } catch {
      showToast("Sunucu hatası oluştu.", "error");
    } finally {
      setIsSaving(false);
    }
  };

  const handleOpenAdd = () => {
    const nextId = articles.length > 0 ? Math.max(...articles.map((a) => a.id)) + 1 : 1;
    const newArticle: ArticleItem = {
      id: nextId,
      title: "Yeni Mimari Makale Başlığı",
      category: "Restorasyon Bilimi",
      readTime: "5 dk okuma",
      date: "Eylül 2026",
      excerpt: "Makale özeti ve önemli mimari araştırma bulguları buraya yazılır.",
      image: "/projects/taksim-360/IMG_2860.JPG",
    };
    setEditingArticle(newArticle);
    setIsModalOpen(true);
  };

  const handleEdit = (article: ArticleItem) => {
    setEditingArticle(JSON.parse(JSON.stringify(article)));
    setIsModalOpen(true);
  };

  const handleDelete = (id: number) => {
    if (confirm("Bu makaleyi silmek istediğinize emin misiniz?")) {
      const updated = articles.filter((a) => a.id !== id);
      setArticles(updated);
      showToast("Makale silindi. Yayına almak için Kaydet butonuna tıklayınız.", "info");
    }
  };

  const handleSaveModal = () => {
    if (!editingArticle) return;

    const exists = articles.some((a) => a.id === editingArticle.id);
    let updated: ArticleItem[];
    if (exists) {
      updated = articles.map((a) => (a.id === editingArticle.id ? editingArticle : a));
    } else {
      updated = [editingArticle, ...articles];
    }

    setArticles(updated);
    setIsModalOpen(false);
    setEditingArticle(null);
    showToast("Makale listesi güncellendi. 'Yayına Al & Kaydet' butonuna basarak kaydedin.", "info");
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
            Mimari Journal & Makale Yönetimi
          </h2>
          <p style={{ fontSize: "13px", color: "rgba(255,255,255,0.5)", margin: 0 }}>
            Anasayfadaki 'Mimari Journal' köşesinde yer alan makaleleri, kapak fotoğraflarını ve özetlerini düzenleyin.
          </p>
        </div>

        <div style={{ display: "flex", gap: "10px" }}>
          <button type="button" onClick={handleOpenAdd} className={styles.btnSecondary}>
            <Plus size={16} /> Yeni Makale Ekle
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

      {/* Articles Grid */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(340px, 1fr))", gap: "20px" }}>
        {articles.map((art) => (
          <div key={art.id} className={styles.card} style={{ marginBottom: 0, padding: "20px", display: "flex", flexDirection: "column" }}>
            <div
              style={{
                height: "170px",
                borderRadius: "10px",
                overflow: "hidden",
                marginBottom: "14px",
                border: "1px solid rgba(255,255,255,0.08)",
              }}
            >
              <img
                src={art.image}
                alt={art.title}
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
            </div>

            <div style={{ display: "flex", gap: "10px", alignItems: "center", marginBottom: "8px", fontSize: "11.5px" }}>
              <span
                style={{
                  padding: "3px 8px",
                  borderRadius: "4px",
                  backgroundColor: "rgba(212, 175, 55, 0.15)",
                  color: "#d4af37",
                  fontWeight: 600,
                }}
              >
                {art.category}
              </span>
              <span style={{ color: "rgba(255,255,255,0.4)" }}>· {art.date}</span>
              <span style={{ color: "rgba(255,255,255,0.4)" }}>· {art.readTime}</span>
            </div>

            <h3 style={{ fontSize: "15px", fontWeight: 600, color: "#fff", margin: "0 0 8px", lineHeight: "1.4" }}>
              {art.title}
            </h3>

            <p style={{ fontSize: "13px", color: "rgba(255,255,255,0.6)", lineHeight: "1.6", margin: "0 0 16px", flex: 1 }}>
              {art.excerpt}
            </p>

            <div style={{ display: "flex", justifyContent: "flex-end", gap: "8px", borderTop: "1px solid rgba(255,255,255,0.06)", paddingTop: "12px" }}>
              <button
                type="button"
                onClick={() => handleEdit(art)}
                className={styles.btnSecondary}
                style={{ padding: "6px 12px", fontSize: "12px" }}
              >
                <Edit size={13} /> Düzenle
              </button>
              <button
                type="button"
                onClick={() => handleDelete(art.id)}
                className={styles.btnDanger}
                style={{ padding: "6px 10px", fontSize: "12px" }}
              >
                <Trash2 size={13} />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Edit Modal */}
      {isModalOpen && editingArticle && (
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
                Makaleyi Düzenle
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
              <div className={styles.formGroup}>
                <label className={styles.formLabel}>Makale Başlığı</label>
                <input
                  type="text"
                  value={editingArticle.title}
                  onChange={(e) =>
                    setEditingArticle({ ...editingArticle, title: e.target.value })
                  }
                  className={styles.formInput}
                />
              </div>

              <div className={styles.formRow}>
                <div className={styles.formGroup}>
                  <label className={styles.formLabel}>Kategori</label>
                  <input
                    type="text"
                    value={editingArticle.category}
                    onChange={(e) =>
                      setEditingArticle({ ...editingArticle, category: e.target.value })
                    }
                    className={styles.formInput}
                    placeholder="Örn: Restorasyon Bilimi"
                  />
                </div>

                <div className={styles.formGroup}>
                  <label className={styles.formLabel}>Yayın Tarihi</label>
                  <input
                    type="text"
                    value={editingArticle.date}
                    onChange={(e) =>
                      setEditingArticle({ ...editingArticle, date: e.target.value })
                    }
                    className={styles.formInput}
                    placeholder="Eylül 2026"
                  />
                </div>

                <div className={styles.formGroup}>
                  <label className={styles.formLabel}>Okuma Süresi</label>
                  <input
                    type="text"
                    value={editingArticle.readTime}
                    onChange={(e) =>
                      setEditingArticle({ ...editingArticle, readTime: e.target.value })
                    }
                    className={styles.formInput}
                    placeholder="5 dk okuma"
                  />
                </div>
              </div>

              {/* Cover Image */}
              <div className={styles.formGroup}>
                <label className={styles.formLabel}>Kapak Görseli</label>
                <div className={styles.imagePickerGroup}>
                  <img
                    src={editingArticle.image}
                    alt={editingArticle.title}
                    className={styles.imageThumb}
                  />
                  <div style={{ flex: 1 }}>
                    <input
                      type="text"
                      value={editingArticle.image}
                      onChange={(e) =>
                        setEditingArticle({ ...editingArticle, image: e.target.value })
                      }
                      className={styles.formInput}
                      style={{ marginBottom: "8px" }}
                    />
                    <button
                      type="button"
                      onClick={() => setMediaPickerOpen(true)}
                      className={styles.btnSecondary}
                    >
                      <ImageIcon size={15} /> Kapak Görseli Seç / Yükle
                    </button>
                  </div>
                </div>
              </div>

              <div className={styles.formGroup}>
                <label className={styles.formLabel}>Özet (Excerpt)</label>
                <textarea
                  rows={3}
                  value={editingArticle.excerpt}
                  onChange={(e) =>
                    setEditingArticle({ ...editingArticle, excerpt: e.target.value })
                  }
                  className={styles.formTextarea}
                />
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
                onClick={handleSaveModal}
                className={styles.btnPrimary}
              >
                Tamam
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Media Picker */}
      <MediaPickerModal
        isOpen={mediaPickerOpen}
        onClose={() => setMediaPickerOpen(false)}
        currentValue={editingArticle?.image || ""}
        onSelect={(url) => {
          if (editingArticle) {
            setEditingArticle({ ...editingArticle, image: url });
          }
        }}
      />
    </div>
  );
}
