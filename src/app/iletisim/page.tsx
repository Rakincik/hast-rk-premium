"use client";

import { useState } from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";
import styles from "./iletisim.module.css";
import { MapPin, Phone, Mail, Clock, Send, CheckCircle2, MessageCircle, Sparkles } from "lucide-react";

export default function IletisimPage() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    serviceType: "Restorasyon & Rölöve",
    message: ""
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 600);
  };

  const getWhatsAppLink = () => {
    const text = encodeURIComponent(
      `Merhaba Hastürk Sanat ve Mimarlık,\n\n` +
      `Web siteniz üzerinden iletişim formu doldurdum:\n` +
      `• İsim: ${formData.fullName}\n` +
      `• Telefon: ${formData.phone}\n` +
      `• İlgilenilen Hizmet: ${formData.serviceType}\n` +
      `• Mesaj: ${formData.message}\n\n` +
      `Görüşmek ve bilgi almak istiyorum.`
    );
    return `https://wa.me/905404278875?text=${text}`;
  };

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 }
    }
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 25 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  return (
    <div className={styles.container}>
      {/* Hero Header */}
      <motion.div 
        className={styles.hero}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <div className={styles.badge}>
          <Sparkles size={14} /> İletişim & Randevu
        </div>
        <h1 className={styles.title}>Bize Ulaşın</h1>
        <p className={styles.subtitle}>
          Tarihi yapılarınızın rölöve, restorasyon ve güçlendirme süreçleri ya da yeni mimari vizyonunuz için mimarlarımızla hemen iletişime geçin.
        </p>
      </motion.div>

      <motion.div 
        className={styles.contentWrapper}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Sol Kolon: İletişim Bilgileri, Aksiyonlar & Harita */}
        <motion.div className={styles.infoColumn} variants={itemVariants}>
          <div className={styles.infoCard}>
            <div className={styles.infoItem}>
              <div className={styles.iconWrapper}><MapPin size={22} /></div>
              <div className={styles.infoText}>
                <h3>Merkez Stüdyo & Ofis</h3>
                <p>Ömer Avni Mah. Hacıhanım Sokağı No: 10/1</p>
                <p>Gümüşsuyu, Beyoğlu / İSTANBUL</p>
                <span className={styles.noteTag}>Ziyaretler randevu ile kabul edilmektedir</span>
              </div>
            </div>
            
            <div className={styles.infoItem}>
              <div className={styles.iconWrapper}><Phone size={22} /></div>
              <div className={styles.infoText}>
                <h3>Telefon & Danışma Hattı</h3>
                <a href="tel:+905404278875">(+90) 540 427 88 75</a>
                <br />
                <a href="tel:+905333388960">(+90) 533 338 89 60</a>
              </div>
            </div>

            <div className={styles.infoItem}>
              <div className={styles.iconWrapper}><Mail size={22} /></div>
              <div className={styles.infoText}>
                <h3>E-Posta Adresi</h3>
                <a href="mailto:info@hasturksm.com">info@hasturksm.com</a>
              </div>
            </div>

            <div className={styles.infoItem}>
              <div className={styles.iconWrapper}><Clock size={22} /></div>
              <div className={styles.infoText}>
                <h3>Çalışma Saatleri</h3>
                <p>Pazartesi – Cuma: 09:00 – 18:30</p>
                <p>Cumartesi: 10:00 – 15:00 (Ön Keşif & Randevu)</p>
              </div>
            </div>
          </div>

          {/* Hızlı Aksiyon Butonları */}
          <div className={styles.directActions}>
            <a 
              href="https://wa.me/905404278875?text=Merhaba%2C%20web%20sitenizden%20ula%C5%9F%C4%B1yorum.%20Projemiz%20hakk%C4%B1nda%20dan%C4%B1%C5%9Fmak%20istiyorum." 
              target="_blank" 
              rel="noopener noreferrer"
              className={`${styles.directActionBtn} ${styles.whatsappBtn}`}
            >
              <MessageCircle size={18} />
              <span>WhatsApp Hattı</span>
            </a>

            <a 
              href="tel:+905404278875" 
              className={`${styles.directActionBtn} ${styles.callBtn}`}
            >
              <Phone size={18} />
              <span>Doğrudan Ara</span>
            </a>
          </div>

          {/* Koyu Temalı Stilize Harita */}
          <div className={styles.mapCard}>
            <iframe
              title="Hastürk Sanat ve Mimarlık Konum"
              src="https://maps.google.com/maps?q=G%C3%BCm%C3%BC%C5%9Fsuyu,%20Beyo%C4%9Flu,%20Istanbul&t=&z=15&ie=UTF8&iwloc=&output=embed"
              className={styles.mapIframe}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </motion.div>

        {/* Sağ Kolon: İnteraktif Teklif & Mesaj Formu */}
        <motion.div className={styles.formSection} variants={itemVariants}>
          <AnimatePresence mode="wait">
            {!isSubmitted ? (
              <motion.div 
                key="form"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <div className={styles.formHeader}>
                  <h2 className={styles.formTitle}>Proje Danışmanlık Formu</h2>
                  <p className={styles.formSubtitle}>
                    Yapınızın durumu, ihtiyaç duyduğunuz restorasyon veya proje kapsamı hakkında bilgi verin; baş mimarımız en kısa sürede incelesin.
                  </p>
                </div>

                <form onSubmit={handleSubmit} className={styles.formGrid}>
                  <div className={styles.formGroup}>
                    <label className={styles.label}>Adınız Soyadınız *</label>
                    <input 
                      type="text" 
                      required 
                      className={styles.input} 
                      placeholder="Örn: Ahmet Yılmaz" 
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    />
                  </div>

                  <div className={styles.formGroup}>
                    <label className={styles.label}>Telefon Numaranız *</label>
                    <input 
                      type="tel" 
                      required 
                      className={styles.input} 
                      placeholder="05XX XXX XX XX" 
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    />
                  </div>

                  <div className={styles.formGroup}>
                    <label className={styles.label}>E-Posta Adresiniz *</label>
                    <input 
                      type="email" 
                      required 
                      className={styles.input} 
                      placeholder="ornek@alanadi.com" 
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    />
                  </div>

                  <div className={styles.formGroup}>
                    <label className={styles.label}>İlgilenilen Hizmet Türü</label>
                    <select 
                      className={styles.select}
                      value={formData.serviceType}
                      onChange={(e) => setFormData({ ...formData, serviceType: e.target.value })}
                    >
                      <option value="Restorasyon & Rölöve">Restorasyon & Rölöve</option>
                      <option value="Tarihi Eser Restitüsyon">Tarihi Eser Restitüsyon</option>
                      <option value="Statik Güçlendirme">Statik Güçlendirme & Sismik Analiz</option>
                      <option value="Yeni Mimari Tasarım">Yeni Mimari Tasarım & Ruhsat</option>
                      <option value="Taahhüt & Şantiye Uygulama">Taahhüt & Şantiye Uygulama</option>
                      <option value="Sanat Eserleri Konservasyonu">Sanat Eserleri Konservasyonu</option>
                    </select>
                  </div>

                  <div className={`${styles.formGroup} ${styles.formGroupFull}`}>
                    <label className={styles.label}>Mesajınız & Yapı Detayları *</label>
                    <textarea 
                      required 
                      className={styles.textarea} 
                      placeholder="Yapının konumu, yaklaşık m² alanı, tescil durumu veya sormak istediğiniz detayları belirtiniz..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    />
                  </div>

                  <button 
                    type="submit" 
                    className={styles.submitBtn}
                    disabled={isSubmitting}
                  >
                    <Send size={18} />
                    <span>{isSubmitting ? "Gönderiliyor..." : "Mesajı İlet"}</span>
                  </button>
                </form>
              </motion.div>
            ) : (
              <motion.div 
                key="success"
                className={styles.successCard}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4 }}
              >
                <div className={styles.successIconCircle}>
                  <CheckCircle2 size={36} />
                </div>
                <h3 className={styles.successTitle}>Talebiniz Başarıyla Alındı</h3>
                <p className={styles.successText}>
                  Sayın <strong>{formData.fullName}</strong>, başvurunuz mimari ekibimize iletildi. Uzman restoratör mimarımız projenizin ön incelemesini yaparak en geç <strong>24 saat içinde</strong> sizinle iletişime geçecektir.
                </p>

                <div className={styles.successActions}>
                  <a 
                    href={getWhatsAppLink()} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className={`${styles.directActionBtn} ${styles.whatsappBtn}`}
                  >
                    <MessageCircle size={18} />
                    <span>Mesajı WhatsApp ile de İlet</span>
                  </a>

                  <button 
                    type="button" 
                    className={styles.resetBtn}
                    onClick={() => {
                      setIsSubmitted(false);
                      setFormData({
                        fullName: "",
                        email: "",
                        phone: "",
                        serviceType: "Restorasyon & Rölöve",
                        message: ""
                      });
                    }}
                  >
                    Yeni Bir Mesaj Gönder
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </motion.div>
    </div>
  );
}
