"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import styles from "./admin.module.css";
import { ToastProvider, useToast } from "@/components/admin/Toast";
import {
  LayoutDashboard,
  Sliders,
  FolderKanban,
  ArrowLeftRight,
  Wrench,
  Building,
  Users,
  BookOpen,
  HelpCircle,
  Image as ImageIcon,
  Settings,
  ExternalLink,
  LogOut,
  ShieldCheck,
  Loader2,
} from "lucide-react";

interface AdminLayoutContentProps {
  children: React.ReactNode;
}

function AdminLayoutContent({ children }: AdminLayoutContentProps) {
  const pathname = usePathname();
  const router = useRouter();
  const { showToast } = useToast();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  const isLoginPage = pathname === "/admin/login";

  useEffect(() => {
    async function checkAuth() {
      if (isLoginPage) {
        setIsAuthenticated(true);
        return;
      }

      try {
        const res = await fetch("/api/admin/auth");
        if (res.ok) {
          setIsAuthenticated(true);
        } else {
          setIsAuthenticated(false);
          router.replace("/admin/login");
        }
      } catch {
        setIsAuthenticated(false);
        router.replace("/admin/login");
      }
    }

    checkAuth();
  }, [pathname, isLoginPage, router]);

  const handleLogout = async () => {
    try {
      await fetch("/api/admin/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "logout" }),
      });
      showToast("Başarıyla çıkış yapıldı", "info");
      router.replace("/admin/login");
    } catch {
      router.replace("/admin/login");
    }
  };

  if (isLoginPage) {
    return <>{children}</>;
  }

  if (isAuthenticated === null) {
    return (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "100vh",
          backgroundColor: "#08080b",
          color: "#d4af37",
          flexDirection: "column",
          gap: "14px",
        }}
      >
        <Loader2 size={36} className="animate-spin" />
        <span style={{ fontSize: "14px", color: "rgba(255,255,255,0.6)" }}>
          Yönetici Paneli Yükleniyor...
        </span>
      </div>
    );
  }

  const navLinks = [
    { title: "Dashboard", href: "/admin", icon: <LayoutDashboard size={18} /> },
    { title: "Hero & Slaytlar", href: "/admin/slider", icon: <Sliders size={18} /> },
    { title: "Projeler CMS", href: "/admin/projeler", icon: <FolderKanban size={18} /> },
    { title: "Öncesi / Sonrası", href: "/admin/oncesi-sonrasi", icon: <ArrowLeftRight size={18} /> },
    { title: "Hizmetler", href: "/admin/hizmetler", icon: <Wrench size={18} /> },
    { title: "Kurumsal & Kurucu", href: "/admin/kurumsal", icon: <Building size={18} /> },
    { title: "Ekip Kadrosu", href: "/admin/ekip", icon: <Users size={18} /> },
    { title: "Mimari Journal", href: "/admin/journal", icon: <BookOpen size={18} /> },
    { title: "SSS (Sorular)", href: "/admin/faq", icon: <HelpCircle size={18} /> },
    { title: "Medya Kütüphanesi", href: "/admin/medya", icon: <ImageIcon size={18} /> },
    { title: "Genel Ayarlar & SEO", href: "/admin/ayarlar", icon: <Settings size={18} /> },
  ];

  return (
    <div className={styles.adminRoot}>
      {/* Sidebar */}
      <aside className={styles.sidebar}>
        <div className={styles.sidebarBrand}>
          <img src="/logo-gold.png" alt="Hastürk Logo" className={styles.brandLogo} />
          <div className={styles.brandInfo}>
            <h2>HASTÜRK</h2>
            <span>Yönetim Paneli</span>
          </div>
        </div>

        <nav className={styles.sidebarNav}>
          <div className={styles.navSectionTitle}>İçerik Yönetimi</div>
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`${styles.navItem} ${isActive ? styles.navItemActive : ""}`}
              >
                {link.icon}
                <span>{link.title}</span>
              </Link>
            );
          })}
        </nav>

        <div className={styles.sidebarFooter}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              padding: "6px 8px",
            }}
          >
            <ShieldCheck size={16} color="#d4af37" />
            <span style={{ fontSize: "12px", color: "rgba(255,255,255,0.6)" }}>
              Admin: <b>Okan Hastürk</b>
            </span>
          </div>
        </div>
      </aside>

      {/* Main Area */}
      <div className={styles.mainWrapper}>
        <header className={styles.topbar}>
          <h1 className={styles.pageHeaderTitle}>
            Hastürk Sanat ve Mimarlık · CMS Kontrol Merkezi
          </h1>
          <div className={styles.topbarActions}>
            <Link href="/" target="_blank" className={styles.viewSiteBtn}>
              <ExternalLink size={15} />
              <span>Siteyi Canlı Gör</span>
            </Link>
            <button onClick={handleLogout} className={styles.logoutBtn}>
              <LogOut size={15} />
              <span>Çıkış Yap</span>
            </button>
          </div>
        </header>

        <main className={styles.contentContainer}>{children}</main>
      </div>
    </div>
  );
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <ToastProvider>
      <AdminLayoutContent>{children}</AdminLayoutContent>
    </ToastProvider>
  );
}
