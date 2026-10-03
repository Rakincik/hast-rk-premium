"use client";

import React, { useState } from "react";
import styles from "../admin.module.css";
import { useSiteContent } from "@/context/SiteContentContext";
import { useToast } from "@/components/admin/Toast";
import { QuoteConfig } from "@/lib/types/content";
import {
  Save,
  Calculator,
  Loader2,
  Package,
  Activity,
  MapPin,
  ShieldAlert,
  Trash2,
  Plus,
} from "lucide-react";

export default function AdminQuoteConfigPage() {
  const { content, updateSection } = useSiteContent();
  const { showToast } = useToast();

  const [quoteConfig, setQuoteConfig] = useState<QuoteConfig>(
    content.quoteConfig || ({} as QuoteConfig)
  );
  const [isSaving, setIsSaving] = useState(false);
  const [activeTab, setActiveTab] = useState<
    "project" | "execution" | "materials" | "heritage" | "location"
  >("project");

  const handleSave = async () => {
    try {
      setIsSaving(true);
      const success = await updateSection("quoteConfig", quoteConfig);
      if (success) {
        showToast("Sihirbaz ayarları başarıyla kaydedildi!", "success");
      } else {
        showToast("Kaydedilirken bir hata oluştu.", "error");
      }
    } catch {
      showToast("Sunucu hatası oluştu.", "error");
    } finally {
      setIsSaving(false);
    }
  };

  const updateNestedConfig = (
    category: keyof QuoteConfig,
    key: string,
    field: string,
    value: string | number
  ) => {
    setQuoteConfig((prev) => ({
      ...prev,
      [category]: {
        ...prev[category],
        [key]: {
          // @ts-ignore
          ...prev[category][key],
          [field]: value,
        },
      },
    }));
  };

  const addNestedItem = (category: keyof QuoteConfig, newKey: string, defaultData: any) => {
    if (!newKey.trim()) return;
    const formattedKey = newKey.toLowerCase().replace(/[^a-z0-9_]/g, '_');
    setQuoteConfig((prev) => ({
      ...prev,
      [category]: {
        ...prev[category],
        [formattedKey]: defaultData,
      },
    }));
    showToast(`${newKey} başarıyla eklendi!`, "success");
  };

  const deleteNestedItem = (category: keyof QuoteConfig, keyToDelete: string) => {
    if (!confirm(`Bu öğeyi (${keyToDelete}) silmek istediğinize emin misiniz?`)) return;
    setQuoteConfig((prev) => {
      const updatedCategory = { ...prev[category] } as any;
      delete updatedCategory[keyToDelete];
      return {
        ...prev,
        [category]: updatedCategory,
      };
    });
    showToast(`Öğe silindi!`, "info");
  };

  return (
    <div>
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
            Teklif Sihirbazı & Maliyet Motoru
          </h2>
          <p style={{ fontSize: "13px", color: "rgba(255,255,255,0.5)", margin: 0 }}>
            Paket fiyat çarpanlarını, malzeme ve konum bazlı maliyet faktörlerini düzenleyin.
          </p>
        </div>

        <button
          type="button"
          onClick={handleSave}
          disabled={isSaving}
          className={styles.btnPrimary}
        >
          {isSaving ? <Loader2 size={16} className="animate-spin" /> : <Save size={16} />}
          <span>Yayına Al & Kaydet</span>
        </button>
      </div>

      {/* Tabs */}
      <div
        style={{
          display: "flex",
          gap: "10px",
          marginBottom: "20px",
          borderBottom: "1px solid rgba(255,255,255,0.08)",
          paddingBottom: "12px",
          overflowX: "auto",
        }}
      >
        <TabButton
          active={activeTab === "project"}
          onClick={() => setActiveTab("project")}
          icon={<Package size={16} />}
          label="Proje Paketleri"
        />
        <TabButton
          active={activeTab === "execution"}
          onClick={() => setActiveTab("execution")}
          icon={<Package size={16} />}
          label="Uygulama Paketleri"
        />
        <TabButton
          active={activeTab === "materials"}
          onClick={() => setActiveTab("materials")}
          icon={<Calculator size={16} />}
          label="Malzeme Çarpanları"
        />
        <TabButton
          active={activeTab === "heritage"}
          onClick={() => setActiveTab("heritage")}
          icon={<ShieldAlert size={16} />}
          label="Tescil Çarpanları"
        />
        <TabButton
          active={activeTab === "location"}
          onClick={() => setActiveTab("location")}
          icon={<MapPin size={16} />}
          label="Bölge Çarpanları"
        />
      </div>

      {/* Content */}
      <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
        {activeTab === "project" && quoteConfig.projectPackageTiers && (
          <PackagesEditor
            data={quoteConfig.projectPackageTiers}
            category="projectPackageTiers"
            updateNestedConfig={updateNestedConfig}
            deleteNestedItem={deleteNestedItem}
            addNestedItem={addNestedItem}
          />
        )}
        {activeTab === "execution" && quoteConfig.executionPackageTiers && (
          <PackagesEditor
            data={quoteConfig.executionPackageTiers}
            category="executionPackageTiers"
            updateNestedConfig={updateNestedConfig}
            deleteNestedItem={deleteNestedItem}
            addNestedItem={addNestedItem}
          />
        )}
        {activeTab === "materials" && quoteConfig.materialFactors && (
          <FactorsEditor
            data={quoteConfig.materialFactors}
            category="materialFactors"
            updateNestedConfig={updateNestedConfig}
            deleteNestedItem={deleteNestedItem}
            addNestedItem={addNestedItem}
          />
        )}
        {activeTab === "heritage" && quoteConfig.heritageFactors && (
          <FactorsEditor
            data={quoteConfig.heritageFactors}
            category="heritageFactors"
            updateNestedConfig={updateNestedConfig}
            deleteNestedItem={deleteNestedItem}
            addNestedItem={addNestedItem}
          />
        )}
        {activeTab === "location" && quoteConfig.locationFactors && (
          <LocationFactorsEditor
            data={quoteConfig.locationFactors}
            category="locationFactors"
            updateNestedConfig={updateNestedConfig}
            deleteNestedItem={deleteNestedItem}
            addNestedItem={addNestedItem}
          />
        )}
      </div>
    </div>
  );
}

function TabButton({ active, onClick, icon, label }: any) {
  return (
    <button
      onClick={onClick}
      style={{
        display: "flex",
        alignItems: "center",
        gap: "6px",
        padding: "8px 16px",
        borderRadius: "8px",
        backgroundColor: active ? "rgba(212, 175, 55, 0.1)" : "transparent",
        border: `1px solid ${active ? "rgba(212, 175, 55, 0.3)" : "transparent"}`,
        color: active ? "#d4af37" : "rgba(255,255,255,0.6)",
        cursor: "pointer",
        fontWeight: active ? 600 : 400,
        transition: "all 0.2s",
        whiteSpace: "nowrap",
      }}
    >
      {icon}
      {label}
    </button>
  );
}

function PackagesEditor({ data, category, updateNestedConfig, deleteNestedItem, addNestedItem }: any) {
  const keyMap: any = {
    basic: "Temel Paket",
    comprehensive: "Kapsamlı Paket",
    turnkey: "Anahtar Teslim",
  };

  return (
    <div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(340px, 1fr))", gap: "20px", marginBottom: "20px" }}>
        {Object.keys(data).map((key) => {
          const item = data[key];
          return (
            <div key={key} className={styles.card} style={{ padding: "24px", position: "relative", overflow: "hidden" }}>
              <div style={{ position: "absolute", top: -10, right: -10, opacity: 0.05, transform: "scale(2.5)" }}>
                <Package size={80} />
              </div>
              <button 
                onClick={() => deleteNestedItem(category, key)}
                style={{ position: "absolute", top: "20px", right: "20px", background: "none", border: "none", color: "rgba(239, 68, 68, 0.7)", cursor: "pointer", zIndex: 10 }}
                title="Paketi Sil"
              >
                <Trash2 size={18} />
              </button>
              <h3 style={{ margin: "0 0 20px", color: "#d4af37", fontSize: "17px", display: "flex", alignItems: "center", gap: "8px" }}>
                <Package size={18} /> {keyMap[key] || key.toUpperCase()}
              </h3>
              <div style={{ display: "flex", flexDirection: "column", gap: "16px", position: "relative", zIndex: 1 }}>
                <div className={styles.formGroup}>
                  <label className={styles.formLabel}>Paket Adı (Formda Görünen)</label>
                  <input
                    type="text"
                    value={item.name}
                    onChange={(e) => updateNestedConfig(category, key, "name", e.target.value)}
                    className={styles.formInput}
                  />
                </div>
                <div className={styles.formGroup}>
                  <label className={styles.formLabel}>Slogan / Tagline</label>
                  <input
                    type="text"
                    value={item.tagline}
                    onChange={(e) => updateNestedConfig(category, key, "tagline", e.target.value)}
                    className={styles.formInput}
                  />
                </div>
                <div className={styles.formGroup}>
                  <label className={styles.formLabel}>Fiyat Çarpanı (Örn: 1.25)</label>
                  <input
                    type="number"
                    step="0.01"
                    value={item.multiplier}
                    onChange={(e) =>
                      updateNestedConfig(category, key, "multiplier", parseFloat(e.target.value))
                    }
                    className={styles.formInput}
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <button 
        onClick={() => {
          const name = prompt("Yeni Paket Adı girin (Örn: ultra_premium):");
          if (name) addNestedItem(category, name, { name: "Yeni Paket", tagline: "Mükemmel hizmet", multiplier: 1.0 });
        }}
        className={styles.btnSecondary}
        style={{ width: "fit-content", display: "flex", alignItems: "center", gap: "8px" }}
      >
        <Plus size={16} /> Yeni Paket Ekle
      </button>
    </div>
  );
}

function FactorsEditor({ data, category, updateNestedConfig, deleteNestedItem, addNestedItem }: any) {
  const isHeritage = category === "heritageFactors";
  return (
    <div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(380px, 1fr))", gap: "20px", marginBottom: "20px" }}>
        {Object.keys(data).map((key) => {
          const item = data[key];
          return (
            <div key={key} className={styles.card} style={{ padding: "24px", position: "relative", overflow: "hidden" }}>
              <div style={{ position: "absolute", top: -10, right: -10, opacity: 0.05, transform: "scale(2.5)" }}>
                {isHeritage ? <ShieldAlert size={80} /> : <Calculator size={80} />}
              </div>
              <button 
                onClick={() => deleteNestedItem(category, key)}
                style={{ position: "absolute", top: "20px", right: "20px", background: "none", border: "none", color: "rgba(239, 68, 68, 0.7)", cursor: "pointer", zIndex: 10 }}
                title="Sil"
              >
                <Trash2 size={18} />
              </button>
              <h3 style={{ margin: "0 0 20px", color: "#d4af37", fontSize: "17px", display: "flex", alignItems: "center", gap: "8px" }}>
                {isHeritage ? <ShieldAlert size={18} /> : <Calculator size={18} />} 
                ID: {key.toUpperCase()}
              </h3>
              <div style={{ display: "flex", flexDirection: "column", gap: "16px", position: "relative", zIndex: 1 }}>
                <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: "16px" }}>
                  <div className={styles.formGroup}>
                    <label className={styles.formLabel}>Etiket / Başlık</label>
                    <input
                      type="text"
                      value={item.label}
                      onChange={(e) => updateNestedConfig(category, key, "label", e.target.value)}
                      className={styles.formInput}
                    />
                  </div>
                  <div className={styles.formGroup}>
                    <label className={styles.formLabel}>Fiyat Çarpanı</label>
                    <input
                      type="number"
                      step="0.01"
                      value={item.factor}
                      onChange={(e) =>
                        updateNestedConfig(category, key, "factor", parseFloat(e.target.value))
                      }
                      className={styles.formInput}
                    />
                  </div>
                </div>
                <div className={styles.formGroup}>
                  <label className={styles.formLabel}>Açıklama</label>
                  <input
                    type="text"
                    value={item.desc}
                    onChange={(e) => updateNestedConfig(category, key, "desc", e.target.value)}
                    className={styles.formInput}
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <button 
        onClick={() => {
          const name = prompt("Yeni Çarpan ID girin (Örn: ahsap_yapi, grade_3):");
          if (name) addNestedItem(category, name, { label: "Yeni Çarpan", desc: "Açıklama", factor: 1.0 });
        }}
        className={styles.btnSecondary}
        style={{ width: "fit-content", display: "flex", alignItems: "center", gap: "8px" }}
      >
        <Plus size={16} /> Yeni Çarpan Ekle
      </button>
    </div>
  );
}

function LocationFactorsEditor({ data, category, updateNestedConfig, deleteNestedItem, addNestedItem }: any) {
  return (
    <div>
      <div style={{ display: "flex", flexDirection: "column", gap: "20px", marginBottom: "20px" }}>
        {Object.keys(data).map((key) => {
          const item = data[key];
          return (
            <div key={key} className={styles.card} style={{ padding: "24px", position: "relative", overflow: "hidden" }}>
              <div style={{ position: "absolute", top: -20, right: -10, opacity: 0.05, transform: "scale(3)" }}>
                <MapPin size={80} />
              </div>
              <button 
                onClick={() => deleteNestedItem(category, key)}
                style={{ position: "absolute", top: "20px", right: "20px", background: "none", border: "none", color: "rgba(239, 68, 68, 0.7)", cursor: "pointer", zIndex: 10 }}
                title="Bölgeyi Sil"
              >
                <Trash2 size={18} />
              </button>
              <h3 style={{ margin: "0 0 20px", color: "#d4af37", fontSize: "17px", display: "flex", alignItems: "center", gap: "8px" }}>
                <MapPin size={18} /> {key.replace("istanbul_", "İstanbul ").toUpperCase()}
              </h3>
              
              <div style={{ display: "flex", flexDirection: "column", gap: "16px", position: "relative", zIndex: 1 }}>
                <div style={{ display: "grid", gridTemplateColumns: "3fr 1fr", gap: "16px" }}>
                  <div className={styles.formGroup}>
                    <label className={styles.formLabel}>Bölge Etiketi & İlçe Listesi</label>
                    <input
                      type="text"
                      value={item.label}
                      onChange={(e) => updateNestedConfig(category, key, "label", e.target.value)}
                      className={styles.formInput}
                    />
                  </div>
                  <div className={styles.formGroup}>
                    <label className={styles.formLabel}>Fiyat Çarpanı</label>
                    <input
                      type="number"
                      step="0.01"
                      value={item.factor}
                      onChange={(e) =>
                        updateNestedConfig(category, key, "factor", parseFloat(e.target.value))
                      }
                      className={styles.formInput}
                    />
                  </div>
                </div>
                <div className={styles.formGroup}>
                  <label className={styles.formLabel}>İlgili Kültür Varlıklarını Koruma Bölge Kurulu Adı</label>
                  <input
                    type="text"
                    value={item.boardName}
                    onChange={(e) => updateNestedConfig(category, key, "boardName", e.target.value)}
                    className={styles.formInput}
                  />
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 3fr", gap: "16px" }}>
                  <div className={styles.formGroup}>
                    <label className={styles.formLabel}>Tahmini Kurul Süresi</label>
                    <input
                      type="text"
                      value={item.boardDuration}
                      onChange={(e) => updateNestedConfig(category, key, "boardDuration", e.target.value)}
                      className={styles.formInput}
                      placeholder="Örn: 12-16 Hafta"
                    />
                  </div>
                  <div className={styles.formGroup}>
                    <label className={styles.formLabel}>Kurul veya Bölge Açıklaması</label>
                    <input
                      type="text"
                      value={item.desc}
                      onChange={(e) => updateNestedConfig(category, key, "desc", e.target.value)}
                      className={styles.formInput}
                    />
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <button 
        onClick={() => {
          const name = prompt("Yeni Bölge ID girin (Örn: istanbul_kadikoy, ankara_merkez):");
          if (name) addNestedItem(category, name, { label: "Yeni Bölge (İlçeler...)", factor: 1.0, boardName: "Kültür Varlıklarını Koruma Kurulu", boardDuration: "12 Hafta", desc: "Açıklama" });
        }}
        className={styles.btnSecondary}
        style={{ width: "fit-content", display: "flex", alignItems: "center", gap: "8px" }}
      >
        <Plus size={16} /> Yeni Bölge Ekle
      </button>
    </div>
  );
}
