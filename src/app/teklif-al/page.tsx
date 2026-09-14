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
  CalendarCheck
} from "lucide-react";
import { 
  ProjectType, 
  BuildingMaterial, 
  HeritageStatus, 
  LocationArea,
  PackageTier,
  PACKAGE_TIERS,
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
  const [projectType, setProjectType] = useState<ProjectType>("restoration");
  const [area, setArea] = useState<number>(300);
  const [buildingMaterial, setBuildingMaterial] = useState<BuildingMaterial>("stone_masonry");
  const [heritageStatus, setHeritageStatus] = useState<HeritageStatus>("grade_2");
  const [locationArea, setLocationArea] = useState<LocationArea>("istanbul_fatih");
  const [selectedPackage, setSelectedPackage] = useState<PackageTier>("comprehensive");

  // Handle URL type parameter on mount
  useEffect(() => {
    const typeParam = searchParams.get("type");
    if (typeParam === "restoration" || typeParam === "new_architecture" || typeParam === "strengthening") {
      setProjectType(typeParam as ProjectType);
      const defaults = getServicesForType(typeParam as ProjectType).filter(s => s.isRecommended).map(s => s.id);
      setSelectedServices(defaults);
    }
  }, [searchParams]);

  // Hizmet listesi ve varsayılan seçilenler
  const availableServices = useMemo(() => getServicesForType(projectType), [projectType]);
  
  const [selectedServices, setSelectedServices] = useState<string[]>([
    "laser_scan",
    "survey_drawing",
    "restitution",
    "restoration_project",
    "conservation_board"
  ]);

  // Proje tipi değişince servisleri sıfırla
  const handleTypeChange = (type: ProjectType) => {
    setProjectType(type);
    const defaults = getServicesForType(type).filter(s => s.isRecommended).map(s => s.id);
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
      projectType,
      areaSquareMeters: area,
      buildingMaterial,
      heritageStatus,
      locationArea,
      selectedServices
    });
  }, [projectType, area, buildingMaterial, heritageStatus, locationArea, selectedServices]);

  // Lead Form State
  const [leadForm, setLeadForm] = useState({
    name: "",
    phone: "",
    email: "",
    note: ""
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmitLead = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  // WhatsApp Mesajı Oluşturucu (Temiz, net ve profesyonel format)
  const getWhatsAppLink = () => {
    const typeNames: Record<ProjectType, string> = {
      restoration: "Tarihi Eser Restorasyon & Rölöve",
      new_architecture: "Yeni Mimari Proje & Tasarım",
      strengthening: "Statik Güçlendirme & Rölöve"
    };

    const text = encodeURIComponent(
      `Merhaba Hastürk Mimarlık,\n\nWeb sitenizdeki Teklif Hesaplama Sihirbazı üzerinden projem için ön fizibilite yaptım:\n` +
      `• Proje Türü: ${typeNames[projectType]}\n` +
      `• Yaklaşık Alan: ${area} m²\n` +
      `• Yapı Türü: ${MATERIAL_FACTORS[buildingMaterial]?.label}\n` +
      `• Konum / Bölge: ${LOCATION_FACTORS[locationArea]?.label}\n` +
      `• Yetkili Kurul: ${quoteResult.conservationBoard.name}\n` +
      `• Tercih Edilen Paket: ${PACKAGE_TIERS[selectedPackage].name}\n` +
      `• Paket Proje Bedeli: ${formatCurrencyTL(quoteResult.packageFees[selectedPackage])}\n\n` +
      `Projemizin detaylarını görüşmek ve yerinde keşif randevusu oluşturmak istiyorum.`
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
          <Landmark size={15} /> TMMOB Mimarlar Odası 2026 Standartları
        </div>
        <h1 className={styles.title}>
          Akıllı Mimari & Restorasyon <br/>
          <span className={styles.titleGold}>Teklif Sihirbazı</span>
        </h1>
        <p className={styles.subtitle}>
          Projenizin yapı sınıfı, tescil derecesi ve koruma alanı normlarına göre resmi TMMOB asgari taban bedelini ve kapsamlı proje paketlerini anında hesaplayın.
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
          { num: 1, label: "Proje Tipi" },
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
              onClick={() => setCurrentStep(step.num)}
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
            {/* ADIM 1: Proje Türü */}
            {currentStep === 1 && (
              <motion.div 
                key="step1" 
                variants={stepVariants} 
                initial="hidden" 
                animate="visible" 
                exit="exit"
              >
                <h2 className={styles.stepTitle}>Projenizin Ana Kategorisini Belirleyin</h2>
                <p className={styles.stepDesc}>
                  Mimarlar Odası asgari bedel tebliğinde restorasyon ve yeni mimari tasarım farklı formüllerle hesaplanır.
                </p>

                <div className={styles.typeGrid}>
                  <div 
                    className={`${styles.typeCard} ${projectType === "restoration" ? styles.typeCardSelected : ""}`}
                    onClick={() => handleTypeChange("restoration")}
                  >
                    <div className={styles.typeIconWrapper}><Landmark size={26} /></div>
                    <h3 className={styles.typeCardTitle}>Tarihi Eser & Restorasyon</h3>
                    <p className={styles.typeCardDesc}>
                      Ahşap konak, yalı, taş bina, cami, çeşme gibi tescilli kültür varlıklarının rölöve, restitüsyon ve restorasyon projeleri.
                    </p>
                  </div>

                  <div 
                    className={`${styles.typeCard} ${projectType === "new_architecture" ? styles.typeCardSelected : ""}`}
                    onClick={() => handleTypeChange("new_architecture")}
                  >
                    <div className={styles.typeIconWrapper}><Building2 size={26} /></div>
                    <h3 className={styles.typeCardTitle}>Yeni Mimari Tasarım</h3>
                    <p className={styles.typeCardDesc}>
                      Müstakil villa, lüks konut, butik otel veya ticari yapılar için sıfırdan mimari konsept, ruhsat ve uygulama projeleri.
                    </p>
                  </div>

                  <div 
                    className={`${styles.typeCard} ${projectType === "strengthening" ? styles.typeCardSelected : ""}`}
                    onClick={() => handleTypeChange("strengthening")}
                  >
                    <div className={styles.typeIconWrapper}><ShieldCheck size={26} /></div>
                    <h3 className={styles.typeCardTitle}>Statik Güçlendirme & Rölöve</h3>
                    <p className={styles.typeCardDesc}>
                      Deprem dayanımı analizi, taşıyıcı sistem rölövesi, çatlak haritalama ve onaylı yapısal güçlendirme projeleri.
                    </p>
                  </div>
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
                    Yapının yaklaşık toplam inşaat alanı ve yapım tekniği yaklaşık birim maliyetleri ve katsayıları doğrudan etkiler.
                  </p>
                </div>

                {/* Alan Slider'ı */}
                <div className={styles.sliderGroup}>
                  <div className={styles.sliderHeader}>
                    <span className={styles.sliderLabel}>
                      {projectType === "restoration" ? "Belgelemeye Esas Yaklaşık Kapalı Alan (m²)" : "Toplam İnşaat Alanı (m²)"}
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

                {/* Tescil Durumu (Restorasyon ise) */}
                {projectType === "restoration" && (
                  <div>
                    <label className={styles.sliderLabel} style={{ display: "block", marginBottom: "0.75rem" }}>
                      Kültür Varlığı Tescil Derecesi
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

                {/* Bölge & Koruma Havzası Seçimi */}
                <div>
                  <label className={styles.sliderLabel} style={{ display: "block", marginBottom: "0.75rem" }}>
                    Yapının Bulunduğu Bölge & Koruma Havzası
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

                  {/* Dinamik Yetkili Koruma Kurulu & Bölge Bilgi Kartı */}
                  <div className={styles.boardInfoCard}>
                    <div className={styles.boardInfoHeader}>
                      <div className={styles.boardInfoBadge}>
                        <Landmark size={14} /> Yetkili Koruma Bölge Kurulu
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

                  {/* T.C. Kültür ve Turizm Bakanlığı Hibe Desteği Uyarısı (Tescilli Restorasyon İse) */}
                  {quoteResult.isGrantEligible && (
                    <div className={styles.grantNoticeCard}>
                      <div className={styles.grantIconWrapper}>
                        <ShieldCheck size={22} />
                      </div>
                      <div>
                        <div className={styles.grantTitle}>
                          <span>T.C. Kültür ve Turizm Bakanlığı Proje Desteği</span>
                          <span className={styles.grantTag}>%50 Hibe Fırsatı</span>
                        </div>
                        <p className={styles.grantDesc}>
                          Taşınmaz Kültür Varlıklarının Onarımına Yardım Fonu kapsamında bu yapınız için rölöve, restitüsyon ve restorasyon proje bedelinin %50'sine kadar nakdi hibe alınabilmektedir. Proje dosyanız Bakanlık hibe kabul normlarına uygun olarak tanzim edilecektir.
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </motion.div>
            )}

            {/* ADIM 3: Hizmet Kapsamı */}
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
                      İhtiyacınıza uygun hizmet paketlerini seçin veya özelleştirin.
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
                <h2 className={styles.stepTitle}>Ön Teklif & Maliyet Analiz Raporu</h2>
                <p className={styles.stepDesc}>
                  Seçtiğiniz kriterler doğrultusunda TMMOB 2026 asgari standartlarına göre hazırlanan 3 kademeli teklif paketleri:
                </p>

                {/* 3 Kademeli Paket Seçim Kartları */}
                <div className={styles.packageGrid}>
                  {(Object.keys(PACKAGE_TIERS) as PackageTier[]).map((tierKey) => {
                    const pkg = PACKAGE_TIERS[tierKey];
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
                            <div className={styles.packagePriceLabel}>Paket Proje Bedeli</div>
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

                {/* Süre ve Kurul Bilgi Şeridi */}
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "1rem", background: "#1c1917", padding: "1rem 1.25rem", borderRadius: "10px", border: "1px solid rgba(255,255,255,0.05)", marginBottom: "1.5rem" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                    <Clock size={18} color="var(--accent-gold)" />
                    <span style={{ fontSize: "0.875rem", color: "#d4d4d8" }}>
                      Öngörülen Projelendirme & Kurul Süresi: <strong>{quoteResult.estimatedDurationWeeks.min} - {quoteResult.estimatedDurationWeeks.max} Hafta</strong>
                    </span>
                  </div>
                  <div style={{ fontSize: "0.85rem", color: "var(--accent-gold)" }}>
                    {quoteResult.conservationBoard.name}
                  </div>
                </div>

                {/* Aşamalı Hakediş & Ödeme Planı */}
                <div className={styles.paymentSection}>
                  <div className={styles.sectionHeading}>
                    <CreditCard size={19} color="var(--accent-gold)" />
                    <span>Aşamalı Hakediş & Ödeme Planı</span>
                  </div>
                  <p className={styles.sectionSubtext}>
                    Seçilen <strong>{PACKAGE_TIERS[selectedPackage].name}</strong> ({formatCurrencyTL(quoteResult.packageFees[selectedPackage])}) için 4 aşamalı kurumsal hakediş takvimi:
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
                    <span>Projelendirme & Kurul Süreç Takvimi</span>
                  </div>
                  <p className={styles.sectionSubtext}>
                    Saha etüdünden resmi onay sürecine kadar ilerleyecek 4 aşamalı proje yol haritası:
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

                {/* Hibe Bildirimi (Eğer uygunsa) */}
                {quoteResult.isGrantEligible && (
                  <div className={styles.grantNoticeCard} style={{ marginTop: "2rem" }}>
                    <div className={styles.grantIconWrapper}>
                      <ShieldCheck size={24} />
                    </div>
                    <div>
                      <div className={styles.grantTitle}>
                        <span>🏛️ T.C. Kültür ve Turizm Bakanlığı Hibe Desteği Kapsamında</span>
                        <span className={styles.grantTag}>%50 Nakdi Hibe</span>
                      </div>
                      <p className={styles.grantDesc}>
                        Bu yapı tescilli kültür varlığı statüsünde olduğundan, Taşınmaz Kültür Varlıklarının Onarımına Yardım Fonu kapsamında proje hazırlama maliyetinizin %50'sine kadar geri ödemesiz hibe desteği başvurusunda bulunabilirsiniz.
                      </p>
                    </div>
                  </div>
                )}

                {/* Maliyet Kırılım Çubukları */}
                <div className={styles.breakdownSection}>
                  <h3 className={styles.breakdownTitle}>Aşama Bazlı Hizmet Dağılımı (Taban Bedel Esaslı)</h3>
                  <div className={styles.breakdownList}>
                    {quoteResult.breakdown.map((item) => (
                      <div key={item.id}>
                        <div className={styles.breakdownItemRow}>
                          <span>{item.name}</span>
                          <span style={{ color: "var(--accent-gold)", fontWeight: 600, fontFamily: "var(--font-sans)", fontVariantNumeric: "tabular-nums" }}>
                            {formatCurrencyTL(item.fee)} (%{item.percentage})
                          </span>
                        </div>
                        <div className={styles.barTrack}>
                          <div className={styles.barFill} style={{ width: `${item.percentage}%` }} />
                        </div>
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

                {/* Resmi Teklif Formu */}
                <div className={styles.leadFormCard}>
                  <h3 style={{ fontSize: "1.2rem", marginBottom: "0.5rem", color: "var(--text-primary)" }}>
                    Resmi Keşif & Proje Dosyası Talebi
                  </h3>
                  <p style={{ fontSize: "0.85rem", color: "var(--text-secondary)" }}>
                    İletişim bilgilerinizi bırakın, Y. Mimar Okan Hastürk ve teknik ekibimiz projenizi yerinde inceleyerek kesin proje dosyanızı hazırlasın.
                  </p>

                  {isSubmitted ? (
                    <div className={styles.successCard}>
                      <CheckCircle2 size={24} style={{ marginBottom: "0.5rem" }} />
                      <p><strong>Talebiniz başarıyla alındı!</strong></p>
                      <p style={{ fontSize: "0.85rem", marginTop: "0.25rem" }}>
                        Teknik ekibimiz en geç 24 saat içinde sizinle iletişime geçecektir.
                      </p>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmitLead} className={styles.leadFormGrid}>
                      <div className={styles.inputGroup}>
                        <label className={styles.inputLabel}>Adınız Soyadınız *</label>
                        <input 
                          type="text" 
                          required
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
                          value={leadForm.phone}
                          onChange={(e) => setLeadForm({ ...leadForm, phone: e.target.value })}
                          className={styles.textInput} 
                          placeholder="05XX XXX XX XX" 
                        />
                      </div>
                      <div className={styles.inputGroup} style={{ gridColumn: "1 / -1" }}>
                        <label className={styles.inputLabel}>E-posta Adresiniz</label>
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
                onClick={() => setCurrentStep(currentStep + 1)}
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
              <span className={styles.summaryLabel}>Proje Türü:</span>
              <span className={styles.summaryValue}>
                {projectType === "restoration" ? "Restorasyon / Rölöve" : projectType === "new_architecture" ? "Yeni Mimari Tasarım" : "Statik Güçlendirme"}
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

            {projectType === "restoration" && (
              <div className={styles.summaryRow}>
                <span className={styles.summaryLabel}>Tescil:</span>
                <span className={styles.summaryValue}>{HERITAGE_FACTORS[heritageStatus]?.label.split("/")[0]}</span>
              </div>
            )}

            <div className={styles.summaryRow}>
              <span className={styles.summaryLabel}>Yetkili Kurul:</span>
              <span className={styles.summaryValue} style={{ fontSize: "0.8rem" }}>
                {quoteResult.conservationBoard.name.replace("Kültür Varlıklarını Koruma Bölge Kurulu", "K.V.K.B.K.")}
              </span>
            </div>

            <div className={styles.summaryRow}>
              <span className={styles.summaryLabel}>Seçili Hizmet:</span>
              <span className={styles.summaryValue}>{selectedServices.length} Hizmet</span>
            </div>
          </div>

          {/* Live Price Box - Clean & Transparent without 'Hastürk Öneri' */}
          <div className={styles.summaryCostBox}>
            <div className={styles.summaryCostTitle}>
              {currentStep === 4 ? PACKAGE_TIERS[selectedPackage].name : "Tahmini Taban Bedel"}
            </div>
            <div className={styles.summaryCostAmount}>
              {formatCurrencyTL(currentStep === 4 ? quoteResult.packageFees[selectedPackage] : quoteResult.tmmobBaseFee)}
            </div>
            <div className={styles.summarySubCost}>
              TMMOB 2026 Asgari Hizmet Normu
            </div>
          </div>

          <p className={styles.summaryDisclaimer}>
            <Info size={12} style={{ display: "inline-block", marginRight: "4px", verticalAlign: "middle" }} />
            TMMOB Mimarlar Odası 2026 Mimarlık Hizmetleri Şartnamesi ve Bakanlık yaklaşık birim maliyetleri referans alınmıştır. Kesin bedel yerinde keşif sonrasında belirlenir.
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
