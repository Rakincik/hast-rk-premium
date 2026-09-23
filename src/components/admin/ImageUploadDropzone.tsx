"use client";

import React, { useState, useRef } from "react";
import {
  Upload,
  Image as ImageIcon,
  X,
  Loader2,
  Trash2,
  Plus,
  FolderOpen,
  Check,
  Sparkles,
} from "lucide-react";
import MediaPickerModal from "./MediaPickerModal";
import { useToast } from "./Toast";

interface SingleUploadDropzoneProps {
  value: string;
  onChange: (url: string) => void;
  label?: string;
  helperText?: string;
  aspectRatio?: string; // e.g. "16/9", "1/1", "4/3"
  height?: string;
  acceptVideo?: boolean;
}

export function SingleImageDropzone({
  value,
  onChange,
  label,
  helperText = "Görseli buraya sürükleyip bırakın, tıklayarak seçin veya Ctrl+V ile yapıştırın.",
  aspectRatio = "16/9",
  height = "160px",
  acceptVideo = false,
}: SingleUploadDropzoneProps) {
  const { showToast } = useToast();
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleUpload = async (file: File) => {
    try {
      setIsUploading(true);
      const formData = new FormData();
      formData.append("file", file);

      const res = await fetch("/api/admin/upload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Yükleme başarısız oldu!");
      }

      onChange(data.url);
      showToast("Görsel başarıyla yüklendi!", "success");
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Yükleme hatası";
      showToast(msg, "error");
    } finally {
      setIsUploading(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files?.[0]) {
      handleUpload(e.dataTransfer.files[0]);
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    if (e.clipboardData.files?.[0]) {
      e.preventDefault();
      handleUpload(e.clipboardData.files[0]);
    }
  };

  const isVideo = value?.endsWith(".mp4") || value?.endsWith(".webm");

  return (
    <div style={{ marginBottom: "16px" }} onPaste={handlePaste} tabIndex={0}>
      {label && (
        <label
          style={{
            display: "block",
            fontSize: "13px",
            fontWeight: 500,
            color: "rgba(255,255,255,0.8)",
            marginBottom: "8px",
          }}
        >
          {label}
        </label>
      )}

      <input
        ref={fileInputRef}
        type="file"
        accept={acceptVideo ? "image/*,video/*" : "image/*"}
        style={{ display: "none" }}
        onChange={(e) => {
          if (e.target.files?.[0]) {
            handleUpload(e.target.files[0]);
          }
        }}
      />

      <div
        onDragOver={(e) => {
          e.preventDefault();
          setIsDragging(true);
        }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={handleDrop}
        style={{
          position: "relative",
          borderRadius: "12px",
          border: isDragging
            ? "2px dashed #d4af37"
            : value
            ? "1px solid rgba(255,255,255,0.12)"
            : "2px dashed rgba(212, 175, 55, 0.35)",
          backgroundColor: isDragging
            ? "rgba(212, 175, 55, 0.1)"
            : value
            ? "#08080b"
            : "rgba(255,255,255,0.02)",
          minHeight: height,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          overflow: "hidden",
          transition: "all 0.2s ease",
          cursor: "pointer",
        }}
      >
        {isUploading ? (
          <div style={{ textAlign: "center", padding: "20px", color: "#d4af37" }}>
            <Loader2 size={32} className="animate-spin" style={{ margin: "0 auto 8px" }} />
            <div style={{ fontSize: "13px", fontWeight: 600, color: "#fff" }}>
              Görsel Yükleniyor...
            </div>
            <div style={{ fontSize: "11px", color: "rgba(255,255,255,0.5)", marginTop: "2px" }}>
              Sunucuya aktarılıyor
            </div>
          </div>
        ) : value ? (
          <div style={{ width: "100%", height: "100%", position: "relative" }}>
            {isVideo ? (
              <video
                src={value}
                controls
                style={{
                  width: "100%",
                  height: "220px",
                  objectFit: "cover",
                  display: "block",
                }}
              />
            ) : (
              <img
                src={value}
                alt="Selected"
                style={{
                  width: "100%",
                  height: height,
                  objectFit: "cover",
                  display: "block",
                }}
                onError={(e) => {
                  e.currentTarget.style.display = "none";
                }}
              />
            )}

            {/* Overlay Bar */}
            <div
              style={{
                position: "absolute",
                inset: 0,
                backgroundColor: "rgba(0,0,0,0.55)",
                backdropFilter: "blur(3px)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "10px",
                opacity: 0,
                transition: "opacity 0.2s ease",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.opacity = "1")}
              onMouseLeave={(e) => (e.currentTarget.style.opacity = "0")}
            >
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  fileInputRef.current?.click();
                }}
                style={{
                  padding: "8px 14px",
                  borderRadius: "8px",
                  background: "#d4af37",
                  border: "none",
                  color: "#08080b",
                  fontWeight: 600,
                  fontSize: "12px",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  gap: "6px",
                }}
              >
                <Upload size={14} /> Yeni Yükle
              </button>

              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setIsModalOpen(true);
                }}
                style={{
                  padding: "8px 14px",
                  borderRadius: "8px",
                  background: "rgba(255,255,255,0.15)",
                  border: "1px solid rgba(255,255,255,0.25)",
                  color: "#fff",
                  fontWeight: 500,
                  fontSize: "12px",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  gap: "6px",
                }}
              >
                <FolderOpen size={14} /> Kütüphaneden Seç
              </button>

              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  onChange("");
                }}
                style={{
                  padding: "8px 10px",
                  borderRadius: "8px",
                  background: "rgba(239,68,68,0.2)",
                  border: "1px solid rgba(239,68,68,0.4)",
                  color: "#f87171",
                  fontSize: "12px",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  gap: "4px",
                }}
              >
                <Trash2 size={14} /> Kaldır
              </button>
            </div>
          </div>
        ) : (
          <div
            onClick={() => fileInputRef.current?.click()}
            style={{ textAlign: "center", padding: "24px 16px", width: "100%" }}
          >
            <div
              style={{
                width: "44px",
                height: "44px",
                borderRadius: "10px",
                background: "rgba(212, 175, 55, 0.1)",
                border: "1px solid rgba(212, 175, 55, 0.25)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#d4af37",
                margin: "0 auto 10px",
              }}
            >
              <Upload size={22} />
            </div>

            <div style={{ fontSize: "13.5px", fontWeight: 600, color: "#fff", marginBottom: "4px" }}>
              Görseli Sürükleyip Bırakın veya Tıklayın
            </div>
            <div style={{ fontSize: "11.5px", color: "rgba(255,255,255,0.45)", marginBottom: "12px" }}>
              JPG, PNG, WEBP, SVG veya AVIF (Maks. 25MB)
            </div>

            <div style={{ display: "flex", gap: "8px", justifyContent: "center" }}>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  fileInputRef.current?.click();
                }}
                style={{
                  padding: "6px 14px",
                  borderRadius: "6px",
                  background: "rgba(212, 175, 55, 0.15)",
                  border: "1px solid rgba(212, 175, 55, 0.3)",
                  color: "#d4af37",
                  fontSize: "12px",
                  cursor: "pointer",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "6px",
                }}
              >
                <Upload size={13} /> Bilgisayardan Seç
              </button>

              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setIsModalOpen(true);
                }}
                style={{
                  padding: "6px 14px",
                  borderRadius: "6px",
                  background: "rgba(255,255,255,0.06)",
                  border: "1px solid rgba(255,255,255,0.12)",
                  color: "#e2e8f0",
                  fontSize: "12px",
                  cursor: "pointer",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "6px",
                }}
              >
                <FolderOpen size={13} /> Kütüphaneden Seç
              </button>
            </div>
          </div>
        )}
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginTop: "6px",
          fontSize: "11.5px",
          color: "rgba(255,255,255,0.4)",
        }}
      >
        <span>{helperText}</span>
        {value && (
          <span style={{ color: "#d4af37", maxWidth: "260px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
            {value}
          </span>
        )}
      </div>

      {/* Media Picker Modal */}
      <MediaPickerModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        currentValue={value}
        onSelect={(url) => {
          onChange(url);
          setIsModalOpen(false);
        }}
      />
    </div>
  );
}

interface MultiImageGalleryDropzoneProps {
  images: string[];
  onChange: (images: string[]) => void;
  label?: string;
}

export function MultiImageGalleryDropzone({
  images = [],
  onChange,
  label = "Proje Fotoğraf Galerisi",
}: MultiImageGalleryDropzoneProps) {
  const { showToast } = useToast();
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState<string>("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const multiInputRef = useRef<HTMLInputElement>(null);

  const handleBatchUpload = async (fileList: FileList | File[]) => {
    const files = Array.from(fileList);
    if (files.length === 0) return;

    try {
      setIsUploading(true);
      setUploadProgress(`${files.length} görsel yükleniyor...`);

      const formData = new FormData();
      for (const f of files) {
        formData.append("files", f);
      }

      const res = await fetch("/api/admin/upload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Toplu yükleme başarısız!");
      }

      const newUrls = data.files ? data.files.map((item: { url: string }) => item.url) : [data.url];
      onChange([...images, ...newUrls]);
      showToast(`${newUrls.length} görsel galeriye eklendi!`, "success");
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Toplu yükleme hatası";
      showToast(msg, "error");
    } finally {
      setIsUploading(false);
      setUploadProgress("");
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleBatchUpload(e.dataTransfer.files);
    }
  };

  const handleRemove = (index: number) => {
    const updated = [...images];
    updated.splice(index, 1);
    onChange(updated);
  };

  return (
    <div style={{ marginBottom: "16px" }}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: "10px",
        }}
      >
        <label
          style={{
            fontSize: "13px",
            fontWeight: 500,
            color: "rgba(255,255,255,0.8)",
            margin: 0,
          }}
        >
          {label} ({images.length})
        </label>

        <div style={{ display: "flex", gap: "8px" }}>
          <button
            type="button"
            onClick={() => multiInputRef.current?.click()}
            style={{
              padding: "5px 12px",
              borderRadius: "6px",
              background: "rgba(212, 175, 55, 0.15)",
              border: "1px solid rgba(212, 175, 55, 0.3)",
              color: "#d4af37",
              fontSize: "12px",
              fontWeight: 500,
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: "5px",
            }}
          >
            <Plus size={14} /> Toplu Fotoğraf Yükle
          </button>

          <button
            type="button"
            onClick={() => setIsModalOpen(true)}
            style={{
              padding: "5px 12px",
              borderRadius: "6px",
              background: "rgba(255,255,255,0.06)",
              border: "1px solid rgba(255,255,255,0.12)",
              color: "#e2e8f0",
              fontSize: "12px",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: "5px",
            }}
          >
            <FolderOpen size={14} /> Kütüphaneden Ekle
          </button>
        </div>
      </div>

      <input
        ref={multiInputRef}
        type="file"
        multiple
        accept="image/*"
        style={{ display: "none" }}
        onChange={(e) => {
          if (e.target.files) {
            handleBatchUpload(e.target.files);
          }
        }}
      />

      {/* Gallery Dropzone & Grid */}
      <div
        onDragOver={(e) => {
          e.preventDefault();
          setIsDragging(true);
        }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={handleDrop}
        style={{
          border: isDragging ? "2px dashed #d4af37" : "1px solid rgba(255,255,255,0.1)",
          borderRadius: "12px",
          backgroundColor: isDragging ? "rgba(212, 175, 55, 0.08)" : "#09090d",
          padding: "16px",
          minHeight: "140px",
          transition: "all 0.2s ease",
        }}
      >
        {isUploading && (
          <div
            style={{
              textAlign: "center",
              padding: "20px",
              color: "#d4af37",
              backgroundColor: "rgba(212, 175, 55, 0.05)",
              borderRadius: "8px",
              marginBottom: "14px",
            }}
          >
            <Loader2 size={24} className="animate-spin" style={{ margin: "0 auto 6px" }} />
            <div style={{ fontSize: "13px", fontWeight: 600 }}>{uploadProgress}</div>
          </div>
        )}

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(110px, 1fr))",
            gap: "12px",
          }}
        >
          {images.map((imgUrl, idx) => (
            <div
              key={idx}
              style={{
                position: "relative",
                aspectRatio: "1/1",
                borderRadius: "8px",
                overflow: "hidden",
                border: "1px solid rgba(255,255,255,0.12)",
                backgroundColor: "#000",
              }}
            >
              <img
                src={imgUrl}
                alt={`Gallery ${idx + 1}`}
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />

              <div
                style={{
                  position: "absolute",
                  bottom: "4px",
                  left: "4px",
                  backgroundColor: "rgba(0,0,0,0.6)",
                  padding: "2px 6px",
                  borderRadius: "4px",
                  fontSize: "10px",
                  color: "#d4af37",
                  fontWeight: 600,
                }}
              >
                #{idx + 1}
              </div>

              <button
                type="button"
                onClick={() => handleRemove(idx)}
                style={{
                  position: "absolute",
                  top: "4px",
                  right: "4px",
                  backgroundColor: "rgba(239, 68, 68, 0.85)",
                  color: "#fff",
                  border: "none",
                  borderRadius: "50%",
                  width: "22px",
                  height: "22px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "pointer",
                }}
                title="Fotoğrafı Kaldır"
              >
                <X size={13} />
              </button>
            </div>
          ))}

          {/* Inline Add Card */}
          <div
            onClick={() => multiInputRef.current?.click()}
            style={{
              aspectRatio: "1/1",
              borderRadius: "8px",
              border: "2px dashed rgba(255,255,255,0.15)",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              backgroundColor: "rgba(255,255,255,0.02)",
              color: "rgba(255,255,255,0.5)",
              gap: "4px",
              transition: "all 0.2s",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = "#d4af37";
              e.currentTarget.style.color = "#d4af37";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = "rgba(255,255,255,0.15)";
              e.currentTarget.style.color = "rgba(255,255,255,0.5)";
            }}
          >
            <Plus size={24} />
            <span style={{ fontSize: "11px", fontWeight: 500 }}>Fotoğraf Ekle</span>
          </div>
        </div>

        {images.length === 0 && !isUploading && (
          <div
            style={{
              textAlign: "center",
              padding: "20px",
              color: "rgba(255,255,255,0.4)",
              fontSize: "12.5px",
            }}
          >
            Henüz fotoğraf eklenmemiş. Çoklu fotoğraf yüklemek için dosyaları buraya sürükleyip bırakabilirsiniz.
          </div>
        )}
      </div>

      <MediaPickerModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSelect={(url) => {
          onChange([...images, url]);
          setIsModalOpen(false);
        }}
      />
    </div>
  );
}
