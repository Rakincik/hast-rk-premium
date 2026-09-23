"use client";

import React, { useState } from "react";
import styles from "../admin.module.css";
import { useSiteContent } from "@/context/SiteContentContext";
import { useToast } from "@/components/admin/Toast";
import { SingleImageDropzone } from "@/components/admin/ImageUploadDropzone";
import { BeforeAfterItem } from "@/lib/types/content";
import {
  ArrowLeftRight,
  Plus,
  Trash2,
  Edit,
  Save,
  CheckCircle2,
  X,
  Loader2,
} from "lucide-react";

export default function AdminBeforeAfterPage() {
  const { content, updateSection } = useSiteContent();
  const { showToast } = useToast();

  const [items, setItems] = useState<BeforeAfterItem[]>(content.beforeAfter || []);
  const [editingItem, setEditingItem] = useState<BeforeAfterItem | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newTechniqueInput, setNewTechniqueInput] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  const handleSaveAll = async () => {
    try {
      setIsSaving(true);
      const success = await updateSection("beforeAfter", items);
      if (success) {
        showToast("Öncesi/Sonrası karşılaştırmaları başarıyla kaydedildi!", "success");
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
    const newItem: BeforeAfterItem = {
      id: `ba-${Date.now()}`,
      tabLabel: "Yeni Karşılaştırma",
      title: "Tarihi Yapı Restorasyon Öncesi & Sonrası",
      location: "Tarihi Yarımada / İstanbul",
      status: "Tescilli Kültür Varlığı",
      techniques: ["Tescilli Cephe Restorasyonu", "Özgün Malzeme Konservasyonu"],
      beforeImage: "/projects/karma-isler/IMG-20231010-WA0025.JPG",
      afterImage: "/projects/taksim-360/IMG_2860.JPG",
      quoteType: "restoration",
    };
    setEditingItem(newItem);
    setIsModalOpen(true);
  };

  const handleEdit = (item: BeforeAfterItem) => {
    setEditingItem(JSON.parse(JSON.stringify(item)));
    setIsModalOpen(true);
  };

  const handleDelete = (id: string) => {
    if (confirm("Bu öncesi/sonrası kartını silmek istediğinize emin misiniz?")) {
      const updated = items.filter((i) => i.id !== id);
      setItems(updated);
      showToast("Kart silindi. Değişiklikleri yayına almak için Kaydet butonuna tıklayınız.", "info");
    }
  };

  const handleSaveModal = () => {
    if (!editingItem) return;

    const exists = items.some((i) => i.id === editingItem.id);
    let updated: BeforeAfterItem[];
    if (exists) {
      updated = items.map((i) => (i.id === editingItem.id ? editingItem : i));
    } else {
      updated = [...items, editingItem];
    }

    setItems(updated);
    setIsModalOpen(false);
    setEditingItem(null);
    showToast("Kart güncellendi. Yayına Al butonuna basarak kaydedin.", "info");
  };

  const handleAddTechnique = () => {
    if (!newTechniqueInput.trim() || !editingItem) return;
    setEditingItem({
      ...editingItem,
      techniques: [...(editingItem.techniques || []), newTechniqueInput.trim()],
    });
    setNewTechniqueInput("");
  };

  const handleRemoveTechnique = (index: number) => {
    if (!editingItem) return;
    const updated = [...editingItem.techniques];
    updated.splice(index, 1);
    setEditingItem({ ...editingItem, techniques: updated });
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
            Öncesi / Sonrası (Before & After) Yönetimi
          </h2>
          <p style={{ fontSize: "13px", color: "rgba(255,255,255,0.5)", margin: 0 }}>
            Anasayfadaki interaktif karşılaştırma kaydırıcısının fotoğraflarını ve restorasyon bilgilerini düzenleyin.
          </p>
        </div>

        <div style={{ display: "flex", gap: "10px" }}>
          <button type="button" onClick={handleOpenAdd} className={styles.btnSecondary}>
            <Plus size={16} /> Yeni Karşılaştırma Ekle
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

      {/* Cards List */}
      <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
        {items.map((item, idx) => (
          <div key={item.id} className={styles.card} style={{ marginBottom: 0 }}>
            <div className={styles.cardHeader}>
              <div>
                <span
                  style={{
                    fontSize: "11px",
                    fontWeight: 700,
                    color: "#d4af37",
                    textTransform: "uppercase",
                    letterSpacing: "1px",
                  }}
                >
                  Sekme #{idx + 1}: {item.tabLabel}
                </span>
                <h3 className={styles.cardTitle} style={{ marginTop: "4px" }}>
                  {item.title}
                </h3>
                <p className={styles.cardSubtitle}>
                  📍 {item.location} · {item.status}
                </p>
              </div>

              <div style={{ display: "flex", gap: "8px" }}>
                <button
                  type="button"
                  onClick={() => handleEdit(item)}
                  className={styles.btnSecondary}
                  style={{ padding: "6px 12px" }}
                >
                  <Edit size={14} /> Düzenle
                </button>
                <button
                  type="button"
                  onClick={() => handleDelete(item.id)}
                  className={styles.btnDanger}
                  style={{ padding: "6px 12px" }}
                >
                  <Trash2 size={14} />
                </button>
              </div>
            </div>

            {/* Visual Comparison Preview */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px", marginBottom: "16px" }}>
              <div>
                <div style={{ fontSize: "12px", color: "rgba(255,255,255,0.6)", marginBottom: "6px", fontWeight: 600 }}>
                  🔴 Restorasyon Öncesi
                </div>
                <div
                  style={{
                    height: "180px",
                    borderRadius: "10px",
                    overflow: "hidden",
                    border: "1px solid rgba(255,255,255,0.1)",
                    backgroundColor: "#000",
                  }}
                >
                  <img
                    src={item.beforeImage}
                    alt="Before"
                    style={{ width: "100%", height: "100%", objectFit: "cover" }}
                  />
                </div>
              </div>

              <div>
                <div style={{ fontSize: "12px", color: "#d4af37", marginBottom: "6px", fontWeight: 600 }}>
                  🟢 Restorasyon Sonrası
                </div>
                <div
                  style={{
                    height: "180px",
                    borderRadius: "10px",
                    overflow: "hidden",
                    border: "1px solid rgba(212, 175, 55, 0.3)",
                    backgroundColor: "#000",
                  }}
                >
                  <img
                    src={item.afterImage}
                    alt="After"
                    style={{ width: "100%", height: "100%", objectFit: "cover" }}
                  />
                </div>
              </div>
            </div>

            {/* Techniques */}
            <div>
              <div style={{ fontSize: "12px", color: "rgba(255,255,255,0.5)", marginBottom: "6px" }}>
                Uygulanan Teknikler:
              </div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
                {item.techniques?.map((t, tIdx) => (
                  <span
                    key={tIdx}
                    style={{
                      padding: "4px 8px",
                      borderRadius: "4px",
                      backgroundColor: "rgba(255,255,255,0.06)",
                      color: "#cbd5e1",
                      fontSize: "11.5px",
                    }}
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Edit Modal */}
      {isModalOpen && editingItem && (
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
                Öncesi / Sonrası Karşılaştırmasını Düzenle
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
                  <label className={styles.formLabel}>Sekme Buton Başlığı</label>
                  <input
                    type="text"
                    value={editingItem.tabLabel}
                    onChange={(e) =>
                      setEditingItem({ ...editingItem, tabLabel: e.target.value })
                    }
                    className={styles.formInput}
                    placeholder="Örn: Taksim 360 Restorasyon"
                  />
                </div>

                <div className={styles.formGroup}>
                  <label className={styles.formLabel}>Tescil / Statü</label>
                  <input
                    type="text"
                    value={editingItem.status}
                    onChange={(e) =>
                      setEditingItem({ ...editingItem, status: e.target.value })
                    }
                    className={styles.formInput}
                    placeholder="Örn: 1. Grup Tescilli Anıt Eser"
                  />
                </div>
              </div>

              <div className={styles.formRow}>
                <div className={styles.formGroup}>
                  <label className={styles.formLabel}>Tam Başlık</label>
                  <input
                    type="text"
                    value={editingItem.title}
                    onChange={(e) =>
                      setEditingItem({ ...editingItem, title: e.target.value })
                    }
                    className={styles.formInput}
                  />
                </div>

                <div className={styles.formGroup}>
                  <label className={styles.formLabel}>Konum / Lokasyon</label>
                  <input
                    type="text"
                    value={editingItem.location}
                    onChange={(e) =>
                      setEditingItem({ ...editingItem, location: e.target.value })
                    }
                    className={styles.formInput}
                  />
                </div>
              </div>

              {/* Before & After Image Dropzones */}
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "16px" }}>
                <SingleImageDropzone
                  label="🔴 Restorasyon Öncesi Fotoğrafı"
                  helperText="Restorasyon öncesi durumu gösteren görseli sürükleyip bırakın."
                  value={editingItem.beforeImage}
                  onChange={(url) => setEditingItem({ ...editingItem, beforeImage: url })}
                  height="170px"
                />

                <SingleImageDropzone
                  label="🟢 Restorasyon Sonrası Fotoğrafı"
                  helperText="Tamamlanan restorasyon sonucunu gösteren görseli sürükleyip bırakın."
                  value={editingItem.afterImage}
                  onChange={(url) => setEditingItem({ ...editingItem, afterImage: url })}
                  height="170px"
                />
              </div>

              {/* Techniques List */}
              <div className={styles.formGroup}>
                <label className={styles.formLabel}>Restorasyon Teknikleri Lejantı</label>
                <div style={{ display: "flex", gap: "8px", marginBottom: "10px" }}>
                  <input
                    type="text"
                    placeholder="Örn: Yüksek İrtifa Güvenlikli İskele"
                    value={newTechniqueInput}
                    onChange={(e) => setNewTechniqueInput(e.target.value)}
                    className={styles.formInput}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        handleAddTechnique();
                      }
                    }}
                  />
                  <button
                    type="button"
                    onClick={handleAddTechnique}
                    className={styles.btnSecondary}
                  >
                    Ekle
                  </button>
                </div>

                <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
                  {editingItem.techniques?.map((tech, tIdx) => (
                    <span
                      key={tIdx}
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "6px",
                        padding: "5px 10px",
                        borderRadius: "6px",
                        backgroundColor: "rgba(212, 175, 55, 0.12)",
                        border: "1px solid rgba(212, 175, 55, 0.25)",
                        color: "#e2e8f0",
                        fontSize: "12px",
                      }}
                    >
                      {tech}
                      <button
                        type="button"
                        onClick={() => handleRemoveTechnique(tIdx)}
                        style={{
                          background: "transparent",
                          border: "none",
                          color: "#ef4444",
                          cursor: "pointer",
                          padding: 0,
                        }}
                      >
                        <X size={13} />
                      </button>
                    </span>
                  ))}
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
                onClick={handleSaveModal}
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
