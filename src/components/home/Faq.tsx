"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import styles from "./Faq.module.css";
import { ChevronDown } from "lucide-react";

const faqData = [
  {
    q: "1. Grup ve 2. Grup tarihi tescilli yapılar arasındaki fark nedir?",
    a: "1. Grup kültür varlıkları (cami, saray, köşk, türbe, medrese gibi anıtsal yapılar) toplumun ortak malı kabul edilir ve yapılacak müdahaleler çok katı aslına sadakat kurallarına tabidir. 2. Grup yapılar ise kentsel sit alanında kalan geleneksel konutlar, yalılar ve dükkanlar gibi sivil mimarlık örnekleridir. 2. Grup yapılarda dış cephe ve taşıyıcı kimlik korunurken iç mekanlar çağdaş konfor şartlarına uygun şekilde yeniden işlevlendirilebilir."
  },
  {
    q: "Kültür Varlıklarını Koruma Kurulu (Anıtlar Kurulu) onay süreci ortalama ne kadar sürer?",
    a: "Kurul onay süreçleri yapının tescil derecesine, bölgesine ve mevcut belgelerine bağlı olarak ortalama 3 ila 6 ay arasında tamamlanır. Hastürk Sanat ve Mimarlık olarak, 3D Lidar lazer tarama ile hazırladığımız milimetrik rölöve, restitüsyon ve restorasyon projeleri sayesinde Kurul'dan gelebilecek revizyon taleplerini en aza indirerek onay sürecini maksimum hızda sonuçlandırıyoruz."
  },
  {
    q: "TMMOB Asgari Bedeli ve restorasyon proje maliyetleri neye göre hesaplanır?",
    a: "Restorasyon ve rölöve proje bedelleri, TMMOB Mimarlar Odası'nın 'Rölöve, Restitüsyon ve Restorasyon Projeleri Yaklaşık Maliyet Hazırlama Yöntemi' ile her yıl resmi gazetede yayımlanan Yapı Yaklaşık Birim Maliyetleri baz alınarak hesaplanır. Yapının m² büyüklüğü, kagir/ahşap taşıyıcı türü, tescil derecesi ve Boğaziçi/Tarihi Yarımada gibi özel sit bölgeleri katsayıları doğrudan maliyeti belirler."
  },
  {
    q: "Tarihi eserlerde deprem güvenliği ve statik güçlendirme tarihi dokuya zarar vermeden nasıl yapılır?",
    a: "Tarihi binalarda modern betonarme mantolama gibi dokuyu yok eden yöntemler kesinlikle uygulanmaz. Bunun yerine eserin özgün harç kimyasına uygun hidrolik kireç enjeksiyonları, görünmeyen karbon fiber lif (CFRP) sargıları, paslanmaz çelik gergi çubukları ve ahşap karkasın geleneksel geçmelerle takviye edilmesi gibi 'geri alınabilir ve bilimsel' güçlendirme yöntemleri uygulanır."
  },
  {
    q: "Proje öncesinde yerinde keşif ve ön durum tespiti yapıyor musunuz?",
    a: "Evet. Mülk sahiplerimiz ve yatırımcılarımız için İstanbul ve çevre illerde yerinde ön keşif, tescil durumu incelemesi ve restorasyon yol haritası belirleme danışmanlığımız ücretsizdir. Yerinde yapılan detaylı lazer tarama, rölöve çizimi ve resmi kurul dosyalama süreçleri ise onaylanan proje sözleşmesi kapsamında yürütülür."
  }
];

export default function Faq() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

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
          <span className={styles.tagline}>Merak Edilenler</span>
          <h2 className={styles.title}>
            Sıkça Sorulan <br />
            <span className="text-gold">Sorular & Süreç Rehberi</span>
          </h2>
          <p className={styles.subtitle}>
            Tarihi eserlerin restorasyonu, Koruma Kurulu izinleri ve mimari projelendirme süreçleriyle ilgili en çok karşılaşılan soruların uzman yanıtları.
          </p>
        </motion.div>

        <div className={styles.faqContainer}>
          {faqData.map((item, index) => {
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
