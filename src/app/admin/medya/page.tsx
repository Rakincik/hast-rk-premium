"use client";

import React, { useState, useEffect } from "react";
import styles from "../admin.module.css";
import { useToast } from "@/components/admin/Toast";
import {
  Image as ImageIcon,
  Upload,
  Trash2,
  Copy,
  ExternalLink,
  Search,
  Loader2,
  Video,
  FileCheck,
} from "lucide-react";

interface MediaFile {
  name: string;
  url: string;
  size: number;
  updatedAt: string;
  isCustomUpload: boolean;
}

export default function AdminMediaPage() {
  const { showToast } = useToast();
  const [files, setFiles] = useState<MediaFile[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isUploading, setIsUploading] = useState(false);
  const [search, setSearch] = useState("");
  const [filterType, setFilterType] = useState<"all" | "image" | "video">("all");

  const presetImages = [
    { name: "Taksim 360 Kapak", url: "/projects/taksim-360/IMG_2860.JPG", size: 450000, updatedAt: new Date().toISOString(), isCustomUpload: false },
    { name: "Taksim 360 Detay 1", url: "/projects/taksim-360/IMG_2866.jpg", size: 380000, updatedAt: new Date().toISOString(), isCustomUpload: false },
    { name: "Taksim 360 Detay 2", url: "/projects/taksim-360/IMG_2885.jpg", size: 410000, updatedAt: new Date().toISOString(), isCustomUpload: false },
    { name: "Zemin Güçlendirme Sondaj", url: "/projects/guclendirme/B72F58E1-9A83-46EE-8642-0FE84A786EBF.JPG", size: 520000, updatedAt: new Date().toISOString(), isCustomUpload: false },
    { name: "Cami Taş Minare", url: "/projects/karma-isler/IMG-20231101-WA0063.JPG", size: 320000, updatedAt: new Date().toISOString(), isCustomUpload: false },
    { name: "Avlu Doğal Taş Döşeme", url: "/projects/karma-isler/IMG-20231120-WA0064.JPG", size: 390000, updatedAt: new Date().toISOString(), isCustomUpload: false },
    { name: "Çelik Askılama Sistemi", url: "/projects/karma-isler/IMG-20231010-WA0025.JPG", size: 440000, updatedAt: new Date().toISOString(), isCustomUpload: false },
    { name: "Masif Ahşap Doğrama", url: "/projects/karma-isler/IMG_20210512_123036_173.JPG", size: 310000, updatedAt: new Date().toISOString(), isCustomUpload: false },
    { name: "Sinematik Hero Video", url: "/bana_bu_görseli_web_sitemin_sl.mp4", size: 2380000, updatedAt: new Date().toISOString(), isCustomUpload: false },
    { name: "Logo Orijinal", url: "/logo-original.png", size: 6820, updatedAt: new Date().toISOString(), isCustomUpload: false },
    { name: "Logo Gold", url: "/logo-gold.png", size: 2137, updatedAt: new Date().toISOString(), isCustomUpload: false },
    { name: "Logo Beyaz", url: "/logo-white.png", size: 2138, updatedAt: new Date().toISOString(), isCustomUpload: false },
  ];

  const fetchMedia = async () => {
    try {
      setIsLoading(true);
      const res = await fetch("/api/admin/media");
      if (res.ok) {
        const data = await res.json();
        setFiles(data.files || []);
      }
    } catch {
      showToast("Medya listesi alınamadı", "error");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchMedia();
  }, []);

  const [isDragging, setIsDragging] = useState(false);
  const [uploadProgress, setUploadProgress] = useState("");

  const handleBatchUpload = async (fileList: FileList | File[]) => {
    const fileArray = Array.from(fileList);
    if (fileArray.length === 0) return;

    try {
      setIsUploading(true);
      setUploadProgress(
        fileArray.length === 1
          ? `'${fileArray[0].name}' yükleniyor...`
          : `${fileArray.length} dosya toplu yükleniyor...`
      );

      const formData = new FormData();
      for (const f of fileArray) {
        formData.append("files", f);
      }

      const res = await fetch("/api/admin/upload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Yükleme başarısız!");
      }

      const count = data.files?.length || 1;
      showToast(`${count} medya dosyası başarıyla yüklendi!`, "success");
      await fetchMedia();
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Yükleme hatası!";
      showToast(message, "error");
    } finally {
      setIsUploading(false);
      setUploadProgress("");
    }
  };

  const handleDelete = async (fileName: string) => {
    if (!confirm(`'${fileName}' dosyasını kalıcı olarak silmek istediğinize emin misiniz?`)) return;

    try {
      const res = await fetch(`/api/admin/media?file=${encodeURIComponent(fileName)}`, {
        method: "DELETE",
      });
      if (res.ok) {
        showToast("Dosya silindi", "info");
        await fetchMedia();
      } else {
        showToast("Dosya silinemedi", "error");
      }
    } catch {
      showToast("Hata oluştu", "error");
    }
  };

  const copyToClipboard = (url: string) => {
    navigator.clipboard.writeText(url);
    showToast("Görsel bağlantısı panoya kopyalandı!", "info");
  };

  const allItems: MediaFile[] = [...files, ...presetImages];

  const filteredItems = allItems.filter((item) => {
    const isVid = item.url.endsWith(".mp4") || item.url.endsWith(".webm");
    const matchesFilter =
      filterType === "all" ||
      (filterType === "video" && isVid) ||
      (filterType === "image" && !isVid);
    const matchesSearch =
      item.name.toLowerCase().includes(search.toLowerCase()) ||
      item.url.toLowerCase().includes(search.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
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
            Medya Kütüphanesi (Media Assets)
          </h2>
          <p style={{ fontSize: "13px", color: "rgba(255,255,255,0.5)", margin: 0 }}>
            Web sitesinde kullanılan ve sunucuya yüklenen tüm fotoğrafları, videoları ve mimari çizimleri yönetin.
          </p>
        </div>
      </div>

      {/* Drag & Drop Upload Zone */}
      <div
        tabIndex={0}
        onDragOver={(e) => {
          e.preventDefault();
          setIsDragging(true);
        }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={(e) => {
          e.preventDefault();
          setIsDragging(false);
          if (e.dataTransfer.files?.length) {
            handleBatchUpload(e.dataTransfer.files);
          }
        }}
        onPaste={(e) => {
          if (e.clipboardData.files?.length) {
            e.preventDefault();
            handleBatchUpload(e.clipboardData.files);
          }
        }}
        onClick={() => {
          const input = document.getElementById("direct-media-upload");
          input?.click();
        }}
        style={{
          border: isDragging
            ? "2px dashed #d4af37"
            : "2px dashed rgba(212, 175, 55, 0.35)",
          borderRadius: "14px",
          padding: "36px 20px",
          backgroundColor: isDragging
            ? "rgba(212, 175, 55, 0.12)"
            : "rgba(212, 175, 55, 0.03)",
          textAlign: "center",
          cursor: "pointer",
          marginBottom: "24px",
          transition: "all 0.2s",
          outline: "none",
        }}
      >
        <input
          id="direct-media-upload"
          type="file"
          multiple
          accept="image/*,video/*"
          style={{ display: "none" }}
          onChange={(e) => {
            if (e.target.files?.length) {
              handleBatchUpload(e.target.files);
            }
          }}
        />

        {isUploading ? (
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "10px" }}>
            <Loader2 size={36} color="#d4af37" className="animate-spin" />
            <p style={{ color: "#fff", margin: 0, fontWeight: 600 }}>{uploadProgress || "Yükleniyor..."}</p>
            <span style={{ fontSize: "12px", color: "rgba(255,255,255,0.45)" }}>Dosyalar sunucuya aktarılıyor</span>
          </div>
        ) : (
          <div>
            <Upload size={38} color="#d4af37" style={{ marginBottom: "10px" }} />
            <h4 style={{ color: "#fff", margin: "0 0 6px", fontSize: "16px" }}>
              Çoklu Dosya Yüklemek İçin Sürükleyip Bırakın, Tıklayın veya Ctrl+V Yapıştırın
            </h4>
            <p style={{ color: "rgba(255,255,255,0.5)", fontSize: "12.5px", margin: 0 }}>
              Birden fazla görseli aynı anda seçip toplu yükleyebilirsiniz (JPG, PNG, WEBP, SVG, MP4).
            </p>
          </div>
        )}
      </div>

      {/* Filter & Search Bar */}
      <div className={styles.card} style={{ padding: "16px 20px" }}>
        <div style={{ display: "flex", gap: "16px", flexWrap: "wrap", alignItems: "center" }}>
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
              placeholder="Dosya adına göre ara..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
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

          <div style={{ display: "flex", gap: "6px" }}>
            <button
              type="button"
              onClick={() => setFilterType("all")}
              style={{
                padding: "6px 14px",
                borderRadius: "6px",
                fontSize: "12px",
                cursor: "pointer",
                border: "none",
                backgroundColor: filterType === "all" ? "rgba(212, 175, 55, 0.25)" : "rgba(255,255,255,0.05)",
                color: filterType === "all" ? "#d4af37" : "rgba(255,255,255,0.7)",
              }}
            >
              Tümü ({allItems.length})
            </button>
            <button
              type="button"
              onClick={() => setFilterType("image")}
              style={{
                padding: "6px 14px",
                borderRadius: "6px",
                fontSize: "12px",
                cursor: "pointer",
                border: "none",
                backgroundColor: filterType === "image" ? "rgba(212, 175, 55, 0.25)" : "rgba(255,255,255,0.05)",
                color: filterType === "image" ? "#d4af37" : "rgba(255,255,255,0.7)",
              }}
            >
              Fotoğraflar
            </button>
            <button
              type="button"
              onClick={() => setFilterType("video")}
              style={{
                padding: "6px 14px",
                borderRadius: "6px",
                fontSize: "12px",
                cursor: "pointer",
                border: "none",
                backgroundColor: filterType === "video" ? "rgba(212, 175, 55, 0.25)" : "rgba(255,255,255,0.05)",
                color: filterType === "video" ? "#d4af37" : "rgba(255,255,255,0.7)",
              }}
            >
              Videolar
            </button>
          </div>
        </div>
      </div>

      {/* Media Grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
          gap: "16px",
        }}
      >
        {filteredItems.map((item, idx) => {
          const isVid = item.url.endsWith(".mp4") || item.url.endsWith(".webm");
          return (
            <div
              key={`${item.url}-${idx}`}
              className={styles.card}
              style={{
                marginBottom: 0,
                padding: "12px",
                display: "flex",
                flexDirection: "column",
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  width: "100%",
                  aspectRatio: "1/1",
                  borderRadius: "8px",
                  overflow: "hidden",
                  backgroundColor: "#07070a",
                  position: "relative",
                  marginBottom: "10px",
                  border: "1px solid rgba(255,255,255,0.08)",
                }}
              >
                {isVid ? (
                  <div
                    style={{
                      width: "100%",
                      height: "100%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexDirection: "column",
                      gap: "6px",
                      backgroundColor: "#13131c",
                      color: "#d4af37",
                    }}
                  >
                    <Video size={36} />
                    <span style={{ fontSize: "11px", fontWeight: 600 }}>Video Dosyası</span>
                  </div>
                ) : (
                  <img
                    src={item.url}
                    alt={item.name}
                    style={{ width: "100%", height: "100%", objectFit: "cover" }}
                  />
                )}
              </div>

              <div style={{ flex: 1, minWidth: 0, marginBottom: "10px" }}>
                <div
                  style={{
                    fontSize: "12.5px",
                    fontWeight: 600,
                    color: "#fff",
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}
                  title={item.name}
                >
                  {item.name}
                </div>
                <div style={{ fontSize: "11px", color: "rgba(255,255,255,0.4)", marginTop: "2px" }}>
                  {formatFileSize(item.size)}
                </div>
              </div>

              <div style={{ display: "flex", gap: "6px", borderTop: "1px solid rgba(255,255,255,0.06)", paddingTop: "8px" }}>
                <button
                  type="button"
                  onClick={() => copyToClipboard(item.url)}
                  title="URL Kopyala"
                  className={styles.btnSecondary}
                  style={{ flex: 1, padding: "6px 8px", fontSize: "11.5px" }}
                >
                  <Copy size={13} /> Link
                </button>

                <a
                  href={item.url}
                  target="_blank"
                  rel="noreferrer"
                  title="Görüntüle"
                  className={styles.btnSecondary}
                  style={{ padding: "6px 8px", color: "#e2e8f0" }}
                >
                  <ExternalLink size={13} />
                </a>

                {item.isCustomUpload && (
                  <button
                    type="button"
                    onClick={() => handleDelete(item.name)}
                    title="Sil"
                    className={styles.btnDanger}
                    style={{ padding: "6px 8px" }}
                  >
                    <Trash2 size={13} />
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
