export type Language = "tr" | "en";

export interface Translations {
  [key: string]: {
    tr: string;
    en: string;
  };
}

export const translations: Translations = {
  // Brand
  brand_title: { tr: "HASTÜRK", en: "HASTÜRK" },
  brand_subtitle: { tr: "SANAT & MİMARLIK", en: "ART & ARCHITECTURE" },

  // Navigation
  nav_home: { tr: "Ana Sayfa", en: "Home" },
  nav_about: { tr: "Kurumsal", en: "About Us" },
  nav_team: { tr: "Ekip", en: "Team" },
  nav_services: { tr: "Hizmetler", en: "Services" },
  nav_projects: { tr: "Projeler", en: "Projects" },
  nav_contact: { tr: "İletişim", en: "Contact" },
  nav_quote_btn: { tr: "Teklif Hesapla", en: "Calculate Fee" },

  // Hero Section
  hero_title_1: { tr: "Geçmişin Dokusuna,", en: "To the Texture of the Past," },
  hero_title_2: { tr: "Geleceğin İmzası", en: "The Signature of the Future" },
  hero_subtitle: {
    tr: "Restorasyon, Rölöve, Mimari Tasarım ve Taahhüt işlerinde yılların verdiği ustalıkla tarihi değerlerimizi yarınlara taşıyoruz.",
    en: "With decades of craftsmanship in Restoration, Measured Survey, Architectural Design, and Contracting, we carry historical heritage into tomorrow."
  },
  hero_cta_projects: { tr: "Projelerimizi İnceleyin", en: "Explore Our Projects" },
  hero_cta_contact: { tr: "İletişime Geç", en: "Get In Touch" },

  // About Snippet
  about_title_1: { tr: "Ustalık Eserimiz:", en: "Our Masterpiece:" },
  about_title_2: { tr: "Tarihe Duyulan Saygı", en: "Profound Respect for History" },
  about_desc: {
    tr: "Hastürk Sanat ve Mimarlık olarak, sadece binaları değil, yaşanmışlıkları da onarıyoruz. Uzman ekibimizle, kültürel mirasımızı modern mühendisliğin güvencesi altına alıyoruz.",
    en: "At Hastürk Art & Architecture, we restore not just stone and wood, but living memories. With our expert architects and conservators, we safeguard heritage under the assurance of modern engineering."
  },
  stat_years: { tr: "Yıllık Tecrübe", en: "Years of Experience" },
  stat_projects: { tr: "Tamamlanan Proje", en: "Completed Projects" },
  stat_harmony: { tr: "Tarihi Doku Uyumu", en: "Heritage Compliance" },

  // Before & After Showcase
  ba_badge: { tr: "KORUMA & RESTORASYON FELSEFEMİZ", en: "OUR CONSERVATION PHILOSOPHY" },
  ba_title: { tr: "Tarihin Ruhuna Saygıyla, Geleceğe Güvenle", en: "Honoring Heritage, Preserving for the Future" },
  ba_subtitle: {
    tr: "Restorasyon geçmişin izlerini silmek değil; eserin özgün kimliğini ve yaşanmışlığını koruyarak, modern mühendisliğin güvencesiyle asırlar sonrasına aktarmaktır.",
    en: "Restoration is never about erasing history; it is safeguarding an authentic soul and lived heritage under the assurance of modern engineering."
  },
  ba_label_before: { tr: "Restorasyon Öncesi", en: "Before Restoration" },
  ba_label_after: { tr: "Restorasyon Sonrası", en: "After Restoration" },
  ba_cta_button: { tr: "Bu Proje Benzeri Yapınız İçin Teklif Alın", en: "Get an Estimate for Similar Heritage Property" },

  // Founder Note
  founder_badge: { tr: "BAŞ MİMARIN MANİFESTOSU", en: "PRINCIPAL ARCHITECT'S MANIFESTO" },
  founder_role: { tr: "Kurucu & Baş Restoratör Mimar", en: "Founder & Principal Conservation Architect" },

  // Process Timeline
  process_badge: { tr: "BİLİMSEL YAKLAŞIM", en: "SCIENTIFIC RESTORATION ROADMAP" },
  process_title: { tr: "Restorasyonda Yeniden Doğuş", en: "Renaissance in Restoration" },
  process_subtitle: {
    tr: "Her tarihi yapıyı bir sanat eseri titizliğiyle ele alıyor; tescilli kültür varlıklarını 5 adımlı bilimsel koruma protokolümüzle geleceğe hazırlıyoruz.",
    en: "Treating every historical landmark with museum-grade precision, we preserve registered heritage through our 5-step scientific protocol."
  },

  // Floating VIP Widget
  vip_title: { tr: "VIP İletişim.", en: "VIP Contact." },
  vip_close: { tr: "Kapat", en: "Close" },
  vip_whatsapp: { tr: "WhatsApp Danışma Hattı", en: "WhatsApp Consultation Line" },
  vip_call: { tr: "Hemen Ara: (+90) 540 427 88 75", en: "Direct Call: (+90) 540 427 88 75" },
  vip_quote: { tr: "TMMOB Maliyet Hesapla", en: "Calculate Official Fee" },

  // Footer
  footer_tagline: {
    tr: "Tarihe dokunuyor, geleceği inşa ediyoruz. 20 yılı aşkın restorasyon ve mimarlık tecrübesi.",
    en: "Preserving history, shaping the future. Over 20 years of architectural and historical restoration excellence."
  },
  footer_quick_links: { tr: "Hızlı Menü", en: "Quick Links" },
  footer_services: { tr: "Hizmetlerimiz", en: "Services" },
  footer_contact_info: { tr: "İletişim & Ofis", en: "Contact & Studio" },
  footer_address: {
    tr: "Ömer Avni Mah. Hacıhanım Sokağı No: 10/1 Gümüşsuyu / Beyoğlu / İSTANBUL",
    en: "Ömer Avni Mah. Hacıhanım Sokak No: 10/1 Gümüşsuyu, Beyoğlu / ISTANBUL"
  },
  footer_rights: { tr: "Tüm hakları saklıdır.", en: "All rights reserved." }
};
