"use client";

import React, { useState } from "react";
import styles from "../admin.module.css";
import { useSiteContent } from "@/context/SiteContentContext";
import { useToast } from "@/components/admin/Toast";
import { FaqItem } from "@/lib/types/content";
import {
  HelpCircle,
  Plus,
  Trash2,
  Edit,
  Save,
  CheckCircle2,
  X,
  Loader2,
  ChevronDown,
} from "lucide-react";

export default function AdminFaqPage() {
  const { content, updateSection } = useSiteContent();
  const { showToast } = useToast();

  const [faq, setFaq] = useState<FaqItem[]>(content.faq || []);
  const [editingFaq, setEditingFaq] = useState<FaqItem | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const handleSaveAll = async () => {
    try {
      setIsSaving(true);
      const success = await updateSection("faq", faq);
      if (success) {
        showToast("Sıkça Sorulan Sorular başarıyla kaydedildi!", "success");
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
    const nextId = faq.length > 0 ? Math.max(...faq.map((f) => f.id)) + 1 : 1;
    const newItem: FaqItem = {
      id: nextId,
      question: "Yeni Soru Metni?",
      answer: "Bu sorunun detaylı ve aydınlatıcı mimari/hukuki cevabı buraya yazılır.",
      category: "Genel",
    };
    setEditingFaq(newItem);
    setIsModalOpen(true);
  };

  const handleEdit = (item: FaqItem) => {
    setEditingFaq(JSON.parse(JSON.stringify(item)));
    setIsModalOpen(true);
  };

  const handleDelete = (id: number) => {
    if (confirm("Bu soruyu silmek istediğinize emin misiniz?")) {
      const updated = faq.filter((f) => f.id !== id);
      setFaq(updated);
      showToast("Soru silindi. Yayına almak için Kaydet butonuna tıklayınız.", "info");
    }
  };

  const handleSaveModal = () => {
    if (!editingFaq) return;

    const exists = faq.some((f) => f.id === editingFaq.id);
    let updated: FaqItem[];
    if (exists) {
      updated = faq.map((f) => (f.id === editingFaq.id ? editingFaq : f));
    } else {
      updated = [...faq, editingFaq];
    }

    setFaq(updated);
    setIsModalOpen(false);
    setEditingFaq(null);
    showToast("Soru listesi güncellendi. Yayına Al butonuna basarak kaydedin.", "info");
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
            Sıkça Sorulan Sorular (FAQ CMS)
          </h2>
          <p style={{ fontSize: "13px", color: "rgba(255,255,255,0.5)", margin: 0 }}>
            Anasayfada yer alan Anıtlar Kurulu, tescil dereceleri ve restorasyon maliyetleri gibi sıkça sorulan soruları düzenleyin.
          </p>
        </div>

        <div style={{ display: "flex", gap: "10px" }}>
          <button type="button" onClick={handleOpenAdd} className={styles.btnSecondary}>
            <Plus size={16} /> Yeni Soru Ekle
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

      {/* FAQ Accordion List */}
      <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
        {faq.map((item, idx) => (
          <div key={item.id} className={styles.card} style={{ marginBottom: 0, padding: "18px 22px" }}>
            <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: "16px" }}>
              <div style={{ flex: 1 }}>
                <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "6px" }}>
                  <span
                    style={{
                      fontSize: "11px",
                      fontWeight: 700,
                      color: "#d4af37",
                      backgroundColor: "rgba(212, 175, 55, 0.12)",
                      padding: "2px 8px",
                      borderRadius: "4px",
                    }}
                  >
                    #{idx + 1} {item.category || "Genel"}
                  </span>
                </div>
                <h4 style={{ fontSize: "15px", fontWeight: 600, color: "#fff", margin: "0 0 8px" }}>
                  {item.question}
                </h4>
                <p style={{ fontSize: "13px", color: "rgba(255,255,255,0.65)", lineHeight: "1.6", margin: 0 }}>
                  {item.answer}
                </p>
              </div>

              <div style={{ display: "flex", gap: "6px", flexShrink: 0 }}>
                <button
                  type="button"
                  onClick={() => handleEdit(item)}
                  className={styles.btnSecondary}
                  style={{ padding: "6px 10px", fontSize: "12px" }}
                >
                  <Edit size={13} /> Düzenle
                </button>
                <button
                  type="button"
                  onClick={() => handleDelete(item.id)}
                  className={styles.btnDanger}
                  style={{ padding: "6px 10px", fontSize: "12px" }}
                >
                  <Trash2 size={13} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Edit Modal */}
      {isModalOpen && editingFaq && (
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
                Soruyu Düzenle
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
                <div className={styles.formGroup} style={{ flex: 3 }}>
                  <label className={styles.formLabel}>Soru Cümlesi</label>
                  <input
                    type="text"
                    value={editingFaq.question}
                    onChange={(e) =>
                      setEditingFaq({ ...editingFaq, question: e.target.value })
                    }
                    className={styles.formInput}
                  />
                </div>

                <div className={styles.formGroup} style={{ flex: 1 }}>
                  <label className={styles.formLabel}>Kategori / Etiket</label>
                  <input
                    type="text"
                    value={editingFaq.category || ""}
                    onChange={(e) =>
                      setEditingFaq({ ...editingFaq, category: e.target.value })
                    }
                    className={styles.formInput}
                    placeholder="Mevzuat & Tescil"
                  />
                </div>
              </div>

              <div className={styles.formGroup}>
                <label className={styles.formLabel}>Cevap Açıklaması</label>
                <textarea
                  rows={5}
                  value={editingFaq.answer}
                  onChange={(e) =>
                    setEditingFaq({ ...editingFaq, answer: e.target.value })
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
    </div>
  );
}
