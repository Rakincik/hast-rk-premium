"use client";

import React from "react";
import Link from "next/link";
import styles from "./admin.module.css";
import { useSiteContent } from "@/context/SiteContentContext";
import {
  FolderKanban,
  Sliders,
  Wrench,
  Users,
  BookOpen,
  HelpCircle,
  Plus,
  ArrowRight,
  ExternalLink,
  Shield,
  Layers,
  Sparkles,
} from "lucide-react";

export default function AdminDashboardPage() {
  const { content, isLoading } = useSiteContent();

  const stats = [
    {
      title: "Toplam Proje",
      value: content.projects?.length || 0,
      icon: <FolderKanban size={22} />,
      link: "/admin/projeler",
    },
    {
      title: "Hero / Slayt",
      value: content.hero?.slides?.length || 0,
      icon: <Sliders size={22} />,
      link: "/admin/slider",
    },
    {
      title: "Hizmetler",
      value: content.services?.length || 0,
      icon: <Wrench size={22} />,
      link: "/admin/hizmetler",
    },
    {
      title: "Ekip Kadrosu",
      value: content.team?.length || 0,
      icon: <Users size={22} />,
      link: "/admin/ekip",
    },
    {
      title: "Journal Makaleleri",
      value: content.articles?.length || 0,
      icon: <BookOpen size={22} />,
      link: "/admin/journal",
    },
    {
      title: "SSS Soruları",
      value: content.faq?.length || 0,
      icon: <HelpCircle size={22} />,
      link: "/admin/faq",
    },
  ];

  return (
    <div>
      {/* Welcome Hero Banner */}
      <div
        style={{
          background: "linear-gradient(135deg, rgba(212, 175, 55, 0.15) 0%, rgba(14, 14, 20, 0.9) 100%)",
          border: "1px solid rgba(212, 175, 55, 0.25)",
          borderRadius: "16px",
          padding: "32px",
          marginBottom: "32px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: "20px",
        }}
      >
        <div>
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "6px",
              padding: "4px 10px",
              borderRadius: "20px",
              backgroundColor: "rgba(212, 175, 55, 0.15)",
              color: "#d4af37",
              fontSize: "12px",
              fontWeight: 600,
              marginBottom: "12px",
            }}
          >
            <Sparkles size={14} /> Canlı Yönetim Sistemi Aktif
          </div>
          <h2 style={{ fontSize: "24px", fontWeight: 700, color: "#fff", margin: "0 0 8px" }}>
            Hoş Geldiniz, Okan Bey
          </h2>
          <p style={{ fontSize: "14px", color: "rgba(255, 255, 255, 0.7)", margin: 0, maxWidth: "600px" }}>
            Hastürk Sanat ve Mimarlık web sitesinin tüm görsellerini, slaytlarını, projelerini, metinlerini ve iletişim kanallarını bu panelden anlık olarak güncelleyebilirsiniz.
          </p>
        </div>

        <div style={{ display: "flex", gap: "12px" }}>
          <Link href="/admin/slider" className={styles.btnPrimary}>
            <Sliders size={16} /> Slayt & Hero Düzenle
          </Link>
          <Link href="/admin/projeler" className={styles.btnSecondary}>
            <Plus size={16} /> Yeni Proje Ekle
          </Link>
        </div>
      </div>

      {/* Stats Grid */}
      <div className={styles.statsGrid}>
        {stats.map((s, idx) => (
          <Link
            key={idx}
            href={s.link}
            style={{ textDecoration: "none" }}
            className={styles.statCard}
          >
            <div className={styles.statIconBox}>{s.icon}</div>
            <div>
              <div className={styles.statValue}>{s.value}</div>
              <div className={styles.statLabel}>{s.title}</div>
            </div>
          </Link>
        ))}
      </div>

      {/* Quick Access Modules & Recent Projects */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(400px, 1fr))", gap: "24px" }}>
        {/* Quick Management Links */}
        <div className={styles.card}>
          <div className={styles.cardHeader}>
            <div>
              <h3 className={styles.cardTitle}>
                <Layers size={18} color="#d4af37" /> Hızlı Yönetim Modülleri
              </h3>
              <p className={styles.cardSubtitle}>Sık kullanılan düzenleme alanları</p>
            </div>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
            <Link
              href="/admin/slider"
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "14px 16px",
                borderRadius: "10px",
                backgroundColor: "rgba(255,255,255,0.03)",
                border: "1px solid rgba(255,255,255,0.06)",
                color: "#fff",
                textDecoration: "none",
                fontSize: "13.5px",
                transition: "all 0.2s",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <Sliders size={18} color="#d4af37" />
                <span><b>Hero Slayt & Video:</b> Başlıkları, butonları ve videoları yönet</span>
              </div>
              <ArrowRight size={16} color="rgba(255,255,255,0.4)" />
            </Link>

            <Link
              href="/admin/projeler"
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "14px 16px",
                borderRadius: "10px",
                backgroundColor: "rgba(255,255,255,0.03)",
                border: "1px solid rgba(255,255,255,0.06)",
                color: "#fff",
                textDecoration: "none",
                fontSize: "13.5px",
                transition: "all 0.2s",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <FolderKanban size={18} color="#d4af37" />
                <span><b>Projeler Kataloğu:</b> Portfolyoyu ve restorasyon galerilerini düzenle</span>
              </div>
              <ArrowRight size={16} color="rgba(255,255,255,0.4)" />
            </Link>

            <Link
              href="/admin/oncesi-sonrasi"
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "14px 16px",
                borderRadius: "10px",
                backgroundColor: "rgba(255,255,255,0.03)",
                border: "1px solid rgba(255,255,255,0.06)",
                color: "#fff",
                textDecoration: "none",
                fontSize: "13.5px",
                transition: "all 0.2s",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <Layers size={18} color="#d4af37" />
                <span><b>Öncesi / Sonrası Karşılaştırma:</b> İnteraktif kaydırıcı kartları</span>
              </div>
              <ArrowRight size={16} color="rgba(255,255,255,0.4)" />
            </Link>

            <Link
              href="/admin/kurumsal"
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "14px 16px",
                borderRadius: "10px",
                backgroundColor: "rgba(255,255,255,0.03)",
                border: "1px solid rgba(255,255,255,0.06)",
                color: "#fff",
                textDecoration: "none",
                fontSize: "13.5px",
                transition: "all 0.2s",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <Shield size={18} color="#d4af37" />
                <span><b>Kurucu Mimarın Notu & Hakkımızda:</b> Okan Bey biyografisi ve rakamlar</span>
              </div>
              <ArrowRight size={16} color="rgba(255,255,255,0.4)" />
            </Link>

            <Link
              href="/admin/ayarlar"
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "14px 16px",
                borderRadius: "10px",
                backgroundColor: "rgba(255,255,255,0.03)",
                border: "1px solid rgba(255,255,255,0.06)",
                color: "#fff",
                textDecoration: "none",
                fontSize: "13.5px",
                transition: "all 0.2s",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <Sparkles size={18} color="#d4af37" />
                <span><b>Genel Ayarlar & İletişim:</b> Telefon, WhatsApp, E-posta ve SEO</span>
              </div>
              <ArrowRight size={16} color="rgba(255,255,255,0.4)" />
            </Link>
          </div>
        </div>

        {/* Featured Projects Preview */}
        <div className={styles.card}>
          <div className={styles.cardHeader}>
            <div>
              <h3 className={styles.cardTitle}>
                <FolderKanban size={18} color="#d4af37" /> Portföydeki Son Projeler
              </h3>
              <p className={styles.cardSubtitle}>Yayında olan ana restorasyon eserleri</p>
            </div>
            <Link href="/admin/projeler" style={{ fontSize: "12px", color: "#d4af37", textDecoration: "none" }}>
              Tümünü Gör →
            </Link>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            {content.projects?.slice(0, 4).map((p) => (
              <div
                key={p.id}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "14px",
                  padding: "10px",
                  borderRadius: "10px",
                  backgroundColor: "rgba(255,255,255,0.02)",
                  border: "1px solid rgba(255,255,255,0.05)",
                }}
              >
                <img
                  src={p.image}
                  alt={p.title}
                  style={{
                    width: "56px",
                    height: "56px",
                    borderRadius: "8px",
                    objectFit: "cover",
                  }}
                />
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div
                    style={{
                      fontSize: "13px",
                      fontWeight: 600,
                      color: "#fff",
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                    }}
                  >
                    {p.title}
                  </div>
                  <div style={{ fontSize: "11.5px", color: "#d4af37", marginTop: "2px" }}>
                    {p.category} · {p.year}
                  </div>
                  <div style={{ fontSize: "11px", color: "rgba(255,255,255,0.4)", marginTop: "2px" }}>
                    📍 {p.location}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
