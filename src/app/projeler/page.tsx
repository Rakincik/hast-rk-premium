"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import styles from "./projeler.module.css";
import ProjectModal, { ProjectData } from "@/components/ui/ProjectModal";
import { MapPin, ArrowUpRight } from "lucide-react";

const allProjects: ProjectData[] = [
  {
    id: 1,
    title: "Taksim 360 Kentsel Yenileme & Restorasyon (361 Ada 3132 Parsel)",
    category: "Restorasyon",
    categoryKey: "restorasyon",
    image: "/projects/taksim-360/IMG_2860.JPG",
    gallery: [
      "/projects/taksim-360/IMG_2860.JPG",
      "/projects/taksim-360/IMG_2866.jpg",
      "/projects/taksim-360/IMG_2885.jpg"
    ],
    location: "Taksim 360, Beyoğlu / İstanbul",
    year: "2024",
    status: "Tescilli Kültür Varlığı / Kentsel Yenileme",
    area: "1.250 m²",
    quoteType: "restoration",
    description: "Taksim 360 kentsel yenileme projesi 361 ada 3132 parsel kapsamında; tarihi Levanten taş ve tuğla mimarisini yansıtan yapının özgün cephe silmeleri, cumbaları, döküm korkulukları ve süslemeleri aslına sadık kalınarak restore edilmiştir. Koruma Kurulu onaylı projeyle tarihi doku korunarak modern yaşama kazandırılmıştır.",
    techniques: [
      "361 Ada 3132 Parsel Tescilli Cephe Restorasyonu",
      "Özgün Ahşap Cumba ve Silme Rekonstrüksiyonu",
      "Tarihi Dövme Demir Korkuluk Konservasyonu",
      "Doğal Taş & Horasan Sıva Konsolidasyonu",
      "Kültür Varlıklarını Koruma Kurulu Onaylı İmalat"
    ]
  },
  {
    id: 2,
    title: "Tarihi Yapı Geoteknik Zemin Sondajı & Mini Kazık Güçlendirme",
    category: "Güçlendirme",
    categoryKey: "guclendirme",
    image: "/projects/guclendirme/B72F58E1-9A83-46EE-8642-0FE84A786EBF.JPG",
    gallery: [
      "/projects/guclendirme/B72F58E1-9A83-46EE-8642-0FE84A786EBF.JPG",
      "/projects/guclendirme/IMG_0211.jpeg",
      "/projects/guclendirme/IMG_4386.JPG"
    ],
    location: "Tarihi Yarımada / İstanbul",
    year: "2024",
    status: "Deprem Güvenliği & Zemin Tahkimatı",
    area: "1.850 m²",
    quoteType: "strengthening",
    description: "Dar sokak dokusu ve hassas tarihi çevre koşullarında, kompakt Geotec paletli ve mobil sondaj makineleriyle zemin etüdü, temel altı mini kazık imalatı, karot donatı analizi ve yüksek basınçlı hidrolik kireç enjeksiyonuyla taşıyıcı zemin konsolidasyonu gerçekleştirilmiştir.",
    techniques: [
      "Kompakt Paletli Mini Kazık & Sondaj Makineleri",
      "Temel Altı Enjeksiyon & Zemin İyileştirme",
      "Yapısal Karot Donatı Analizi & Boşluk Tespiti",
      "Sismik Yük Transferi & Çelik Ankrajlama",
      "Üniversite Heyeti Zemin & Statik Raporu"
    ]
  },
  {
    id: 3,
    title: "Tarihi Anıt Cami & Taş Minare Konservasyonu",
    category: "Restorasyon",
    categoryKey: "restorasyon",
    image: "/projects/karma-isler/IMG-20231101-WA0063.JPG",
    gallery: [
      "/projects/karma-isler/IMG-20231101-WA0063.JPG",
      "/projects/karma-isler/IMG-20231106-WA0024.JPG",
      "/projects/karma-isler/IMG-20231110-WA0051.JPG",
      "/projects/karma-isler/IMG-20231101-WA0062.JPG"
    ],
    location: "Fatih, Tarihi Yarımada / İstanbul",
    year: "2023 - 2024",
    status: "1. Grup Tescilli Anıt Eser",
    area: "850 m²",
    quoteType: "restoration",
    description: "Tarihi anıt cami minaresinin çok katlı güvenlikli iskele sistemiyle donatılarak taş gövdesindeki yapısal mikro çatlakların kireç harcıyla enjeksiyonu, şerefe taş konsollarının temizliği, mukarnas onarımı ve külah kurşun örtüsünün aslına uygun yenilenmesi.",
    techniques: [
      "Yüksek İrtifa Güvenlikli İskele Sistemi",
      "Kesme Taş Minare Gövdesi Çatlak Dikişi",
      "Şerefe Taş Mukarnas Konservasyonu",
      "Geleneksel Kurşun Külah Kaplama",
      "Mikro-Kumlama ile Taş Yüzey Arındırma"
    ]
  },
  {
    id: 4,
    title: "Tarihi Avlu Doğal Taş Döşeme & Çevre Düzenleme",
    category: "Taahhüt",
    categoryKey: "taahhut",
    image: "/projects/karma-isler/IMG-20231120-WA0064.JPG",
    gallery: [
      "/projects/karma-isler/IMG-20231120-WA0064.JPG",
      "/projects/karma-isler/IMG-20231120-WA0056.JPG",
      "/projects/karma-isler/IMG-20231120-WA0055.JPG",
      "/projects/karma-isler/IMG-20231120-WA0065.JPG"
    ],
    location: "Sultanahmet, Fatih / İstanbul",
    year: "2024",
    status: "Anıt Eser Çevre Düzenlemesi",
    area: "2.200 m²",
    quoteType: "restoration",
    description: "Tarihi anıt eser avlusunda geleneksel taş işçiliğiyle honlu doğal traverten ve küfeki taş plakaların, su drenaj eğimleriyle kusursuz entegre edilerek döşenmesi ve revak altı zemin basamaklarının restorasyonu tamamlanmıştır.",
    techniques: [
      "Doğal Traverten & Küfeki Taşı Döşeme",
      "Gizli Zemin Drenaj & Nem İzolasyonu",
      "Eğim ve Kot Hassasiyeti Lazer Ölçümü",
      "Tarihi Dokulu Harç Derz Dolgusu"
    ]
  },
  {
    id: 5,
    title: "Tescilli Cephe Askılama & Çelik Tahkimat Sistemi",
    category: "Güçlendirme",
    categoryKey: "guclendirme",
    image: "/projects/karma-isler/IMG-20231010-WA0025.JPG",
    gallery: [
      "/projects/karma-isler/IMG-20231010-WA0025.JPG",
      "/projects/karma-isler/IMG-20231010-WA0024.JPG"
    ],
    location: "Galata, Beyoğlu / İstanbul",
    year: "2024",
    status: "2. Grup Tescilli Yapı",
    area: "750 m²",
    quoteType: "strengthening",
    description: "Tarihi tescilli binanın sokak cephesini korumak ve olası sismik / rüzgar deformasyonlarını engellemek amacıyla kurulan ağır kafes çelik askılama kuleleri ile kimyasal ankrajlı güvenli taşıyıcı tahkimat sistemi kurulmuştur.",
    techniques: [
      "Ağır Çelik Profil Cephe Askılama Kulesi",
      "Tarihi Duvar Kimyasal Ankraj Bağlantısı",
      "Lazerli Deplasman & Oturma Takibi",
      "İş Güvenliği & Çevre Emniyet Sistemi"
    ]
  },
  {
    id: 6,
    title: "Geleneksel Masif Ahşap Doğrama & Pencere Rekonstrüksiyonu",
    category: "Rölöve",
    categoryKey: "rolove",
    image: "/projects/karma-isler/IMG_20210512_123036_173.JPG",
    gallery: [
      "/projects/karma-isler/IMG_20210512_123036_173.JPG",
      "/projects/karma-isler/IMG_20210512_123036_163.JPG",
      "/projects/karma-isler/IMG_20210512_123036_181.JPG",
      "/projects/karma-isler/IMG_20210512_123036_195.JPG"
    ],
    location: "Boğaziçi Yalıları / İstanbul",
    year: "2024",
    status: "Özel Zanaat Üretimi",
    area: "Özel Marangoz Atölyesi",
    quoteType: "restoration",
    description: "Tarihi konak ve yalıların özgün rölöve detaylarına sadık kalınarak 1. sınıf fırınlanmış masif ahşaptan üretilen çift camlı yalıtımlı giyotin pencere, panjur ve kapı doğramalarının milimetrik imalatı ve şantiyede montajı.",
    techniques: [
      "Geleneksel Lamba-Zıvana Geçme Detayları",
      "Emprenye & Nefes Alan Doğal Ahşap Cilası",
      "Yüksek Isı & Ses Yalıtımlı Tarihi Profil",
      "Pirinç İspanyolet & Geleneksel Aksesuarlar"
    ]
  },
  {
    id: 7,
    title: "Tarihi Kagir Tuğla Duvar & Temel Konsolidasyonu",
    category: "Restorasyon",
    categoryKey: "restorasyon",
    image: "/projects/karma-isler/IMG-20231227-WA0044.JPG",
    gallery: [
      "/projects/karma-isler/IMG-20231227-WA0044.JPG",
      "/projects/karma-isler/IMG-20231127-WA0002.JPG",
      "/projects/karma-isler/IMG-20231214-WA0057.JPG"
    ],
    location: "Karaköy / İstanbul",
    year: "2024",
    status: "Kentsel Sit Alanı",
    area: "1.150 m²",
    quoteType: "restoration",
    description: "Tarihi yapılar arasında kalan taşıyıcı duvarların geleneksel harman tuğlası ve doğal hidrolik kireç harcıyla yeniden örülmesi, korozyon önleyici hatıllarla binanın statik bütünlüğünün sağlanması.",
    techniques: [
      "Geleneksel Harman Tuğlası Örgü Tekniği",
      "Doğal Hidrolik Kireç (NHL) Bağlayıcı Harç",
      "Paslanmaz Çelik Donatılı Duvar Hatılları",
      "Nem ve Tuz Bariyeri İzolasyonu"
    ]
  },
  {
    id: 8,
    title: "Tarihi Portal & Dövme Demir Cephe Restorasyonu",
    category: "Mimari Tasarım",
    categoryKey: "mimari",
    image: "/projects/karma-isler/IMG-20231123-WA0080.JPG",
    gallery: [
      "/projects/karma-isler/IMG-20231123-WA0080.JPG",
      "/projects/karma-isler/IMG-20231123-WA0070.JPG",
      "/projects/karma-isler/IMG-20240101-WA0014.JPG"
    ],
    location: "Beyoğlu / Şişli",
    year: "2024",
    status: "2. Grup Tescilli Taş Apartman",
    area: "680 m²",
    quoteType: "restoration",
    description: "Tarihi taş giriş portalının hassas temizliği, kemer sövelerinin onarımı, ferforje dövme demir balkon korkuluklarının korozyondan arındırılması ve Hastürk uzman şantiye denetimiyle güvenle tamamlanması.",
    techniques: [
      "Doğal Taş Giriş Portali Konservasyonu",
      "Ferforje Demir Korozyon Temizliği ve Koruyucu Boya",
      "Özgün Söve ve Kemer Tamiratı",
      "Hastürk Uzman Şantiye Yönetimi"
    ]
  }
];

const categories = [
  { key: "all", label: "Tümü" },
  { key: "restorasyon", label: "Restorasyon" },
  { key: "rolove", label: "Rölöve & Restitüsyon" },
  { key: "guclendirme", label: "Güçlendirme" },
  { key: "mimari", label: "Mimari Tasarım" },
  { key: "taahhut", label: "Taahhüt" }
];

export default function ProjelerPage() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [selectedProject, setSelectedProject] = useState<ProjectData | null>(null);

  const filteredProjects = useMemo(() => {
    if (activeCategory === "all") return allProjects;
    return allProjects.filter((p) => p.categoryKey === activeCategory);
  }, [activeCategory]);

  return (
    <div className={styles.container}>
      <motion.div 
        className={styles.hero}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <h1 className={styles.title}>Portföy & Referanslarımız</h1>
        <p className={styles.subtitle}>
          Kültür varlıklarının korunmasından çağdaş mimari başyapıtlara uzanan, tescilli yapılarda imzamızı taşıyan seçkin eserlerimiz.
        </p>
      </motion.div>

      {/* Category Filter Tabs */}
      <div className={styles.filterBarWrapper}>
        <div className={styles.filterBar}>
          {categories.map((cat) => {
            const isActive = activeCategory === cat.key;
            return (
              <button
                key={cat.key}
                type="button"
                className={`${styles.filterTab} ${isActive ? styles.filterTabActive : ""}`}
                onClick={() => setActiveCategory(cat.key)}
              >
                {cat.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Projects Grid */}
      <motion.div 
        layout
        className={styles.grid}
      >
        <AnimatePresence>
          {filteredProjects.map((project) => (
            <motion.div 
              key={project.id} 
              layout
              className={styles.projectCard}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.4 }}
              onClick={() => setSelectedProject(project)}
            >
              <img 
                src={project.image} 
                alt={project.title}
                className={styles.image}
              />
              
              <div className={styles.cardTopBadges}>
                <span className={styles.categoryPill}>{project.category}</span>
              </div>

              <div className={styles.overlay}>
                <div className={styles.cardFooter}>
                  <div className={styles.locationText}>
                    <MapPin size={13} color="var(--accent-gold)" />
                    <span>{project.location}</span>
                  </div>
                  <h3 className={styles.projectTitle}>{project.title}</h3>
                  <div className={styles.viewDetailAction}>
                    Detayları Gör <ArrowUpRight size={15} />
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {/* Project Detail Lightbox Modal */}
      <ProjectModal 
        project={selectedProject} 
        onClose={() => setSelectedProject(null)} 
      />
    </div>
  );
}
