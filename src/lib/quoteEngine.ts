/**
 * TMMOB Mimarlar Odası En Az Bedel ve Hastürk Mimarlık Teklif Hesaplama Motoru
 * Referans: TMMOB Mimarlar Odası "Tek Yapı Ölçeğinde Rölöve, Restitüsyon ve Restorasyon
 * Projeleri Yaklaşık Maliyet Hazırlama Yöntemi" ve 2026 Yapı Yaklaşık Birim Maliyetleri.
 */

export type ProjectType = 'restoration' | 'new_architecture' | 'strengthening';

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
  projectType: ProjectType;
  areaSquareMeters: number;
  buildingMaterial: BuildingMaterial;
  heritageStatus: HeritageStatus;
  locationArea: LocationArea;
  selectedServices: string[];
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
  multiplier: number;        // 1.5x Reel Uygulama Katsayısı
  unitCostPerM2: number;     // 1.5x Uygulama Birim Maliyeti
  officialGazette: string;
  definition: string;
}

export interface QuoteResult {
  totalEstimatedCost: number; // Yapı yaklaşık maliyeti
  tmmobBaseFee: number; // TMMOB Yasal Asgari Taban Bedeli
  ministryClass: MinistryClassInfo; // Çevre ve Şehircilik Bakanlığı 2026 Tebliği
  packageFees: Record<PackageTier, number>;
  paymentPlans: Record<PackageTier, PaymentStage[]>;
  timelineSteps: TimelineStep[];
  isGrantEligible: boolean;
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
  // Geriye dönük uyumluluk için (ekranda 'Hastürk Öneri' ibaresi kullanılmaz)
  recommendedFee: number;
}

// 1. Paket Tanımları
export const PACKAGE_TIERS: Record<PackageTier, PackageDetail> = {
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

// 2. Proje Türlerine Göre Hizmet Listeleri
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
    desc: 'Arsa analizi, fonksiyonel şema, kütle etütleri ve 3D görselleştirme sunumu.',
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
    weight: 0.30,
    isRecommended: true
  },
  {
    id: 'laser_scan',
    name: '3D Deformasyon ve Sehim Analizi',
    desc: 'Lazer tarama ile duvar eğrilikleri, oturmalar ve sehimlerin milimetrik tespiti.',
    weight: 0.20,
    isRecommended: true
  },
  {
    id: 'structural_calc',
    name: 'Statik Performans ve Güçlendirme Projesi',
    desc: 'Karot/donatı test değerlendirmesi, karbon lif/çelik/enjeksiyon güçlendirme mimari ve statik projesi.',
    weight: 0.40,
    isRecommended: true
  },
  {
    id: 'conservation_board',
    name: 'Kurul ve Belediye Onay Süreci',
    desc: 'Güçlendirme projesinin Anıtlar Kurulu ve ilgili ilçe belediyesi onay takibi.',
    weight: 0.15,
    isRecommended: true
  }
];

export function getServicesForType(type: ProjectType): ServiceOption[] {
  switch (type) {
    case 'restoration':
      return RESTORATION_SERVICES;
    case 'new_architecture':
      return NEW_ARCHITECTURE_SERVICES;
    case 'strengthening':
      return STRENGTHENING_SERVICES;
  }
}

// 3. Katsayı Tabloları
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

// 4. Aşamalı Ödeme Planı Hesaplayıcı (%25, %35, %25, %15)
export function calculatePaymentPlan(totalFee: number, projectType: ProjectType): PaymentStage[] {
  if (projectType === 'restoration') {
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

// 5. Süreç Zaman Çizelgesi (Gantt)
export function getTimelineSteps(
  projectType: ProjectType,
  hasBoard: boolean,
  boardDurationWeeks: string
): TimelineStep[] {
  if (projectType === 'restoration') {
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
        weeks: hasBoard ? boardDurationWeeks : '4 - 6 Hafta',
        title: 'Koruma Bölge Kurulu İnceleme & Onay',
        desc: 'Yetkili Anıtlar Kurulu raportör incelemesi, komisyon görüşü ve onaylı restorasyon ruhsatının çıkması.'
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

// 6. Hesaplama Motoru Fonksiyonu
export function calculateQuote(inputs: QuoteInputs): QuoteResult {
  const {
    projectType,
    areaSquareMeters,
    buildingMaterial,
    heritageStatus,
    locationArea,
    selectedServices
  } = inputs;

  // Güvenlik sınırları (min 20m², max 10.000m²)
  const clampedArea = Math.max(20, Math.min(10000, areaSquareMeters || 100));

  // Çevre, Şehircilik ve İklim Değişikliği Bakanlığı 2026 Yılı Yapı Yaklaşık Birim Maliyetleri Tebliği
  // Resmî Gazete: 3 Şubat 2026 / Sayı: 33157 (1.5x Reel Uygulama Birim Fiyatı ile Entegre)
  const APPLICATION_PRICE_MULTIPLIER = 1.5;
  let ministryClass: MinistryClassInfo;
  let serviceFeeRate = 0.055; // Mimarlık hizmet bedeli oranı

  if (projectType === 'restoration') {
    // V. Sınıf (C) Grubu - Madde 5: "Tarihi eser niteliğinde olup restore edilerek veya yıkılarak aslına uygun olarak yapılan yapılar"
    // Liste: 48.750,00 TL/m² -> 1.5x Uygulama: 73.125,00 TL/m²
    const baseCost = 48750;
    ministryClass = {
      code: 'V-C',
      name: 'V. Sınıf (C) Grubu Yapılar',
      baseUnitCostPerM2: baseCost,
      multiplier: APPLICATION_PRICE_MULTIPLIER,
      unitCostPerM2: Math.round(baseCost * APPLICATION_PRICE_MULTIPLIER), // 73.125,00 TL/m²
      officialGazette: 'Resmî Gazete: 3 Şubat 2026 / Sayı: 33157',
      definition: 'Tarihi eser niteliğinde olup restore edilerek veya yıkılarak aslına uygun olarak yapılan yapılar'
    };
    serviceFeeRate = 0.055; // Restorasyon tam hizmet normu
  } else if (projectType === 'strengthening') {
    // IV. Sınıf (A) Grubu - Güçlendirme & Taşıyıcı Onarım
    // Liste: 26.450,00 TL/m² -> 1.5x Uygulama: 39.675,00 TL/m²
    const baseCost = 26450;
    ministryClass = {
      code: 'IV-A',
      name: 'IV. Sınıf (A) Grubu Yapılar',
      baseUnitCostPerM2: baseCost,
      multiplier: APPLICATION_PRICE_MULTIPLIER,
      unitCostPerM2: Math.round(baseCost * APPLICATION_PRICE_MULTIPLIER), // 39.675,00 TL/m²
      officialGazette: 'Resmî Gazete: 3 Şubat 2026 / Sayı: 33157',
      definition: 'Taşıyıcı sistem rölövesi, sehim analizi ve statik güçlendirme projeleri'
    };
    serviceFeeRate = 0.050;
  } else {
    // new_architecture
    if (clampedArea >= 300) {
      // IV. Sınıf (B) Grubu - Madde 10: "Müstakil ve/veya ikiz konutlar (500 m² ve üzeri yapılar, lüks villalar)"
      // Liste: 33.900,00 TL/m² -> 1.5x Uygulama: 50.850,00 TL/m²
      const baseCost = 33900;
      ministryClass = {
        code: 'IV-B',
        name: 'IV. Sınıf (B) Grubu Yapılar',
        baseUnitCostPerM2: baseCost,
        multiplier: APPLICATION_PRICE_MULTIPLIER,
        unitCostPerM2: Math.round(baseCost * APPLICATION_PRICE_MULTIPLIER), // 50.850,00 TL/m²
        officialGazette: 'Resmî Gazete: 3 Şubat 2026 / Sayı: 33157',
        definition: 'Müstakil lüks konutlar, villalar ve özellikli mimari yapılar'
      };
    } else {
      // III. Sınıf (C) Grubu - Madde 10: "Müstakil ve/veya ikiz konutlar (200-500 m²)"
      // Liste: 23.400,00 TL/m² -> 1.5x Uygulama: 35.100,00 TL/m²
      const baseCost = 23400;
      ministryClass = {
        code: 'III-C',
        name: 'III. Sınıf (C) Grubu Yapılar',
        baseUnitCostPerM2: baseCost,
        multiplier: APPLICATION_PRICE_MULTIPLIER,
        unitCostPerM2: Math.round(baseCost * APPLICATION_PRICE_MULTIPLIER), // 35.100,00 TL/m²
        officialGazette: 'Resmî Gazete: 3 Şubat 2026 / Sayı: 33157',
        definition: 'Müstakil konutlar, bağ/yayla evleri ve standart villa projeleri'
      };
    }
    serviceFeeRate = 0.045;
  }

  // Alan büyüdükçe orantılı ölçek indirimi (TMMOB logaritmik ölçekleme mantığı)
  if (clampedArea > 1000) {
    serviceFeeRate *= 0.88;
  } else if (clampedArea > 500) {
    serviceFeeRate *= 0.94;
  }

  const matFactor = MATERIAL_FACTORS[buildingMaterial]?.factor || 1.0;
  const herFactor = HERITAGE_FACTORS[heritageStatus]?.factor || 1.0;
  const locFactor = LOCATION_FACTORS[locationArea]?.factor || 1.0;

  // Yapı Yaklaşık Maliyeti (PYM) = Alan × Bakanlık Birim Fiyatı × Malzeme Çarpanı
  const totalEstimatedCost = clampedArea * ministryClass.unitCostPerM2 * matFactor;

  // TMMOB Asgari Tam Hizmet Taban Bedeli
  const fullTmmobBase = totalEstimatedCost * serviceFeeRate * herFactor * locFactor;

  // Seçilen hizmetlerin ağırlık toplamı
  const availableServices = getServicesForType(projectType);
  const selectedServiceList = availableServices.filter(s => selectedServices.includes(s.id));
  
  const totalWeightSelected = selectedServiceList.reduce((acc, s) => acc + s.weight, 0);
  const normalizedWeight = Math.max(0.2, totalWeightSelected);

  // Nihai TMMOB Yasal Taban Bedeli
  const tmmobBaseFee = Math.round(fullTmmobBase * normalizedWeight);

  // 3 Kademeli Paket Fiyatları
  const packageFees: Record<PackageTier, number> = {
    basic: tmmobBaseFee,
    comprehensive: Math.round(tmmobBaseFee * PACKAGE_TIERS.comprehensive.multiplier),
    turnkey: Math.round(tmmobBaseFee * PACKAGE_TIERS.turnkey.multiplier)
  };

  // Her paket için aşamalı ödeme planı
  const paymentPlans: Record<PackageTier, PaymentStage[]> = {
    basic: calculatePaymentPlan(packageFees.basic, projectType),
    comprehensive: calculatePaymentPlan(packageFees.comprehensive, projectType),
    turnkey: calculatePaymentPlan(packageFees.turnkey, projectType)
  };

  // Lokasyon / Koruma Kurulu Bilgisi
  const locInfo = LOCATION_FACTORS[locationArea] || LOCATION_FACTORS.istanbul_fatih;
  const conservationBoard = {
    name: locInfo.boardName,
    weeks: locInfo.boardDuration,
    note: locInfo.desc
  };

  // Kültür ve Turizm Bakanlığı Hibe Desteği Uygunluğu (Tescilli 1. veya 2. Grup Restorasyon)
  const isGrantEligible = projectType === 'restoration' && (heritageStatus === 'grade_1' || heritageStatus === 'grade_2');

  // Zaman Çizelgesi
  const hasBoard = projectType === 'restoration' || selectedServices.includes('conservation_board');
  const timelineSteps = getTimelineSteps(projectType, hasBoard, locInfo.boardDuration);

  // Kalem bazlı dağılım (TMMOB taban bedel üzerinden)
  const breakdown: BreakdownItem[] = selectedServiceList.map(s => {
    const itemRatio = s.weight / (totalWeightSelected || 1);
    return {
      id: s.id,
      name: s.name,
      percentage: Math.round(itemRatio * 100),
      fee: Math.round(tmmobBaseFee * itemRatio)
    };
  });

  // Tahmini süre hesabı (Hafta)
  let minWeeks = 6;
  let maxWeeks = 10;
  if (clampedArea > 1000) {
    minWeeks += 6;
    maxWeeks += 10;
  } else if (clampedArea > 400) {
    minWeeks += 3;
    maxWeeks += 5;
  }
  if (hasBoard) {
    maxWeeks += 4;
  }

  return {
    totalEstimatedCost: Math.round(totalEstimatedCost),
    tmmobBaseFee,
    ministryClass,
    packageFees,
    paymentPlans,
    timelineSteps,
    isGrantEligible,
    conservationBoard,
    breakdown,
    estimatedDurationWeeks: { min: minWeeks, max: maxWeeks },
    appliedFactors: {
      materialFactor: matFactor,
      heritageFactor: herFactor,
      locationFactor: locFactor
    },
    // Geriye dönük uyumluluk
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
