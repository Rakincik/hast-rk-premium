"use client";

import { motion } from "framer-motion";
import styles from "./Testimonials.module.css";
import { Star, ShieldCheck, MapPin } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

export default function Testimonials() {
  const { t, language } = useLanguage();

  const testimonials = [
    {
      id: 1,
      name: "Murat S. Vardarlı",
      role: language === "en" ? "Bosphorus Waterfront Mansion Owner" :
            language === "de" ? "Eigentümer einer Bosporus-Villa" :
            language === "ar" ? "مالك قصر تاريخي على البوسفور" :
            "Boğaziçi Yalı Sahibi",
      location: "Kandilli / İstanbul",
      badge: language === "en" ? "Grade II Heritage Mansion" :
             language === "de" ? "Denkmalgeschützte Villa (Kl. 2)" :
             language === "ar" ? "أثر مسجل من الفئة الثانية" :
             "2. Grup Tescilli Eser",
      avatar: "MV",
      quote: language === "en" 
        ? "During the restoration of our timber-framed mansion in Kandilli, they exhibited extraordinary mastery at every step—from Conservation Board permits to hand-carved Kundekari woodwork. They preserved the authentic fabric while integrating modern living comfort."
        : language === "de" 
        ? "Bei der Restaurierung unserer denkmalgeschützten Holzvilla in Kandilli bewies das Team außergewöhnliche Kompetenz – von Denkmalschutz-Genehmigungen bis hin zu meisterhaften Holzarbeiten. Sie haben das historische Erbe bewahrt und zeitgemäßen Komfort geschaffen."
        : language === "ar" 
        ? "خلال مراحل ترميم قصرنا الخشبي التاريخي في قنديللي، أظهر فريق هاستورك كفاءة استثنائية في كل خطوة، بدءاً من تراخيص لجان حماية التراث إلى أدق أعمال النجارة التراثية. لقد صانوا الروح التاريخية بدقة متناهية مع توفير أرقى مستويات الراحة العصرية."
        : "Kandilli'deki ahşap karkas yalımızın restorasyon sürecinde Kültür Varlıklarını Koruma Kurulu onaylarından el oyması kündekari işçiliklerine kadar her aşamada inanılmaz bir uzmanlık sergilediler. Tarihi dokuyu milimetrik koruyarak modern bir konfora kavuşturduk."
    },
    {
      id: 2,
      name: "Dr. Selim Karamanoğlu",
      role: language === "en" ? "Heritage Foundation Board Chairman" :
            language === "de" ? "Stiftungsvorstand für Kulturgüter" :
            language === "ar" ? "رئيس هيئة الأوقاف التراثية" :
            "Vakıf Heyeti Başkanı",
      location: "Sultanahmet / İstanbul",
      badge: language === "en" ? "Grade I Monumental Landmark" :
             language === "de" ? "Monumentales Baudenkmal (Kl. 1)" :
             language === "ar" ? "صرح أثري مسجل من الفئة الأولى" :
             "1. Grup Anıtsal Eser",
      avatar: "SK",
      quote: language === "en"
        ? "In the survey, restitution, and seismic retrofitting of our historic madrasa, the 3D LiDAR damage maps prepared by Hastürk were approved by the Monument Board on the first submission with high praise. Their academic and legal counsel was our greatest assurance."
        : language === "de"
        ? "Bei der Bauaufnahme, Rekonstruktion und Ertüchtigung unserer historischen Medrese wurden die 3D-LiDAR-Schadenskarten von der Denkmalbehörde im ersten Anlauf mit höchstem Lob freigegeben. Ihre wissenschaftliche Begleitung war der Schlüssel zum Erfolg."
        : language === "ar"
        ? "في مشاريع الرفع المعماري والتدعيم الإنشائي لمدرستنا التاريخية، نالت خرائط الأضرار التي أعدها فريق هاستورك بتقنية الليدار ثلاثية الأبعاد مصادقة لجنة الآثار من الجلسة الأولى وبكل ثناء. كانت استشاراتهم الأكاديمية والقانونية صمام الأمان لمشروعنا."
        : "Tarihi medrese binamızın rölöve, restitüsyon ve güçlendirme projelerinde Hastürk ekibinin Lidar 3D teknolojisiyle çıkardığı hasar haritaları Kurul'da tek seferde takdirle onaylandı. Akademik ve hukuki danışmanlıkları projemizin en büyük güvencesi oldu."
    },
    {
      id: 3,
      name: "Aylin Tezel",
      role: language === "en" ? "Boutique Hotel Investor" :
            language === "de" ? "Boutique-Hotel-Investorin" :
            language === "ar" ? "مستثمرة في قطاع الفنادق التراثية" :
            "Butik Otel Yatırımcısı",
      location: "Karaköy / İstanbul",
      badge: language === "en" ? "Historic Masonry Caravanserai" :
             language === "de" ? "Historisches Stein-Gasthaus" :
             language === "ar" ? "خان حجري تاريخي" :
             "Tarihi Taş Han",
      avatar: "AT",
      quote: language === "en"
        ? "When converting our 1890s masonry building into a boutique hotel, structural reinforcement and board approvals were daunting. Hastürk Art & Architecture brought the heritage building back to life, strictly adhering to budget and milestone schedules."
        : language === "de"
        ? "Bei der Umnutzung unseres historischen Mauerwerkbaus von 1890 in ein Boutique-Hotel waren Statik und Denkmalschutzauflagen herausfordernd. Hastürk hat das Gebäude mit strikter Budget- und Termintreue zu neuem Leben erweckt."
        : language === "ar"
        ? "أثناء تحويل مبنانا الحجري المشيد عام 1890 إلى فندق بوتيك فاخر، كانت تحديات التدعيم الإنشائي والموافقات الرسمية مقلقة للغاية. لكن هاستورك أعادت الحياة للمبنى مع التزام صارم بالميزانية والجدول الزمني المحدد."
        : "1890 yapımı kagir binamızı butik otele dönüştürürken statik güçlendirme ve rölöve süreçleri gözümüzü korkutuyordu. Hastürk Sanat ve Mimarlık hem bütçe hem de zaman planlamasına harfiyen sadık kalarak eseri hayata döndürdü."
    }
  ];

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
          <span className={styles.tagline}>{t("test_tagline", "Müşteri Deneyimleri")}</span>
          <h2 className={styles.title}>
            {t("test_title_1", "Tarihi Yapı Sahiplerinin")} <br />
            <span className="text-gold">{t("test_title_2", "Güven Dolu İmzası")}</span>
          </h2>
          <p className={styles.subtitle}>
            {t("test_subtitle", "Korumaya aldığımız her eserin ardında, titizlikle tamamlanmış projeler ve geleceğe miras bırakan saygın mülk sahiplerinin memnuniyeti yer alıyor.")}
          </p>
        </motion.div>

        <div className={styles.grid}>
          {testimonials.map((item, idx) => (
            <motion.div 
              key={item.id}
              className={styles.card}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: idx * 0.15 }}
            >
              <div>
                <div className={styles.cardHeader}>
                  <div className={styles.stars}>
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={16} fill="currentColor" />
                    ))}
                  </div>
                  <span className={styles.projectBadge}>
                    <ShieldCheck size={14} />
                    {item.badge}
                  </span>
                </div>
                
                <p className={styles.quoteText}>
                  &ldquo;{item.quote}&rdquo;
                </p>
              </div>

              <div className={styles.authorMeta}>
                <div className={styles.avatar}>{item.avatar}</div>
                <div className={styles.authorDetails}>
                  <div className={styles.authorName}>{item.name}</div>
                  <div className={styles.authorRole}>{item.role}</div>
                  <div className={styles.locationTag}>
                    <MapPin size={12} style={{ display: "inline", verticalAlign: "middle", marginRight: "3px" }} />
                    {item.location}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
