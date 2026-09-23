"use client";

import React, { useState } from "react";
import styles from "../admin.module.css";
import { useSiteContent } from "@/context/SiteContentContext";
import { useToast } from "@/components/admin/Toast";
import { SingleImageDropzone, MultiImageGalleryDropzone } from "@/components/admin/ImageUploadDropzone";
import { ProjectItem } from "@/lib/types/content";
import {
  FolderKanban,
  Plus,
  Trash2,
  Edit,
  Save,
  Search,
  CheckCircle2,
  X,
  Loader2,
  MapPin,
  Calendar,
  Layers,
} from "lucide-react";

export default function AdminProjectsPage() {
  const { content, updateSection } = useSiteContent();
  const { showToast } = useToast();

  const [projects, setProjects] = useState<ProjectItem[]>(content.projects || []);
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");

  const [editingProject, setEditingProject] = useState<ProjectItem | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newTechniqueInput, setNewTechniqueInput] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  const categories = [
    { key: "all", label: "Tümü" },
    { key: "restorasyon", label: "Restorasyon" },
    { key: "rolove", label: "Rölöve & Restitüsyon" },
    { key: "guclendirme", label: "Güçlendirme" },
    { key: "mimari", label: "Mimari Tasarım" },
    { key: "taahhut", label: "Taahhüt" },
  ];

  const handleSaveAll = async () => {
    try {
      setIsSaving(true);
      const success = await updateSection("projects", projects);
      if (success) {
        showToast("Tüm projeler başarıyla kaydedildi ve yayınlandı!", "success");
      } else {
        showToast("Projeler kaydedilirken hata oluştu.", "error");
      }
    } catch {
      showToast("Sunucu hatası oluştu.", "error");
    } finally {
      setIsSaving(false);
    }
  };

  const handleOpenAdd = () => {
    const newId = projects.length > 0 ? Math.max(...projects.map((p) => p.id)) + 1 : 1;
    const newProj: ProjectItem = {
      id: newId,
      title: "Yeni Restorasyon Projesi",
      category: "Restorasyon",
      categoryKey: "restorasyon",
      image: "/projects/taksim-360/IMG_2860.JPG",
      gallery: ["/projects/taksim-360/IMG_2860.JPG"],
      location: "Tarihi Yarımada / İstanbul",
      year: new Date().getFullYear().toString(),
      status: "Tescilli Kültür Varlığı",
      area: "1.000 m²",
      quoteType: "restoration",
      description: "Proje mimari açıklaması buraya yazılır.",
      techniques: ["Tescilli Cephe Restorasyonu", "Geleneksel Horasan Harcı Konsolidasyonu"],
      featuredOnHome: true,
    };
    setEditingProject(newProj);
    setIsModalOpen(true);
  };

  const handleEdit = (proj: ProjectItem) => {
    setEditingProject(JSON.parse(JSON.stringify(proj)));
    setIsModalOpen(true);
  };

  const handleDelete = (id: number) => {
    if (confirm("Bu projeyi portföyden silmek istediğinize emin misiniz?")) {
      const updated = projects.filter((p) => p.id !== id);
      setProjects(updated);
      showToast("Proje silindi. Değişiklikleri yayına almak için Kaydet butonuna tıklayınız.", "info");
    }
  };

  const handleSaveModal = () => {
    if (!editingProject) return;

    const exists = projects.some((p) => p.id === editingProject.id);
    let updated: ProjectItem[];
    if (exists) {
      updated = projects.map((p) => (p.id === editingProject.id ? editingProject : p));
    } else {
      updated = [editingProject, ...projects];
    }

    setProjects(updated);
    setIsModalOpen(false);
    setEditingProject(null);
    showToast("Proje listesi güncellendi. 'Yayına Al & Kaydet' butonuna basarak kaydedin.", "info");
  };

  const handleAddTechnique = () => {
    if (!newTechniqueInput.trim() || !editingProject) return;
    setEditingProject({
      ...editingProject,
      techniques: [...(editingProject.techniques || []), newTechniqueInput.trim()],
    });
    setNewTechniqueInput("");
  };

  const handleRemoveTechnique = (index: number) => {
    if (!editingProject) return;
    const updated = [...editingProject.techniques];
    updated.splice(index, 1);
    setEditingProject({ ...editingProject, techniques: updated });
  };

  const filteredProjects = projects.filter((p) => {
    const matchesCat = categoryFilter === "all" || p.categoryKey === categoryFilter;
    const matchesSearch =
      p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.category.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCat && matchesSearch;
  });

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
            Projeler Yönetimi (Portfolio CMS)
          </h2>
          <p style={{ fontSize: "13px", color: "rgba(255,255,255,0.5)", margin: 0 }}>
            Web sitesinde ve anasayfada sergilenen tüm mimari restorasyon ve taahhüt projelerini yönetin.
          </p>
        </div>

        <div style={{ display: "flex", gap: "10px" }}>
          <button type="button" onClick={handleOpenAdd} className={styles.btnSecondary}>
            <Plus size={16} /> Yeni Proje Ekle
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

      {/* Filter and Search Bar */}
      <div className={styles.card} style={{ padding: "16px 20px" }}>
        <div style={{ display: "flex", gap: "16px", flexWrap: "wrap", alignItems: "center" }}>
          {/* Search */}
          <div
            style={{
              flex: 1,
              minWidth: "260px",
              display: "flex",
              alignItems: "center",
              gap: "10px",
              background: "#09090d",
              border: "1px solid rgba(255,255,255,0.1)",
              borderRadius: "8px",
              padding: "8px 12px",
            }}
          >
            <Search size={16} color="rgba(255,255,255,0.4)" />
            <input
              type="text"
              placeholder="Proje adı, lokasyon veya teknik ara..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{
                background: "transparent",
                border: "none",
                color: "#fff",
                outline: "none",
                fontSize: "13.5px",
                width: "100%",
              }}
            />
          </div>

          {/* Category Filter */}
          <div style={{ display: "flex", gap: "6px", flexWrap: "wrap" }}>
            {categories.map((c) => (
              <button
                key={c.key}
                type="button"
                onClick={() => setCategoryFilter(c.key)}
                style={{
                  padding: "6px 14px",
                  borderRadius: "6px",
                  fontSize: "12px",
                  cursor: "pointer",
                  border: "none",
                  backgroundColor:
                    categoryFilter === c.key ? "rgba(212, 175, 55, 0.25)" : "rgba(255,255,255,0.05)",
                  color: categoryFilter === c.key ? "#d4af37" : "rgba(255,255,255,0.7)",
                  fontWeight: categoryFilter === c.key ? 600 : 400,
                }}
              >
                {c.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Project Table / Grid */}
      <div className={styles.tableContainer}>
        <table className={styles.adminTable}>
          <thead>
            <tr>
              <th style={{ width: "80px" }}>Görsel</th>
              <th>Proje Başlığı</th>
              <th>Kategori</th>
              <th>Lokasyon & Yıl</th>
              <th>Alan / Durum</th>
              <th style={{ textAlign: "center" }}>Anasayfa</th>
              <th style={{ textAlign: "right" }}>İşlemler</th>
            </tr>
          </thead>
          <tbody>
            {filteredProjects.length === 0 ? (
              <tr>
                <td colSpan={7} style={{ textAlign: "center", padding: "30px", color: "rgba(255,255,255,0.4)" }}>
                  Aranan kriterlere uygun proje bulunamadı.
                </td>
              </tr>
            ) : (
              filteredProjects.map((p) => (
                <tr key={p.id}>
                  <td>
                    <img
                      src={p.image}
                      alt={p.title}
                      style={{
                        width: "60px",
                        height: "46px",
                        borderRadius: "6px",
                        objectFit: "cover",
                        border: "1px solid rgba(255,255,255,0.1)",
                      }}
                    />
                  </td>
                  <td>
                    <div style={{ fontWeight: 600, color: "#fff" }}>{p.title}</div>
                    <div style={{ fontSize: "11px", color: "rgba(255,255,255,0.4)", marginTop: "2px" }}>
                      ID: #{p.id} · Galeri: {p.gallery?.length || 0} Görsel
                    </div>
                  </td>
                  <td>
                    <span
                      style={{
                        padding: "4px 8px",
                        borderRadius: "4px",
                        backgroundColor: "rgba(212, 175, 55, 0.12)",
                        color: "#d4af37",
                        fontSize: "12px",
                        fontWeight: 500,
                      }}
                    >
                      {p.category}
                    </span>
                  </td>
                  <td>
                    <div style={{ fontSize: "12.5px", color: "#e2e8f0" }}>{p.location}</div>
                    <div style={{ fontSize: "11.5px", color: "rgba(255,255,255,0.4)" }}>{p.year}</div>
                  </td>
                  <td>
                    <div style={{ fontSize: "12.5px" }}>{p.area}</div>
                    <div style={{ fontSize: "11px", color: "rgba(255,255,255,0.4)" }}>{p.status}</div>
                  </td>
                  <td style={{ textAlign: "center" }}>
                    {p.featuredOnHome ? (
                      <span style={{ color: "#10b981", fontSize: "12px", fontWeight: 600 }}>✓ Evet</span>
                    ) : (
                      <span style={{ color: "rgba(255,255,255,0.3)", fontSize: "12px" }}>-</span>
                    )}
                  </td>
                  <td style={{ textAlign: "right" }}>
                    <div style={{ display: "inline-flex", gap: "8px" }}>
                      <button
                        type="button"
                        onClick={() => handleEdit(p)}
                        className={styles.btnSecondary}
                        style={{ padding: "6px 10px" }}
                      >
                        <Edit size={13} /> Düzenle
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDelete(p.id)}
                        className={styles.btnDanger}
                        style={{ padding: "6px 10px" }}
                      >
                        <Trash2 size={13} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Edit/Create Project Modal */}
      {isModalOpen && editingProject && (
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
                {editingProject.id ? `Projeyi Düzenle (#${editingProject.id})` : "Yeni Proje Ekle"}
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
              {/* Title & Featured */}
              <div className={styles.formRow}>
                <div className={styles.formGroup} style={{ flex: 2 }}>
                  <label className={styles.formLabel}>Proje Başlığı</label>
                  <input
                    type="text"
                    value={editingProject.title}
                    onChange={(e) =>
                      setEditingProject({ ...editingProject, title: e.target.value })
                    }
                    className={styles.formInput}
                  />
                </div>

                <div className={styles.formGroup} style={{ flex: 1, display: "flex", alignItems: "flex-end" }}>
                  <label className={styles.toggleLabel} style={{ marginBottom: "12px" }}>
                    <input
                      type="checkbox"
                      checked={editingProject.featuredOnHome}
                      onChange={(e) =>
                        setEditingProject({ ...editingProject, featuredOnHome: e.target.checked })
                      }
                      style={{ display: "none" }}
                    />
                    <div
                      className={`${styles.toggleSwitch} ${
                        editingProject.featuredOnHome ? styles.toggleSwitchChecked : ""
                      }`}
                    >
                      <div
                        className={`${styles.toggleDot} ${
                          editingProject.featuredOnHome ? styles.toggleDotChecked : ""
                        }`}
                      />
                    </div>
                    <span>Anasayfada Öne Çıkar</span>
                  </label>
                </div>
              </div>

              {/* Category & Category Key */}
              <div className={styles.formRow}>
                <div className={styles.formGroup}>
                  <label className={styles.formLabel}>Kategori Görünür Adı</label>
                  <input
                    type="text"
                    value={editingProject.category}
                    onChange={(e) =>
                      setEditingProject({ ...editingProject, category: e.target.value })
                    }
                    className={styles.formInput}
                    placeholder="Örn: Restorasyon"
                  />
                </div>

                <div className={styles.formGroup}>
                  <label className={styles.formLabel}>Kategori Filtre Grubu</label>
                  <select
                    value={editingProject.categoryKey}
                    onChange={(e) =>
                      setEditingProject({ ...editingProject, categoryKey: e.target.value })
                    }
                    className={styles.formSelect}
                  >
                    <option value="restorasyon">Restorasyon</option>
                    <option value="rolove">Rölöve & Restitüsyon</option>
                    <option value="guclendirme">Güçlendirme</option>
                    <option value="mimari">Mimari Tasarım</option>
                    <option value="taahhut">Taahhüt</option>
                  </select>
                </div>

                <div className={styles.formGroup}>
                  <label className={styles.formLabel}>Yıl</label>
                  <input
                    type="text"
                    value={editingProject.year}
                    onChange={(e) =>
                      setEditingProject({ ...editingProject, year: e.target.value })
                    }
                    className={styles.formInput}
                    placeholder="2024"
                  />
                </div>
              </div>

              {/* Location, Status, Area */}
              <div className={styles.formRow}>
                <div className={styles.formGroup}>
                  <label className={styles.formLabel}>Lokasyon</label>
                  <input
                    type="text"
                    value={editingProject.location}
                    onChange={(e) =>
                      setEditingProject({ ...editingProject, location: e.target.value })
                    }
                    className={styles.formInput}
                    placeholder="Beyoğlu / İstanbul"
                  />
                </div>

                <div className={styles.formGroup}>
                  <label className={styles.formLabel}>Tescil / Statü</label>
                  <input
                    type="text"
                    value={editingProject.status}
                    onChange={(e) =>
                      setEditingProject({ ...editingProject, status: e.target.value })
                    }
                    className={styles.formInput}
                    placeholder="Tescilli Kültür Varlığı"
                  />
                </div>

                <div className={styles.formGroup}>
                  <label className={styles.formLabel}>Toplam Alan (m²)</label>
                  <input
                    type="text"
                    value={editingProject.area}
                    onChange={(e) =>
                      setEditingProject({ ...editingProject, area: e.target.value })
                    }
                    className={styles.formInput}
                    placeholder="1.250 m²"
                  />
                </div>
              </div>

              {/* Cover Image Dropzone */}
              <SingleImageDropzone
                label="Kapak Görseli"
                helperText="Proje listeleme kartlarında ve detay sayfasında ana kapak olarak kullanılır."
                value={editingProject.image}
                onChange={(url) => setEditingProject({ ...editingProject, image: url })}
                height="180px"
              />

              {/* Gallery Images Multi-Dropzone */}
              <MultiImageGalleryDropzone
                label="Proje Fotoğraf Galerisi"
                images={editingProject.gallery || []}
                onChange={(gallery) => setEditingProject({ ...editingProject, gallery })}
              />

              {/* Description */}
              <div className={styles.formGroup}>
                <label className={styles.formLabel}>Proje Açıklaması</label>
                <textarea
                  rows={4}
                  value={editingProject.description}
                  onChange={(e) =>
                    setEditingProject({ ...editingProject, description: e.target.value })
                  }
                  className={styles.formTextarea}
                  placeholder="Projenin mimari detayları, tarihi arka planı ve yapılan çalışmalar..."
                />
              </div>

              {/* Architectural Techniques List */}
              <div className={styles.formGroup}>
                <label className={styles.formLabel}>Uygulanan Mimari Teknikler & Çözümler</label>
                <div style={{ display: "flex", gap: "8px", marginBottom: "10px" }}>
                  <input
                    type="text"
                    placeholder="Örn: Özgün Ahşap Cumba Rekonstrüksiyonu"
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
                  {editingProject.techniques?.map((tech, tIdx) => (
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
