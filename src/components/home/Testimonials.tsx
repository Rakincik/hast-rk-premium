"use client";

import { motion } from "framer-motion";
import styles from "./Testimonials.module.css";
import { Star, ShieldCheck, MapPin } from "lucide-react";

const testimonials = [
  {
    id: 1,
    name: "Murat S. Vardarlı",
    role: "Boğaziçi Yalı Sahibi",
    location: "Kandilli / İstanbul",
    badge: "2. Grup Tescilli Eser",
    avatar: "MV",
    quote: "Kandilli'deki ahşap karkas yalımızın restorasyon sürecinde Kültür Varlıklarını Koruma Kurulu onaylarından el oyması kündekari işçiliklerine kadar her aşamada inanılmaz bir uzmanlık sergilediler. Tarihi dokuyu milimetrik koruyarak modern bir konfora kavuşturduk."
  },
  {
    id: 2,
    name: "Dr. Selim Karamanoğlu",
    role: "Vakıf Heyeti Başkanı",
    location: "Sultanahmet / İstanbul",
    badge: "1. Grup Anıtsal Eser",
    avatar: "SK",
    quote: "Tarihi medrese binamızın rölöve, restitüsyon ve güçlendirme projelerinde Hastürk ekibinin Lidar 3D teknolojisiyle çıkardığı hasar haritaları Kurul'da tek seferde takdirle onaylandı. Akademik ve hukuki danışmanlıkları projemizin en büyük güvencesi oldu."
  },
  {
    id: 3,
    name: "Aylin Tezel",
    role: "Butik Otel Yatırımcısı",
    location: "Karaköy / İstanbul",
    badge: "Tarihi Taş Han",
    avatar: "AT",
    quote: "1890 yapımı kagir binamızı butik otele dönüştürürken statik güçlendirme ve rölöve süreçleri gözümüzü korkutuyordu. Hastürk Sanat ve Mimarlık hem bütçe hem de zaman planlamasına harfiyen sadık kalarak eseri hayata döndürdü."
  }
];

export default function Testimonials() {
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
          <span className={styles.tagline}>Müşteri Deneyimleri</span>
          <h2 className={styles.title}>
            Tarihi Yapı Sahiplerinin <br />
            <span className="text-gold">Güven Dolu İmzası</span>
          </h2>
          <p className={styles.subtitle}>
            Korumaya aldığımız her eserin ardında, titizlikle tamamlanmış projeler ve geleceğe miras bırakan saygın mülk sahiplerinin memnuniyeti yer alıyor.
          </p>
        </motion.div>

        <div className={styles.grid}>
          {testimonials.map((t, idx) => (
            <motion.div 
              key={t.id}
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
                    {t.badge}
                  </span>
                </div>
                
                <p className={styles.quoteText}>
                  &ldquo;{t.quote}&rdquo;
                </p>
              </div>

              <div className={styles.authorMeta}>
                <div className={styles.avatar}>{t.avatar}</div>
                <div className={styles.authorDetails}>
                  <div className={styles.authorName}>{t.name}</div>
                  <div className={styles.authorRole}>{t.role}</div>
                  <div className={styles.locationTag}>
                    <MapPin size={12} style={{ display: "inline", verticalAlign: "middle", marginRight: "3px" }} />
                    {t.location}
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
