/**
 * TMMOB Mimarlar Odası En Az Bedel, ÇŞİDB 2026 Yapı Yaklaşık Birim Maliyetleri
 * ve Hastürk Mimarlık Teklif & Fizibilite Hesaplama Motoru
 * 
 * - Proje Hizmeti: Mimarlar Odası asgari bedel tarifesi ve şartnameleri odaklı
 *   * Eski Eser: 2863 Sayılı Kültür ve Tabiat Varlıklarını Koruma Kanunu & Kurul süreçleri
 *   * Yeni Yapı: İmar mevzuatı ve mimari ruhsat odaklı (Koruma Kurulu hariç)
 *   * Statik Güçlendirme Projesi: 1.200 TL / m² sabit proje bedeli
 * 
 * - Uygulama Hizmeti: Şantiye & anahtar teslim imalat odaklı
 *   * Tarihi Yapı Restorasyonu: V-C Sınıfı 48.750 × 1.5 = 73.125 TL / m²
 *   * Yeni Yapı İnşaatı: IV-B 50.850 TL / m² (300m²+) veya III-C 35.100 TL / m² (<300m²)
 *   * Tadilat & Tamirat: 17.000 TL / m² piyasa rayici
 *   * Statik Güçlendirme Uygulaması: 26.450 TL / m² (1.5 ile ÇARPILMAZ, ÇŞİDB IV-A liste fiyatı)
 */

export type ServiceDomain = 'project' | 'execution';

export type ProjectType = 
  | 'restoration'          // Proje: Eski Eser (2863 Sayılı Kanuna Tabi)
  | 'new_architecture'     // Proje: Yeni Mimari Tasarım & Ruhsat
  | 'strengthening'        // Proje: Statik Güçlendirme Projesi (1.200 TL/m²)
  | 'exec_restoration'     // Uygulama: Tarihi Yapı Restorasyon (73.125 TL/m²)
  | 'exec_new'             // Uygulama: Yeni Yapı İnşaatı (Arsa sorgulamalı)
  | 'exec_renovation'      // Uygulama: Tadilat & Tamirat (17.000 TL/m²)
  | 'exec_strengthening';  // Uygulama: Statik Güçlendirme İmalatı (26.450 TL/m²)

export type BuildingMaterial = 'wood' | 'stone_masonry' | 'composite' | 'concrete';

export type HeritageStatus = 'grade_1' | 'grade_2' | 'unregistered';

export type LocationArea = 
  | 'istanbul_fatih' 
  | 'istanbul_beyoglu' 
  | 'istanbul_bogazici' 
  | 'istanbul_kadikoy_adalar' 
  | 'istanbul_other' 
  | 'other_cities';

export type PackageTier = 'basic' | 'comprehensive' | 'turnkey';

export interface ServiceOption {
  id: string;
  name: string;
  desc: string;
  weight: number; // percentage share of full service
  isRecommended?: boolean;
}

export interface QuoteInputs {
  domain?: ServiceDomain;
  projectType: ProjectType;
  areaSquareMeters: number;
  buildingMaterial: BuildingMaterial;
  heritageStatus: HeritageStatus;
  locationArea: LocationArea;
  selectedServices: string[];
  hasLand?: 'yes' | 'looking';
}

export interface BreakdownItem {
  id: string;
  name: string;
  percentage: number;
  fee: number;
}

export interface PaymentStage {
  step: number;
  percent: number;
  title: string;
  amount: number;
  desc: string;
}

export interface TimelineStep {
  step: number;
  weeks: string;
  title: string;
  desc: string;
}

export interface PackageDetail {
  id: PackageTier;
  name: string;
  tagline: string;
  multiplier: number;
  isPopular?: boolean;
  features: string[];
}

export interface MinistryClassInfo {
  code: string;
  name: string;
  baseUnitCostPerM2: number; // ÇŞİDB Resmi Liste Fiyatı
  multiplier: number;        // Reel Uygulama Katsayısı
  unitCostPerM2: number;     // Uygulama / Proje Esas Birim Maliyeti
  officialGazette: string;
  definition: string;
}

export interface QuoteResult {
  domain: ServiceDomain;
  totalEstimatedCost: number; // Yapı yaklaşık maliyeti (PYM)
  tmmobBaseFee: number; // Proje Hizmet Bedeli veya Taban Bedel
  ministryClass: MinistryClassInfo; // Çevre ve Şehircilik Bakanlığı 2026 Tebliği / Referans
  packageFees: Record<PackageTier, number>;
  paymentPlans: Record<PackageTier, PaymentStage[]>;
  timelineSteps: TimelineStep[];
  showConservationBoard: boolean; // SADECE Eski Eser ise true
  isGrantEligible: boolean;       // SADECE 2863 sayılı tescilli eser ise true
  conservationBoard: {
    name: string;
    weeks: string;
    note: string;
  };
  breakdown: BreakdownItem[];
  estimatedDurationWeeks: { min: number; max: number };
  appliedFactors: {
    materialFactor: number;
    heritageFactor: number;
    locationFactor: number;
  };
  recommendedFee: number;
}

// 1. Proje Hizmeti İçin Paket Tanımları
export const PROJECT_PACKAGE_TIERS: Record<PackageTier, PackageDetail> = {
  basic: {
    id: 'basic',
    name: 'Yasal Asgari Ruhsat Paketi',
    tagline: 'TMMOB Asgari Yasal Taban Bedeli',
    multiplier: 1.0,
    features: [
      'TMMOB Mimarlar Odası asgari şartname çizimleri',
      'Resmi 2D Rölöve & Restorasyon / Ruhsat projeleri',
      'İlgili Belediye / Kurul ruhsat başvuru dosyası',
      'Mevzuata ve imar yönetmeliklerine %100 uyum'
    ]
  },
  comprehensive: {
    id: 'comprehensive',
    name: 'Kapsamlı Kurul & 3D Lidar Paketi',
    tagline: 'Standart ve Tavsiye Edilen Kapsam',
    multiplier: 1.25,
    isPopular: true,
    features: [
      '3D Hassas Lazer Tarama (Lidar) ve Drone Fotogrametrisi',
      'Milimetrik 3D Nokta Bulutu Modelleme',
      'Koruma Bölge Kurulu süreç & komisyon revizyon takibi',
      'Detaylı Malzeme Bozulma ve Hasar Haritalandırması',
      '3D Dış Cephe Avan Görselleştirme'
    ]
  },
  turnkey: {
    id: 'turnkey',
    name: 'Anahtar Teslim Proje & İhale Paketi',
    tagline: 'Eksiksiz Uygulama & Şantiye Güvencesi',
    multiplier: 1.50,
    features: [
      'Tüm Kapsamlı Kurul & Lidar Paketi hizmetleri',
      '1/20, 1/5, 1/1 İmalat ve montaj sistem detay paftaları',
      'İnşaat metrajı, yaklaşık maliyet keşfi ve ihale şartnamesi',
      'Müteahhit firma seçimi ve teknik teklif analizi',
      'Şantiye süresince fenni mesuliyet & mesleki kontrollük'
    ]
  }
};

// 2. Uygulama Hizmeti İçin Paket Tanımları
export const EXECUTION_PACKAGE_TIERS: Record<PackageTier, PackageDetail> = {
  basic: {
    id: 'basic',
    name: 'Standart Uygulama & İmalat Paketi',
    tagline: 'Mevzuata Uygun 1. Sınıf İmalat',
    multiplier: 1.0,
    features: [
      'Onaylı projelere harfiyen uygun şantiye imalatı',
      'TSE ve CE belgeli 1. kalite yerli yapı malzemeleri',
      'Temel, kaba inşaat ve taşıyıcı imalat güvencesi',
      'İş güvenliği ve resmi şantiye defteri yönetimi'
    ]
  },
  comprehensive: {
    id: 'comprehensive',
    name: 'Kapsamlı Premium İmalat Paketi',
    tagline: 'Tavsiye Edilen Yüksek Donatı Standartı',
    multiplier: 1.20,
    isPopular: true,
    features: [
      'Yüksek enerji sınıfı (A) yalıtım ve cephe detayları',
      'Özgün malzeme konservasyonu ve hassas el işçiliği',
      'Haftalık drone & 3D lazer şantiye ilerleme raporu',
      'Tesisat, akıllı altyapı ve gizli detay çözümleri',
      'Hastürk Mimarlık uzman mimar kontrollük denetimi'
    ]
  },
  turnkey: {
    id: 'turnkey',
    name: 'A+ Lüks Anahtar Teslim Şantiye Paketi',
    tagline: 'Eksiksiz Lüks Donatı & İskan Güvencesi',
    multiplier: 1.45,
    features: [
      'İthal 1. sınıf kaplama, doğal taş ve lüks ahşap imalatları',
      'Entegre akıllı ev otomasyonu ve iklimlendirme sistemleri',
      'Peyzaj düzenlemesi, dış çevre aydınlatma ve çevre duvarları',
      'Belediye yapı kullanım izin (İskan) dosya takibi',
      '5 yıl şantiye garanti ve periyodik teknik bakım desteği'
    ]
  }
};

// Geriye dönük uyumluluk
export const PACKAGE_TIERS = PROJECT_PACKAGE_TIERS;

// 3. Proje Türlerine Göre Hizmet Listeleri
export const RESTORATION_SERVICES: ServiceOption[] = [
  {
    id: 'laser_scan',
    name: '3D Lazer Tarama (Lidar) ve Nokta Bulutu',
    desc: 'Hassas mm ölçeğinde lazer tarama, drone fotogrametrisi ve 3D nokta bulutu modelleme.',
    weight: 0.15,
    isRecommended: true
  },
  {
    id: 'survey_drawing',
    name: 'Rölöve Çizimleri ve Hasar Analizi',
    desc: 'Kat planları, kesitler, görünüşler, malzeme bozulma paftaları ve detay çizimleri.',
    weight: 0.35,
    isRecommended: true
  },
  {
    id: 'restitution',
    name: 'Restitüsyon Projesi ve Tarihi Araştırma',
    desc: 'Arşiv belgeleri, dönem analizi, karşılaştırmalı mimarlık incelemesi ve sanat tarihi raporu.',
    weight: 0.20,
    isRecommended: true
  },
  {
    id: 'restoration_project',
    name: 'Restorasyon Uygulama ve Müdahale Projesi',
    desc: 'Koruma ve sağlamlaştırma kararları, malzeme müdahale paftaları ve uygulama detayları.',
    weight: 0.30,
    isRecommended: true
  },
  {
    id: 'conservation_board',
    name: 'Koruma Kurulu (Anıtlar Kurulu) Süreç Takibi',
    desc: 'Kültür Varlıkları Koruma Bölge Kurulu onay süreçleri, revizyonlar ve ruhsat danışmanlığı.',
    weight: 0.15,
    isRecommended: true
  },
  {
    id: 'site_supervision',
    name: 'Şantiye Mesleki Denetimi (Kontrollük)',
    desc: 'Uygulama aşamasında restorasyon uzmanı mimarlarımız tarafından şantiye denetimi ve hakediş kontrolü.',
    weight: 0.20
  }
];

export const NEW_ARCHITECTURE_SERVICES: ServiceOption[] = [
  {
    id: 'concept',
    name: 'Konsept ve Avan Proje',
    desc: 'İmar çapı analizi, fonksiyonel şema, kütle etütleri ve 3D görselleştirme sunumu.',
    weight: 0.15,
    isRecommended: true
  },
  {
    id: 'preliminary',
    name: 'Ruhsat Projeleri (Mimari)',
    desc: 'Belediye mevzuatına uygun ruhsat mimari projeleri ve sığınak/otopark hesapları.',
    weight: 0.25,
    isRecommended: true
  },
  {
    id: 'construction',
    name: 'Uygulama ve Sistem Detay Projeleri',
    desc: '1/20, 1/5, 1/1 ölçekli imalat ve montaj detayları, malzeme seçimleri ve mahal listesi.',
    weight: 0.30,
    isRecommended: true
  },
  {
    id: 'structural_mep',
    name: 'Disiplinler Arası Koordinasyon',
    desc: 'Statik, mekanik ve elektrik mühendislik projelerinin mimariyle çakışma (clash) kontrolü.',
    weight: 0.15,
    isRecommended: true
  },
  {
    id: 'tender_docs',
    name: 'Metraj, Keşif ve İhale Dosyası',
    desc: 'İnşaat maliyet keşfi, yaklaşık birim fiyat cetvelleri ve müteahhit ihale şartnamesi.',
    weight: 0.15
  },
  {
    id: 'site_supervision',
    name: 'Fenni Mesuliyet / Şantiye Kontrollüğü',
    desc: 'İnşaat süresince projenin yerinde uygulanma doğruluğunun mesleki denetimi.',
    weight: 0.20
  }
];

export const STRENGTHENING_SERVICES: ServiceOption[] = [
  {
    id: 'survey_drawing',
    name: 'Yapı Mevcut Durum Rölövesi',
    desc: 'Taşıyıcı sistem rölövesi, çatlak ve hasar haritalandırması.',
    weight: 0.25,
    isRecommended: true
  },
  {
    id: 'laser_scan',
    name: '3D Deformasyon ve Sehim Taraması',
    desc: 'Lazer tarama ile kolon/kiriş eğrilikleri, oturmalar ve sehimlerin milimetrik tespiti.',
    weight: 0.20,
    isRecommended: true
  },
  {
    id: 'structural_calc',
    name: 'Statik Performans ve Güçlendirme Projesi',
    desc: 'Karot test değerlendirmesi, karbon lif (CFRP)/çelik güçlendirme mimari ve statik projesi.',
    weight: 0.40,
    isRecommended: true
  },
  {
    id: 'municipal_approval',
    name: 'Belediye & Üniversite Onay Süreci',
    desc: 'Güçlendirme projesinin yetkili idare ve üniversite heyeti onay takibi.',
    weight: 0.15,
    isRecommended: true
  }
];

// Uygulama Hizmetleri
export const EXEC_RESTORATION_SERVICES: ServiceOption[] = [
  {
    id: 'exec_scaffold',
    name: '3D Lidar Saha Kurulumu & Koruma İskelesi',
    desc: 'Güvenlikli dış cephe iskelesi, askıya alma ve koruyucu çatı örtüsü imalatı.',
    weight: 0.15,
    isRecommended: true
  },
  {
    id: 'exec_conservation',
    name: 'Özgün Taş, Ahşap & Horasan Konservasyonu',
    desc: 'Tarihi doku temizliği, enjeksiyon sağlamlaştırma ve aslına uygun malzeme tamiri.',
    weight: 0.35,
    isRecommended: true
  },
  {
    id: 'exec_structure',
    name: 'Taşıyıcı Karkas & Çatı Rekonstrüksiyonu',
    desc: 'Geleneksel ahşap bindirme, bağdadi sıva ve kurşun/kenet çatı kaplama imalatı.',
    weight: 0.30,
    isRecommended: true
  },
  {
    id: 'exec_supervision',
    name: 'Kurul Onaylı Şantiye Yönetimi & Fenni Mesuliyet',
    desc: 'Koruma Kurulu ara denetimleri, hakediş raporları ve restorasyon iskan teslimi.',
    weight: 0.20,
    isRecommended: true
  }
];

export const EXEC_NEW_SERVICES: ServiceOption[] = [
  {
    id: 'exec_substructure',
    name: 'Hafriyat, Temel & Kaba İnşaat',
    desc: 'Radye temel, su yalıtımı, C35/40 hazır beton ve B420C çelik taşıyıcı karkas.',
    weight: 0.35,
    isRecommended: true
  },
  {
    id: 'exec_facade',
    name: 'Dış Cephe & Yalıtım Sistemleri',
    desc: 'Taş yünü mantolama, doğal taş/kompozit cephe ve alüminyum doğrama cam sistemleri.',
    weight: 0.25,
    isRecommended: true
  },
  {
    id: 'exec_mep_install',
    name: 'Mekanik & Elektrik Akıllı Tesisat',
    desc: 'Yerden ısıtma, VRF klima, akıllı ev altyapısı ve yangın güvenlik sistemleri.',
    weight: 0.20,
    isRecommended: true
  },
  {
    id: 'exec_finishing',
    name: 'İnce Yapı & Anahtar Teslim İç Mimari',
    desc: '1. sınıf parke, seramik, lake kapı, özel mutfak/banyo imalatları ve boya.',
    weight: 0.20,
    isRecommended: true
  }
];

export const EXEC_RENOVATION_SERVICES: ServiceOption[] = [
  {
    id: 'reno_demolition',
    name: 'Kırım, Söküm & Moloz Nakliyatı',
    desc: 'Mevcut kaplamaların sökülmesi, bölme duvar revizyonu ve moloz bertarafı.',
    weight: 0.15,
    isRecommended: true
  },
  {
    id: 'reno_piping',
    name: 'Sıhhi & Elektrik Tesisat Sıfırlama',
    desc: 'Pex borulama, sigorta kutusu, zayıf akım kablolama ve sıhhi altyapı yenileme.',
    weight: 0.25,
    isRecommended: true
  },
  {
    id: 'reno_flooring',
    name: 'Zemin Kaplama, Seramik & Parke',
    desc: 'Şap tesviyesi, porselen seramik ve lüks lamine/masif parke uygulamaları.',
    weight: 0.20,
    isRecommended: true
  },
  {
    id: 'reno_ceiling_wall',
    name: 'Alçıpan Tavan, Gizli Işık & İtalyan Boya',
    desc: 'Akustik asma tavan, modern aydınlatma cepleri ve premium duvar kaplamaları.',
    weight: 0.20,
    isRecommended: true
  },
  {
    id: 'reno_joinery',
    name: 'Mutfak, Banyo & Özel Sabit Mobilya',
    desc: 'Akrilik/porselen tezgah, gömme dolaplar, lake paneller ve armatür montajı.',
    weight: 0.20,
    isRecommended: true
  }
];

export const EXEC_STRENGTHENING_SERVICES: ServiceOption[] = [
  {
    id: 'exec_str_cfrp',
    name: 'Karbon Lif (CFRP) & Çelik Mantolama',
    desc: 'Kolon ve kirişlerin yüksek mukavemetli karbon polimer ve çelik kafesle sarılması.',
    weight: 0.40,
    isRecommended: true
  },
  {
    id: 'exec_str_epoxy',
    name: 'Epoksi Enjeksiyon & Çatlak Dikimi',
    desc: 'Taşıyıcı elemanlardaki çatlakların yüksek basınçlı epoksi reçine ile doldurulması.',
    weight: 0.20,
    isRecommended: true
  },
  {
    id: 'exec_str_foundation',
    name: 'Temel Genişletme & Mini Kazık',
    desc: 'Radye temel takviyesi, zemin ankrajı ve taşıyıcı perde duvar betonarmesi.',
    weight: 0.25,
    isRecommended: true
  },
  {
    id: 'exec_str_qa',
    name: 'Şantiye Kalite Kontrol & Karot Doğrulama',
    desc: 'İmalat sonrası tahribatsız testler, ultrasonik ölçümler ve onaylı mukavemet raporu.',
    weight: 0.15,
    isRecommended: true
  }
];

export function getServicesForType(type: ProjectType, domain: ServiceDomain = 'project'): ServiceOption[] {
  if (domain === 'execution') {
    switch (type) {
      case 'exec_restoration':
      case 'restoration':
        return EXEC_RESTORATION_SERVICES;
      case 'exec_renovation':
        return EXEC_RENOVATION_SERVICES;
      case 'exec_strengthening':
      case 'strengthening':
        return EXEC_STRENGTHENING_SERVICES;
      case 'exec_new':
      case 'new_architecture':
      default:
        return EXEC_NEW_SERVICES;
    }
  } else {
    switch (type) {
      case 'restoration':
      case 'exec_restoration':
        return RESTORATION_SERVICES;
      case 'strengthening':
      case 'exec_strengthening':
        return STRENGTHENING_SERVICES;
      case 'new_architecture':
      case 'exec_new':
      default:
        return NEW_ARCHITECTURE_SERVICES;
    }
  }
}

// 4. Katsayı Tabloları
export const MATERIAL_FACTORS: Record<BuildingMaterial, { label: string; factor: number; desc: string }> = {
  wood: {
    label: 'Ahşap Karkas / Geleneksel Ahşap',
    factor: 1.30,
    desc: 'Ahşap koruma, geleneksel geçmeler ve yüksek işçilik gerektiren özel uzmanlık.'
  },
  stone_masonry: {
    label: 'Yığma Taş / Tuğla (Kagir)',
    factor: 1.20,
    desc: 'Kemerler, tonozlar, horasan harcı analizleri ve tarihi taş işçiliği.'
  },
  composite: {
    label: 'Karma (Bağdadi / Taş + Ahşap)',
    factor: 1.15,
    desc: 'Farklı dönem malzemelerinin bir arada bulunduğu çoklu restorasyon tekniği.'
  },
  concrete: {
    label: 'Betonarme / Modern Taşıyıcı',
    factor: 1.00,
    desc: 'Standart mühendislik normları ve konvansiyonel sistemler.'
  }
};

export const HERITAGE_FACTORS: Record<HeritageStatus, { label: string; factor: number; desc: string }> = {
  grade_1: {
    label: '1. Grup / Anıtsal Kültür Varlığı',
    factor: 1.35,
    desc: 'Yüksek tarihi değere sahip cami, köşk, saray, han, çeşme gibi birinci sınıf yapılar.'
  },
  grade_2: {
    label: '2. Grup Sivil Mimarlık Örneği',
    factor: 1.15,
    desc: 'Kentsel sit alanında kalan tarihi konut, dükkan ve konaklar.'
  },
  unregistered: {
    label: 'Tescilsiz / Koruma Alanı İçi',
    factor: 1.00,
    desc: 'Tescil kaydı olmayan veya tescil önerisi bulunan yapılar.'
  }
};

export const LOCATION_FACTORS: Record<LocationArea, { 
  label: string; 
  factor: number; 
  boardName: string;
  boardDuration: string;
  desc: string; 
}> = {
  istanbul_fatih: {
    label: 'Tarihi Yarımada / Fatih (Süleymaniye, Balat, Sultanahmet)',
    factor: 1.25,
    boardName: 'İstanbul IV Numaralı Kültür Varlıklarını Koruma Bölge Kurulu',
    boardDuration: '12 - 16 Hafta',
    desc: 'UNESCO Dünya Mirası ve Yenileme Alanları mevzuatına tabidir.'
  },
  istanbul_beyoglu: {
    label: 'Beyoğlu & Haliç (Galata, Cihangir, İstiklal, Karaköy)',
    factor: 1.20,
    boardName: 'İstanbul II Numaralı Kültür Varlıklarını Koruma Bölge Kurulu',
    boardDuration: '10 - 14 Hafta',
    desc: 'Kentsel Sit ve Tarihi Sit Alanı koruma kararları geçerlidir.'
  },
  istanbul_bogazici: {
    label: 'Boğaziçi Sahili (Sarıyer, Beşiktaş, Üsküdar, Beykoz)',
    factor: 1.25,
    boardName: 'İstanbul III Nolu K.V.K.B. Kurulu & Boğaziçi İmar Şube Md.',
    boardDuration: '14 - 18 Hafta',
    desc: '2960 sayılı Boğaziçi Kanunu ve Ön Görünüm Bölgesi özel hükümlerine tabidir.'
  },
  istanbul_kadikoy_adalar: {
    label: 'Kadıköy, Üsküdar & Prens Adaları',
    factor: 1.20,
    boardName: 'İstanbul V Numaralı Kültür Varlıklarını Koruma Bölge Kurulu',
    boardDuration: '10 - 14 Hafta',
    desc: 'Adalar Özel Çevre Koruma ve Ahşap Mimari Doku normları uygulanır.'
  },
  istanbul_other: {
    label: 'Diğer İstanbul İlçeleri (Şişli, Bakırköy, Zeytinburnu vb.)',
    factor: 1.15,
    boardName: 'İstanbul I / VI Numaralı Kültür Varlıklarını Koruma Bölge Kurulu',
    boardDuration: '8 - 12 Hafta',
    desc: 'İlgili İlçe Belediyesi İmar Müdürlüğü ve Koruma Kurulu onay süreçleri yürütülür.'
  },
  other_cities: {
    label: 'Diğer İller / Marmara & Türkiye Geneli',
    factor: 1.00,
    boardName: 'İlgili İl Kültür Varlıklarını Koruma Bölge Kurulu',
    boardDuration: '8 - 12 Hafta',
    desc: 'İl sınırları dahilindeki yetkili Kültür Varlıkları Bölge Kurulu yetkisindedir.'
  }
};

// 5. Aşamalı Ödeme Planı Hesaplayıcı (%25, %35, %25, %15)
export function calculatePaymentPlan(
  totalFee: number, 
  projectType: ProjectType,
  domain: ServiceDomain = 'project'
): PaymentStage[] {
  if (domain === 'execution') {
    return [
      {
        step: 1,
        percent: 25,
        title: 'Sözleşme & Şantiye Mobilizasyonu',
        amount: Math.round(totalFee * 0.25),
        desc: 'Sözleşme imza aşaması, şantiye kurulumu, malzeme siparişleri ve ilk etap tedariki'
      },
      {
        step: 2,
        percent: 35,
        title: 'Kaba Yapı / Taşıyıcı & Kırım İmalatı',
        amount: Math.round(totalFee * 0.35),
        desc: 'Taşıyıcı sistem, kaba inşaat, kırım/söküm veya güçlendirme imalatlarının tamamlanması'
      },
      {
        step: 3,
        percent: 25,
        title: 'İnce İşçilik & Tesisat Donatısı',
        amount: Math.round(totalFee * 0.25),
        desc: 'Elektrik/mekanik tesisat sıfırlama, zemin kaplamaları, sıva, boya ve sabit doğramalar'
      },
      {
        step: 4,
        percent: 15,
        title: 'Geçici Kabul & Anahtar Teslim',
        amount: Math.round(totalFee * 0.15),
        desc: 'Eksiklerin giderilmesi, şantiye temizliği, resmi kabul ve anahtar teslimi'
      }
    ];
  }

  if (projectType === 'restoration' || projectType === 'exec_restoration') {
    return [
      {
        step: 1,
        percent: 25,
        title: 'Sözleşme & 3D Saha Taraması',
        amount: Math.round(totalFee * 0.25),
        desc: 'Proje başlangıcı, 3D Lazer tarama (Lidar) ve saha veri toplama'
      },
      {
        step: 2,
        percent: 35,
        title: 'Rölöve & Restitüsyon Teslimi',
        amount: Math.round(totalFee * 0.35),
        desc: 'Mevcut durum ölçümleri, dönem analizleri ve tarihi raporlama'
      },
      {
        step: 3,
        percent: 25,
        title: 'Restorasyon & Kurul Başvurusu',
        amount: Math.round(totalFee * 0.25),
        desc: 'Müdahale projelerinin tamamlanarak Koruma Kuruluna resmi sevk'
      },
      {
        step: 4,
        percent: 15,
        title: 'Kurul Onayı & Ruhsat Alımı',
        amount: Math.round(totalFee * 0.15),
        desc: 'Bölge Kurulu onay kararı ve nihai uygulama ruhsatının teslimi'
      }
    ];
  } else if (projectType === 'strengthening' || projectType === 'exec_strengthening') {
    return [
      {
        step: 1,
        percent: 25,
        title: 'Sözleşme & Saha Rölövesi',
        amount: Math.round(totalFee * 0.25),
        desc: 'Taşıyıcı sistem tespiti, karot numune koordinasyonu ve 3D sehim analizi'
      },
      {
        step: 2,
        percent: 35,
        title: 'Statik Hesap & Güçlendirme Modeli',
        amount: Math.round(totalFee * 0.35),
        desc: '3D sonlu elemanlar analizi ve güçlendirme mimari sistem çözümleri'
      },
      {
        step: 3,
        percent: 25,
        title: 'Uygulama Paftaları & Detay Çizimleri',
        amount: Math.round(totalFee * 0.25),
        desc: 'Karbon lif/çelik montaj paftaları, metraj keşfi ve onay dosyasının hazırlanması'
      },
      {
        step: 4,
        percent: 15,
        title: 'Resmi Onay & Ruhsat Dosyası',
        amount: Math.round(totalFee * 0.15),
        desc: 'İlgili idare veya üniversite onaylı nihai projenin teslimi'
      }
    ];
  } else {
    return [
      {
        step: 1,
        percent: 25,
        title: 'Sözleşme & Avan Proje Etüdü',
        amount: Math.round(totalFee * 0.25),
        desc: 'Konsept tasarım, kütle analizleri ve fonksiyonel yerleşim şeması'
      },
      {
        step: 2,
        percent: 35,
        title: 'Mimari Ruhsat Projeleri',
        amount: Math.round(totalFee * 0.35),
        desc: 'Belediye mevzuatına uygun ruhsat çizimleri ve mühendislik koordinasyonu'
      },
      {
        step: 3,
        percent: 25,
        title: 'Uygulama & Sistem Detayları',
        amount: Math.round(totalFee * 0.25),
        desc: '1/20, 1/5 imalat detayları, mahal listeleri ve sistem paftaları'
      },
      {
        step: 4,
        percent: 15,
        title: 'Ruhsat Onayı & İhale Dosyası',
        amount: Math.round(totalFee * 0.15),
        desc: 'İlgili idare onaylı ruhsat projesi ve kesin metraj/ihale teslimi'
      }
    ];
  }
}

// 6. Süreç Zaman Çizelgesi (Gantt)
export function getTimelineSteps(
  projectType: ProjectType,
  domain: ServiceDomain = 'project',
  hasBoard: boolean = false,
  boardDurationWeeks: string = '8 - 12 Hafta'
): TimelineStep[] {
  if (domain === 'execution') {
    if (projectType === 'exec_renovation') {
      return [
        {
          step: 1,
          weeks: '1. Hafta',
          title: 'Kırım, Söküm & Moloz Tahliyesi',
          desc: 'Tüm eski kaplamaların sökülmesi ve şantiyenin imalata hazır hale getirilmesi.'
        },
        {
          step: 2,
          weeks: '2 - 3. Hafta',
          title: 'Tesisat Sıfırlama & Altyapı',
          desc: 'Elektrik kablolama, pex borulama, klima hatları ve ses/ısı yalıtımı.'
        },
        {
          step: 3,
          weeks: '4 - 5. Hafta',
          title: 'Zemin, Tavan & İnce İşçilik',
          desc: 'Alçıpan tavan, şap, seramik kaplama ve duvar boyası uygulamaları.'
        },
        {
          step: 4,
          weeks: '6 - 8. Hafta',
          title: 'Sabit Mobilya & Anahtar Teslim',
          desc: 'Mutfak, banyo dolapları, kapılar, armatür montajı ve temizlik teslimi.'
        }
      ];
    } else if (projectType === 'exec_strengthening') {
      return [
        {
          step: 1,
          weeks: '1 - 2. Hafta',
          title: 'Yüzey Hazırlığı & Raspa',
          desc: 'Taşıyıcı kolon/kiriş yüzeylerinin pürüzlendirilmesi ve çatlak tespiti.'
        },
        {
          step: 2,
          weeks: '3 - 6. Hafta',
          title: 'Karbon Lif & Çelik Mantolama',
          desc: 'CFRP polimer sargı, epoksi enjeksiyonu ve çelik kafes ankraj imalatları.'
        },
        {
          step: 3,
          weeks: '7 - 9. Hafta',
          title: 'Temel Tahkimatı & Enjeksiyon',
          desc: 'Temel radye genişletmesi, perde duvar imalatı ve korozyon önleyici kaplama.'
        },
        {
          step: 4,
          weeks: '10 - 12. Hafta',
          title: 'Kalite Kontrol & Ruhsat İskan',
          desc: 'Tahribatsız testler, resmi fenni mesuliyet onayı ve güvenli teslim.'
        }
      ];
    } else {
      return [
        {
          step: 1,
          weeks: '1 - 3. Hafta',
          title: 'Şantiye Kurulumu & Hafriyat / İskele',
          desc: 'Şantiye mobilizasyonu, iş güvenliği önlemleri ve temel/iskele hazırlığı.'
        },
        {
          step: 2,
          weeks: '4 - 10. Hafta',
          title: 'Kaba Yapı & Taşıyıcı İmalatlar',
          desc: 'Temel, betonarme/ahşap karkas, duvar örme ve çatı strüktürünün tamamlanması.'
        },
        {
          step: 3,
          weeks: '11 - 18. Hafta',
          title: 'Dış Cephe, Yalıtım & Tesisat',
          desc: 'Doğal taş/ahşap cephe kaplamaları, su/ısı yalıtımı ve MEP tesisat çekimi.'
        },
        {
          step: 4,
          weeks: '19 - 24. Hafta',
          title: 'İç Mimari & İskan Teslimi',
          desc: 'Lüks iç mimari imalatları, çevre peyzajı ve iskan/kabul teslimi.'
        }
      ];
    }
  }

  // PROJE HİZMETİ
  if (projectType === 'restoration' || projectType === 'exec_restoration') {
    return [
      {
        step: 1,
        weeks: '1 - 2. Hafta',
        title: 'Lazer Tarama & Saha Belgeleme',
        desc: '3D Lidar lazer tarayıcı ile binanın milimetrik nokta bulutu verisinin çıkarılması ve drone çekimleri.'
      },
      {
        step: 2,
        weeks: '3 - 6. Hafta',
        title: 'Rölöve & Tarihsel Restitüsyon',
        desc: 'Kat planları, kesitler, malzeme bozulma analizleri ve arşiv araştırmalarıyla yapının özgün dönem tespiti.'
      },
      {
        step: 3,
        weeks: '7 - 9. Hafta',
        title: 'Restorasyon Müdahale Projesi',
        desc: 'Güçlendirme kararları, malzeme restorasyon reçeteleri, statik raporlar ve onay dosyasının derlenmesi.'
      },
      {
        step: 4,
        weeks: hasBoard ? boardDurationWeeks : '8 - 12 Hafta',
        title: 'Koruma Bölge Kurulu İnceleme & Onay',
        desc: '2863 sayılı kanun kapsamında yetkili Anıtlar Kurulu raportör incelemesi ve onaylı proje ruhsatı.'
      }
    ];
  } else if (projectType === 'strengthening' || projectType === 'exec_strengthening') {
    return [
      {
        step: 1,
        weeks: '1 - 2. Hafta',
        title: 'Saha Rölövesi & Karot Analizi',
        desc: 'Mevcut bina taşıyıcı sistem tespiti, donatı taraması ve beton dayanım testleri.'
      },
      {
        step: 2,
        weeks: '3 - 4. Hafta',
        title: '3D Deprem Performans Modeli',
        desc: 'Sonlu elemanlar yöntemiyle binanın dinamik deprem davranışı ve riskli katların tespiti.'
      },
      {
        step: 3,
        weeks: '5 - 6. Hafta',
        title: 'Statik Güçlendirme Projesi',
        desc: 'Karbon lif ve çelik mantolama sistem detaylarının çizilmesi ve metraj cetvelleri.'
      },
      {
        step: 4,
        weeks: '7 - 8. Hafta',
        title: 'Belediye / Üniversite Onayı',
        desc: 'Resmi statik güçlendirme proje onayının alınması ve ihale dosyasının teslimi.'
      }
    ];
  } else {
    return [
      {
        step: 1,
        weeks: '1 - 2. Hafta',
        title: 'Konsept Tasarım & Arsa Analizi',
        desc: 'İmar çapı etüdü, topoğrafya analizi ve 3D kütle yerleşim konseptlerinin sunumu.'
      },
      {
        step: 2,
        weeks: '3 - 5. Hafta',
        title: 'Mimari Ruhsat Projeleri',
        desc: 'Belediye mevzuatına uygun mimari projelerin çizilmesi ve mühendislik disiplinleriyle koordinasyon.'
      },
      {
        step: 3,
        weeks: '6 - 8. Hafta',
        title: 'Uygulama Detayları & Mahal Listesi',
        desc: '1/20 sistem kesitleri, kapı/pencere doğrama detayları, ıslak hacim ve malzeme spesifikasyonları.'
      },
      {
        step: 4,
        weeks: '9 - 12. Hafta',
        title: 'Belediye Ruhsat Onayı & İhale Dosyası',
        desc: 'Resmi inşaat ruhsatının alınması, metraj keşif cetvelleri ve müteahhit ihale şartnamesi.'
      }
    ];
  }
}

// 7. Ana Teklif Hesaplama Motoru
export function calculateQuote(inputs: QuoteInputs): QuoteResult {
  const {
    domain = 'project',
    projectType,
    areaSquareMeters,
    buildingMaterial,
    heritageStatus,
    locationArea,
    selectedServices
  } = inputs;

  // Güvenlik sınırları (min 20m², max 10.000m²)
  const clampedArea = Math.max(20, Math.min(10000, areaSquareMeters || 100));

  const matFactor = MATERIAL_FACTORS[buildingMaterial]?.factor || 1.0;
  const herFactor = HERITAGE_FACTORS[heritageStatus]?.factor || 1.0;
  const locFactor = LOCATION_FACTORS[locationArea]?.factor || 1.0;

  let ministryClass: MinistryClassInfo;
  let totalEstimatedCost = 0; // Yapı yaklaşık maliyeti
  let baseCalculatedFee = 0;   // Temel proje bedeli veya uygulama maliyeti
  let showConservationBoard = false;
  let isGrantEligible = false;

  // Çevre, Şehircilik ve İklim Değişikliği Bakanlığı 2026 Tebliği (Resmî Gazete 33157)
  const APPLICATION_PRICE_MULTIPLIER = 1.5;

  if (domain === 'execution') {
    // === UYGULAMA / İNŞAAT HİZMETİ ===
    if (projectType === 'exec_restoration' || projectType === 'restoration') {
      // 1. Tarihi Yapı Restorasyon Uygulaması: 48.750 * 1.5 = 73.125 TL/m²
      const baseCost = 48750;
      const unitCost = Math.round(baseCost * APPLICATION_PRICE_MULTIPLIER); // 73.125 TL
      ministryClass = {
        code: 'V-C',
        name: 'V. Sınıf (C) Grubu — Tarihi Eser Restorasyon',
        baseUnitCostPerM2: baseCost,
        multiplier: APPLICATION_PRICE_MULTIPLIER,
        unitCostPerM2: unitCost,
        officialGazette: 'Resmî Gazete: 3 Şubat 2026 / Sayı: 33157',
        definition: '2863 Sayılı Kültür ve Tabiat Varlıklarını Koruma Kanununa tabi tescilli eser restorasyon uygulaması'
      };
      showConservationBoard = true;
      isGrantEligible = heritageStatus === 'grade_1' || heritageStatus === 'grade_2';
      totalEstimatedCost = clampedArea * unitCost * matFactor;
      baseCalculatedFee = totalEstimatedCost;
    } else if (projectType === 'exec_renovation') {
      // 2. Tadilat & Tamirat Uygulaması: Sabit 17.000 TL / m²
      const unitCost = 17000;
      ministryClass = {
        code: 'TADİLAT',
        name: 'Kapsamlı İç Mekan Tadilat & Tamirat',
        baseUnitCostPerM2: unitCost,
        multiplier: 1.0,
        unitCostPerM2: unitCost,
        officialGazette: 'Hastürk Mimarlık 2026 Piyasa Rayici',
        definition: 'İç mekan yenileme, tesisat, ıslak hacimler, çatı ve ince işçilik uygulaması'
      };
      showConservationBoard = false;
      isGrantEligible = false;
      totalEstimatedCost = clampedArea * unitCost;
      baseCalculatedFee = totalEstimatedCost;
    } else if (projectType === 'exec_strengthening') {
      // 3. Statik Güçlendirme Uygulaması: 1.5 ile ÇARPILMAZ! ÇŞİDB IV-A: 26.450 TL / m²
      const unitCost = 26450;
      ministryClass = {
        code: 'IV-A',
        name: 'IV. Sınıf (A) Grubu — Taşıyıcı Güçlendirme İmalatı',
        baseUnitCostPerM2: unitCost,
        multiplier: 1.0, // 1.5 ile ÇARPILMIYOR
        unitCostPerM2: unitCost,
        officialGazette: 'Resmî Gazete: 3 Şubat 2026 / Sayı: 33157',
        definition: 'Yapısal güçlendirme, karbon lif (CFRP), çelik mantolama ve temel tahkimat imalatı'
      };
      showConservationBoard = false;
      isGrantEligible = false;
      totalEstimatedCost = clampedArea * unitCost;
      baseCalculatedFee = totalEstimatedCost;
    } else {
      // 4. exec_new (Yeni Yapı İnşaat Uygulaması)
      if (clampedArea >= 300) {
        const baseCost = 33900;
        const unitCost = Math.round(baseCost * APPLICATION_PRICE_MULTIPLIER); // 50.850 TL
        ministryClass = {
          code: 'IV-B',
          name: 'IV. Sınıf (B) Grubu — Müstakil Villa / Lüks Konut',
          baseUnitCostPerM2: baseCost,
          multiplier: APPLICATION_PRICE_MULTIPLIER,
          unitCostPerM2: unitCost,
          officialGazette: 'Resmî Gazete: 3 Şubat 2026 / Sayı: 33157',
          definition: 'Müstakil lüks konut ve villalar için anahtar teslim inşaat uygulaması'
        };
        totalEstimatedCost = clampedArea * unitCost * matFactor;
      } else {
        const baseCost = 23400;
        const unitCost = Math.round(baseCost * APPLICATION_PRICE_MULTIPLIER); // 35.100 TL
        ministryClass = {
          code: 'III-C',
          name: 'III. Sınıf (C) Grubu — Müstakil Konut',
          baseUnitCostPerM2: baseCost,
          multiplier: APPLICATION_PRICE_MULTIPLIER,
          unitCostPerM2: unitCost,
          officialGazette: 'Resmî Gazete: 3 Şubat 2026 / Sayı: 33157',
          definition: 'Müstakil konut ve standart villalar için anahtar teslim inşaat uygulaması'
        };
        totalEstimatedCost = clampedArea * unitCost * matFactor;
      }
      showConservationBoard = false;
      isGrantEligible = false;
      baseCalculatedFee = totalEstimatedCost;
    }
  } else {
    // === PROJE HİZMETİ (MİMARLAR ODASI ODAKLI) ===
    if (projectType === 'restoration' || projectType === 'exec_restoration') {
      // 1. Eski Eser (2863 Sayılı Kanuna Tabi Yapılar)
      const baseCost = 48750;
      const unitCost = Math.round(baseCost * APPLICATION_PRICE_MULTIPLIER); // 73.125 TL
      ministryClass = {
        code: 'V-C',
        name: 'V. Sınıf (C) Grubu — 2863 Sayılı Kanuna Tabi Eserler',
        baseUnitCostPerM2: baseCost,
        multiplier: APPLICATION_PRICE_MULTIPLIER,
        unitCostPerM2: unitCost,
        officialGazette: 'Resmî Gazete: 3 Şubat 2026 / Sayı: 33157',
        definition: '2863 Sayılı Kültür ve Tabiat Varlıklarını Koruma Kanununa tabi tescilli yapılar'
      };
      showConservationBoard = true;
      isGrantEligible = heritageStatus === 'grade_1' || heritageStatus === 'grade_2';

      totalEstimatedCost = clampedArea * unitCost * matFactor;
      let serviceFeeRate = 0.055; // TMMOB Restorasyon asgari hizmet oranı
      if (clampedArea > 1000) serviceFeeRate *= 0.88;
      else if (clampedArea > 500) serviceFeeRate *= 0.94;

      const fullTmmobBase = totalEstimatedCost * serviceFeeRate * herFactor * locFactor;
      baseCalculatedFee = fullTmmobBase;
    } else if (projectType === 'strengthening' || projectType === 'exec_strengthening') {
      // 2. Statik Güçlendirme Projesi: Metrekaresi net 1.200 TL!
      const projectUnitCost = 1200;
      ministryClass = {
        code: 'GÜÇLENDİRME-PRJ',
        name: 'Statik Güçlendirme & Deprem Performans Projesi',
        baseUnitCostPerM2: projectUnitCost,
        multiplier: 1.0,
        unitCostPerM2: projectUnitCost,
        officialGazette: 'TMMOB İMO / Mimarlar Odası 2026 Normu',
        definition: 'Taşıyıcı sistem analizi, deprem tahkiki ve onaylı statik güçlendirme uygulama projesi (1.200 TL/m²)'
      };
      showConservationBoard = false;
      isGrantEligible = false;

      // Yapı inşaat yaklaşık maliyeti (26.450 TL/m²)
      totalEstimatedCost = clampedArea * 26450;
      // Proje bedeli doğrudan m² × 1.200 TL
      baseCalculatedFee = clampedArea * projectUnitCost;
    } else {
      // 3. Yeni Yapı (Mimari Tasarım, Ruhsat & Avan Proje) - KORUMA KURULU GELMEZ!
      let baseCost = 23400;
      let classCode = 'III-C';
      let className = 'III. Sınıf (C) Grubu — Müstakil Konut';
      let defText = 'Müstakil konut ve standart villalar için mimari proje ve ruhsat dosyası';

      if (clampedArea >= 300) {
        baseCost = 33900;
        classCode = 'IV-B';
        className = 'IV. Sınıf (B) Grubu — Lüks Konut / Villa';
        defText = 'Müstakil lüks konutlar ve özellikli villalar için mimari proje ve ruhsat dosyası';
      }

      const unitCost = Math.round(baseCost * APPLICATION_PRICE_MULTIPLIER);
      ministryClass = {
        code: classCode,
        name: className,
        baseUnitCostPerM2: baseCost,
        multiplier: APPLICATION_PRICE_MULTIPLIER,
        unitCostPerM2: unitCost,
        officialGazette: 'Resmî Gazete: 3 Şubat 2026 / Sayı: 33157',
        definition: defText
      };
      showConservationBoard = false;
      isGrantEligible = false;

      totalEstimatedCost = clampedArea * unitCost * matFactor;
      let serviceFeeRate = 0.045;
      if (clampedArea > 1000) serviceFeeRate *= 0.88;
      else if (clampedArea > 500) serviceFeeRate *= 0.94;

      const fullTmmobBase = totalEstimatedCost * serviceFeeRate * locFactor;
      baseCalculatedFee = fullTmmobBase;
    }
  }

  // Seçilen hizmetlerin ağırlık katsayısı
  const availableServices = getServicesForType(projectType, domain);
  const selectedServiceList = availableServices.filter(s => selectedServices.includes(s.id));
  const totalWeightSelected = selectedServiceList.reduce((acc, s) => acc + s.weight, 0);
  const normalizedWeight = Math.max(0.2, totalWeightSelected || 1.0);

  // Nihai Taban Bedel
  const tmmobBaseFee = Math.round(baseCalculatedFee * normalizedWeight);

  // Paket çarpanları
  const activePackageTiers = domain === 'execution' ? EXECUTION_PACKAGE_TIERS : PROJECT_PACKAGE_TIERS;
  const packageFees: Record<PackageTier, number> = {
    basic: tmmobBaseFee,
    comprehensive: Math.round(tmmobBaseFee * activePackageTiers.comprehensive.multiplier),
    turnkey: Math.round(tmmobBaseFee * activePackageTiers.turnkey.multiplier)
  };

  // Ödeme Planları
  const paymentPlans: Record<PackageTier, PaymentStage[]> = {
    basic: calculatePaymentPlan(packageFees.basic, projectType, domain),
    comprehensive: calculatePaymentPlan(packageFees.comprehensive, projectType, domain),
    turnkey: calculatePaymentPlan(packageFees.turnkey, projectType, domain)
  };

  // Lokasyon ve Kurul Bilgisi
  const locInfo = LOCATION_FACTORS[locationArea] || LOCATION_FACTORS.istanbul_fatih;
  const conservationBoard = {
    name: locInfo.boardName,
    weeks: locInfo.boardDuration,
    note: locInfo.desc
  };

  // Zaman Çizelgesi
  const timelineSteps = getTimelineSteps(projectType, domain, showConservationBoard, locInfo.boardDuration);

  // Kalem bazlı dağılım
  const breakdown: BreakdownItem[] = selectedServiceList.map(s => {
    const itemRatio = s.weight / (totalWeightSelected || 1);
    return {
      id: s.id,
      name: s.name,
      percentage: Math.round(itemRatio * 100),
      fee: Math.round(tmmobBaseFee * itemRatio)
    };
  });

  // Tahmini süre
  let minWeeks = domain === 'execution' ? 8 : 4;
  let maxWeeks = domain === 'execution' ? 16 : 8;
  if (clampedArea > 1000) {
    minWeeks += 6;
    maxWeeks += 10;
  } else if (clampedArea > 400) {
    minWeeks += 3;
    maxWeeks += 5;
  }
  if (showConservationBoard) {
    maxWeeks += 6;
  }

  return {
    domain,
    totalEstimatedCost: Math.round(totalEstimatedCost),
    tmmobBaseFee,
    ministryClass,
    packageFees,
    paymentPlans,
    timelineSteps,
    showConservationBoard,
    isGrantEligible,
    conservationBoard,
    breakdown,
    estimatedDurationWeeks: { min: minWeeks, max: maxWeeks },
    appliedFactors: {
      materialFactor: matFactor,
      heritageFactor: herFactor,
      locationFactor: locFactor
    },
    recommendedFee: packageFees.comprehensive
  };
}

// Para birimi formatlama yardımcısı
export function formatCurrencyTL(amount: number): string {
  return new Intl.NumberFormat('tr-TR', {
    style: 'currency',
    currency: 'TRY',
    maximumFractionDigits: 0
  }).format(amount);
}
