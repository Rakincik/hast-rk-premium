"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import styles from "./Faq.module.css";
import { ChevronDown } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { useSiteContent } from "@/context/SiteContentContext";

export default function Faq() {
  const { t, language } = useLanguage();
  const { content } = useSiteContent();
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const faqData = [
    {
      q: language === "en" ? "What is the difference between Grade 1 and Grade 2 registered historic buildings?" :
         language === "de" ? "Was ist der Unterschied zwischen Baudenkmälern der Klassen 1 und 2?" :
         language === "ar" ? "ما الفرق بين المباني الأثرية المسجلة من الفئة الأولى والفئة الثانية؟" :
         "1. Grup ve 2. Grup tarihi tescilli yapılar arasındaki fark nedir?",
      a: language === "en"
        ? "Grade 1 heritage assets (monumental landmarks such as mosques, palaces, pavilions, tombs, and madrasas) belong to public heritage, requiring strict fidelity to original materials. Grade 2 assets comprise civil architecture like traditional mansions and Bosphorus yalis, where exterior facades and load-bearing structures must be preserved, while interiors can be adapted to contemporary luxury living."
        : language === "de"
        ? "Klasse-1-Kulturgüter (monumentale Bauwerke wie Moscheen, Paläste, Pavillons und Medresen) unterliegen strengsten Authentizitätsauflagen. Klasse-2-Bauten sind bürgerliche Architekturen wie Villen und Stadthäuser; hier müssen Fassade und Tragwerk denkmalgerecht bewahrt werden, während Innenräume an modernen Wohnkomfort angepasst werden können."
        : language === "ar"
        ? "المعالم الأثرية من الفئة الأولى (المساجد الكبرى، القصور، الأضرحة والمدارس التاريخية) تعد تراثاً عاماً وتخضع لضوابط أصالة صارمة جداً. أما الفئة الثانية فتشمل العمارة المدنية كالقصور والبيوت التراثية المطلة على البوسفور، حيث يجب الحفاظ التام على الواجهات الخارجية والهيكل الإنشائي، مع إمكانية إعادة توظيف الفضاءات الداخلية بما يلائم معايير الرفاهية الحديثة."
        : "1. Grup kültür varlıkları (cami, saray, köşk, türbe, medrese gibi anıtsal yapılar) toplumun ortak malı kabul edilir ve yapılacak müdahaleler çok katı aslına sadakat kurallarına tabidir. 2. Grup yapılar ise kentsel sit alanında kalan geleneksel konutlar, yalılar ve dükkanlar gibi sivil mimarlık örnekleridir. 2. Grup yapılarda dış cephe ve taşıyıcı kimlik korunurken iç mekanlar çağdaş konfor şartlarına uygun şekilde yeniden işlevlendirilebilir."
    },
    {
      q: language === "en" ? "How long does the Cultural Heritage Protection Board approval process take?" :
         language === "de" ? "Wie lange dauert das Genehmigungsverfahren der Denkmalschutzbehörden?" :
         language === "ar" ? "كم تستغرق عادة إجراءات مصادقة لجنة حماية الآثار والتراث؟" :
         "Kültür Varlıklarını Koruma Kurulu (Anıtlar Kurulu) onay süreci ortalama ne kadar sürer?",
      a: language === "en"
        ? "Board review timelines average between 3 to 6 months depending on registry status and documentation completeness. At Hastürk Art & Architecture, our millimetric 3D LiDAR laser scans and comprehensive restitution dossiers eliminate revision rounds, securing accelerated approvals."
        : language === "de"
        ? "Das behördliche Prüfverfahren dauert in der Regel 3 bis 6 Monate. Durch unsere millimetergenauen 3D-LiDAR-Laserscans und wissenschaftlich fundierten Dossiers minimiert Hastürk Rückfragen und sichert eine zügige Genehmigung."
        : language === "ar"
        ? "تستغرق الإجراءات عادة ما بين 3 إلى 6 أشهر بحسب درجة تسجيل المعلم واكتمال ملفاته. بفضل المسح الليزري ثلاثي الأبعاد والتوثيق الميليمتري الذي نعده في هاستورك، نقلل طلبات التعديل إلى أدنى حد ونحقق المصادقة في أسرع وقت ممكن."
        : "Kurul onay süreçleri yapının tescil derecesine, bölgesine ve mevcut belgelerine bağlı olarak ortalama 3 ila 6 ay arasında tamamlanır. Hastürk Sanat ve Mimarlık olarak, 3D Lidar lazer tarama ile hazırladığımız milimetrik rölöve, restitüsyon ve restorasyon projeleri sayesinde Kurul'dan gelebilecek revizyon taleplerini en aza indirerek onay sürecini maksimum hızda sonuçlandırıyoruz."
    },
    {
      q: language === "en" ? "How are Chamber of Architects minimum fees and restoration costs calculated?" :
         language === "de" ? "Wie werden das Architektenhonorar und die Restaurierungskosten berechnet?" :
         language === "ar" ? "كيف يتم حساب الأتعاب القانونية وتكاليف مشاريع الترميم المعماري؟" :
         "TMMOB Asgari Bedeli ve restorasyon proje maliyetleri neye göre hesaplanır?",
      a: language === "en"
        ? "Fees are calculated using the Chamber of Architects' statutory costing methodology cross-referenced with Ministry annual unit building costs. Floor area (m²), structural system (masonry vs. timber), heritage grade, and protected zones directly govern the coefficient calculation."
        : language === "de"
        ? "Die Honorare richten sich nach den offiziellen Richtlinien der Architektenkammer in Verbindung mit den jährlichen ministeriellen Baukostenansätzen. Fläche (m²), Bauweise (Mauerwerk oder Holz), Denkmalschutzgrad und Schutzzonen bestimmen die exakten Multiplikatoren."
        : language === "ar"
        ? "تُحسب أتعاب التصميم وفق المنهجية الرسمية لنقابة المعماريين بالاستناد إلى تكاليف البناء المعتمدة سنوياً في الجريدة الرسمية. وتحدد المساحة الإجمالية (م²)، نوع الهيكل الإنشائي (حجر أو خشب)، ودرجة التصنيف التراثي المعاملات الرقمية للتكلفة."
        : "Restorasyon ve rölöve proje bedelleri, TMMOB Mimarlar Odası'nın 'Rölöve, Restitüsyon ve Restorasyon Projeleri Yaklaşık Maliyet Hazırlama Yöntemi' ile her yıl resmi gazetede yayımlanan Yapı Yaklaşık Birim Maliyetleri baz alınarak hesaplanır. Yapının m² büyüklüğü, kagir/ahşap taşıyıcı türü, tescil derecesi ve Boğaziçi/Tarihi Yarımada gibi özel sit bölgeleri katsayıları doğrudan maliyeti belirler."
    },
    {
      q: language === "en" ? "How is seismic retrofitting performed without damaging historic building fabric?" :
         language === "de" ? "Wie gelingt Erdbebenertüchtigung ohne Beschädigung der historischen Substanz?" :
         language === "ar" ? "كيف يتم التدعيم الإنشائي والأمان الزلزالي دون الإضرار بالنسيج التاريخي؟" :
         "Tarihi eserlerde deprem güvenliği ve statik güçlendirme tarihi dokuya zarar vermeden nasıl yapılır?",
      a: language === "en"
        ? "Destructive modern methods such as concrete jacketing are strictly prohibited. We utilize scientifically reversible methods: compatible hydraulic lime grout injections, invisible CFRP carbon wraps, stainless steel tie-rods, and traditional timber joinery reinforcements."
        : language === "de"
        ? "Zerstörerische Methoden wie Betonummantelungen sind streng tabu. Wir setzen auf denkmalgerechte, reversible Verfahren: mineralische Kalkinjektionen, unsichtbare Carbonfaser-Verstärkungen (CFRP), Edelstahlanker und traditionelle Holzverbindungen."
        : language === "ar"
        ? "تُحظر تماماً الطرق الخرسانية الحديثة التي تشوه النسيج التراثي. بدلاً من ذلك، نطبق أساليب علمية قابلة للعكس: حقن الجير الهيدروليكي المتوافق كيميائياً، شرائح ألياف الكربون غير المرئية (CFRP)، وشدادات الفولاذ المقاوم للصدأ."
        : "Tarihi binalarda modern betonarme mantolama gibi dokuyu yok eden yöntemler kesinlikle uygulanmaz. Bunun yerine eserin özgün harç kimyasına uygun hidrolik kireç enjeksiyonları, görünmeyen karbon fiber lif (CFRP) sargıları, paslanmaz çelik gergi çubukları ve ahşap karkasın geleneksel geçmelerle takviye edilmesi gibi 'geri alınabilir ve bilimsel' güçlendirme yöntemleri uygulanır."
    },
    {
      q: language === "en" ? "Do you conduct preliminary site visits and condition appraisals before project launch?" :
         language === "de" ? "Führen Sie vor Projektbeginn Vor-Ort-Begutachtungen und Zustandserfassungen durch?" :
         language === "ar" ? "هل تقدمون خدمات المعاينة الميدانية والتقييم الأولي قبل توقيع العقد؟" :
         "Proje öncesinde yerinde keşif ve ön durum tespiti yapıyor musunuz?",
      a: language === "en"
        ? "Yes. For property owners and developers in Istanbul and surrounding provinces, our preliminary site survey, heritage registry assessment, and restoration roadmap consultation are complimentary."
        : language === "de"
        ? "Ja. Für Eigentümer und Investoren in Istanbul und angrenzenden Regionen sind Erstbesichtigung, Prüfung des Denkmalschutzstatus und Beratung zum Restaurierungsfahrplan kostenfrei."
        : language === "ar"
        ? "نعم بالتأكيد. نقدم لعملائنا والمستثمرين في إسطنبول والولايات المجاورة خدمات المعاينة الميدانية الأولية، وفحص السجل التراثي، وتحديد خارطة طريق الترميم مجاناً."
        : "Evet. Mülk sahiplerimiz ve yatırımcılarımız için İstanbul ve çevre illerde yerinde ön keşif, tescil durumu incelemesi ve restorasyon yol haritası belirleme danışmanlığımız ücretsizdir. Yerinde yapılan detaylı lazer tarama, rölöve çizimi ve resmi kurul dosyalama süreçleri ise onaylanan proje sözleşmesi kapsamında yürütülür."
    }
  ];

  const activeFaqData =
    content.faq && content.faq.length > 0
      ? content.faq.map((item) => ({
          q: item.question,
          a: item.answer,
        }))
      : faqData;

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
          <span className={styles.tagline}>{t("faq_tagline", "Merak Edilenler")}</span>
          <h2 className={styles.title}>
            {t("faq_title_1", "Sıkça Sorulan")} <br />
            <span className="text-gold">{t("faq_title_2", "Sorular & Süreç Rehberi")}</span>
          </h2>
          <p className={styles.subtitle}>
            {t("faq_subtitle", "Tarihi eserlerin restorasyonu, Koruma Kurulu izinleri ve mimari projelendirme süreçleriyle ilgili en çok karşılaşılan soruların uzman yanıtları.")}
          </p>
        </motion.div>

        <div className={styles.faqContainer}>
          {activeFaqData.map((item, index) => {
            const isOpen = openIndex === index;
            return (
              <motion.div 
                key={index}
                className={`${styles.faqItem} ${isOpen ? styles.faqItemOpen : ""}`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-30px" }}
                transition={{ duration: 0.4, delay: index * 0.08 }}
              >
                <button 
                  className={styles.questionBtn}
                  onClick={() => toggleFaq(index)}
                  aria-expanded={isOpen}
                >
                  <span>{item.q}</span>
                  <div className={`${styles.iconWrapper} ${isOpen ? styles.iconRotated : ""}`}>
                    <ChevronDown size={18} />
                  </div>
                </button>

                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.35, ease: "easeInOut" }}
                      className={styles.answerWrapper}
                    >
                      <div className={styles.answerContent}>
                        {item.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
