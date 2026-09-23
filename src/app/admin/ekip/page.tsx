"use client";

import React, { useState } from "react";
import styles from "../admin.module.css";
import { useSiteContent } from "@/context/SiteContentContext";
import { useToast } from "@/components/admin/Toast";
import { SingleImageDropzone } from "@/components/admin/ImageUploadDropzone";
import { TeamMember } from "@/lib/types/content";
import {
  Users,
  Plus,
  Trash2,
  Edit,
  Save,
  CheckCircle2,
  X,
  Loader2,
  Mail,
} from "lucide-react";

export default function AdminTeamPage() {
  const { content, updateSection } = useSiteContent();
  const { showToast } = useToast();

  const [team, setTeam] = useState<TeamMember[]>(content.team || []);
  const [editingMember, setEditingMember] = useState<TeamMember | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const handleSaveAll = async () => {
    try {
      setIsSaving(true);
      const success = await updateSection("team", team);
      if (success) {
        showToast("Ekip kadrosu başarıyla kaydedildi!", "success");
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
    const nextId = team.length > 0 ? Math.max(...team.map((m) => m.id)) + 1 : 1;
    const newMember: TeamMember = {
      id: nextId,
      name: "Yeni Ekip Üyesi",
      role: "Mimar / Restoratör",
      email: "info@hasturksm.com",
      image: "https://static.wixstatic.com/media/4bb5c9_41a37e2d629b45c59b8e07b08500df6c~mv2.png",
    };
    setEditingMember(newMember);
    setIsModalOpen(true);
  };

  const handleEdit = (member: TeamMember) => {
    setEditingMember(JSON.parse(JSON.stringify(member)));
    setIsModalOpen(true);
  };

  const handleDelete = (id: number) => {
    if (confirm("Bu ekip üyesini silmek istediğinize emin misiniz?")) {
      const updated = team.filter((m) => m.id !== id);
      setTeam(updated);
      showToast("Ekip üyesi silindi. Yayına almak için Kaydet butonuna tıklayınız.", "info");
    }
  };

  const handleSaveModal = () => {
    if (!editingMember) return;

    const exists = team.some((m) => m.id === editingMember.id);
    let updated: TeamMember[];
    if (exists) {
      updated = team.map((m) => (m.id === editingMember.id ? editingMember : m));
    } else {
      updated = [...team, editingMember];
    }

    setTeam(updated);
    setIsModalOpen(false);
    setEditingMember(null);
    showToast("Ekip listesi güncellendi. Yayına Al butonuna basarak kaydedin.", "info");
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
            Ekip Kadrosu Yönetimi (Team CMS)
          </h2>
          <p style={{ fontSize: "13px", color: "rgba(255,255,255,0.5)", margin: 0 }}>
            Web sitesinde 'Ekibimiz' sayfasında yer alan mimarları, mühendisleri ve danışmanları yönetin.
          </p>
        </div>

        <div style={{ display: "flex", gap: "10px" }}>
          <button type="button" onClick={handleOpenAdd} className={styles.btnSecondary}>
            <Plus size={16} /> Yeni Ekip Üyesi Ekle
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

      {/* Team Grid */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "20px" }}>
        {team.map((member) => (
          <div key={member.id} className={styles.card} style={{ marginBottom: 0, padding: "20px" }}>
            <div style={{ display: "flex", gap: "16px", alignItems: "center", marginBottom: "16px" }}>
              <div
                style={{
                  width: "70px",
                  height: "70px",
                  borderRadius: "12px",
                  overflow: "hidden",
                  backgroundColor: "#000",
                  border: "1px solid rgba(212, 175, 55, 0.3)",
                  flexShrink: 0,
                }}
              >
                <img
                  src={member.image}
                  alt={member.name}
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
              </div>

              <div style={{ flex: 1, minWidth: 0 }}>
                <h4
                  style={{
                    fontSize: "15px",
                    fontWeight: 600,
                    color: "#fff",
                    margin: "0 0 4px",
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}
                >
                  {member.name}
                </h4>
                <div style={{ fontSize: "12px", color: "#d4af37", marginBottom: "4px" }}>
                  {member.role}
                </div>
                <div style={{ fontSize: "11px", color: "rgba(255,255,255,0.4)" }}>
                  {member.email}
                </div>
              </div>
            </div>

            <div style={{ display: "flex", justifyContent: "flex-end", gap: "8px", borderTop: "1px solid rgba(255,255,255,0.06)", paddingTop: "12px" }}>
              <button
                type="button"
                onClick={() => handleEdit(member)}
                className={styles.btnSecondary}
                style={{ padding: "6px 12px", fontSize: "12px" }}
              >
                <Edit size={13} /> Düzenle
              </button>
              <button
                type="button"
                onClick={() => handleDelete(member.id)}
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
      {isModalOpen && editingMember && (
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
                Ekip Üyesini Düzenle
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
              {/* Photo Dropzone */}
              <SingleImageDropzone
                label="Profil Fotoğrafı"
                helperText="Ekip üyesi vesikalık/portre fotoğrafını sürükleyip bırakın veya seçin."
                value={editingMember.image}
                onChange={(url) => setEditingMember({ ...editingMember, image: url })}
                height="160px"
              />

              <div className={styles.formGroup}>
                <label className={styles.formLabel}>Ad Soyad / Unvan</label>
                <input
                  type="text"
                  value={editingMember.name}
                  onChange={(e) =>
                    setEditingMember({ ...editingMember, name: e.target.value })
                  }
                  className={styles.formInput}
                  placeholder="Örn: Okan HASTÜRK"
                />
              </div>

              <div className={styles.formRow}>
                <div className={styles.formGroup}>
                  <label className={styles.formLabel}>Görevi / Uzmanlığı</label>
                  <input
                    type="text"
                    value={editingMember.role}
                    onChange={(e) =>
                      setEditingMember({ ...editingMember, role: e.target.value })
                    }
                    className={styles.formInput}
                    placeholder="Örn: Y. Mimar"
                  />
                </div>

                <div className={styles.formGroup}>
                  <label className={styles.formLabel}>E-posta Adresi</label>
                  <input
                    type="text"
                    value={editingMember.email}
                    onChange={(e) =>
                      setEditingMember({ ...editingMember, email: e.target.value })
                    }
                    className={styles.formInput}
                    placeholder="info@hasturksm.com"
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
