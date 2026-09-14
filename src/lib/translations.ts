export type Language = "tr" | "en" | "de" | "ar";

export interface Translations {
  [key: string]: {
    tr: string;
    en: string;
    de: string;
    ar: string;
  };
}

export const translations: Translations = {
  // Brand
  brand_title: {
    tr: "HASTÜRK",
    en: "HASTÜRK",
    de: "HASTÜRK",
    ar: "هاستورك"
  },
  brand_subtitle: {
    tr: "SANAT & MİMARLIK",
    en: "ART & ARCHITECTURE",
    de: "KUNST & ARCHITEKTUR",
    ar: "للفن والعمارة"
  },

  // Navigation
  nav_home: {
    tr: "Ana Sayfa",
    en: "Home",
    de: "Startseite",
    ar: "الرئيسية"
  },
  nav_about: {
    tr: "Kurumsal",
    en: "About Us",
    de: "Über Uns",
    ar: "من نحن"
  },
  nav_team: {
    tr: "Ekip",
    en: "Team",
    de: "Unser Team",
    ar: "فريق العمل"
  },
  nav_services: {
    tr: "Hizmetler",
    en: "Services",
    de: "Leistungen",
    ar: "خدماتنا"
  },
  nav_projects: {
    tr: "Projeler",
    en: "Projects",
    de: "Projekte",
    ar: "المشاريع"
  },
  nav_contact: {
    tr: "İletişim",
    en: "Contact",
    de: "Kontakt",
    ar: "اتصل بنا"
  },
  nav_quote_btn: {
    tr: "Teklif Hesapla",
    en: "Calculate Fee",
    de: "Angebot Kalkulieren",
    ar: "احسب التكلفة"
  },

  // Hero Section
  hero_title_1: {
    tr: "Geçmişin Dokusuna,",
    en: "To the Texture of the Past,",
    de: "Der Seele der Geschichte,",
    ar: "لأصالة الماضي،"
  },
  hero_title_2: {
    tr: "Geleceğin İmzası",
    en: "The Signature of the Future",
    de: "Die Handschrift der Zukunft",
    ar: "بصمة المستقبل"
  },
  hero_subtitle: {
    tr: "Restorasyon, Rölöve, Mimari Tasarım ve Taahhüt işlerinde yılların verdiği ustalıkla tarihi değerlerimizi yarınlara taşıyoruz.",
    en: "With decades of craftsmanship in Restoration, Measured Survey, Architectural Design, and Contracting, we carry historical heritage into tomorrow.",
    de: "Mit jahrzehntelanger Meisterschaft in Restaurierung, Bauaufnahme, Architekturplanung und Generalübernahme führen wir historisches Erbe in die Zukunft.",
    ar: "بعقود من الإتقان والخبرة في الترميم التاريخي، الرفع المعماري، التصميم الهندسي والمقاولات، ننقل التراث العريق بأمان إلى الغد."
  },
  hero_cta_projects: {
    tr: "Projelerimizi İnceleyin",
    en: "Explore Our Projects",
    de: "Projekte Entdecken",
    ar: "استكشف مشاريعنا"
  },
  hero_cta_contact: {
    tr: "İletişime Geç",
    en: "Get In Touch",
    de: "Kontakt Aufnehmen",
    ar: "تواصل معنا"
  },

  // About Snippet
  about_title_1: {
    tr: "Ustalık Eserimiz:",
    en: "Our Masterpiece:",
    de: "Unser Meisterwerk:",
    ar: "تحفتنا المعمارية:"
  },
  about_title_2: {
    tr: "Tarihe Duyulan Saygı",
    en: "Profound Respect for History",
    de: "Tiefer Respekt vor der Geschichte",
    ar: "احترام عميق للتاريخ"
  },
  about_desc: {
    tr: "Hastürk Sanat ve Mimarlık olarak, sadece binaları değil, yaşanmışlıkları da onarıyoruz. Uzman ekibimizle, kültürel mirasımızı modern mühendisliğin güvencesi altına alıyoruz.",
    en: "At Hastürk Art & Architecture, we restore not just stone and wood, but living memories. With our expert architects and conservators, we safeguard heritage under the assurance of modern engineering.",
    de: "Bei Hastürk Kunst & Architektur restaurieren wir nicht bloß Bausubstanz, sondern lebendige Geschichte. Mit unserem Expertenteam sichern wir kulturelles Erbe mit modernsten Ingenieurmethoden.",
    ar: "في هاستورك للفن والعمارة، لا نرمم الحجارة والخشب فحسب، بل نحيي الذكريات والتاريخ. بفريقنا المتخصص، نحمي تراثنا الثقافي بأعلى معايير الهندسة الحديثة."
  },
  stat_years: {
    tr: "Yıllık Tecrübe",
    en: "Years of Experience",
    de: "Jahre Erfahrung",
    ar: "عاماً من الخبرة"
  },
  stat_projects: {
    tr: "Tamamlanan Proje",
    en: "Completed Projects",
    de: "Abgeschlossene Projekte",
    ar: "مشروعاً مكتملاً"
  },
  stat_harmony: {
    tr: "Tarihi Doku Uyumu",
    en: "Heritage Compliance",
    de: "Historische Konformität",
    ar: "مطابقة للمعايير التاريخية"
  },

  // TrustBar Accreditations
  trust_title_1: {
    tr: "TMMOB Tescilli Büro",
    en: "Chamber Registered Office",
    de: "TMMOB-Zertifiziertes Büro",
    ar: "مكتب معتمد لدى نقابة المهندسين"
  },
  trust_sub_1: {
    tr: "Mimarlar Odası Yasal Standartları & En Az Bedel Güvencesi",
    en: "Official Chamber Legal Norms & Minimum Fee Guarantee",
    de: "Architektenkammer-Standards & Honorarsicherheit",
    ar: "معايير النقابة الرسمية وضمان الحد الأدنى للأتعاب"
  },
  trust_title_2: {
    tr: "Kurul & Hukuk Yetkinliği",
    en: "Conservation Board Mastery",
    de: "Denkmalschutz-Rechtskompetenz",
    ar: "إتقان لوائح لجان حماية التراث"
  },
  trust_sub_2: {
    tr: "Kültür Varlıkları Koruma Bölge Kurulu Tam Dosya Hakimiyeti",
    en: "Full Heritage Protection Board Regulatory Process Command",
    de: "Vollständige Behörden- & Denkmalschutzabwicklung",
    ar: "إدارة متكاملة لملفات لجان حماية الآثار والمصادقات"
  },
  trust_title_3: {
    tr: "3D Lidar Tarama",
    en: "3D LiDAR Laser Survey",
    de: "3D-LiDAR-Vermessung",
    ar: "المسح الليزري ثلاثي الأبعاد"
  },
  trust_sub_3: {
    tr: "Milimetrik Lazer Nokta Bulutu ve Fotogrametrik Belgeleme",
    en: "Millimetric Point Cloud & Photogrammetric Documentation",
    de: "Millimetergenaue Punktwolken & Fotogrammetrie",
    ar: "توثيق ميليمتري بسحب النقاط والتصوير الفوتوغرامتري"
  },
  trust_title_4: {
    tr: "UNESCO & Venedik Tüzüğü",
    en: "UNESCO & Venice Charter",
    de: "UNESCO & Charta von Venedig",
    ar: "معايير اليونسكو وميثاق البندقية"
  },
  trust_sub_4: {
    tr: "Uluslararası Tarihi Doku Koruma ve Özgünlük İlkeleri",
    en: "International Historic Preservation & Authenticity Criteria",
    de: "Internationale Denkmalpflege- & Authentizitätsgrundsätze",
    ar: "مبادئ صيانة التراث والأصالة المعمارية العالمية"
  },

  // Before & After Showcase
  ba_badge: {
    tr: "KORUMA & RESTORASYON FELSEFEMİZ",
    en: "OUR CONSERVATION PHILOSOPHY",
    de: "UNSERE RESTAURIERUNGSPHILOSOPHIE",
    ar: "فلسفتنا في الترميم والصيانة"
  },
  ba_title: {
    tr: "Tarihin Ruhuna Saygıyla, Geleceğe Güvenle",
    en: "Honoring Heritage, Preserving for the Future",
    de: "Dem Geist der Geschichte verpflichtet, zukunftssicher bewahrt",
    ar: "إجلالاً لروح التاريخ، وصوناً آمناً للمستقبل"
  },
  ba_subtitle: {
    tr: "Restorasyon geçmişin izlerini silmek değil; eserin özgün kimliğini ve yaşanmışlığını koruyarak, modern mühendisliğin güvencesiyle asırlar sonrasına aktarmaktır.",
    en: "Restoration is never about erasing history; it is safeguarding an authentic soul and lived heritage under the assurance of modern engineering.",
    de: "Restaurierung bedeutet nicht, die Spuren der Vergangenheit zu tilgen; es bedeutet, die authentische Seele zu bewahren und sie durch moderne Ingenieurkunst über Jahrhunderte zu sichern.",
    ar: "الترميم ليس محواً لآثار الماضي، بل صون للهوية الأصيلة والذاكرة الحية، ونقلها بأمان إلى الأجيال القادمة عبر الهندسة الحديثة."
  },
  ba_label_before: {
    tr: "Restorasyon Öncesi",
    en: "Before Restoration",
    de: "Vor der Restaurierung",
    ar: "قبل الترميم"
  },
  ba_label_after: {
    tr: "Restorasyon Sonrası",
    en: "After Restoration",
    de: "Nach der Restaurierung",
    ar: "بعد الترميم"
  },
  ba_cta_button: {
    tr: "Bu Proje Benzeri Yapınız İçin Teklif Alın",
    en: "Get an Estimate for Similar Heritage Property",
    de: "Angebot für ein ähnliches Objekt anfordern",
    ar: "احصل على عرض سعر لعقار تراثي مماثل"
  },
  ba_scope_label: {
    tr: "Uygulanan Mühendislik & Koruma:",
    en: "Executed Engineering & Conservation:",
    de: "Durchgeführte Ingenieur- & Konservierungsmaßnahmen:",
    ar: "أعمال الهندسة والترميم المنفذة:"
  },

  // Founder Note
  founder_badge: {
    tr: "KURUCU MİMARIN NOTU",
    en: "FOUNDER & CHIEF ARCHITECT'S NOTE",
    de: "WORT DES GRÜNDERS & CHEFARCHITEKTEN",
    ar: "كلمة المعماري المؤسس"
  },
  founder_role: {
    tr: "Y. Mimar · Kurucu",
    en: "M. Arch · Founder",
    de: "M. Arch · Gründer",
    ar: "معماري أول · المؤسس"
  },
  founder_title_1: {
    tr: "Tarihe dokunurken yalnızca taşları değil,",
    en: "When touching history, we restore not merely stones,",
    de: "Wenn wir Geschichte berühren, erneuern wir nicht bloß Steine,",
    ar: "عندما نلمس التاريخ، فإننا لا نرمم الحجارة وحدها،"
  },
  founder_title_2: {
    tr: "bir medeniyetin hafızasını onarıyoruz.",
    en: "we revive the memory of a civilization.",
    de: "sondern das lebendige Gedächtnis einer Zivilisation.",
    ar: "بل نحيي ذاكرة حضارة بأكملها."
  },
  founder_p1: {
    tr: "Restorasyon bizim için sıradan bir inşaat faaliyeti değil; geçmişin büyük ustalarıyla çağdaş mühendisliğin ilkeleri arasında kurduğumuz derin bir diyalogdur.",
    en: "Restoration for us is not standard construction; it is a profound dialogue between the master builders of the past and the principles of contemporary engineering.",
    de: "Restaurierung ist für uns keine gewöhnliche Bautätigkeit; sie ist ein tiefer Dialog zwischen den alten Baumeistern und moderner Ingenieurwissenschaft.",
    ar: "الترميم بالنسبة لنا ليس مجرد أعمال بناء، بل هو حوار معرفي عميق بين كبار بناة الماضي وأرقى مبادئ الهندسة المعاصرة."
  },
  founder_quote: {
    tr: "Kültürel mirasımıza duyduğumuz saygı, projelendirmedeki milimetrik hassasiyetimiz ve şantiyedeki usta zanaatkarlığımız başarımızın yegane temelidir.",
    en: "Our reverence for cultural heritage, millimetric precision in design, and master craftsmanship on-site are the sole foundation of our success.",
    de: "Der tiefe Respekt vor unserem Kulturerbe, millimetergenaue Planung und meisterhafte Handwerkskunst vor Ort sind das Fundament unseres Erfolges.",
    ar: "احترامنا العميق للإرث الثقافي، ودقتنا الميليمترية في التخطيط، وحرفيتنا العالية في مواقع العمل هي حجر الزاوية لكل نجاحاتنا."
  },
  founder_p2: {
    tr: "Boğaziçi'nin asırlık ahşap yalılarından Tarihi Yarımada'nın tescilli kagir konaklarına kadar her projede, eserin özgün ruhunu koruyarak geleceğe güvenle aktarmanın gururunu yaşıyoruz.",
    en: "From the centuries-old timber mansions of the Bosphorus to the registered masonry palaces of the Historical Peninsula, we take immense pride in carrying the authentic soul of each monument into the future.",
    de: "Von den jahrhundertealten Holzvillen am Bosporus bis zu den denkmalgeschützten Herrenhäusern der historischen Halbinsel: Wir sind stolz darauf, die Seele jedes Bauwerks zukunftssicher zu bewahren.",
    ar: "من قصور البوسفور الخشبية التاريخية إلى قصور شبه الجزيرة التاريخية المسجلة، نفخر بصيانة روح كل أثر معماري ونقله بأمان إلى المستقبل."
  },

  // Horizontal Process Roadmap
  process_badge: {
    tr: "BİLİMSEL YAKLAŞIM",
    en: "SCIENTIFIC RESTORATION ROADMAP",
    de: "WISSENSCHAFTLICHER FAHRPLAN",
    ar: "المنهج العلمي للترميم"
  },
  process_title: {
    tr: "Restorasyonda Yeniden Doğuş",
    en: "Renaissance in Restoration",
    de: "Renaissance der Denkmalpflege",
    ar: "نهضة متجددة في عالم الترميم"
  },
  process_subtitle: {
    tr: "Her tarihi yapıyı bir sanat eseri titizliğiyle ele alıyor; tescilli kültür varlıklarını 5 adımlı bilimsel koruma protokolümüzle geleceğe hazırlıyoruz.",
    en: "Treating every historical landmark with museum-grade precision, we preserve registered heritage through our 5-step scientific protocol.",
    de: "Jedes historische Bauwerk behandeln wir wie ein Kunstwerk; denkmalgeschützte Güter führen wir durch unser 5-stufiges wissenschaftliches Protokoll.",
    ar: "نتعامل مع كل صرح تاريخي بدقة المتاحف الفنية، ونعد المعالم المسجلة للمستقبل عبر بروتوكولنا العلمي المكون من 5 مراحل."
  },
  step_1_title: {
    tr: "Keşif ve Analiz",
    en: "Discovery & Analysis",
    de: "Bestandsaufnahme & Analyse",
    ar: "الكشف الميداني والتحليل"
  },
  step_1_desc: {
    tr: "Tarihi dokunun uzman restoratör mimar ve mühendislerimiz tarafından şantiyede incelenmesi ve restorasyon haritasının çıkarılması.",
    en: "On-site investigation by expert conservation architects and engineers, compiling a comprehensive damage and restoration map.",
    de: "Vor-Ort-Untersuchung durch Fachingenieure und Denkmalarchitekten zur Erstellung einer präzisen Schadens- und Sanierungskarte.",
    ar: "معاينة ميدانية للهيكل التاريخي بواسطة مهندسين ومعماريين متخصصين وإعداد خارطة أضرار وترميم متكاملة."
  },
  step_2_title: {
    tr: "Rölöve & Ahşap Zanaat",
    en: "Measured Survey & Craft",
    de: "Bauaufnahme & Holzhandwerk",
    ar: "الرفع المعماري وحرفية الخشب"
  },
  step_2_desc: {
    tr: "Mevcut durumun milimetrik belgelenmesi, özgün masif ahşap profillerin ve taşıyıcı elemanların birebir rölöve çıkarımı.",
    en: "Millimetric documentation of existing fabric, exact measured surveys of original timber joinery and structural elements.",
    de: "Millimetergenaue Bestandserfassung sowie exakte Dokumentation historischer Holzprofile und Tragwerkselemente.",
    ar: "توثيق ميليمتري للوضع الراهن ورفع معماري دقيق للعناصر الخشبية الصلبة والأعضاء الإنشائية الأصلية."
  },
  step_3_title: {
    tr: "Mimari Projelendirme & Askılama",
    en: "Architectural Plans & Shoring",
    de: "Planung & Fassadensicherung",
    ar: "التخطيط الهندسي وتدعيم الواجهات"
  },
  step_3_desc: {
    tr: "Tarihi cephenin korunması için ağır çelik askılama kuleleri ve Koruma Kurulu onaylı restorasyon projelerinin hazırlanması.",
    en: "Heavy-duty steel shoring towers to safeguard historical facades and full project preparation for Heritage Board approval.",
    de: "Schwere Stahlabstützungen zum Schutz historischer Fassaden und Einreichung denkmalfachlicher Genehmigungsplanungen.",
    ar: "أبراج فولاذية فائقة التحمل لحماية الواجهات التاريخية وإعداد مخططات الترميم المعتمدة من لجان الآثار."
  },
  step_4_title: {
    tr: "Statik Güçlendirme & Zemin",
    en: "Structural Strengthening & Soil",
    de: "Tragwerksverstärkung & Baugrund",
    ar: "التدعيم الإنشائي وتحسين التربة"
  },
  step_4_desc: {
    tr: "Kompakt sondaj ve mini kazık makineleriyle temel altı tahkimatı ve enjeksiyonlarla binanın deprem güvenliğinin artırılması.",
    en: "Sub-foundation consolidation via micropiles, jet grouting, and non-destructive injections to maximize seismic resilience.",
    de: "Baugrundverbesserung durch Mikropfähle, Unterfangungen und schonende Injektionen zur Maximierung der Erdbebensicherheit.",
    ar: "تدعيم القواعد بأوتاد دقيقة وحقن غير متلف لرفع مستوى مقاومة المبنى للزلازل لأعلى درجات الأمان."
  },
  step_5_title: {
    tr: "Uygulama ve Teslim",
    en: "Execution & Handover",
    de: "Ausführung & Übergabe",
    ar: "التنفيذ الدقيق والتسليم"
  },
  step_5_desc: {
    tr: "Taksim 360 ve tescilli anıt eserlerde geleneksel taş ve sıva ustalığıyla restorasyonun tamamlanarak eserin geleceğe teslim edilmesi.",
    en: "Completion with traditional stonemasonry and authentic lime plastering, handing over the landmark preserved for centuries.",
    de: "Abschluss mit traditionellem Stein- und Kalkputzhandwerk und feierliche Übergabe des denkmalgeschützten Monuments.",
    ar: "إتمام أعمال الترميم بحرفية الحجر والجص التاريخي الأصيل وتسليم الصرح التراثي ليعيش قروناً قادمة."
  },

  // Services
  services_title: {
    tr: "Hizmetlerimiz",
    en: "Our Services",
    de: "Unsere Leistungen",
    ar: "خدماتنا المعمارية"
  },
  services_subtitle: {
    tr: "Geçmişin mirasını, modern teknolojinin gücüyle yeniden var ediyoruz.",
    en: "Reviving the heritage of the past through the power of advanced technology.",
    de: "Wir erwecken historisches Erbe mit der Kraft moderner Technologie zu neuem Leben.",
    ar: "نعيد إحياء تراث الماضي بقوة التكنولوجيا الحديثة وأرقى أساليب الهندسة."
  },
  serv_1_title: {
    tr: "Restorasyon",
    en: "Restoration",
    de: "Restaurierung",
    ar: "الترميم التاريخي"
  },
  serv_1_desc: {
    tr: "Tarihi yapıların özgün kimliklerini koruyarak geleceğe taşınmasını sağlayan kapsamlı onarım süreçleri.",
    en: "Comprehensive conservation protocols preserving the authentic soul of historical buildings for future generations.",
    de: "Ganzheitliche Konservierungsprozesse zur Bewahrung der originalen Identität historischer Bauwerke.",
    ar: "عمليات صيانة وترميم شاملة تضمن صون الهوية الأصيلة للمعالم التاريخية ونقلها بأمان للأجيال القادمة."
  },
  serv_2_title: {
    tr: "Rölöve & Restitüsyon",
    en: "Measured Survey & Restitution",
    de: "Bauaufnahme & Rekonstruktion",
    ar: "الرفع المعماري وإعادة البناء"
  },
  serv_2_desc: {
    tr: "Tarihi eserlerin mevcut durumlarının belgelenmesi ve ilk yapıldığı dönemdeki haline sadık kalınarak yeniden projelendirilmesi.",
    en: "Detailed documentation of existing state and historical reconstruction faithful to original construction periods.",
    de: "Exakte Bauaufnahme des Bestands und detailgetreue Rekonstruktionsplanung der ursprünglichen Epoche.",
    ar: "توثيق شامل ودقيق للوضع الراهن للمعلم وإعادة رسم المخططات طبق الأصل كما كانت في عصرها التاريخي الأول."
  },
  serv_3_title: {
    tr: "Mimari Tasarım",
    en: "Architectural Design",
    de: "Architekturentwurf",
    ar: "التصميم المعماري"
  },
  serv_3_desc: {
    tr: "Geleneksel motifleri modern ihtiyaçlarla harmanlayan, çevreye duyarlı ve estetik mimari çözümler.",
    en: "Harmonizing classical motifs with modern functional requirements into eco-conscious, aesthetic architectures.",
    de: "Symbiose aus traditionellen Motiven und modernen Wohnbedürfnissen für nachhaltige, ästhetische Baukunst.",
    ar: "دمج الزخارف والعناصر التراثية مع المتطلبات العصرية لابتكار حلول معمارية جمالية ومستدامة."
  },
  serv_4_title: {
    tr: "Güçlendirme",
    en: "Structural Strengthening",
    de: "Tragwerksverstärkung",
    ar: "التدعيم الإنشائي"
  },
  serv_4_desc: {
    tr: "Yıpranmış yapıların strüktürel zayıflıklarını gidermek için uygulanan gelişmiş mühendislik teknikleri.",
    en: "Advanced non-invasive structural engineering techniques resolving vulnerabilities in aged monuments.",
    de: "Fortschrittliche ingenieurtechnische Verfahren zur Beseitigung statischer Schwachstellen historischer Bauten.",
    ar: "أحدث التقنيات الهندسية الدقيقة لمعالجة نقاط الضعف الإنشائية في المباني الأثرية دون الإضرار بجماليتها."
  },
  serv_5_title: {
    tr: "Taahhüt İşleri",
    en: "Contracting & Execution",
    de: "Generalübernahme & Bauausführung",
    ar: "المقاولات والتنفيذ المتكامل"
  },
  serv_5_desc: {
    tr: "Projelerin anahtar teslim süreçlerinde, bütçe ve zaman planlamasına uygun, yüksek kalite standartlarında uygulama.",
    en: "Turnkey execution delivered on schedule and within budget under the most stringent quality standards.",
    de: "Schlüsselfertige Baudurchführung nach höchsten Qualitätsstandards, termingerecht und budgetsicher.",
    ar: "تنفيذ متكامل تسليم مفتاح وفق أعلى معايير الجودة والمطابقة التامة للميزانية والجدول الزمني المحدد."
  },

  // Featured Projects
  projects_tagline: {
    tr: "Seçkin Portföy",
    en: "Selected Portfolio",
    de: "Ausgewähltes Portfolio",
    ar: "محفظة مشاريع مختارة"
  },
  projects_title: {
    tr: "Öne Çıkan Projeler",
    en: "Featured Projects",
    de: "Ausgewählte Projekte",
    ar: "أبرز المشاريع المعمارية"
  },
  projects_subtitle: {
    tr: "Her biri tarihe, çevreye ve insana saygı ilkesiyle hayata geçirilen ustalık eserlerimiz.",
    en: "Masterpieces realized with unwavering respect for history, environment, and human heritage.",
    de: "Meisterwerke, realisiert mit tiefem Respekt vor Geschichte, Umwelt und menschlicher Kultur.",
    ar: "تحف معمارية نُفذت باحترام مطلق للتاريخ، والبيئة، والإنسان."
  },
  projects_view_details: {
    tr: "DETAYLARI İNCELE",
    en: "VIEW DETAILS",
    de: "DETAILS ANSEHEN",
    ar: "عرض التفاصيل"
  },
  projects_view_all: {
    tr: "Tüm Projelerimizi Görün",
    en: "View All Projects",
    de: "Alle Projekte Ansehen",
    ar: "استعرض كافة المشاريع"
  },

  // Project 1
  proj_1_title: {
    tr: "Taksim 360 Kentsel Yenileme & Restorasyon",
    en: "Taksim 360 Urban Renewal & Conservation",
    de: "Taksim 360 Stadterneuerung & Denkmalpflege",
    ar: "تجديد حضري وترميم لمشروع تقسيم 360"
  },
  proj_1_cat: {
    tr: "Restorasyon & Koruma",
    en: "Restoration & Conservation",
    de: "Restaurierung & Denkmalpflege",
    ar: "ترميم وصيانة التراث"
  },
  // Project 2
  proj_2_title: {
    tr: "Tarihi Yapı Geoteknik Zemin & Mini Kazık Güçlendirme",
    en: "Historical Building Geotechnical Ground & Micropile Strengthening",
    de: "Historische Baugrund- & Mikropfahlverstärkung",
    ar: "تحسين التربة الجيوتقنية وتدعيم بالأوتاد الدقيقة"
  },
  proj_2_cat: {
    tr: "Statik Güçlendirme",
    en: "Structural Strengthening",
    de: "Tragwerksverstärkung",
    ar: "تدعيم إنشائي"
  },
  // Project 3
  proj_3_title: {
    tr: "Tarihi Anıt Cami & Taş Minare Konservasyonu",
    en: "Historical Monumental Mosque & Stone Minaret Conservation",
    de: "Historische Monumental-Moschee & Minarett-Konservierung",
    ar: "صيانة مسجد أثري ومئذنة حجرية تاريخية"
  },
  proj_3_cat: {
    tr: "Restorasyon & İskele",
    en: "Restoration & Scaffolding",
    de: "Restaurierung & Rüstung",
    ar: "ترميم وسقالات متخصصة"
  },
  // Project 4
  proj_4_title: {
    tr: "Tarihi Avlu Doğal Taş Döşeme & Düzenleme",
    en: "Historic Courtyard Natural Stone Paving & Landscaping",
    de: "Historische Natursteinpflasterung & Hofgestaltung",
    ar: "رصف الحجر الطبيعي وتنسيق الفناء التاريخي"
  },
  proj_4_cat: {
    tr: "Taahhüt & Taş Ustalığı",
    en: "Contracting & Stonemasonry",
    de: "Ausführung & Steinmetzkunst",
    ar: "مقاولات وحرفية الحجر"
  },
  // Project 5
  proj_5_title: {
    tr: "Tescilli Cephe Askılama & Çelik Tahkimat",
    en: "Registered Facade Shoring & Heavy Steel Fortification",
    de: "Fassadenabstützung & Stahlertüchtigung",
    ar: "تدعيم واجهات تاريخية بهياكل فولاذية"
  },
  proj_5_cat: {
    tr: "Statik Güçlendirme",
    en: "Structural Strengthening",
    de: "Tragwerksverstärkung",
    ar: "تدعيم إنشائي"
  },
  // Project 6
  proj_6_title: {
    tr: "Geleneksel Masif Ahşap Pencere Rekonstrüksiyonu",
    en: "Traditional Solid Timber Window Reconstruction",
    de: "Historische Massivholz-Fensterrekonstruktion",
    ar: "إعادة تصنيع وترميم النوافذ الخشبية التراثية"
  },
  proj_6_cat: {
    tr: "Rölöve & Ahşap Zanaat",
    en: "Measured Survey & Woodcraft",
    de: "Bauaufnahme & Holzhandwerk",
    ar: "رفع معماري وحرفية الخشب"
  },

  // Why Us (4 Pillars)
  why_tagline: {
    tr: "Neden Hastürk Sanat & Mimarlık?",
    en: "Why Hastürk Art & Architecture?",
    de: "Warum Hastürk Kunst & Architektur?",
    ar: "لماذا هاستورك للفن والعمارة؟"
  },
  why_title_1: {
    tr: "Tarihi Mirası Yarınlara Taşıyan",
    en: "Carrying Cultural Heritage into Tomorrow:",
    de: "Historisches Erbe in die Zukunft führen:",
    ar: "لنقل التراث التاريخي إلى الغد:"
  },
  why_title_2: {
    tr: "4 Temel Uzmanlık Sütunumuz",
    en: "Our 4 Pillars of Excellence",
    de: "Unsere 4 Kompetenzsäulen",
    ar: "ركائز تميزنا الأربعة"
  },
  why_subtitle: {
    tr: "Sıradan bir inşaat yaklaşımının ötesinde; bilimsel restorasyon kriterleri, ileri mühendislik ve zanaat tutkusuyla mekanlara yeni bir hayat kazandırıyoruz.",
    en: "Far beyond ordinary construction; we breathe new life into spaces through scientific conservation, advanced engineering, and craft passion.",
    de: "Weit über gewöhnliches Bauen hinaus; wir schenken Räumen neues Leben durch wissenschaftliche Denkmalpflege und Handwerkskunst.",
    ar: "أبعد من مجرد أعمال بناء عادية؛ نمنح الأماكن حياة متجددة بمعايير الترميم العلمي وأرقى فنون العمارة."
  },
  why_p1_title: {
    tr: "Kurul & Mevzuat Yetkinliği",
    en: "Board & Legal Mastery",
    de: "Behörden- & Rechtskompetenz",
    ar: "إتقان اللوائح والقوانين التراثية"
  },
  why_p1_desc: {
    tr: "1. ve 2. grup tescilli eserlerde Kültür Varlıkları Koruma Kurulu, KUDEB ve Anıtlar Kurulu onay süreçlerinde sıfır fire ve %100 onay garantili dosya yönetimi.",
    en: "100% approval guaranteed file management across Heritage Protection Boards, KUDEB, and Monument Committees for Grade 1 & 2 registered landmarks.",
    de: "100% Genehmigungsgarantie bei Denkmalschutzbehörden, KUDEB und Denkmalräten für registrierte Baudenkmäler der Klassen 1 & 2.",
    ar: "إدارة متكاملة لملفات المصادقات بنسبة قبول 100% لدى لجان حماية الآثار والبلديات لكافة المعالم المسجلة من الفئتين الأولى والثانية."
  },
  why_p2_title: {
    tr: "3D Lidar ve Dijital İkiz",
    en: "3D LiDAR & Digital Twin",
    de: "3D-LiDAR & Digitaler Zwilling",
    ar: "المسح الليزري والتوأم الرقمي"
  },
  why_p2_desc: {
    tr: "İleri teknoloji lazer tarayıcılar ve drone fotogrametrisi ile yapının tüm eğrilik, sehim ve çatlak haritasını milimetrik hassasiyetle modelleme kabiliyeti.",
    en: "High-end laser scanners and drone photogrammetry capturing every deflection, crack, and deformation into millimetric 3D BIM models.",
    de: "Modernste Laserscanner und Drohnenfotogrammetrie zur millimetergenauen Modellierung von Verformungen, Rissen und Durchbiegungen.",
    ar: "ماسحات ليزرية متطورة وطائرات تصوير مساحي لرسم وتوثيق التشققات والانحرافات الإنشائية بدقة ميليمترية فائقة."
  },
  why_p3_title: {
    tr: "Geleneksel Malzeme ve Zanaat",
    en: "Traditional Materials & Craft",
    de: "Historische Baustoffe & Handwerk",
    ar: "المواد التقليدية والحرفية التراثية"
  },
  why_p3_desc: {
    tr: "Özgün Horasan harcı kimyası, el oyması ahşap restorasyonu, kündekari ve taş işçiliğinde dönemin orijinal tekniklerine birebir sadakat.",
    en: "Authentic Khorasan mortar chemistry, hand-carved woodwork, Kundekari joinery, and stonemasonry faithful to period techniques.",
    de: "Originale Horasan-Mörtelchemie, handgeschnitzte Holzrestaurierung, Kündekari-Intarsien und meisterhafte Steinmetzkunst.",
    ar: "خلطات ملاط الخرسان التاريخي الأصيل، حفر الخشب اليدوي، تعشيق الكندكاري، ونحت الحجر بتقنيات العصر التاريخي الأصلية."
  },
  why_p4_title: {
    tr: "Akademik & Hukuki Güç",
    en: "Academic & Legal Strength",
    de: "Wissenschaftliche & Juristische Stärke",
    ar: "القوة الأكاديمية والاستشارية القانونية"
  },
  why_p4_desc: {
    tr: "Y. Mimar, İnşaat Y. Müh. Prof. Dr. statik danışmanlığı, Çevre Y. Mühendisi ve Gayrimenkul Koruma Hukuku Avukatından oluşan multidisipliner kadro.",
    en: "Multidisciplinary team comprising Master Architects, Structural Professor Consultants, Environmental Engineers, and Heritage Legal Counsel.",
    de: "Interdisziplinäres Team aus Master-Architekten, Professoren für Baustatik, Umweltingenieuren und Anwälten für Denkmalschutzrecht.",
    ar: "فريق متعدد التخصصات يضم معماريين، وأساتذة استشاريين في الهندسة الإنشائية، وخبراء بيئيين ومحامين متخصصين في قانون التراث العقاري."
  },

  // Interactive Quote Simulator (HomeQuoteTeaser)
  calc_badge: {
    tr: "Resmî Gazete: 33157 Tebliği & TMMOB Normları",
    en: "Official Gazette No. 33157 & Chamber Norms",
    de: "Amtsblatt Nr. 33157 & Architektenkammer-Normen",
    ar: "الجريدة الرسمية رقم 33157 ومعايير نقابة المهندسين"
  },
  calc_title_1: {
    tr: "ÇŞİDB 2026 Birim Maliyetleri &",
    en: "Ministry of Environment 2026 Unit Costs &",
    de: "Ministerielle Baukostenansätze 2026 &",
    ar: "تكاليف وزارة البيئة والإسكان 2026 و"
  },
  calc_title_2: {
    tr: "Akıllı Mimari Teklif Motoru",
    en: "Smart Architectural Fee Calculator",
    de: "Smarter Architektur-Kostenrechner",
    ar: "محرك الحسابات والعروض المعمارية الذكي"
  },
  calc_subtitle: {
    tr: "Çevre, Şehircilik ve İklim Değişikliği Bakanlığı 2026 Yapı Yaklaşık Birim Maliyetleri ve TMMOB yasal taban formülleriyle projenizi saniyeler içinde hesaplayın.",
    en: "Simulate project costs in seconds based on Ministry 2026 construction indices and Chamber of Architects statutory formulas.",
    de: "Berechnen Sie Ihr Projektangebot in Sekundenschnelle nach den aktuellen Baukostenindizes 2026 und Kammerrichtlinien.",
    ar: "احسب تكلفة مشروعك المعماري خلال ثوانٍ وفق مؤشرات تكاليف البناء الرسمية 2026 ولوائح نقابة المهندسين والمعماريين."
  },
  calc_step_1: {
    tr: "1. Hizmet Alanını Belirleyin",
    en: "1. Select Service Domain",
    de: "1. Leistungsbereich Auswählen",
    ar: "1. حدد مجال الخدمة المطلوب"
  },
  calc_domain_project: {
    tr: "Mimari & Statik Proje",
    en: "Architectural & Structural Design",
    de: "Architektur- & Tragwerksplanung",
    ar: "مخططات معمارية وإنشائية"
  },
  calc_domain_exec: {
    tr: "Şantiye Uygulaması",
    en: "Site Construction & Execution",
    de: "Baustelle & Ausführung",
    ar: "تنفيذ ومقاولات في الموقع"
  },
  calc_step_2_proj: {
    tr: "2. Projelendirme Kategorisi",
    en: "2. Design Category",
    de: "2. Planungskategorie",
    ar: "2. فئة المشروع والتصميم"
  },
  calc_step_2_exec: {
    tr: "2. Şantiye & Uygulama Alanı",
    en: "2. Construction Category",
    de: "2. Ausführungskategorie",
    ar: "2. فئة المقاولات والتنفيذ"
  },
  calc_step_3: {
    tr: "3. Toplam İnşaat / Kapalı Alan:",
    en: "3. Total Gross Construction Area:",
    de: "3. Gesamte Bruttogeschossfläche:",
    ar: "3. إجمالي المساحة الإنشائية المغلقة:"
  },
  calc_step_4: {
    tr: "4. Mevcut / Hedef Yapı Strüktürü",
    en: "4. Building Structure System",
    de: "4. Tragwerkssystem des Gebäudes",
    ar: "4. نوع النظام الإنشائي والهيكل"
  },
  calc_result_proj_title: {
    tr: "Tahmini Mimari & Mühendislik Bedeli",
    en: "Estimated Architectural & Engineering Fee",
    de: "Geschätztes Architektur- & Ingenieurhonorar",
    ar: "الأتعاب التقديرية للهندسة والتصميم"
  },
  calc_result_exec_title: {
    tr: "Tahmini Uygulama Bedeli",
    en: "Estimated Execution & Construction Cost",
    de: "Geschätzte Ausführungs- & Baukosten",
    ar: "التكلفة التقديرية للتنفيذ والمقاولات"
  },
  calc_stat_pym: {
    tr: "Bakanlık Yaklaşık Mal. (PYM):",
    en: "Ministry Approximate Cost (PYM):",
    de: "Behördliche Baukostenschätzung:",
    ar: "التكلفة التقديرية لوزارة الإسكان:"
  },
  calc_stat_exec_pym: {
    tr: "Hesaplanan Yapı Maliyeti:",
    en: "Calculated Construction Cost:",
    de: "Kalkulierte Gesamtbaukosten:",
    ar: "تكلفة البناء الإجمالية المحسوبة:"
  },
  calc_stat_norm: {
    tr: "Mevzuat Standartı:",
    en: "Regulatory Standard:",
    de: "Rechtlicher Standard:",
    ar: "المعيار القانوني المعتمد:"
  },
  calc_btn_report: {
    tr: "Detaylı Rapor & Teklif Al",
    en: "Get Detailed Proposal & Report",
    de: "Detailliertes Angebot & Bericht",
    ar: "احصل على التقرير والعرض التفصيلي"
  },
  calc_btn_whatsapp: {
    tr: "Bu Hesaplamayı WhatsApp ile Danış",
    en: "Discuss Calculation via WhatsApp",
    de: "Kalkulation via WhatsApp Besprechen",
    ar: "استشرنا حول هذا الحساب عبر واتساب"
  },

  // Testimonials
  test_tagline: {
    tr: "Müşteri Deneyimleri",
    en: "Client Testimonials",
    de: "Kundenstimmen",
    ar: "آراء وتجارب العملاء"
  },
  test_title_1: {
    tr: "Tarihi Yapı Sahiplerinin",
    en: "The Trust and Endorsement",
    de: "Das Vertrauen geschätzter",
    ar: "شهادات الثقة والاعتزاز"
  },
  test_title_2: {
    tr: "Güven Dolu İmzası",
    en: "Of Heritage Property Owners",
    de: "Eigentümer Historischer Immobilien",
    ar: "من ملاك العقارات التاريخية"
  },
  test_subtitle: {
    tr: "Korumaya aldığımız her eserin ardında, titizlikle tamamlanmış projeler ve geleceğe miras bırakan saygın mülk sahiplerinin memnuniyeti yer alıyor.",
    en: "Behind every preserved landmark stands meticulous craftsmanship and the enduring satisfaction of distinguished heritage owners.",
    de: "Hinter jedem Denkmalprojekt stehen meisterhafte Präzision und die vollste Zufriedenheit anspruchsvoller Bauherren.",
    ar: "وراء كل صرح قمنا بترميمه، تقف حرفية لا مثيل لها ورضا دائم من نخبة أصحاب الأملاك التاريخية."
  },

  // Journal
  journal_tagline: {
    tr: "Mimari Günce & Araştırmalar",
    en: "Architectural Journal & Research",
    de: "Architekturjournal & Forschung",
    ar: "مدونة العمارة والأبحاث"
  },
  journal_title_1: {
    tr: "Kültürel Mirasın",
    en: "A Journey into the Memory",
    de: "Eine Reise in das Gedächtnis",
    ar: "رحلة في أعماق ذاكرة"
  },
  journal_title_2: {
    tr: "Belleğine Yolculuk",
    en: "Of Cultural Heritage",
    de: "Des Kulturellen Erbes",
    ar: "التراث المعماري والثقافي"
  },
  journal_view_all: {
    tr: "Tüm Yayınları İncele",
    en: "View All Publications",
    de: "Alle Publikationen Ansehen",
    ar: "استعرض كافة المقالات"
  },

  // FAQ
  faq_tagline: {
    tr: "Merak Edilenler",
    en: "Frequently Asked Questions",
    de: "Häufig Gestellte Fragen",
    ar: "الأسئلة الأكثر شيوعاً"
  },
  faq_title_1: {
    tr: "Sıkça Sorulan",
    en: "Frequently Asked",
    de: "Häufige Fragen &",
    ar: "الأسئلة الشائعة"
  },
  faq_title_2: {
    tr: "Sorular & Süreç Rehberi",
    en: "Questions & Process Guide",
    de: "Leitfaden zur Denkmalpflege",
    ar: "ودليل إجراءات الترميم"
  },
  faq_subtitle: {
    tr: "Tarihi eserlerin restorasyonu, Koruma Kurulu izinleri ve mimari projelendirme süreçleriyle ilgili en çok karşılaşılan soruların uzman yanıtları.",
    en: "Expert answers to key questions regarding heritage restoration, Conservation Board permits, and architectural engineering.",
    de: "Fachkundige Antworten zu Denkmalschutzauflagen, Behördengenehmigungen und wissenschaftlichen Sanierungsprozessen.",
    ar: "إجابات الخبراء عن كل ما يخص ترميم المباني التاريخية وتراخيص لجان حماية الآثار وإجراءات التصميم الهندسي."
  },

  // Consultation CTA
  cta_tagline: {
    tr: "Ön Değerlendirme & Durum Tespiti",
    en: "Preliminary Evaluation & Site Survey",
    de: "Erstprüfung & Bestandsaufnahme",
    ar: "التقييم الأولي والمعاينة الميدانية"
  },
  cta_title_1: {
    tr: "Tarihi Bir Eseriniz veya Yeni Bir",
    en: "Do You Have a Heritage Property or a",
    de: "Haben Sie ein Historisches Gebäude oder eine",
    ar: "هل تملك عقاراً تاريخياً أو لديك"
  },
  cta_title_2: {
    tr: "Mimari Vizyonunuz mu Var?",
    en: "New Architectural Vision?",
    de: "Neue Architektonische Vision?",
    ar: "رؤية معمارية فريدة تود تحقيقها؟"
  },
  cta_subtitle: {
    tr: "Uzman restoratör mimarlarımız ve statik danışmanlarımızla yapınızı yerinde inceleyelim; Kültür Varlıkları mevzuatına uygun yol haritasını ve yaklaşık maliyet analizini birlikte belirleyelim.",
    en: "Let our senior conservation architects and structural professors inspect your landmark on-site; together we will map out legal heritage roadmaps and cost analyses.",
    de: "Lassen Sie Ihr Objekt von unseren Denkmalarchitekten vor Ort begutachten; gemeinsam erstellen wir einen behördensicheren Sanierungsfahrplan.",
    ar: "دع فريقنا من كبار مهندسي الترميم واستشاريي الهندسة الإنشائية يعاينون عقارك ميدانياً لتحديد خارطة طريق معتمدة ودراسة تكلفة دقيقة."
  },
  cta_btn_discovery: {
    tr: "Ücretsiz Ön Keşif Talep Edin",
    en: "Request Free Site Inspection",
    de: "Kostenlose Vor-Ort-Prüfung Anfordern",
    ar: "اطلب معاينة ميدانية أولية مجانية"
  },
  cta_btn_whatsapp: {
    tr: "WhatsApp Danışma Hattı",
    en: "WhatsApp Consultation Desk",
    de: "WhatsApp-Beratung",
    ar: "خط الاستشارات عبر واتساب"
  },
  cta_assurance_1: {
    tr: "Yerinde Ön İnceleme & Ekspertiz",
    en: "On-Site Inspection & Appraisal",
    de: "Vor-Ort-Begutachtung & Expertise",
    ar: "معاينة ميدانية وتقييم متخصص"
  },
  cta_assurance_2: {
    tr: "Anıtlar Kurulu Ön Tescil Taraması",
    en: "Heritage Registry Status Check",
    de: "Prüfung des Denkmalschutzstatus",
    ar: "فحص قيود وسجلات لجان الآثار"
  },
  cta_assurance_3: {
    tr: "TMMOB Normlarında Şeffaf Rapor",
    en: "Transparent Chamber-Norm Report",
    de: "Transparente Kammer-Kostenaufstellung",
    ar: "تقرير شفاف وفق معايير النقابة الرسمية"
  },
  cta_assurance_4: {
    tr: "24 Saat İçinde Keşif Özeti",
    en: "Survey Summary within 24 Hours",
    de: "Ergebnisbericht innerhalb von 24h",
    ar: "ملخص للمعاينة خلال 24 ساعة"
  },

  // Floating VIP Widget
  vip_title: {
    tr: "VIP İletişim.",
    en: "VIP Contact.",
    de: "VIP-Kontakt.",
    ar: "تواصل حصري."
  },
  vip_close: {
    tr: "Kapat",
    en: "Close",
    de: "Schließen",
    ar: "إغلاق"
  },
  vip_whatsapp: {
    tr: "WhatsApp Danışma Hattı",
    en: "WhatsApp Consultation Line",
    de: "WhatsApp-Beratungsdienst",
    ar: "خط الاستشارة المباشر عبر واتساب"
  },
  vip_call: {
    tr: "Hemen Ara: (+90) 540 427 88 75",
    en: "Direct Call: (+90) 540 427 88 75",
    de: "Direktanruf: (+90) 540 427 88 75",
    ar: "اتصال مباشر: (+90) 540 427 88 75"
  },
  vip_quote: {
    tr: "TMMOB Maliyet Hesapla",
    en: "Calculate Official Fee",
    de: "Offizielle Gebühren Berechnen",
    ar: "حساب التكاليف الرسمية"
  },

  // Footer
  footer_tagline: {
    tr: "Tarihe dokunuyor, geleceği inşa ediyoruz. 20 yılı aşkın restorasyon ve mimarlık tecrübesi.",
    en: "Preserving history, shaping the future. Over 20 years of architectural and historical restoration excellence.",
    de: "Geschichte bewahren, Zukunft gestalten. Über 20 Jahre Exzellenz in Denkmalpflege und Architektur.",
    ar: "نصون التاريخ، ونبني المستقبل. أكثر من 20 عاماً من الريادة في الترميم والتصميم المعماري."
  },
  footer_quick_links: {
    tr: "Hızlı Menü",
    en: "Quick Links",
    de: "Schnellnavigation",
    ar: "روابط سريعة"
  },
  footer_services: {
    tr: "Hizmetlerimiz",
    en: "Services",
    de: "Leistungen",
    ar: "خدماتنا"
  },
  footer_contact_info: {
    tr: "İletişim & Ofis",
    en: "Contact & Studio",
    de: "Kontakt & Büro",
    ar: "المكتب والتواصل"
  },
  footer_address: {
    tr: "Ömer Avni Mah. Hacıhanım Sokağı No: 10/1 Gümüşsuyu / Beyoğlu / İSTANBUL",
    en: "Ömer Avni Mah. Hacıhanım Sokak No: 10/1 Gümüşsuyu, Beyoğlu / ISTANBUL",
    de: "Ömer Avni Mah. Hacıhanım Sokak No: 10/1 Gümüşsuyu, Beyoğlu / ISTANBUL",
    ar: "حي عمر عوني، زقاق حاجي هانم رقم 10/1 غوموش سويو، بيوغلو / إسطنبول"
  },
  footer_rights: {
    tr: "Tüm hakları saklıdır.",
    en: "All rights reserved.",
    de: "Alle Rechte vorbehalten.",
    ar: "جميع الحقوق محفوظة."
  },
  footer_contact_cta: {
    tr: "Bizimle İletişime Geçin",
    en: "Get In Touch With Us",
    de: "Treten Sie mit uns in Kontakt",
    ar: "تواصل مباشرة مع فريقنا"
  },
  footer_touch_text: {
    tr: "Tarihi bir yapınız mı var? Birlikte geleceğe taşıyalım.",
    en: "Do you own a historical landmark? Let's carry it into the future together.",
    de: "Besitzen Sie ein historisches Objekt? Lassen Sie es uns gemeinsam in die Zukunft führen.",
    ar: "هل تملك عقاراً تاريخياً مسجلاً؟ دعنا نصونه وننقله إلى المستقبل معاً."
  }
};
