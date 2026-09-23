"use client";

import React, { useState } from "react";
import styles from "../admin.module.css";
import { useSiteContent } from "@/context/SiteContentContext";
import { useToast } from "@/components/admin/Toast";
import { SingleImageDropzone } from "@/components/admin/ImageUploadDropzone";
import { SiteSettings, TestimonialItem } from "@/lib/types/content";
import {
  Settings,
  Save,
  Phone,
  Mail,
  MapPin,
  Globe,
  Share2,
  Shield,
  Star,
  Plus,
  Trash2,
  Edit,
  Loader2,
  X,
} from "lucide-react";

export default function AdminSettingsPage() {
  const { content, updateSection } = useSiteContent();
  const { showToast } = useToast();

  const [settings, setSettings] = useState<SiteSettings>(content.settings || {});
  const [testimonials, setTestimonials] = useState<TestimonialItem[]>(content.testimonials || []);
  const [isSaving, setIsSaving] = useState(false);

  const [editingTestimonial, setEditingTestimonial] = useState<TestimonialItem | null>(null);
  const [isTestimonialModalOpen, setIsTestimonialModalOpen] = useState(false);

  const handleSaveAll = async () => {
    try {
      setIsSaving(true);
      const sSuccess = await updateSection("settings", settings);
      const tSuccess = await updateSection("testimonials", testimonials);

      if (sSuccess && tSuccess) {
        showToast("Genel ayarlar ve SEO başarıyla güncellendi!", "success");
      } else {
        showToast("Kaydedilirken bir hata oluştu.", "error");
      }
    } catch {
      showToast("Sunucu hatası oluştu.", "error");
    } finally {
      setIsSaving(false);
    }
  };

  const handleOpenAddTestimonial = () => {
    const nextId = testimonials.length > 0 ? Math.max(...testimonials.map((t) => t.id)) + 1 : 1;
    setEditingTestimonial({
      id: nextId,
      name: "Müşteri Adı",
      role: "Mülk Sahibi",
      company: "Tarihi Yapı Sahibi",
      project: "Restorasyon Projesi",
      text: "Hastürk Sanat ve Mimarlık ekibine titiz ve dürüst yaklaşımları için teşekkür ederiz.",
      rating: 5,
    });
    setIsTestimonialModalOpen(true);
  };

  const handleEditTestimonial = (t: TestimonialItem) => {
    setEditingTestimonial({ ...t });
    setIsTestimonialModalOpen(true);
  };

  const handleDeleteTestimonial = (id: number) => {
    if (confirm("Bu yorumu silmek istediğinize emin misiniz?")) {
      const updated = testimonials.filter((t) => t.id !== id);
      setTestimonials(updated);
      showToast("Yorum silindi. Kaydet butonuna basmayı unutmayın.", "info");
    }
  };

  const handleSaveTestimonialModal = () => {
    if (!editingTestimonial) return;
    const exists = testimonials.some((t) => t.id === editingTestimonial.id);
    let updated: TestimonialItem[];
    if (exists) {
      updated = testimonials.map((t) => (t.id === editingTestimonial.id ? editingTestimonial : t));
    } else {
      updated = [...testimonials, editingTestimonial];
    }
    setTestimonials(updated);
    setIsTestimonialModalOpen(false);
    setEditingTestimonial(null);
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
            Genel Ayarlar, İletişim & SEO
          </h2>
          <p style={{ fontSize: "13px", color: "rgba(255,255,255,0.5)", margin: 0 }}>
            Telefon numaraları, WhatsApp hattı, şirket logoları, sosyal medya ve arama motoru (SEO) etiketleri.
          </p>
        </div>

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

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(420px, 1fr))", gap: "24px" }}>
        {/* Brand & Logos */}
        <div className={styles.card}>
          <div className={styles.cardHeader}>
            <div>
              <h3 className={styles.cardTitle}>
                <Shield size={18} color="#d4af37" /> Marka & Logo Ayarları
              </h3>
              <p className={styles.cardSubtitle}>Web sitesi başlığı ve resmi logolar</p>
            </div>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            <div className={styles.formGroup}>
              <label className={styles.formLabel}>Şirket Adı</label>
              <input
                type="text"
                value={settings.companyName || ""}
                onChange={(e) => setSettings({ ...settings, companyName: e.target.value })}
                className={styles.formInput}
              />
            </div>

            <div className={styles.formGroup}>
              <label className={styles.formLabel}>Kurumsal Slogan</label>
              <input
                type="text"
                value={settings.slogan || ""}
                onChange={(e) => setSettings({ ...settings, slogan: e.target.value })}
                className={styles.formInput}
              />
            </div>

            {/* Logo Gold */}
            <SingleImageDropzone
              label="Altın Vurgulu Logo (Header & Footer)"
              helperText="Şeffaf PNG veya SVG formatında altın detaylı logo dosyasını sürükleyip bırakın."
              value={settings.logos?.gold || ""}
              onChange={(url) =>
                setSettings({
                  ...settings,
                  logos: { ...settings.logos, gold: url },
                })
              }
              height="110px"
            />

            {/* Logo White */}
            <SingleImageDropzone
              label="Beyaz Logo"
              helperText="Şeffaf PNG veya SVG formatında beyaz alternatif logoyu sürükleyip bırakın."
              value={settings.logos?.white || ""}
              onChange={(url) =>
                setSettings({
                  ...settings,
                  logos: { ...settings.logos, white: url },
                })
              }
              height="110px"
            />
          </div>
        </div>

        {/* Contact Info */}
        <div className={styles.card}>
          <div className={styles.cardHeader}>
            <div>
              <h3 className={styles.cardTitle}>
                <Phone size={18} color="#d4af37" /> İletişim Kanalları
              </h3>
              <p className={styles.cardSubtitle}>Navbar, Footer ve İletişim sayfasında görünen bilgiler</p>
            </div>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            <div className={styles.formRow}>
              <div className={styles.formGroup}>
                <label className={styles.formLabel}>Telefon (Görünür Metin)</label>
                <input
                  type="text"
                  value={settings.phoneDisplay || ""}
                  onChange={(e) => setSettings({ ...settings, phoneDisplay: e.target.value })}
                  className={styles.formInput}
                  placeholder="0540 427 88 75"
                />
              </div>

              <div className={styles.formGroup}>
                <label className={styles.formLabel}>Telefon (Arama Linki)</label>
                <input
                  type="text"
                  value={settings.phone || ""}
                  onChange={(e) => setSettings({ ...settings, phone: e.target.value })}
                  className={styles.formInput}
                  placeholder="+90 540 427 88 75"
                />
              </div>
            </div>

            <div className={styles.formRow}>
              <div className={styles.formGroup}>
                <label className={styles.formLabel}>WhatsApp Numarası (Sadece rakam)</label>
                <input
                  type="text"
                  value={settings.whatsapp || ""}
                  onChange={(e) => setSettings({ ...settings, whatsapp: e.target.value })}
                  className={styles.formInput}
                  placeholder="905404278875"
                />
              </div>

              <div className={styles.formGroup}>
                <label className={styles.formLabel}>E-posta Adresi</label>
                <input
                  type="email"
                  value={settings.email || ""}
                  onChange={(e) => setSettings({ ...settings, email: e.target.value })}
                  className={styles.formInput}
                  placeholder="info@hasturksm.com"
                />
              </div>
            </div>

            <div className={styles.formGroup}>
              <label className={styles.formLabel}>Ofis / Şantiye Adresi</label>
              <input
                type="text"
                value={settings.address || ""}
                onChange={(e) => setSettings({ ...settings, address: e.target.value })}
                className={styles.formInput}
                placeholder="Tarihi Yarımada & Beyoğlu / İstanbul"
              />
            </div>

            <div className={styles.formGroup}>
              <label className={styles.formLabel}>Çalışma Saatleri</label>
              <input
                type="text"
                value={settings.workingHours || ""}
                onChange={(e) => setSettings({ ...settings, workingHours: e.target.value })}
                className={styles.formInput}
                placeholder="Pazartesi - Cumartesi: 09:00 - 19:00"
              />
            </div>
          </div>
        </div>

        {/* Social Media */}
        <div className={styles.card}>
          <div className={styles.cardHeader}>
            <div>
              <h3 className={styles.cardTitle}>
                <Share2 size={18} color="#d4af37" /> Sosyal Medya Bağlantıları
              </h3>
              <p className={styles.cardSubtitle}>Instagram, LinkedIn ve YouTube profilleri</p>
            </div>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            <div className={styles.formGroup}>
              <label className={styles.formLabel}>Instagram Profil Linki</label>
              <input
                type="text"
                value={settings.socials?.instagram || ""}
                onChange={(e) =>
                  setSettings({
                    ...settings,
                    socials: { ...settings.socials, instagram: e.target.value },
                  })
                }
                className={styles.formInput}
                placeholder="https://instagram.com/hasturksanatmimarlik"
              />
            </div>

            <div className={styles.formGroup}>
              <label className={styles.formLabel}>LinkedIn Profil Linki</label>
              <input
                type="text"
                value={settings.socials?.linkedin || ""}
                onChange={(e) =>
                  setSettings({
                    ...settings,
                    socials: { ...settings.socials, linkedin: e.target.value },
                  })
                }
                className={styles.formInput}
                placeholder="https://linkedin.com/company/hasturk-mimarlik"
              />
            </div>
          </div>
        </div>

        {/* SEO Meta */}
        <div className={styles.card}>
          <div className={styles.cardHeader}>
            <div>
              <h3 className={styles.cardTitle}>
                <Globe size={18} color="#d4af37" /> Arama Motoru Optimizasyonu (SEO)
              </h3>
              <p className={styles.cardSubtitle}>Google arama sonuçlarında görünen meta etiketleri</p>
            </div>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            <div className={styles.formGroup}>
              <label className={styles.formLabel}>Sayfa Başlığı (Meta Title)</label>
              <input
                type="text"
                value={settings.meta?.title || ""}
                onChange={(e) =>
                  setSettings({
                    ...settings,
                    meta: { ...settings.meta, title: e.target.value },
                  })
                }
                className={styles.formInput}
              />
            </div>

            <div className={styles.formGroup}>
              <label className={styles.formLabel}>Açıklama (Meta Description)</label>
              <textarea
                rows={3}
                value={settings.meta?.description || ""}
                onChange={(e) =>
                  setSettings({
                    ...settings,
                    meta: { ...settings.meta, description: e.target.value },
                  })
                }
                className={styles.formTextarea}
              />
            </div>

            <div className={styles.formGroup}>
              <label className={styles.formLabel}>Anahtar Kelimeler (Virgülle ayrılmış)</label>
              <input
                type="text"
                value={settings.meta?.keywords || ""}
                onChange={(e) =>
                  setSettings({
                    ...settings,
                    meta: { ...settings.meta, keywords: e.target.value },
                  })
                }
                className={styles.formInput}
              />
            </div>

            <SingleImageDropzone
              label="Sosyal Medya Önizleme Görseli (OG Image)"
              helperText="WhatsApp, LinkedIn, Twitter paylaşımlarında çıkan 1200x630 kapak görseli."
              value={settings.meta?.ogImage || ""}
              onChange={(url) =>
                setSettings({
                  ...settings,
                  meta: { ...settings.meta, ogImage: url },
                })
              }
              height="140px"
            />
          </div>
        </div>
      </div>

      {/* Testimonials Management Card */}
      <div className={styles.card}>
        <div className={styles.cardHeader}>
          <div>
            <h3 className={styles.cardTitle}>
              <Star size={18} color="#d4af37" /> Müşteri Yorumları & Referanslar ({testimonials.length})
            </h3>
            <p className={styles.cardSubtitle}>
              Anasayfada yer alan mülk sahibi ve kurumsal referans yorumları
            </p>
          </div>
          <button type="button" onClick={handleOpenAddTestimonial} className={styles.btnSecondary}>
            <Plus size={15} /> Yeni Yorum Ekle
          </button>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "16px" }}>
          {testimonials.map((t) => (
            <div
              key={t.id}
              style={{
                padding: "16px",
                borderRadius: "10px",
                backgroundColor: "#09090d",
                border: "1px solid rgba(255,255,255,0.06)",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
              }}
            >
              <div>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "8px" }}>
                  <div>
                    <h4 style={{ margin: "0 0 2px", fontSize: "14px", color: "#fff" }}>{t.name}</h4>
                    <span style={{ fontSize: "12px", color: "#d4af37" }}>
                      {t.role} · {t.company}
                    </span>
                  </div>
                  <div style={{ display: "flex", gap: "2px" }}>
                    {[...Array(t.rating || 5)].map((_, i) => (
                      <Star key={i} size={13} fill="#d4af37" color="#d4af37" />
                    ))}
                  </div>
                </div>
                <p style={{ fontSize: "13px", color: "rgba(255,255,255,0.7)", fontStyle: "italic", margin: "10px 0" }}>
                  "{t.text}"
                </p>
                <div style={{ fontSize: "11px", color: "rgba(255,255,255,0.4)" }}>
                  Proje: {t.project}
                </div>
              </div>

              <div style={{ display: "flex", justifyContent: "flex-end", gap: "6px", marginTop: "14px" }}>
                <button
                  type="button"
                  onClick={() => handleEditTestimonial(t)}
                  className={styles.btnSecondary}
                  style={{ padding: "4px 10px", fontSize: "12px" }}
                >
                  <Edit size={12} /> Düzenle
                </button>
                <button
                  type="button"
                  onClick={() => handleDeleteTestimonial(t.id)}
                  className={styles.btnDanger}
                  style={{ padding: "4px 8px", fontSize: "12px" }}
                >
                  <Trash2 size={12} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Testimonial Modal */}
      {isTestimonialModalOpen && editingTestimonial && (
        <div className={styles.modalBackdrop}>
          <div className={styles.modalContent} style={{ maxWidth: "560px" }}>
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
                Müşteri Yorumunu Düzenle
              </h3>
              <button
                type="button"
                onClick={() => setIsTestimonialModalOpen(false)}
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

            <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
              <div className={styles.formRow}>
                <div className={styles.formGroup}>
                  <label className={styles.formLabel}>Müşteri / Kurum Adı</label>
                  <input
                    type="text"
                    value={editingTestimonial.name}
                    onChange={(e) =>
                      setEditingTestimonial({ ...editingTestimonial, name: e.target.value })
                    }
                    className={styles.formInput}
                  />
                </div>
                <div className={styles.formGroup}>
                  <label className={styles.formLabel}>Unvan / Şirket</label>
                  <input
                    type="text"
                    value={editingTestimonial.role}
                    onChange={(e) =>
                      setEditingTestimonial({ ...editingTestimonial, role: e.target.value })
                    }
                    className={styles.formInput}
                  />
                </div>
              </div>

              <div className={styles.formGroup}>
                <label className={styles.formLabel}>Referans Projesi</label>
                <input
                  type="text"
                  value={editingTestimonial.project}
                  onChange={(e) =>
                    setEditingTestimonial({ ...editingTestimonial, project: e.target.value })
                  }
                  className={styles.formInput}
                  placeholder="Örn: Beyoğlu Tescilli Levanten Binası Restorasyonu"
                />
              </div>

              <div className={styles.formGroup}>
                <label className={styles.formLabel}>Yorum Metni</label>
                <textarea
                  rows={4}
                  value={editingTestimonial.text}
                  onChange={(e) =>
                    setEditingTestimonial({ ...editingTestimonial, text: e.target.value })
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
                marginTop: "20px",
                paddingTop: "14px",
                borderTop: "1px solid rgba(255,255,255,0.08)",
              }}
            >
              <button
                type="button"
                onClick={() => setIsTestimonialModalOpen(false)}
                className={styles.btnSecondary}
              >
                Vazgeç
              </button>
              <button
                type="button"
                onClick={handleSaveTestimonialModal}
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
