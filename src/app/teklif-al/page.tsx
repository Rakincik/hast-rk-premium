"use client";

import { useState, useMemo, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { motion, AnimatePresence, Variants } from "framer-motion";
import styles from "./teklif.module.css";
import { 
  Building2, 
  Landmark, 
  ShieldCheck, 
  ArrowRight, 
  ArrowLeft, 
  Check, 
  Printer, 
  Send, 
  Sliders, 
  CheckCircle2, 
  Clock, 
  Info, 
  CreditCard, 
  CalendarCheck,
  FileSpreadsheet,
  Lock,
  Hammer,
  PenTool,
  AlertCircle,
  Phone,
  Wrench
} from "lucide-react";
import { 
  ServiceDomain,
  ProjectType, 
  BuildingMaterial, 
  HeritageStatus, 
  LocationArea,
  PackageTier,
  PROJECT_PACKAGE_TIERS,
  EXECUTION_PACKAGE_TIERS,
  getServicesForType,
  calculateQuote, 
  formatCurrencyTL,
  MATERIAL_FACTORS,
  HERITAGE_FACTORS,
  LOCATION_FACTORS
} from "@/lib/quoteEngine";

function WizardContent() {
  const searchParams = useSearchParams();
  const [currentStep, setCurrentStep] = useState<number>(1);
  
  // Ana Soru: Proje mi? Uygulama mı?
  const [domain, setDomain] = useState<ServiceDomain>("project");
  
  // Proje Alt Kategorisi
  const [projectType, setProjectType] = useState<ProjectType>("restoration");
  
  // Teknik Parametreler
  const [area, setArea] = useState<number>(300);
  const [buildingMaterial, setBuildingMaterial] = useState<BuildingMaterial>("stone_masonry");
  const [heritageStatus, setHeritageStatus] = useState<HeritageStatus>("grade_2");
  const [locationArea, setLocationArea] = useState<LocationArea>("istanbul_fatih");
  const [selectedPackage, setSelectedPackage] = useState<PackageTier>("comprehensive");
  
  // Arsa Durumu (Uygulama -> Yeni Yapı için)
  const [hasLand, setHasLand] = useState<'yes' | 'looking'>('yes');

  // Lead Gate State (Ad Soyad ve Telefon - En başta zorunlu)
  const [leadForm, setLeadForm] = useState({
    name: "",
    phone: "",
    email: "",
    note: ""
  });
  const [leadError, setLeadError] = useState<string>("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  // URL type parametresi varsa oku
  useEffect(() => {
    const typeParam = searchParams.get("type");
    if (typeParam === "restoration" || typeParam === "new_architecture" || typeParam === "strengthening") {
      setDomain("project");
      setProjectType(typeParam as ProjectType);
      const defaults = getServicesForType(typeParam as ProjectType, "project").filter(s => s.isRecommended).map(s => s.id);
      setSelectedServices(defaults);
    }
  }, [searchParams]);

  // Seçili hizmetler
  const [selectedServices, setSelectedServices] = useState<string[]>([
    "laser_scan",
    "survey_drawing",
    "restitution",
    "restoration_project",
    "conservation_board"
  ]);

  // Domain değiştiğinde alt tipi ve servisleri otomatik uyarla
  const handleDomainChange = (newDomain: ServiceDomain) => {
    setDomain(newDomain);
    let defaultType: ProjectType;
    if (newDomain === 'execution') {
      defaultType = 'exec_restoration';
    } else {
      defaultType = 'restoration';
    }
    setProjectType(defaultType);
    const defaults = getServicesForType(defaultType, newDomain).filter(s => s.isRecommended).map(s => s.id);
    setSelectedServices(defaults);
  };

  // Proje tipi değişince servisleri sıfırla
  const handleTypeChange = (type: ProjectType) => {
    setProjectType(type);
    const defaults = getServicesForType(type, domain).filter(s => s.isRecommended).map(s => s.id);
    setSelectedServices(defaults);
  };

  const toggleService = (id: string) => {
    if (selectedServices.includes(id)) {
      if (selectedServices.length > 1) {
        setSelectedServices(selectedServices.filter(s => s !== id));
      }
    } else {
      setSelectedServices([...selectedServices, id]);
    }
  };

  // Hesaplama Motoru Çıktısı
  const quoteResult = useMemo(() => {
    return calculateQuote({
      domain,
      projectType,
      areaSquareMeters: area,
      buildingMaterial,
      heritageStatus,
      locationArea,
      selectedServices,
      hasLand
    });
  }, [domain, projectType, area, buildingMaterial, heritageStatus, locationArea, selectedServices, hasLand]);

  // Aktif paket listesi (Proje vs Uygulama)
  const activePackageTiers = domain === 'execution' ? EXECUTION_PACKAGE_TIERS : PROJECT_PACKAGE_TIERS;
  const availableServices = useMemo(() => getServicesForType(projectType, domain), [projectType, domain]);

  // Sadece telefon girişi & maskeleme: 05XX XXX XX XX (En fazla 11 rakam, harf engelli)
  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let raw = e.target.value.replace(/\D/g, "");
    if (raw.startsWith("90") && raw.length > 10) {
      raw = raw.slice(2);
    }
    if (raw.startsWith("5")) {
      raw = "0" + raw;
    }
    raw = raw.slice(0, 11);

    let masked = raw;
    if (raw.length > 4 && raw.length <= 7) {
      masked = `${raw.slice(0, 4)} ${raw.slice(4)}`;
    } else if (raw.length > 7 && raw.length <= 9) {
      masked = `${raw.slice(0, 4)} ${raw.slice(4, 7)} ${raw.slice(7)}`;
    } else if (raw.length > 9) {
      masked = `${raw.slice(0, 4)} ${raw.slice(4, 7)} ${raw.slice(7, 9)} ${raw.slice(9, 11)}`;
    }

    setLeadForm((prev) => ({ ...prev, phone: masked }));
    if (leadError) setLeadError("");
  };

  // Lead Gate Doğrulaması (Adım 1'den Adım 2'ye geçiş kuralı - Sadece telefon doğrulaması)
  const handleNextStep = () => {
    if (currentStep === 1) {
      const cleanPhone = leadForm.phone.replace(/\D/g, "");
      if (cleanPhone.length < 10) {
        setLeadError("Lütfen geçerli bir cep telefonu numarası giriniz (Örn: 05XX XXX XX XX).");
        return;
      }
      setLeadError("");
    }
    setCurrentStep((prev) => Math.min(prev + 1, 4));
  };

  const handleSubmitLead = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  // WhatsApp Mesajı Oluşturucu
  const getWhatsAppLink = () => {
    const typeTitleMap: Record<ProjectType, string> = {
      restoration: "Eski Eser Restorasyon Projesi (2863 Sayılı Kanun)",
      new_architecture: "Yeni Yapı Mimari Tasarım & Ruhsat Projesi",
      strengthening: "Statik Güçlendirme Projesi",
      exec_restoration: "Tarihi Yapı Restorasyon Uygulaması",
      exec_new: `Yeni Yapı İnşaat Uygulaması (${hasLand === 'yes' ? 'Arsa Hazır' : 'Arsa Arayışında'})`,
      exec_renovation: "Tadilat & Tamirat Uygulaması",
      exec_strengthening: "Statik Güçlendirme Uygulaması"
    };

    const clientName = leadForm.name.trim() || "Danışan";
    const text = encodeURIComponent(
      `Merhaba Hastürk Mimarlık,\n\nWeb sitenizdeki Akıllı Teklif Sihirbazı üzerinden fizibilite oluşturdum:\n` +
      `• Danışan: ${clientName} (${leadForm.phone})\n` +
      `• Hizmet Alanı: ${domain === 'execution' ? 'Uygulama & Şantiye İmalatı' : 'Mimari & Mühendislik Proje Hizmeti'}\n` +
      `• Kategori: ${typeTitleMap[projectType]}\n` +
      `• Yaklaşık Alan: ${area} m²\n` +
      `• Yapı Türü: ${MATERIAL_FACTORS[buildingMaterial]?.label}\n` +
      `• Konum / Bölge: ${LOCATION_FACTORS[locationArea]?.label}\n` +
      (quoteResult.showConservationBoard ? `• Yetkili Kurul: ${quoteResult.conservationBoard.name}\n` : '') +
      `• Seçilen Paket: ${activePackageTiers[selectedPackage].name}\n` +
      `• Hesaplanan Bedel: ${formatCurrencyTL(quoteResult.packageFees[selectedPackage])}\n` +
      (leadForm.note ? `• Not: ${leadForm.note}\n` : '') +
      `\nDetaylı keşif randevusu ve resmi teklif dosyamız için görüşmek istiyorum.`
    );
    return `https://wa.me/905404278875?text=${text}`;
  };

  // Sayfa Animasyon Varyantı
  const stepVariants: Variants = {
    hidden: { opacity: 0, x: 20 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.35, ease: "easeOut" } },
    exit: { opacity: 0, x: -20, transition: { duration: 0.2, ease: "easeIn" } }
  };

  return (
    <div className={styles.container}>
      {/* Header */}
      <div className={styles.header}>
        <div className={styles.badge}>
          <Landmark size={15} /> ÇŞİDB 2026 Yapı Birim Maliyetleri & TMMOB Normları
        </div>
        <h1 className={styles.title}>
          Akıllı Mimari & Uygulama <br/>
          <span className={styles.titleGold}>Teklif Sihirbazı</span>
        </h1>
        <p className={styles.subtitle}>
          Mimarlar Odası asgari bedel tarifesi ve 2026 Çevre, Şehircilik ve İklim Değişikliği Bakanlığı uygulama birim maliyetleriyle projenizi saniyeler içinde hesaplayın.
        </p>
      </div>

      {/* Stepper Progress Bar */}
      <div className={styles.stepperContainer}>
        <div className={styles.stepperProgressLine} />
        <div 
          className={styles.stepperProgressActive} 
          style={{ width: `${((currentStep - 1) / 3) * 100}%` }}
        />

        {[
          { num: 1, label: "Hizmet & Bilgi" },
          { num: 2, label: "Yapı Parametreleri" },
          { num: 3, label: "Hizmet Kapsamı" },
          { num: 4, label: "Teklif & Rapor" }
        ].map((step) => {
          const isActive = currentStep === step.num;
          const isCompleted = currentStep > step.num;
          return (
            <button
              key={step.num}
              type="button"
              className={`${styles.stepItem} ${isActive ? styles.stepItemActive : ""} ${isCompleted ? styles.stepItemCompleted : ""}`}
              onClick={() => {
                if (step.num > 1 && currentStep === 1) {
                  handleNextStep();
                } else {
                  setCurrentStep(step.num);
                }
              }}
            >
              <div className={styles.stepCircle}>
                {isCompleted ? <Check size={18} /> : step.num}
              </div>
              <span className={styles.stepLabel}>{step.label}</span>
            </button>
          );
        })}
      </div>

      {/* Main Wizard Grid */}
      <div className={styles.wizardLayout}>
        {/* Left Side: Step Content */}
        <div className={styles.stepBody}>
          <AnimatePresence mode="wait">
            
            {/* ADIM 1: İletişim Bilgileri (Lead Gating) & Hizmet Seçimi */}
            {currentStep === 1 && (
              <motion.div 
                key="step1" 
                variants={stepVariants} 
                initial="hidden" 
                animate="visible" 
                exit="exit"
              >
                {/* 1. Kompakt Telefon Gate Barı (SADECE TELEFON, Hızlı & Zarif) */}
                <div className={styles.phoneGateBar}>
                  <div className={styles.phoneGateLeft}>
                    <div className={styles.phoneIconWrap}>
                      <Phone size={20} />
                    </div>
                    <div>
                      <div className={styles.phoneGateTitle}>Telefon Numaranızla Hızlı Başlayın</div>
                      <div className={styles.phoneGateSub}>
                        Resmi birim fiyat raporu ve ön fizibiliteniz için cep numaranızı giriniz.
                      </div>
                    </div>
                  </div>

                  <div className={styles.phoneInputWrapper}>
                    <div className={styles.countryCodeBadge}>
                      <span>🇹🇷</span> +90
                    </div>
                    <input 
                      type="tel" 
                      inputMode="numeric"
                      autoComplete="tel"
                      maxLength={14}
                      value={leadForm.phone}
                      onChange={handlePhoneChange}
                      placeholder="05XX XXX XX XX" 
                      className={styles.phoneGateInput}
                    />
                  </div>
                </div>

                {leadError && (
                  <div className={styles.phoneGateAlert}>
                    <AlertCircle size={16} />
                    <span>{leadError}</span>
                  </div>
                )}

                {/* 2. Zarif Segmented Tab Kontrolü (Proje vs Uygulama) */}
                <div className={styles.segmentedControl}>
                  <button 
                    type="button"
                    className={`${styles.segmentBtn} ${domain === "project" ? styles.segmentBtnActive : ""}`}
                    onClick={() => handleDomainChange("project")}
                  >
                    <PenTool size={18} />
                    <span>Mimari & Statik Proje Hizmeti</span>
                    <span className={styles.segmentTag}>TMMOB</span>
                  </button>

                  <button 
                    type="button"
                    className={`${styles.segmentBtn} ${domain === "execution" ? styles.segmentBtnActive : ""}`}
                    onClick={() => handleDomainChange("execution")}
                  >
                    <Hammer size={18} />
                    <span>Uygulama & Şantiye İmalatı</span>
                    <span className={styles.segmentTag}>ÇŞİDB 2026</span>
                  </button>
                </div>

                {/* 3. Alt Kategori Seçim Başlığı & Kart Izgarası */}
                <div className={styles.sectionHeaderCompact}>
                  <h3 className={styles.stepTitleCompact}>
                    {domain === "project" ? "Projelendirme Kategorisini Seçin:" : "Uygulama / Şantiye Alanını Seçin:"}
                  </h3>
                  <span className={styles.stepBadgeCompact}>
                    {domain === "project" ? "3 Kategori" : "4 Kategori"}
                  </span>
                </div>

                <div className={domain === "execution" ? styles.typeGrid4 : styles.typeGrid}>
                  {domain === "project" ? (
                    <>
                      {/* Proje: Eski Eser (2863 Sayılı Kanuna Tabi) */}
                      <div 
                        className={`${styles.typeCard} ${projectType === "restoration" ? styles.typeCardSelected : ""}`}
                        onClick={() => handleTypeChange("restoration")}
                      >
                        <div className={styles.typeIconWrapper}><Landmark size={24} /></div>
                        <h3 className={styles.typeCardTitle}>Eski Eser (2863 Sayılı Kanun)</h3>
                        <p className={styles.typeCardDesc}>
                          2863 Sayılı Kültür ve Tabiat Varlıklarını Koruma Kanununa tabi tescilli yapılar için Lidar, rölöve, restitüsyon ve kurul onay projeleri.
                        </p>
                      </div>

                      {/* Proje: Yeni Mimari */}
                      <div 
                        className={`${styles.typeCard} ${projectType === "new_architecture" ? styles.typeCardSelected : ""}`}
                        onClick={() => handleTypeChange("new_architecture")}
                      >
                        <div className={styles.typeIconWrapper}><Building2 size={24} /></div>
                        <h3 className={styles.typeCardTitle}>Yeni Yapı Mimari Tasarım</h3>
                        <p className={styles.typeCardDesc}>
                          Müstakil villa, konut veya ticari yapılar için belediye ruhsat, konsept ve uygulama projeleri (Koruma Kurulu gerektirmez).
                        </p>
                      </div>

                      {/* Proje: Statik Güçlendirme */}
                      <div 
                        className={`${styles.typeCard} ${projectType === "strengthening" ? styles.typeCardSelected : ""}`}
                        onClick={() => handleTypeChange("strengthening")}
                      >
                        <div className={styles.typeIconWrapper}><ShieldCheck size={24} /></div>
                        <h3 className={styles.typeCardTitle}>Statik Güçlendirme Projesi</h3>
                        <p className={styles.typeCardDesc}>
                          Mevcut bina taşıyıcı sistemi analizi, deprem performans tahkiki ve onaylı güçlendirme uygulama projeleri.
                        </p>
                      </div>
                    </>
                  ) : (
                    <>
                      {/* Uygulama: Tarihi Restorasyon */}
                      <div 
                        className={`${styles.typeCard} ${projectType === "exec_restoration" ? styles.typeCardSelected : ""}`}
                        onClick={() => handleTypeChange("exec_restoration")}
                      >
                        <div className={styles.typeIconWrapper}><Landmark size={24} /></div>
                        <h3 className={styles.typeCardTitle}>Tarihi Yapı Restorasyonu</h3>
                        <p className={styles.typeCardDesc}>
                          2863 sayılı kanun ve Koruma Kurulu onaylı restorasyon uygulaması, özgün konservasyon ve fenni mesuliyet.
                        </p>
                      </div>

                      {/* Uygulama: Yeni İnşaat */}
                      <div 
                        className={`${styles.typeCard} ${projectType === "exec_new" ? styles.typeCardSelected : ""}`}
                        onClick={() => handleTypeChange("exec_new")}
                      >
                        <div className={styles.typeIconWrapper}><Building2 size={24} /></div>
                        <h3 className={styles.typeCardTitle}>Yeni Yapı İnşaat Uygulaması</h3>
                        <p className={styles.typeCardDesc}>
                          Arsanız üzerine anahtar teslim kaba ve ince yapı inşaat taahhüdü, şantiye şefliği ve yapı kullanım (İskan) teslimi.
                        </p>
                      </div>

                      {/* Uygulama: Tadilat & Tamirat */}
                      <div 
                        className={`${styles.typeCard} ${projectType === "exec_renovation" ? styles.typeCardSelected : ""}`}
                        onClick={() => handleTypeChange("exec_renovation")}
                      >
                        <div className={styles.typeIconWrapper}><Wrench size={24} /></div>
                        <h3 className={styles.typeCardTitle}>Tadilat & Tamirat Uygulaması</h3>
                        <p className={styles.typeCardDesc}>
                          Mevcut yapıda iç mekan yenileme, tesisat sıfırlama, çatı onarımı, ıslak hacimler ve lüks ince işçilik.
                        </p>
                      </div>

                      {/* Uygulama: Statik Güçlendirme İmalatı */}
                      <div 
                        className={`${styles.typeCard} ${projectType === "exec_strengthening" ? styles.typeCardSelected : ""}`}
                        onClick={() => handleTypeChange("exec_strengthening")}
                      >
                        <div className={styles.typeIconWrapper}><ShieldCheck size={24} /></div>
                        <h3 className={styles.typeCardTitle}>Statik Güçlendirme İmalatı</h3>
                        <p className={styles.typeCardDesc}>
                          Karbon lif (CFRP), çelik mantolama, temel takviyesi ve epoksi enjeksiyon şantiye imalatları.
                        </p>
                      </div>
                    </>
                  )}
                </div>
              </motion.div>
            )}

            {/* ADIM 2: Yapı Parametreleri */}
            {currentStep === 2 && (
              <motion.div 
                key="step2" 
                variants={stepVariants} 
                initial="hidden" 
                animate="visible" 
                exit="exit"
                className={styles.formSection}
              >
                <div>
                  <h2 className={styles.stepTitle}>Yapı Alanı ve Teknik Detaylar</h2>
                  <p className={styles.stepDesc}>
                    Yapının toplam inşaat/kullanım alanı ve yapım tekniği yaklaşık birim maliyetleri ve katsayıları doğrudan etkiler.
                  </p>
                </div>

                {/* Alan Slider'ı */}
                <div className={styles.sliderGroup}>
                  <div className={styles.sliderHeader}>
                    <span className={styles.sliderLabel}>
                      {domain === "execution" 
                        ? (projectType === "exec_renovation" ? "Tadilat Yapılacak Kapalı Alan (m²)" : "Toplam İnşaat / İmalat Alanı (m²)")
                        : (projectType === "restoration" ? "2863 Sayılı Kanun Kapsamında Belgelemeye Esas Alan (m²)" : "Toplam Proje Alanı (m²)")}
                    </span>
                    <div className={styles.sliderValueBox}>
                      <span>{area}</span> m²
                    </div>
                  </div>
                  <input 
                    type="range" 
                    min="30" 
                    max="2000" 
                    step="10" 
                    value={area} 
                    onChange={(e) => setArea(Number(e.target.value))}
                    className={styles.rangeSlider}
                  />
                  <div style={{ display: "flex", justifyContent: "space-between", marginTop: "0.5rem", fontSize: "0.75rem", color: "#71717a" }}>
                    <span>30 m²</span>
                    <span>500 m²</span>
                    <span>1.000 m²</span>
                    <span>2.000+ m²</span>
                  </div>
                </div>

                {/* Eğer Uygulama -> Yeni Yapı ise: "Arsanız Var mı?" Sorusu */}
                {domain === "execution" && projectType === "exec_new" && (
                  <div>
                    <label className={styles.sliderLabel} style={{ display: "block", marginBottom: "0.5rem" }}>
                      Arsa Durumunuz
                    </label>
                    <div className={styles.landCardGroup}>
                      <div 
                        className={`${styles.landCard} ${hasLand === 'yes' ? styles.landCardSelected : ''}`}
                        onClick={() => setHasLand('yes')}
                      >
                        <div className={styles.landCardTitle}>✅ Evet, Arsam Hazır / Tapulu</div>
                        <div className={styles.landCardDesc}>İnşaat yapılacak arsam hazır veya ruhsat sürecindeyim.</div>
                      </div>
                      <div 
                        className={`${styles.landCard} ${hasLand === 'looking' ? styles.landCardSelected : ''}`}
                        onClick={() => setHasLand('looking')}
                      >
                        <div className={styles.landCardTitle}>🔍 Henüz Arsa Arayışındayım</div>
                        <div className={styles.landCardDesc}>Hedeflediğim yapı için ön fizibilite ve yaklaşık maliyet hesabı yapıyorum.</div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Sadeleştirilmiş Bakanlık / Mevzuat Sınıfı Bilgi Kartı (Yan 733k fiyat karmaşası kaldırıldı) */}
                <div className={styles.ministryClassCard}>
                  <div className={styles.ministryClassHeader}>
                    <div className={styles.ministryBadge}>
                      <Landmark size={14} /> {quoteResult.ministryClass.officialGazette}
                    </div>
                    <div style={{ fontSize: "0.8rem", color: "var(--accent-gold)", fontWeight: 600 }}>
                      {domain === "execution" ? "Resmi Uygulama Normu" : "TMMOB Mimarlık Normu"}
                    </div>
                  </div>
                  <div className={styles.ministryClassName}>
                    {quoteResult.ministryClass.name}
                  </div>
                  <div className={styles.ministryClassDesc}>
                    {quoteResult.ministryClass.definition}
                  </div>
                </div>

                {/* Yapım Tekniği Seçimi */}
                <div>
                  <label className={styles.sliderLabel} style={{ display: "block", marginBottom: "0.75rem" }}>
                    Yapım Tekniği / Taşıyıcı Sistem
                  </label>
                  <div className={styles.optionsGrid}>
                    {(Object.keys(MATERIAL_FACTORS) as BuildingMaterial[]).map((matKey) => {
                      const item = MATERIAL_FACTORS[matKey];
                      const isSelected = buildingMaterial === matKey;
                      return (
                        <div 
                          key={matKey}
                          className={`${styles.optionCard} ${isSelected ? styles.optionCardSelected : ""}`}
                          onClick={() => setBuildingMaterial(matKey)}
                        >
                          <div className={styles.optionTitle}>{item.label}</div>
                          <div className={styles.optionDesc}>{item.desc}</div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* SADECE ESKİ ESER İSE: Tescil Derecesi, Koruma Kurulu ve %50 Hibe Kartı */}
                {quoteResult.showConservationBoard && (
                  <div>
                    <label className={styles.sliderLabel} style={{ display: "block", marginBottom: "0.75rem" }}>
                      2863 Sayılı Kanun Kapsamında Tescil Derecesi
                    </label>
                    <div className={styles.optionsGrid}>
                      {(Object.keys(HERITAGE_FACTORS) as HeritageStatus[]).map((herKey) => {
                        const item = HERITAGE_FACTORS[herKey];
                        const isSelected = heritageStatus === herKey;
                        return (
                          <div 
                            key={herKey}
                            className={`${styles.optionCard} ${isSelected ? styles.optionCardSelected : ""}`}
                            onClick={() => setHeritageStatus(herKey)}
                          >
                            <div className={styles.optionTitle}>{item.label}</div>
                            <div className={styles.optionDesc}>{item.desc}</div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* Bölge Seçimi */}
                <div>
                  <label className={styles.sliderLabel} style={{ display: "block", marginBottom: "0.75rem" }}>
                    Yapının Bulunduğu Bölge & İlçe
                  </label>
                  <div className={styles.optionsGrid}>
                    {(Object.keys(LOCATION_FACTORS) as LocationArea[]).map((locKey) => {
                      const item = LOCATION_FACTORS[locKey];
                      const isSelected = locationArea === locKey;
                      return (
                        <div 
                          key={locKey}
                          className={`${styles.optionCard} ${isSelected ? styles.optionCardSelected : ""}`}
                          onClick={() => setLocationArea(locKey)}
                        >
                          <div className={styles.optionTitle}>{item.label}</div>
                          <div className={styles.optionDesc}>{item.desc}</div>
                        </div>
                      );
                    })}
                  </div>

                  {/* SADECE ESKİ ESER İSE: Dinamik Koruma Kurulu ve Hibe Uyarısı Gösterilir */}
                  {quoteResult.showConservationBoard && (
                    <>
                      <div className={styles.boardInfoCard}>
                        <div className={styles.boardInfoHeader}>
                          <div className={styles.boardInfoBadge}>
                            <Landmark size={14} /> Yetkili Koruma Bölge Kurulu (2863 Sayılı Kanun)
                          </div>
                          <div className={styles.boardDurationBadge}>
                            <Clock size={13} style={{ display: "inline", verticalAlign: "middle", marginRight: "4px" }} />
                            Tahmini Onay: {quoteResult.conservationBoard.weeks}
                          </div>
                        </div>
                        <div className={styles.boardName}>{quoteResult.conservationBoard.name}</div>
                        <div className={styles.boardDesc}>
                          📌 {quoteResult.conservationBoard.note}
                        </div>
                      </div>

                      {quoteResult.isGrantEligible && (
                        <div className={styles.grantNoticeCard}>
                          <div className={styles.grantIconWrapper}>
                            <ShieldCheck size={22} />
                          </div>
                          <div>
                            <div className={styles.grantTitle}>
                              <span>T.C. Kültür ve Turizm Bakanlığı Proje Desteği</span>
                              <span className={styles.grantTag}>%50 Nakdi Hibe</span>
                            </div>
                            <p className={styles.grantDesc}>
                              Taşınmaz Kültür Varlıklarının Onarımına Yardım Fonu kapsamında bu yapınız için proje ve restorasyon bedelinin %50'sine kadar nakdi hibe desteği alınabilmektedir. Dosyanız Bakanlık hibe kabul normlarına uygun olarak tanzim edilecektir.
                            </p>
                          </div>
                        </div>
                      )}
                    </>
                  )}
                </div>
              </motion.div>
            )}

            {/* ADIM 3: Hizmet Kapsamı (FİYAT BU ADIMDA VE SONRASINDA AÇILIR!) */}
            {currentStep === 3 && (
              <motion.div 
                key="step3" 
                variants={stepVariants} 
                initial="hidden" 
                animate="visible" 
                exit="exit"
              >
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: "1rem", marginBottom: "1.5rem" }}>
                  <div>
                    <h2 className={styles.stepTitle}>Talep Edilen Hizmet Kapsamı</h2>
                    <p className={styles.stepDesc} style={{ marginBottom: 0 }}>
                      {domain === "execution" 
                        ? "Uygulama sürecinde ihtiyaç duyduğunuz şantiye ve imalat başlıklarını belirleyin."
                        : "TMMOB şartnamesine uygun mimari ve mühendislik proje kapsamını belirleyin."}
                    </p>
                  </div>
                  <button 
                    type="button" 
                    onClick={() => setSelectedServices(availableServices.map(s => s.id))}
                    className={styles.prevBtn}
                    style={{ fontSize: "0.8rem", padding: "0.4rem 0.8rem" }}
                  >
                    Tümünü Seç
                  </button>
                </div>

                <div className={styles.serviceList}>
                  {availableServices.map((service) => {
                    const isChecked = selectedServices.includes(service.id);
                    return (
                      <div 
                        key={service.id}
                        className={`${styles.serviceItem} ${isChecked ? styles.serviceItemSelected : ""}`}
                        onClick={() => toggleService(service.id)}
                      >
                        <div className={styles.customCheckbox}>
                          {isChecked && <Check size={14} />}
                        </div>
                        <div className={styles.serviceContent}>
                          <div className={styles.serviceHeader}>
                            <div className={styles.serviceTitle}>{service.name}</div>
                            {service.isRecommended && (
                              <span className={styles.recBadge}>Standart Hizmet</span>
                            )}
                          </div>
                          <p className={styles.serviceDesc}>{service.desc}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </motion.div>
            )}

            {/* ADIM 4: Teklif ve Rapor Özeti */}
            {currentStep === 4 && (
              <motion.div 
                key="step4" 
                variants={stepVariants} 
                initial="hidden" 
                animate="visible" 
                exit="exit"
              >
                <h2 className={styles.stepTitle}>
                  {domain === "execution" ? "Uygulama & İmalat Teklif Raporu" : "Mimari Proje Teklif & Maliyet Raporu"}
                </h2>
                <p className={styles.stepDesc}>
                  Seçtiğiniz kriterler doğrultusunda {domain === "execution" ? "ÇŞİDB 2026 reel uygulama normlarına" : "TMMOB 2026 asgari standartlarına"} göre hazırlanan 3 kademeli teklif paketleri:
                </p>

                {/* Resmi Referans Şeridi */}
                <div className={styles.officialPymBanner}>
                  <div className={styles.officialPymLeft}>
                    <FileSpreadsheet size={22} color="var(--accent-gold)" />
                    <div>
                      <div className={styles.officialPymTitle}>
                        {domain === "execution" ? "Hesaplanan Yapı İmalat Maliyeti:" : "Yapı Yaklaşık Maliyeti (PYM):"}{" "}
                        <strong>{formatCurrencyTL(quoteResult.totalEstimatedCost)}</strong>
                      </div>
                      <div className={styles.officialPymSub}>
                        {quoteResult.ministryClass.name} • {quoteResult.ministryClass.officialGazette}
                      </div>
                    </div>
                  </div>
                  <div className={styles.officialPymTag}>
                    {domain === "execution" ? "1. Sınıf Şantiye İmalatı" : `TMMOB Taban: ${formatCurrencyTL(quoteResult.tmmobBaseFee)}`}
                  </div>
                </div>

                {/* 3 Kademeli Paket Seçim Kartları */}
                <div className={styles.packageGrid}>
                  {(Object.keys(activePackageTiers) as PackageTier[]).map((tierKey) => {
                    const pkg = activePackageTiers[tierKey];
                    const isSelected = selectedPackage === tierKey;
                    const fee = quoteResult.packageFees[tierKey];

                    return (
                      <div 
                        key={tierKey}
                        className={`${styles.packageCard} ${isSelected ? styles.packageCardSelected : ""}`}
                        onClick={() => setSelectedPackage(tierKey)}
                      >
                        {pkg.isPopular && (
                          <div className={styles.packagePopularBadge}>En Çok Tercih Edilen</div>
                        )}
                        <div className={styles.packageTop}>
                          <div className={styles.packageRadioRow}>
                            <div className={styles.packageRadioCircle}>
                              {isSelected && <Check size={13} strokeWidth={3} />}
                            </div>
                            <span style={{ fontSize: "0.75rem", color: isSelected ? "var(--accent-gold)" : "#71717a", fontWeight: 600 }}>
                              {isSelected ? "SEÇİLDİ" : "SEÇMEK İÇİN TIKLAYIN"}
                            </span>
                          </div>
                          <div className={styles.packageTitle}>{pkg.name}</div>
                          <div className={styles.packageTagline}>{pkg.tagline}</div>

                          <div className={styles.packagePriceBox}>
                            <div className={styles.packagePriceLabel}>
                              {domain === "execution" ? "Paket İmalat Bedeli" : "Paket Proje Bedeli"}
                            </div>
                            <div className={styles.packagePriceAmount}>{formatCurrencyTL(fee)}</div>
                          </div>
                        </div>

                        <div className={styles.packageFeaturesList}>
                          {pkg.features.map((feat, idx) => (
                            <div key={idx} className={styles.packageFeatureItem}>
                              <CheckCircle2 size={15} className={styles.packageCheckIcon} />
                              <span>{feat}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Süre ve Bilgi Şeridi */}
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "1rem", background: "#1c1917", padding: "1rem 1.25rem", borderRadius: "10px", border: "1px solid rgba(255,255,255,0.05)", marginBottom: "1.5rem" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                    <Clock size={18} color="var(--accent-gold)" />
                    <span style={{ fontSize: "0.875rem", color: "#d4d4d8" }}>
                      Öngörülen {domain === "execution" ? "İmalat & Şantiye" : "Projelendirme"} Süresi: <strong>{quoteResult.estimatedDurationWeeks.min} - {quoteResult.estimatedDurationWeeks.max} Hafta</strong>
                    </span>
                  </div>
                  {quoteResult.showConservationBoard && (
                    <div style={{ fontSize: "0.85rem", color: "var(--accent-gold)" }}>
                      {quoteResult.conservationBoard.name}
                    </div>
                  )}
                </div>

                {/* Aşamalı Hakediş & Ödeme Planı */}
                <div className={styles.paymentSection}>
                  <div className={styles.sectionHeading}>
                    <CreditCard size={19} color="var(--accent-gold)" />
                    <span>Aşamalı Hakediş & Ödeme Planı</span>
                  </div>
                  <p className={styles.sectionSubtext}>
                    Seçilen <strong>{activePackageTiers[selectedPackage].name}</strong> ({formatCurrencyTL(quoteResult.packageFees[selectedPackage])}) için 4 aşamalı kurumsal hakediş takvimi:
                  </p>

                  <div className={styles.paymentGrid}>
                    {quoteResult.paymentPlans[selectedPackage].map((stage) => (
                      <div key={stage.step} className={styles.paymentCard}>
                        <div>
                          <div className={styles.paymentCardHeader}>
                            <span className={styles.paymentStepBadge}>{stage.step}. Hakediş</span>
                            <span className={styles.paymentPercent}>%{stage.percent}</span>
                          </div>
                          <div className={styles.paymentTitle}>{stage.title}</div>
                          <div className={styles.paymentAmount}>{formatCurrencyTL(stage.amount)}</div>
                        </div>
                        <div className={styles.paymentDesc}>{stage.desc}</div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Süreç Zaman Çizelgesi (Gantt) */}
                <div className={styles.timelineSection}>
                  <div className={styles.sectionHeading}>
                    <CalendarCheck size={19} color="var(--accent-gold)" />
                    <span>{domain === "execution" ? "Şantiye & İmalat Süreç Takvimi" : "Projelendirme & Kurul Süreç Takvimi"}</span>
                  </div>
                  <p className={styles.sectionSubtext}>
                    {domain === "execution" 
                      ? "Mobilizasyondan anahtar teslimine kadar ilerleyecek 4 aşamalı şantiye takvimi:" 
                      : "Saha etüdünden resmi onay sürecine kadar ilerleyecek 4 aşamalı proje yol haritası:"}
                  </p>

                  <div className={styles.timelineGrid}>
                    {quoteResult.timelineSteps.map((tStep) => (
                      <div key={tStep.step} className={styles.timelineCard}>
                        <span className={styles.timelineWeeks}>{tStep.weeks}</span>
                        <div className={styles.timelineTitle}>{tStep.title}</div>
                        <div className={styles.timelineDesc}>{tStep.desc}</div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Hızlı Aksiyon Butonları (WhatsApp, Yazdır) */}
                <div className={styles.actionRow}>
                  <a 
                    href={getWhatsAppLink()} 
                    target="_blank" 
                    rel="noreferrer" 
                    className={styles.whatsappBtn}
                  >
                    💬 WhatsApp ile Hemen Uzmana Danış
                  </a>
                  <button 
                    type="button" 
                    onClick={() => window.print()} 
                    className={styles.printBtn}
                  >
                    <Printer size={18} /> Yazdır / PDF Olarak Kaydet
                  </button>
                </div>

                {/* Resmi Keşif & Proje Dosyası Talebi (Adım 1'deki bilgiler otomatik doldurulur) */}
                <div className={styles.leadFormCard}>
                  <h3 style={{ fontSize: "1.2rem", marginBottom: "0.5rem", color: "var(--text-primary)" }}>
                    Resmi Keşif & Proje Dosyası Talebi
                  </h3>
                  <p style={{ fontSize: "0.85rem", color: "var(--text-secondary)" }}>
                    1. Adımda girmiş olduğunuz iletişim bilgilerinizle talebiniz doğrudan Y. Mimar Okan Hastürk ve teknik ekibimize iletilir.
                  </p>

                  {isSubmitted ? (
                    <div className={styles.successCard}>
                      <CheckCircle2 size={24} style={{ marginBottom: "0.5rem" }} />
                      <p><strong>Talebiniz başarıyla alındı!</strong></p>
                      <p style={{ fontSize: "0.85rem", marginTop: "0.25rem" }}>
                        Sayın <strong>{leadForm.name.trim() || "Danışanımız"}</strong>, teknik ekibimiz <strong>{leadForm.phone}</strong> numarası üzerinden en geç 24 saat içinde sizinle iletişime geçecektir.
                      </p>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmitLead} className={styles.leadFormGrid}>
                      <div className={styles.inputGroup}>
                        <label className={styles.inputLabel}>Adınız Soyadınız (İsteğe bağlı)</label>
                        <input 
                          type="text" 
                          value={leadForm.name}
                          onChange={(e) => setLeadForm({ ...leadForm, name: e.target.value })}
                          className={styles.textInput} 
                          placeholder="Örn: Ahmet Yılmaz"
                        />
                      </div>
                      <div className={styles.inputGroup}>
                        <label className={styles.inputLabel}>Telefon Numaranız *</label>
                        <input 
                          type="tel" 
                          required
                          inputMode="numeric"
                          maxLength={14}
                          value={leadForm.phone}
                          onChange={handlePhoneChange}
                          className={styles.textInput} 
                          placeholder="05XX XXX XX XX"
                        />
                      </div>
                      <div className={styles.inputGroup} style={{ gridColumn: "1 / -1" }}>
                        <label className={styles.inputLabel}>E-posta Adresiniz (İsteğe bağlı)</label>
                        <input 
                          type="email" 
                          value={leadForm.email}
                          onChange={(e) => setLeadForm({ ...leadForm, email: e.target.value })}
                          className={styles.textInput} 
                          placeholder="ornek@alanadi.com" 
                        />
                      </div>
                      <div className={styles.inputGroup} style={{ gridColumn: "1 / -1" }}>
                        <label className={styles.inputLabel}>Proje Notu veya Özel Talepleriniz</label>
                        <textarea 
                          rows={3}
                          value={leadForm.note}
                          onChange={(e) => setLeadForm({ ...leadForm, note: e.target.value })}
                          className={styles.textInput} 
                          placeholder="Yapının konumu, mevcut durumu veya aciliyeti hakkında eklemek istedikleriniz..." 
                        />
                      </div>
                      <button type="submit" className={styles.submitBtn}>
                        <Send size={16} style={{ display: "inline-block", marginRight: "6px" }} />
                        Resmi Keşif Talebini Gönder
                      </button>
                    </form>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Wizard Navigation Bar (Geri / İleri) */}
          <div className={styles.wizardNav}>
            {currentStep > 1 ? (
              <button 
                type="button" 
                onClick={() => setCurrentStep(currentStep - 1)}
                className={styles.prevBtn}
              >
                <ArrowLeft size={16} /> Önceki Adım
              </button>
            ) : <div />}

            {currentStep < 4 && (
              <button 
                type="button" 
                onClick={handleNextStep}
                className={styles.nextBtn}
              >
                {currentStep === 3 ? "Teklifi Hesapla" : "Sonraki Adım"} <ArrowRight size={16} />
              </button>
            )}
          </div>
        </div>

        {/* Right Side: Sticky Live Summary Widget */}
        <aside className={styles.sidebarSummary}>
          <div className={styles.summaryTitle}>
            <span>Canlı Özet</span>
            <Sliders size={18} color="var(--accent-gold)" />
          </div>

          <div className={styles.summaryRows}>
            <div className={styles.summaryRow}>
              <span className={styles.summaryLabel}>Hizmet Alanı:</span>
              <span className={styles.summaryValue} style={{ color: "var(--accent-gold)", fontWeight: 600 }}>
                {domain === "execution" ? "Uygulama & Şantiye" : "Mimari & Mühendislik Proje"}
              </span>
            </div>

            <div className={styles.summaryRow}>
              <span className={styles.summaryLabel}>Kategori:</span>
              <span className={styles.summaryValue} style={{ fontSize: "0.82rem" }}>
                {projectType === "restoration" ? "2863 Sayılı Eser Projesi" :
                 projectType === "new_architecture" ? "Yeni Mimari Tasarım" :
                 projectType === "strengthening" ? "Güçlendirme Projesi" :
                 projectType === "exec_restoration" ? "Tarihi Restorasyon Uygulama" :
                 projectType === "exec_new" ? "Yeni Yapı İnşaatı" :
                 projectType === "exec_renovation" ? "Tadilat & Tamirat" :
                 "Güçlendirme İmalatı"}
              </span>
            </div>

            <div className={styles.summaryRow}>
              <span className={styles.summaryLabel}>Yapı Alanı:</span>
              <span className={styles.summaryValue}>{area} m²</span>
            </div>

            <div className={styles.summaryRow}>
              <span className={styles.summaryLabel}>Taşıyıcı Sistem:</span>
              <span className={styles.summaryValue}>{MATERIAL_FACTORS[buildingMaterial]?.label.split("/")[0]}</span>
            </div>

            {/* Yetkili Kurul ve Tescil SADECE Eski Eser ise gösterilir */}
            {quoteResult.showConservationBoard && (
              <>
                <div className={styles.summaryRow}>
                  <span className={styles.summaryLabel}>Tescil:</span>
                  <span className={styles.summaryValue}>{HERITAGE_FACTORS[heritageStatus]?.label.split("/")[0]}</span>
                </div>

                <div className={styles.summaryRow}>
                  <span className={styles.summaryLabel}>Yetkili Kurul:</span>
                  <span className={styles.summaryValue} style={{ fontSize: "0.8rem" }}>
                    {quoteResult.conservationBoard.name.replace("Kültür Varlıklarını Koruma Bölge Kurulu", "K.V.K.B.K.")}
                  </span>
                </div>
              </>
            )}

            <div className={styles.summaryRow}>
              <span className={styles.summaryLabel}>Seçili Hizmet:</span>
              <span className={styles.summaryValue}>{selectedServices.length} Hizmet</span>
            </div>

            {/* Yapı Yaklaşık Maliyeti (PYM) - Sadece 3. ve 4. adımda gösterilir */}
            {currentStep >= 3 && (
              <div className={styles.summaryRow}>
                <span className={styles.summaryLabel}>
                  {domain === "execution" ? "Yapı İmalat Maliyeti:" : "Yapı Yaklaşık Mal. (PYM):"}
                </span>
                <span className={styles.summaryValue} style={{ color: "var(--accent-gold)", fontWeight: 600 }}>
                  {formatCurrencyTL(quoteResult.totalEstimatedCost)}
                </span>
              </div>
            )}
          </div>

          {/* FİYAT GÖRÜNÜRLÜK KONTROLÜ: 1. ve 2. ADIMDA KİLİTLİ, 3. ADIMDA AÇILIR! */}
          {currentStep < 3 ? (
            <div className={styles.summaryCostBoxLocked}>
              <div className={styles.lockIconWrapper}>
                <Lock size={20} />
              </div>
              <div className={styles.lockTitle}>Hesaplama Kilidi</div>
              <div className={styles.lockDesc}>
                Proje detaylarınızı tamamlayınız. Fiyat ve resmi maliyet analizi <strong>3. Adımda</strong> hesaplanacaktır.
              </div>
            </div>
          ) : (
            <div className={styles.summaryCostBox}>
              <div className={styles.summaryCostTitle}>
                {currentStep === 4 
                  ? activePackageTiers[selectedPackage].name 
                  : (domain === "execution" ? "Tahmini Uygulama Bedeli" : "Tahmini Taban Bedel")}
              </div>
              <div className={styles.summaryCostAmount}>
                {formatCurrencyTL(currentStep === 4 ? quoteResult.packageFees[selectedPackage] : quoteResult.tmmobBaseFee)}
              </div>
              <div className={styles.summarySubCost}>
                {domain === "execution" ? "1. Sınıf Şantiye İmalatı Esaslı" : "TMMOB 2026 Asgari Hizmet Normu"}
              </div>
            </div>
          )}

          <p className={styles.summaryDisclaimer}>
            <Info size={12} style={{ display: "inline-block", marginRight: "4px", verticalAlign: "middle" }} />
            {domain === "execution" 
              ? "ÇŞİDB 2026 Yapı Yaklaşık Birim Maliyetleri ve piyasa imalat rayiçleri referans alınmıştır. Kesin bedel yerinde keşif sonrasında belirlenir."
              : "TMMOB Mimarlar Odası 2026 Asgari Bedel Şartnamesi referans alınmıştır. Kesin bedel yerinde keşif sonrasında belirlenir."}
          </p>
        </aside>
      </div>
    </div>
  );
}

export default function TeklifAlPage() {
  return (
    <Suspense fallback={
      <div className={styles.container}>
        <div style={{ textAlign: "center", padding: "120px 20px", color: "var(--accent-gold)" }}>
          <p style={{ fontSize: "1.2rem", letterSpacing: "1px" }}>Hesaplama Motoru Hazırlanıyor...</p>
        </div>
      </div>
    }>
      <WizardContent />
    </Suspense>
  );
}
