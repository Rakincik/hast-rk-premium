"use client";

import React, { useState } from "react";
import styles from "../admin.module.css";
import { useSiteContent } from "@/context/SiteContentContext";
import { useToast } from "@/components/admin/Toast";
import { ServiceItem } from "@/lib/types/content";
import {
  Wrench,
  Plus,
  Trash2,
  Edit,
  Save,
  CheckCircle2,
  X,
  Loader2,
  Building2,
  Brush,
  Hammer,
  Home,
  Construction,
  Paintbrush,
} from "lucide-react";

export default function AdminServicesPage() {
  const { content, updateSection } = useSiteContent();
  const { showToast } = useToast();

  const [services, setServices] = useState<ServiceItem[]>(content.services || []);
  const [editingService, setEditingService] = useState<ServiceItem | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newDeliverableInput, setNewDeliverableInput] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  const availableIcons = [
    { name: "Building2", label: "Tarihi Bina & Yapı", icon: <Building2 size={18} /> },
    { name: "Brush", label: "Fırça & Rölöve", icon: <Brush size={18} /> },
    { name: "Hammer", label: "Çekiç & Güçlendirme", icon: <Hammer size={18} /> },
    { name: "Home", label: "Konut & Tasarım", icon: <Home size={18} /> },
    { name: "Construction", label: "Şantiye & Taahhüt", icon: <Construction size={18} /> },
    { name: "Paintbrush", label: "Kalem İşi & Sanat", icon: <Paintbrush size={18} /> },
  ];

  const handleSaveAll = async () => {
    try {
      setIsSaving(true);
      const success = await updateSection("services", services);
      if (success) {
        showToast("Hizmetler başarıyla kaydedildi!", "success");
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
    const nextIdx = (services.length + 1).toString().padStart(2, "0");
    const nextId = services.length > 0 ? Math.max(...services.map((s) => s.id)) + 1 : 1;
    const newService: ServiceItem = {
      id: nextId,
      index: nextIdx,
      title: "Yeni Hizmet Başlığı",
      desc: "Hizmetin kapsamı ve müşteriye sağlanan faydaların özeti buraya yazılır.",
      iconName: "Building2",
      quoteType: "restoration",
      deliverables: ["Kültür Varlıklarını Koruma Kurulu onay dosyası", "Detaylı mimari rapor"],
    };
    setEditingService(newService);
    setIsModalOpen(true);
  };

  const handleEdit = (service: ServiceItem) => {
    setEditingService(JSON.parse(JSON.stringify(service)));
    setIsModalOpen(true);
  };

  const handleDelete = (id: number) => {
    if (confirm("Bu hizmeti silmek istediğinize emin misiniz?")) {
      const updated = services.filter((s) => s.id !== id);
      setServices(updated);
      showToast("Hizmet silindi. Yayına almak için Kaydet butonuna tıklayınız.", "info");
    }
  };

  const handleSaveModal = () => {
    if (!editingService) return;

    const exists = services.some((s) => s.id === editingService.id);
    let updated: ServiceItem[];
    if (exists) {
      updated = services.map((s) => (s.id === editingService.id ? editingService : s));
    } else {
      updated = [...services, editingService];
    }

    setServices(updated);
    setIsModalOpen(false);
    setEditingService(null);
    showToast("Hizmet güncellendi. 'Yayına Al & Kaydet' butonuna basarak kaydedin.", "info");
  };

  const handleAddDeliverable = () => {
    if (!newDeliverableInput.trim() || !editingService) return;
    setEditingService({
      ...editingService,
      deliverables: [...(editingService.deliverables || []), newDeliverableInput.trim()],
    });
    setNewDeliverableInput("");
  };

  const handleRemoveDeliverable = (index: number) => {
    if (!editingService) return;
    const updated = [...editingService.deliverables];
    updated.splice(index, 1);
    setEditingService({ ...editingService, deliverables: updated });
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
            Hizmetler Yönetimi (Services CMS)
          </h2>
          <p style={{ fontSize: "13px", color: "rgba(255,255,255,0.5)", margin: 0 }}>
            Hizmetler sayfasında ve anasayfada listelenen 6 ana mimari uzmanlık alanını düzenleyin.
          </p>
        </div>

        <div style={{ display: "flex", gap: "10px" }}>
          <button type="button" onClick={handleOpenAdd} className={styles.btnSecondary}>
            <Plus size={16} /> Yeni Hizmet Ekle
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

      {/* Services Grid */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(360px, 1fr))", gap: "20px" }}>
        {services.map((srv) => (
          <div key={srv.id} className={styles.card} style={{ marginBottom: 0, display: "flex", flexDirection: "column" }}>
            <div className={styles.cardHeader}>
              <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                <span
                  style={{
                    fontSize: "14px",
                    fontWeight: 700,
                    color: "#d4af37",
                    fontFamily: "var(--font-serif)",
                  }}
                >
                  {srv.index}
                </span>
                <h3 className={styles.cardTitle}>{srv.title}</h3>
              </div>

              <div style={{ display: "flex", gap: "6px" }}>
                <button
                  type="button"
                  onClick={() => handleEdit(srv)}
                  className={styles.btnSecondary}
                  style={{ padding: "6px 10px" }}
                >
                  <Edit size={14} />
                </button>
                <button
                  type="button"
                  onClick={() => handleDelete(srv.id)}
                  className={styles.btnDanger}
                  style={{ padding: "6px 10px" }}
                >
                  <Trash2 size={14} />
                </button>
              </div>
            </div>

            <p style={{ fontSize: "13px", color: "rgba(255,255,255,0.7)", lineHeight: "1.6", flex: 1, margin: "0 0 16px" }}>
              {srv.desc}
            </p>

            <div style={{ borderTop: "1px solid rgba(255,255,255,0.06)", paddingTop: "12px" }}>
              <div style={{ fontSize: "11.5px", color: "#d4af37", fontWeight: 600, marginBottom: "8px" }}>
                Teslim Edilecek Teknik Çıktılar:
              </div>
              <ul style={{ margin: 0, paddingLeft: "18px", color: "rgba(255,255,255,0.5)", fontSize: "12px" }}>
                {srv.deliverables?.map((d, dIdx) => (
                  <li key={dIdx} style={{ marginBottom: "4px" }}>
                    {d}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>

      {/* Edit Modal */}
      {isModalOpen && editingService && (
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
                Hizmeti Düzenle
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
                <div className={styles.formGroup} style={{ flex: 1 }}>
                  <label className={styles.formLabel}>Sıra No (Örn: 01)</label>
                  <input
                    type="text"
                    value={editingService.index}
                    onChange={(e) =>
                      setEditingService({ ...editingService, index: e.target.value })
                    }
                    className={styles.formInput}
                  />
                </div>

                <div className={styles.formGroup} style={{ flex: 3 }}>
                  <label className={styles.formLabel}>Hizmet Başlığı</label>
                  <input
                    type="text"
                    value={editingService.title}
                    onChange={(e) =>
                      setEditingService({ ...editingService, title: e.target.value })
                    }
                    className={styles.formInput}
                  />
                </div>
              </div>

              <div className={styles.formRow}>
                <div className={styles.formGroup}>
                  <label className={styles.formLabel}>İkon Türü</label>
                  <select
                    value={editingService.iconName}
                    onChange={(e) =>
                      setEditingService({ ...editingService, iconName: e.target.value })
                    }
                    className={styles.formSelect}
                  >
                    {availableIcons.map((ic) => (
                      <option key={ic.name} value={ic.name}>
                        {ic.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div className={styles.formGroup}>
                  <label className={styles.formLabel}>Teklif Sihirbazı Eşleşmesi</label>
                  <select
                    value={editingService.quoteType}
                    onChange={(e) =>
                      setEditingService({ ...editingService, quoteType: e.target.value })
                    }
                    className={styles.formSelect}
                  >
                    <option value="restoration">Restorasyon</option>
                    <option value="strengthening">Güçlendirme</option>
                    <option value="interior">İç Mimari</option>
                    <option value="turnkey">Taahhüt</option>
                  </select>
                </div>
              </div>

              <div className={styles.formGroup}>
                <label className={styles.formLabel}>Hizmet Detay Açıklaması</label>
                <textarea
                  rows={4}
                  value={editingService.desc}
                  onChange={(e) =>
                    setEditingService({ ...editingService, desc: e.target.value })
                  }
                  className={styles.formTextarea}
                />
              </div>

              {/* Deliverables */}
              <div className={styles.formGroup}>
                <label className={styles.formLabel}>Teslim Edilecek Teknik Çıktılar</label>
                <div style={{ display: "flex", gap: "8px", marginBottom: "10px" }}>
                  <input
                    type="text"
                    placeholder="Örn: Kültür Varlıklarını Koruma Bölge Kurulu onay dosyaları"
                    value={newDeliverableInput}
                    onChange={(e) => setNewDeliverableInput(e.target.value)}
                    className={styles.formInput}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        handleAddDeliverable();
                      }
                    }}
                  />
                  <button
                    type="button"
                    onClick={handleAddDeliverable}
                    className={styles.btnSecondary}
                  >
                    Ekle
                  </button>
                </div>

                <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                  {editingService.deliverables?.map((d, dIdx) => (
                    <div
                      key={dIdx}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        padding: "8px 12px",
                        borderRadius: "6px",
                        backgroundColor: "#09090d",
                        border: "1px solid rgba(255,255,255,0.08)",
                        fontSize: "13px",
                      }}
                    >
                      <span>{d}</span>
                      <button
                        type="button"
                        onClick={() => handleRemoveDeliverable(dIdx)}
                        style={{
                          background: "transparent",
                          border: "none",
                          color: "#ef4444",
                          cursor: "pointer",
                        }}
                      >
                        <X size={15} />
                      </button>
                    </div>
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
