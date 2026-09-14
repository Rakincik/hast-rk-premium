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
import { useLanguage } from "@/context/LanguageContext";

export default function HomeQuoteTeaser() {
  const { t, language } = useLanguage();
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
      title: language === "en" ? "Historic Landmark (2863)" :
             language === "de" ? "Denkmalgeschützt (2863)" :
             language === "ar" ? "الآثار التاريخية (2863)" :
             "Eski Eser (2863)",
      icon: <Landmark size={20} strokeWidth={1.5} />,
    },
    new_architecture: {
      title: language === "en" ? "New Architecture" :
             language === "de" ? "Neubauentwurf" :
             language === "ar" ? "تصميم معماري جديد" :
             "Yeni Mimari Tasarım",
      icon: <Building2 size={20} strokeWidth={1.5} />,
    },
    strengthening: {
      title: language === "en" ? "Structural Strengthening" :
             language === "de" ? "Tragwerksverstärkung" :
             language === "ar" ? "تدعيم إنشائي" :
             "Statik Güçlendirme",
      icon: <ShieldCheck size={20} strokeWidth={1.5} />,
    },
  };

  // Uygulama Hizmeti Kategorileri (4'lü)
  const executionTypeLabels: Record<
    "exec_restoration" | "exec_new" | "exec_renovation" | "exec_strengthening",
    { title: string; icon: React.ReactNode }
  > = {
    exec_restoration: {
      title: language === "en" ? "Heritage Restoration" :
             language === "de" ? "Denkmalrestaurierung" :
             language === "ar" ? "ترميم تراثي" :
             "Tarihi Restorasyon",
      icon: <Landmark size={20} strokeWidth={1.5} />,
    },
    exec_new: {
      title: language === "en" ? "New Construction" :
             language === "de" ? "Neubauausführung" :
             language === "ar" ? "إنشاء مباني جديدة" :
             "Yeni Yapı İnşaatı",
      icon: <Building2 size={20} strokeWidth={1.5} />,
    },
    exec_renovation: {
      title: language === "en" ? "Renovation & Repair" :
             language === "de" ? "Sanierung & Reparatur" :
             language === "ar" ? "تجديد وترميم" :
             "Tadilat & Tamirat",
      icon: <Wrench size={20} strokeWidth={1.5} />,
    },
    exec_strengthening: {
      title: language === "en" ? "Strengthening Works" :
             language === "de" ? "Verstärkungsarbeiten" :
             language === "ar" ? "أعمال التدعيم الإنشائي" :
             "Güçlendirme İmalatı",
      icon: <ShieldCheck size={20} strokeWidth={1.5} />,
    },
  };

  const materialLabels: Record<BuildingMaterial, string> = {
    stone_masonry: language === "en" ? "Stone Masonry / Brick" :
                   language === "de" ? "Natursteinmauerwerk / Ziegel" :
                   language === "ar" ? "حجر طبيعي / قرميد" :
                   "Yığma Taş / Kagir",
    wood: language === "en" ? "Traditional Timber" :
          language === "de" ? "Historisches Holz" :
          language === "ar" ? "خشب تقليدي" :
          "Geleneksel Ahşap",
    composite: language === "en" ? "Composite / Baghdadi" :
               language === "de" ? "Verbundbauweise / Baghdadi" :
               language === "ar" ? "مختلط (بغدادي وحجر)" :
               "Karma (Bağdadi/Taş)",
    concrete: language === "en" ? "Reinforced Concrete" :
              language === "de" ? "Stahlbeton" :
              language === "ar" ? "خرسانة مسلحة" :
              "Betonarme",
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
          <span className={styles.tagline}>{t("calc_badge", "Resmî Gazete: 33157 Tebliği & TMMOB Normları")}</span>
          <h2 className={styles.title}>
            {t("calc_title_1", "ÇŞİDB 2026 Birim Maliyetleri &")} <br />
            <span className="text-gold">{t("calc_title_2", "Akıllı Mimari Teklif Motoru")}</span>
          </h2>
          <p className={styles.subtitle}>
            {t("calc_subtitle", "Çevre, Şehircilik ve İklim Değişikliği Bakanlığı 2026 Yapı Yaklaşık Birim Maliyetleri ve TMMOB yasal taban formülleriyle projenizi saniyeler içinde hesaplayın.")}
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
                <span>{t("calc_step_1", "1. Hizmet Alanını Belirleyin")}</span>
              </label>
              <div className={styles.domainSegmentedControl}>
                <button
                  type="button"
                  className={`${styles.domainSegmentBtn} ${domain === "project" ? styles.domainSegmentBtnActive : ""}`}
                  onClick={() => handleDomainChange("project")}
                >
                  <PenTool size={17} />
                  <span>{t("calc_domain_project", "Mimari & Statik Proje")}</span>
                  <span className={styles.domainSegmentTag}>TMMOB</span>
                </button>
                <button
                  type="button"
                  className={`${styles.domainSegmentBtn} ${domain === "execution" ? styles.domainSegmentBtnActive : ""}`}
                  onClick={() => handleDomainChange("execution")}
                >
                  <Hammer size={17} />
                  <span>{t("calc_domain_exec", "Şantiye Uygulaması")}</span>
                  <span className={styles.domainSegmentTag}>ÇŞİDB 2026</span>
                </button>
              </div>
            </div>

            {/* 2. Kategori Seçimi */}
            <div className={styles.formGroup}>
              <label className={styles.label}>
                <span>{domain === "project" ? t("calc_step_2_proj", "2. Projelendirme Kategorisi") : t("calc_step_2_exec", "2. Şantiye & Uygulama Alanı")}</span>
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
                <span>{t("calc_step_3", "3. Toplam İnşaat / Kapalı Alan:")}</span>
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
                <span>{t("calc_step_4", "4. Mevcut / Hedef Yapı Strüktürü")}</span>
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
                {domain === "execution" 
                  ? t("calc_result_exec_title", "Tahmini Uygulama Bedeli") 
                  : t("calc_result_proj_title", "Tahmini Mimari & Mühendislik Bedeli")}
              </span>
              <div className={styles.mainFee}>
                {formatCurrencyTL(quoteResult.packageFees.comprehensive)}
              </div>
              <p className={styles.mainFeeDesc}>
                {domain === "execution" 
                  ? (language === "en" ? `*Based on Ministry of Environment 2026 ${quoteResult.ministryClass.name} construction market rates.` :
                     language === "de" ? `*Basiert auf den aktuellen behördlichen Baukostensätzen 2026 für ${quoteResult.ministryClass.name}.` :
                     language === "ar" ? `*وفقاً للأسعار الرسمية لوزارة البيئة والإسكان 2026 لفئة ${quoteResult.ministryClass.name}.` :
                     `*ÇŞİDB 2026 ${quoteResult.ministryClass.name} reel uygulama rayiçleri esas alınmıştır.`)
                  : (language === "en" ? "*Based on Chamber of Architects 2026 statutory minimum fee standards." :
                     language === "de" ? "*Basiert auf den offiziellen Honorarrichtlinien der Architektenkammer 2026." :
                     language === "ar" ? "*وفقاً لمعايير الحد الأدنى للأتعاب المعتمدة لدى نقابة المعماريين 2026." :
                     `*TMMOB 2026 Mimarlar Odası asgari bedel normları esas alınmıştır.`)}
              </p>
            </div>

            <div className={styles.statsRow}>
              <div className={styles.statItem}>
                <span className={styles.statLabel}>
                  {domain === "execution" 
                    ? t("calc_stat_exec_pym", "Hesaplanan Yapı Maliyeti:") 
                    : t("calc_stat_pym", "Bakanlık Yaklaşık Mal. (PYM):")}
                </span>
                <span className={styles.statVal}>{formatCurrencyTL(quoteResult.totalEstimatedCost)}</span>
              </div>
              <div className={styles.statItem}>
                <span className={styles.statLabel}>{t("calc_stat_norm", "Mevzuat Standartı:")}</span>
                <span className={styles.statVal} style={{ fontSize: "0.85rem", color: "var(--accent-gold)" }}>
                  {quoteResult.showConservationBoard 
                    ? (language === "en" ? "Law No. 2863 & Heritage Board" :
                       language === "de" ? "Denkmalschutzgesetz Nr. 2863" :
                       language === "ar" ? "قانون الآثار رقم 2863 ولجان التراث" :
                       "2863 Sayılı Kanun & Koruma Kurulu")
                    : (domain === "execution" 
                        ? (language === "en" ? "Grade A Site Supervision" : language === "de" ? "Klasse A Bauleitung" : language === "ar" ? "إشراف موقعي من الدرجة الأولى" : "1. Sınıf Şantiye Şefliği")
                        : (language === "en" ? "Municipal Building Permit Norm" : language === "de" ? "Kommunale Baugenehmigungsnorm" : language === "ar" ? "معايير تراخيص البناء البلدية" : "Belediye Ruhsat Normu"))}
                </span>
              </div>
            </div>

            <div className={styles.includedFeatures}>
              {domain === "execution" ? (
                <>
                  <div className={styles.featureItem}>
                    <CheckCircle2 size={16} className={styles.checkIcon} />
                    <span>
                      {language === "en" ? "Turnkey Site Management & Certified Supervision" :
                       language === "de" ? "Schlüsselfertige Bauleitung & Technische Aufsicht" :
                       language === "ar" ? "إدارة موقعية تسليم مفتاح وإشراف فني معتمد" :
                       "Anahtar Teslim Şantiye Yönetimi & Fenni Mesuliyet"}
                    </span>
                  </div>
                  <div className={styles.featureItem}>
                    <CheckCircle2 size={16} className={styles.checkIcon} />
                    <span>
                      {language === "en" ? "1st Class Materials with Ministry & TSE Standards" :
                       language === "de" ? "Erstklassige Materialien nach TSE- & Behördennorm" :
                       language === "ar" ? "مواد بناء نخب أول مطابقة للمواصفات القياسية" :
                       "ÇŞİDB ve TSE Onaylı 1. Sınıf Malzeme Güvencesi"}
                    </span>
                  </div>
                  <div className={styles.featureItem}>
                    <CheckCircle2 size={16} className={styles.checkIcon} />
                    <span>
                      {language === "en" ? "Phased Progress Billing & Official Site Log Tracking" :
                       language === "de" ? "Stufenweise Abschlagszahlung & Bautagebuch" :
                       language === "ar" ? "دفعات مرحلية موثقة وسجلات يومية للموقع" :
                       "Aşamalı Hakediş ve Resmi Şantiye Günlüğü Takibi"}
                    </span>
                  </div>
                </>
              ) : (
                <>
                  <div className={styles.featureItem}>
                    <CheckCircle2 size={16} className={styles.checkIcon} />
                    <span>
                      {language === "en" ? "3D LiDAR Laser Scanning & Point Cloud Modeling" :
                       language === "de" ? "3D-LiDAR-Laserscan & Punktwolkenmodellierung" :
                       language === "ar" ? "مسح ليزري ثلاثي الأبعاد ونمذجة سحابة النقاط" :
                       "3D Lazer Lidar Tarama & Nokta Bulutu Modelleme"}
                    </span>
                  </div>
                  <div className={styles.featureItem}>
                    <CheckCircle2 size={16} className={styles.checkIcon} />
                    <span>
                      {quoteResult.showConservationBoard 
                        ? (language === "en" ? "Heritage Protection Board Dossier Management" :
                           language === "de" ? "Denkmalschutzbehörden-Verfahrensmanagement" :
                           language === "ar" ? "إدارة ملفات واعتمادات لجان حماية التراث" :
                           "Kültür Varlıkları Koruma Kurulu Dosya Yönetimi")
                        : (language === "en" ? "Municipal Licensing & Structural Approval Projects" :
                           language === "de" ? "Baugenehmigungs- & Statik-Freigabeplanung" :
                           language === "ar" ? "مخططات التراخيص البلدية والاعتمادات الإنشائية" :
                           "Belediye Ruhsat & Statik Onay Projeleri")}
                    </span>
                  </div>
                  <div className={styles.featureItem}>
                    <CheckCircle2 size={16} className={styles.checkIcon} />
                    <span>
                      {language === "en" ? "Millimetric Damage Analysis & Measured Survey Report" :
                       language === "de" ? "Millimetergenaue Schadensanalyse & Bauaufnahme" :
                       language === "ar" ? "تحليل ميليمتري للأضرار وتقرير رفع معماري رسمي" :
                       "Milimetrik Hasar Analizi ve Resmi Rölöve Raporu"}
                    </span>
                  </div>
                </>
              )}
            </div>

            <div className={styles.actionBtns}>
              <Link href={`/teklif-al?type=${projectType}`} className={styles.primaryCta}>
                <Calculator size={18} />
                <span>{t("calc_btn_report", "Detaylı Rapor & Teklif Al")}</span>
                <ArrowRight size={18} />
              </Link>
              
              <a 
                href={`https://wa.me/905404278875?text=${whatsappMsg}`}
                target="_blank"
                rel="noreferrer"
                className={styles.secondaryCta}
              >
                <MessageCircle size={17} style={{ color: "#25D366" }} />
                <span>{t("calc_btn_whatsapp", "Bu Hesaplamayı WhatsApp ile Danış")}</span>
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
