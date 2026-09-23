"use client";

import React, { useState, useEffect } from "react";
import { X, Upload, Image as ImageIcon, Check, Loader2, Search } from "lucide-react";

interface MediaFile {
  name: string;
  url: string;
  size: number;
  updatedAt: string;
}

interface MediaPickerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (url: string) => void;
  currentValue?: string;
  title?: string;
}

export default function MediaPickerModal({
  isOpen,
  onClose,
  onSelect,
  currentValue = "",
  title = "Görsel veya Medya Seç",
}: MediaPickerModalProps) {
  const [activeTab, setActiveTab] = useState<"library" | "upload" | "url">("library");
  const [files, setFiles] = useState<MediaFile[]>([]);
  const [search, setSearch] = useState("");
  const [selectedUrl, setSelectedUrl] = useState(currentValue);
  const [customUrl, setCustomUrl] = useState(currentValue);
  const [isUploading, setIsUploading] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [uploadError, setUploadError] = useState("");

  // Preset known gallery images from the site
  const presetImages = [
    "/projects/taksim-360/IMG_2860.JPG",
    "/projects/taksim-360/IMG_2866.jpg",
    "/projects/taksim-360/IMG_2885.jpg",
    "/projects/guclendirme/B72F58E1-9A83-46EE-8642-0FE84A786EBF.JPG",
    "/projects/guclendirme/IMG_0211.jpeg",
    "/projects/guclendirme/IMG_4386.JPG",
    "/projects/karma-isler/IMG-20231101-WA0063.JPG",
    "/projects/karma-isler/IMG-20231101-WA0062.JPG",
    "/projects/karma-isler/IMG-20231106-WA0024.JPG",
    "/projects/karma-isler/IMG-20231110-WA0051.JPG",
    "/projects/karma-isler/IMG-20231120-WA0064.JPG",
    "/projects/karma-isler/IMG-20231120-WA0056.JPG",
    "/projects/karma-isler/IMG-20231120-WA0055.JPG",
    "/projects/karma-isler/IMG-20231120-WA0065.JPG",
    "/projects/karma-isler/IMG-20231010-WA0025.JPG",
    "/projects/karma-isler/IMG-20231010-WA0024.JPG",
    "/projects/karma-isler/IMG_20210512_123036_173.JPG",
    "/projects/karma-isler/IMG_20210512_123036_163.JPG",
    "/projects/karma-isler/IMG_20210512_123036_181.JPG",
    "/projects/karma-isler/IMG_20210512_123036_195.JPG",
    "/projects/karma-isler/IMG-20231227-WA0044.JPG",
    "/projects/karma-isler/IMG-20231127-WA0002.JPG",
    "/projects/karma-isler/IMG-20231214-WA0057.JPG",
    "/projects/karma-isler/IMG-20231123-WA0080.JPG",
    "/projects/karma-isler/IMG-20231123-WA0070.JPG",
    "/projects/karma-isler/IMG-20240101-WA0014.JPG",
    "/logo-original.png",
    "/logo-white.png",
    "/logo-gold.png",
    "/bana_bu_görseli_web_sitemin_sl.mp4"
  ];

  useEffect(() => {
    if (isOpen) {
      setSelectedUrl(currentValue);
      setCustomUrl(currentValue);
      fetchMedia();
    }
  }, [isOpen, currentValue]);

  const fetchMedia = async () => {
    try {
      setIsLoading(true);
      const res = await fetch("/api/admin/media");
      if (res.ok) {
        const data = await res.json();
        setFiles(data.files || []);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleFileUpload = async (file: File) => {
    try {
      setIsUploading(true);
      setUploadError("");
      const formData = new FormData();
      formData.append("file", file);

      const res = await fetch("/api/admin/upload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Yükleme başarısız!");
      }

      setSelectedUrl(data.url);
      await fetchMedia();
      setActiveTab("library");
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Yükleme hatası!";
      setUploadError(message);
    } finally {
      setIsUploading(false);
    }
  };

  const handleConfirm = () => {
    if (activeTab === "url") {
      onSelect(customUrl.trim());
    } else {
      onSelect(selectedUrl);
    }
    onClose();
  };

  if (!isOpen) return null;

  // Combine custom uploads and presets
  const allMedia = [
    ...files.map((f) => ({ url: f.url, name: f.name })),
    ...presetImages.map((p) => ({ url: p, name: p.split("/").pop() || p })),
  ];

  const filteredMedia = allMedia.filter((m) =>
    m.name.toLowerCase().includes(search.toLowerCase()) ||
    m.url.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        backgroundColor: "rgba(0, 0, 0, 0.75)",
        backdropFilter: "blur(6px)",
        zIndex: 99990,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "20px",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "880px",
          maxHeight: "88vh",
          backgroundColor: "#121217",
          border: "1px solid rgba(212, 175, 55, 0.25)",
          borderRadius: "16px",
          display: "flex",
          flexDirection: "column",
          boxShadow: "0 25px 60px rgba(0,0,0,0.8)",
          overflow: "hidden",
        }}
      >
        {/* Header */}
        <div
          style={{
            padding: "18px 24px",
            borderBottom: "1px solid rgba(255, 255, 255, 0.08)",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <ImageIcon size={20} color="#d4af37" />
            <h3 style={{ margin: 0, fontSize: "17px", color: "#fff", fontWeight: 600 }}>
              {title}
            </h3>
          </div>
          <button
            onClick={onClose}
            style={{
              background: "transparent",
              border: "none",
              color: "rgba(255,255,255,0.6)",
              cursor: "pointer",
              padding: "4px",
            }}
          >
            <X size={20} />
          </button>
        </div>

        {/* Tabs */}
        <div
          style={{
            display: "flex",
            gap: "8px",
            padding: "12px 24px",
            borderBottom: "1px solid rgba(255, 255, 255, 0.05)",
            backgroundColor: "#0d0d12",
          }}
        >
          <button
            type="button"
            onClick={() => setActiveTab("library")}
            style={{
              padding: "8px 16px",
              borderRadius: "8px",
              fontSize: "13px",
              fontWeight: 500,
              cursor: "pointer",
              border: "none",
              background: activeTab === "library" ? "rgba(212, 175, 55, 0.2)" : "transparent",
              color: activeTab === "library" ? "#d4af37" : "rgba(255,255,255,0.6)",
            }}
          >
            Kütüphane ({allMedia.length})
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("upload")}
            style={{
              padding: "8px 16px",
              borderRadius: "8px",
              fontSize: "13px",
              fontWeight: 500,
              cursor: "pointer",
              border: "none",
              background: activeTab === "upload" ? "rgba(212, 175, 55, 0.2)" : "transparent",
              color: activeTab === "upload" ? "#d4af37" : "rgba(255,255,255,0.6)",
            }}
          >
            Yeni Yükle (Upload)
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("url")}
            style={{
              padding: "8px 16px",
              borderRadius: "8px",
              fontSize: "13px",
              fontWeight: 500,
              cursor: "pointer",
              border: "none",
              background: activeTab === "url" ? "rgba(212, 175, 55, 0.2)" : "transparent",
              color: activeTab === "url" ? "#d4af37" : "rgba(255,255,255,0.6)",
            }}
          >
            Özel URL / Harici Link
          </button>
        </div>

        {/* Content Area */}
        <div style={{ flex: 1, overflowY: "auto", padding: "20px 24px" }}>
          {activeTab === "library" && (
            <div>
              {/* Search Bar */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                  background: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(255,255,255,0.1)",
                  borderRadius: "8px",
                  padding: "8px 12px",
                  marginBottom: "16px",
                }}
              >
                <Search size={16} color="rgba(255,255,255,0.4)" />
                <input
                  type="text"
                  placeholder="Görsel veya dosya adı ara..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  style={{
                    background: "transparent",
                    border: "none",
                    color: "#fff",
                    outline: "none",
                    fontSize: "13px",
                    width: "100%",
                  }}
                />
              </div>

              {isLoading ? (
                <div style={{ textAlign: "center", padding: "40px", color: "rgba(255,255,255,0.5)" }}>
                  <Loader2 size={28} className="animate-spin" style={{ margin: "0 auto 10px" }} />
                  Yükleniyor...
                </div>
              ) : (
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fill, minmax(130px, 1fr))",
                    gap: "12px",
                  }}
                >
                  {filteredMedia.map((media, idx) => {
                    const isSelected = selectedUrl === media.url;
                    const isVideo = media.url.endsWith(".mp4") || media.url.endsWith(".webm");
                    return (
                      <div
                        key={`${media.url}-${idx}`}
                        onClick={() => setSelectedUrl(media.url)}
                        style={{
                          aspectRatio: "1/1",
                          borderRadius: "8px",
                          overflow: "hidden",
                          position: "relative",
                          border: isSelected
                            ? "2px solid #d4af37"
                            : "1px solid rgba(255,255,255,0.1)",
                          cursor: "pointer",
                          backgroundColor: "#08080b",
                          transition: "all 0.2s",
                        }}
                      >
                        {isVideo ? (
                          <div
                            style={{
                              width: "100%",
                              height: "100%",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              backgroundColor: "#181822",
                              color: "#d4af37",
                              fontSize: "11px",
                              flexDirection: "column",
                              gap: "4px",
                            }}
                          >
                            <span>🎬 Video</span>
                            <span style={{ fontSize: "9px", opacity: 0.7 }}>{media.name}</span>
                          </div>
                        ) : (
                          <img
                            src={media.url}
                            alt={media.name}
                            style={{
                              width: "100%",
                              height: "100%",
                              objectFit: "cover",
                            }}
                          />
                        )}
                        {isSelected && (
                          <div
                            style={{
                              position: "absolute",
                              top: "6px",
                              right: "6px",
                              background: "#d4af37",
                              borderRadius: "50%",
                              width: "20px",
                              height: "20px",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              color: "#000",
                            }}
                          >
                            <Check size={13} strokeWidth={3} />
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          )}

          {activeTab === "upload" && (
            <div style={{ textAlign: "center", padding: "30px 10px" }}>
              <div
                onDragOver={(e) => e.preventDefault()}
                onDrop={(e) => {
                  e.preventDefault();
                  if (e.dataTransfer.files?.[0]) {
                    handleFileUpload(e.dataTransfer.files[0]);
                  }
                }}
                style={{
                  border: "2px dashed rgba(212, 175, 55, 0.4)",
                  borderRadius: "14px",
                  padding: "40px 20px",
                  backgroundColor: "rgba(212, 175, 55, 0.03)",
                  cursor: "pointer",
                }}
                onClick={() => {
                  const input = document.getElementById("media-file-input");
                  input?.click();
                }}
              >
                <input
                  id="media-file-input"
                  type="file"
                  accept="image/*,video/*"
                  style={{ display: "none" }}
                  onChange={(e) => {
                    if (e.target.files?.[0]) {
                      handleFileUpload(e.target.files[0]);
                    }
                  }}
                />

                {isUploading ? (
                  <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "10px" }}>
                    <Loader2 size={36} color="#d4af37" className="animate-spin" />
                    <p style={{ color: "#fff", margin: 0 }}>Dosya yükleniyor, lütfen bekleyin...</p>
                  </div>
                ) : (
                  <>
                    <Upload size={40} color="#d4af37" style={{ marginBottom: "12px" }} />
                    <h4 style={{ color: "#fff", margin: "0 0 6px", fontSize: "16px" }}>
                      Görseli Buraya Sürükleyin veya Tıklayın
                    </h4>
                    <p style={{ color: "rgba(255,255,255,0.5)", fontSize: "13px", margin: 0 }}>
                      JPG, PNG, WEBP, SVG veya MP4 (Maks. 25MB)
                    </p>
                  </>
                )}
              </div>

              {uploadError && (
                <div style={{ marginTop: "14px", color: "#ef4444", fontSize: "13px" }}>
                  {uploadError}
                </div>
              )}
            </div>
          )}

          {activeTab === "url" && (
            <div style={{ padding: "20px 0" }}>
              <label style={{ display: "block", color: "rgba(255,255,255,0.7)", fontSize: "13px", marginBottom: "8px" }}>
                Harici Görsel veya Medya URL'si:
              </label>
              <input
                type="text"
                placeholder="https://images.unsplash.com/... veya /projects/..."
                value={customUrl}
                onChange={(e) => setCustomUrl(e.target.value)}
                style={{
                  width: "100%",
                  padding: "12px 14px",
                  borderRadius: "8px",
                  background: "rgba(255,255,255,0.05)",
                  border: "1px solid rgba(255,255,255,0.15)",
                  color: "#fff",
                  fontSize: "14px",
                  outline: "none",
                  boxSizing: "border-box",
                }}
              />
              {customUrl && (
                <div style={{ marginTop: "16px", maxWidth: "240px", borderRadius: "8px", overflow: "hidden", border: "1px solid rgba(255,255,255,0.1)" }}>
                  <img src={customUrl} alt="Preview" style={{ width: "100%", display: "block" }} onError={(e) => (e.currentTarget.style.display = "none")} />
                </div>
              )}
            </div>
          )}
        </div>

        {/* Footer */}
        <div
          style={{
            padding: "16px 24px",
            borderTop: "1px solid rgba(255, 255, 255, 0.08)",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            backgroundColor: "#0d0d12",
          }}
        >
          <div style={{ fontSize: "13px", color: "rgba(255,255,255,0.5)", maxWidth: "450px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
            Seçilen: <span style={{ color: "#d4af37" }}>{activeTab === "url" ? customUrl : selectedUrl || "Seçilmedi"}</span>
          </div>
          <div style={{ display: "flex", gap: "10px" }}>
            <button
              type="button"
              onClick={onClose}
              style={{
                padding: "8px 16px",
                borderRadius: "8px",
                background: "rgba(255,255,255,0.08)",
                border: "none",
                color: "#fff",
                fontSize: "13px",
                cursor: "pointer",
              }}
            >
              Vazgeç
            </button>
            <button
              type="button"
              onClick={handleConfirm}
              style={{
                padding: "8px 20px",
                borderRadius: "8px",
                background: "linear-gradient(135deg, #d4af37, #aa820a)",
                border: "none",
                color: "#0a0a0d",
                fontWeight: 600,
                fontSize: "13px",
                cursor: "pointer",
              }}
            >
              Bu Görseli Kullan
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
