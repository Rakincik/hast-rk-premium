"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import styles from "./HomeQuoteTeaser.module.css";
import { 
  Building2, 
  PenTool, 
  ShieldCheck, 
  ArrowRight, 
  CheckCircle2, 
  Calculator, 
  MessageCircle, 
  Hammer,
  Landmark,
  Wrench
} from "lucide-react";
import { 
  ServiceDomain,
  ProjectType, 
  BuildingMaterial, 
  calculateQuote, 
  formatCurrencyTL, 
  getServicesForType 
} from "@/lib/quoteEngine";

export default function HomeQuoteTeaser() {
  const [domain, setDomain] = useState<ServiceDomain>("project");
  const [projectType, setProjectType] = useState<ProjectType>("restoration");
  const [area, setArea] = useState<number>(300);
  const [material, setMaterial] = useState<BuildingMaterial>("stone_masonry");

  // Domain değiştiğinde tipi otomatik uyarla
  const handleDomainChange = (newDomain: ServiceDomain) => {
    setDomain(newDomain);
    if (newDomain === "execution") {
      setProjectType("exec_restoration");
    } else {
      setProjectType("restoration");
    }
  };

  // Hesaplama motoru
  const quoteResult = useMemo(() => {
    const recommendedServices = getServicesForType(projectType, domain)
      .filter((s) => s.isRecommended)
      .map((s) => s.id);

    return calculateQuote({
      domain,
      projectType,
      areaSquareMeters: area,
      buildingMaterial: material,
      heritageStatus: "grade_2",
      locationArea: "istanbul_fatih",
      selectedServices: recommendedServices,
      hasLand: "yes",
    });
  }, [domain, projectType, area, material]);

  // Proje Hizmeti Kategorileri (3'lü)
  const projectTypeLabels: Record<
    "restoration" | "new_architecture" | "strengthening",
    { title: string; icon: React.ReactNode }
  > = {
    restoration: {
      title: "Eski Eser (2863)",
      icon: <Landmark size={20} strokeWidth={1.5} />,
    },
    new_architecture: {
      title: "Yeni Mimari Tasarım",
      icon: <Building2 size={20} strokeWidth={1.5} />,
    },
    strengthening: {
      title: "Statik Güçlendirme",
      icon: <ShieldCheck size={20} strokeWidth={1.5} />,
    },
  };

  // Uygulama Hizmeti Kategorileri (4'lü)
  const executionTypeLabels: Record<
    "exec_restoration" | "exec_new" | "exec_renovation" | "exec_strengthening",
    { title: string; icon: React.ReactNode }
  > = {
    exec_restoration: {
      title: "Tarihi Restorasyon",
      icon: <Landmark size={20} strokeWidth={1.5} />,
    },
    exec_new: {
      title: "Yeni Yapı İnşaatı",
      icon: <Building2 size={20} strokeWidth={1.5} />,
    },
    exec_renovation: {
      title: "Tadilat & Tamirat",
      icon: <Wrench size={20} strokeWidth={1.5} />,
    },
    exec_strengthening: {
      title: "Güçlendirme İmalatı",
      icon: <ShieldCheck size={20} strokeWidth={1.5} />,
    },
  };

  const materialLabels: Record<BuildingMaterial, string> = {
    stone_masonry: "Yığma Taş / Kagir",
    wood: "Geleneksel Ahşap",
    composite: "Karma (Bağdadi/Taş)",
    concrete: "Betonarme",
  };

  const typeTitleMap: Record<ProjectType, string> = {
    restoration: "Eski Eser Restorasyon Projesi (2863)",
    new_architecture: "Yeni Yapı Mimari Tasarım & Ruhsat",
    strengthening: "Statik Güçlendirme Projesi",
    exec_restoration: "Tarihi Yapı Restorasyon Uygulaması",
    exec_new: "Yeni Yapı İnşaat Uygulaması",
    exec_renovation: "Tadilat & Tamirat Uygulaması",
    exec_strengthening: "Statik Güçlendirme Uygulaması",
  };

  const whatsappMsg = encodeURIComponent(
    `Merhaba Hastürk Mimarlık, anasayfa hesaplama motorunuz üzerinden teklif simülasyonu oluşturdum:\n\n` +
    `• Hizmet Alanı: ${domain === 'execution' ? 'Uygulama & Şantiye İmalatı' : 'Mimari & Mühendislik Proje Hizmeti'}\n` +
    `• Kategori: ${typeTitleMap[projectType]}\n` +
    `• Yapı Alanı: ${area} m²\n` +
    `• Strüktür: ${materialLabels[material]}\n` +
    `• Bakanlık Yaklaşık Maliyeti: ${formatCurrencyTL(quoteResult.totalEstimatedCost)}\n` +
    `• Tahmini Hesaplanan Bedel: ~${formatCurrencyTL(quoteResult.packageFees.comprehensive)}\n\n` +
    `Detaylı resmi keşif ve teklif dosyası için görüşmek istiyorum.`
  );

  return (
    <section className={`section ${styles.section}`}>
      <div className="container">
        <motion.div 
          className={styles.header}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
        >
          <span className={styles.tagline}>Resmî Gazete: 33157 Tebliği & TMMOB Normları</span>
          <h2 className={styles.title}>
            ÇŞİDB 2026 Birim Maliyetleri & <br />
            <span className="text-gold">Akıllı Mimari Teklif Motoru</span>
          </h2>
          <p className={styles.subtitle}>
            Çevre, Şehircilik ve İklim Değişikliği Bakanlığı 2026 Yapı Yaklaşık Birim Maliyetleri ve TMMOB yasal taban formülleriyle projenizi saniyeler içinde hesaplayın.
          </p>
        </motion.div>

        <motion.div 
          className={styles.calculatorCard}
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {/* Controls Column */}
          <div className={styles.inputsCol}>
            
            {/* 1. Hizmet Alanı Segmented Switcher (Proje vs Uygulama) */}
            <div>
              <label className={styles.label} style={{ marginBottom: "0.6rem" }}>
                <span>1. Hizmet Alanını Belirleyin</span>
              </label>
              <div className={styles.domainSegmentedControl}>
                <button
                  type="button"
                  className={`${styles.domainSegmentBtn} ${domain === "project" ? styles.domainSegmentBtnActive : ""}`}
                  onClick={() => handleDomainChange("project")}
                >
                  <PenTool size={17} />
                  <span>Mimari & Statik Proje</span>
                  <span className={styles.domainSegmentTag}>TMMOB</span>
                </button>
                <button
                  type="button"
                  className={`${styles.domainSegmentBtn} ${domain === "execution" ? styles.domainSegmentBtnActive : ""}`}
                  onClick={() => handleDomainChange("execution")}
                >
                  <Hammer size={17} />
                  <span>Şantiye Uygulaması</span>
                  <span className={styles.domainSegmentTag}>ÇŞİDB 2026</span>
                </button>
              </div>
            </div>

            {/* 2. Kategori Seçimi */}
            <div className={styles.formGroup}>
              <label className={styles.label}>
                <span>2. {domain === "project" ? "Projelendirme Kategorisi" : "Şantiye & Uygulama Alanı"}</span>
              </label>

              {domain === "project" ? (
                <div className={styles.typeSelector}>
                  {(Object.keys(projectTypeLabels) as ("restoration" | "new_architecture" | "strengthening")[]).map((type) => (
                    <button
                      key={type}
                      type="button"
                      className={`${styles.typeBtn} ${projectType === type ? styles.typeBtnActive : ""}`}
                      onClick={() => setProjectType(type)}
                    >
                      {projectTypeLabels[type].icon}
                      <span>{projectTypeLabels[type].title}</span>
                    </button>
                  ))}
                </div>
              ) : (
                <div className={styles.typeSelector4}>
                  {(Object.keys(executionTypeLabels) as ("exec_restoration" | "exec_new" | "exec_renovation" | "exec_strengthening")[]).map((type) => (
                    <button
                      key={type}
                      type="button"
                      className={`${styles.typeBtn} ${projectType === type ? styles.typeBtnActive : ""}`}
                      onClick={() => setProjectType(type)}
                    >
                      {executionTypeLabels[type].icon}
                      <span>{executionTypeLabels[type].title}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* 3. Area Slider */}
            <div className={styles.formGroup}>
              <div className={styles.label}>
                <span>3. Toplam İnşaat / Kapalı Alan:</span>
                <span className={styles.sliderValue}>{area} m²</span>
              </div>
              <div className={styles.sliderContainer}>
                <input 
                  type="range"
                  min={50}
                  max={1500}
                  step={25}
                  value={area}
                  onChange={(e) => setArea(Number(e.target.value))}
                  className={styles.rangeInput}
                  aria-label="Yapı Alanı m2"
                />
              </div>
            </div>

            {/* 4. Material */}
            <div className={styles.formGroup}>
              <label className={styles.label}>
                <span>4. Mevcut / Hedef Yapı Strüktürü</span>
              </label>
              <div className={styles.materialSelector}>
                {(Object.keys(materialLabels) as BuildingMaterial[]).map((mat) => (
                  <button
                    key={mat}
                    type="button"
                    className={`${styles.materialBtn} ${material === mat ? styles.materialBtnActive : ""}`}
                    onClick={() => setMaterial(mat)}
                  >
                    {materialLabels[mat]}
                  </button>
                ))}
              </div>
            </div>

          </div>

          {/* Result Output Column */}
          <div className={styles.resultsCol}>
            <div>
              <span className={styles.resultTitle}>
                {domain === "execution" ? "Tahmini Uygulama Bedeli" : "Tahmini Mimari & Mühendislik Bedeli"}
              </span>
              <div className={styles.mainFee}>
                {formatCurrencyTL(quoteResult.packageFees.comprehensive)}
              </div>
              <p className={styles.mainFeeDesc}>
                {domain === "execution" 
                  ? `*ÇŞİDB 2026 ${quoteResult.ministryClass.name} reel uygulama rayiçleri esas alınmıştır.`
                  : `*TMMOB 2026 Mimarlar Odası asgari bedel normları esas alınmıştır.`}
              </p>
            </div>

            <div className={styles.statsRow}>
              <div className={styles.statItem}>
                <span className={styles.statLabel}>
                  {domain === "execution" ? "Hesaplanan Yapı Maliyeti:" : "Bakanlık Yaklaşık Mal. (PYM):"}
                </span>
                <span className={styles.statVal}>{formatCurrencyTL(quoteResult.totalEstimatedCost)}</span>
              </div>
              <div className={styles.statItem}>
                <span className={styles.statLabel}>Mevzuat Standartı:</span>
                <span className={styles.statVal} style={{ fontSize: "0.85rem", color: "var(--accent-gold)" }}>
                  {quoteResult.showConservationBoard 
                    ? "2863 Sayılı Kanun & Koruma Kurulu" 
                    : (domain === "execution" ? "1. Sınıf Şantiye Şefliği" : "Belediye Ruhsat Normu")}
                </span>
              </div>
            </div>

            <div className={styles.includedFeatures}>
              {domain === "execution" ? (
                <>
                  <div className={styles.featureItem}>
                    <CheckCircle2 size={16} className={styles.checkIcon} />
                    <span>Anahtar Teslim Şantiye Yönetimi & Fenni Mesuliyet</span>
                  </div>
                  <div className={styles.featureItem}>
                    <CheckCircle2 size={16} className={styles.checkIcon} />
                    <span>ÇŞİDB ve TSE Onaylı 1. Sınıf Malzeme Güvencesi</span>
                  </div>
                  <div className={styles.featureItem}>
                    <CheckCircle2 size={16} className={styles.checkIcon} />
                    <span>Aşamalı Hakediş ve Resmi Şantiye Günlüğü Takibi</span>
                  </div>
                </>
              ) : (
                <>
                  <div className={styles.featureItem}>
                    <CheckCircle2 size={16} className={styles.checkIcon} />
                    <span>3D Lazer Lidar Tarama & Nokta Bulutu Modelleme</span>
                  </div>
                  <div className={styles.featureItem}>
                    <CheckCircle2 size={16} className={styles.checkIcon} />
                    <span>{quoteResult.showConservationBoard ? "Kültür Varlıkları Koruma Kurulu Dosya Yönetimi" : "Belediye Ruhsat & Statik Onay Projeleri"}</span>
                  </div>
                  <div className={styles.featureItem}>
                    <CheckCircle2 size={16} className={styles.checkIcon} />
                    <span>Milimetrik Hasar Analizi ve Resmi Rölöve Raporu</span>
                  </div>
                </>
              )}
            </div>

            <div className={styles.actionBtns}>
              <Link href={`/teklif-al?type=${projectType}`} className={styles.primaryCta}>
                <Calculator size={18} />
                <span>Detaylı Rapor & Teklif Al</span>
                <ArrowRight size={18} />
              </Link>
              
              <a 
                href={`https://wa.me/905404278875?text=${whatsappMsg}`}
                target="_blank"
                rel="noreferrer"
                className={styles.secondaryCta}
              >
                <MessageCircle size={17} style={{ color: "#25D366" }} />
                <span>Bu Hesaplamayı WhatsApp ile Danış</span>
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
