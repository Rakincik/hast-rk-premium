"use client";

import styles from "./FloatingContactWidget.module.css";
import { useLanguage } from "@/context/LanguageContext";

export default function FloatingContactWidget() {
  const { language } = useLanguage();

  const getWhatsappMessage = () => {
    switch (language) {
      case "en":
        return "Hello, we would like to consult with the Hastürk Art & Architecture team regarding our project.";
      case "de":
        return "Guten Tag, wir möchten uns mit dem Team von Hastürk Kunst & Architektur bezüglich unseres Projekts beraten lassen.";
      case "ar":
        return "مرحباً، نود الاستشارة والتواصل مع فريق هاستورك للفن والعمارة بخصوص مشروعنا المعماري والتراثي.";
      default:
        return "Merhaba, Hastürk Sanat ve Mimarlık ekibiyle projemiz hakkında görüşmek istiyoruz.";
    }
  };

  const whatsappText = encodeURIComponent(getWhatsappMessage());

  return (
    <a
      href={`https://wa.me/905404278875?text=${whatsappText}`}
      target="_blank"
      rel="noopener noreferrer"
      className={styles.whatsappFloat}
      aria-label="WhatsApp: (+90) 540 427 88 75"
    >
      <div className={styles.tooltip}>
        <span>WhatsApp:</span>
        <span className={styles.tooltipNumber}>(+90) 540 427 88 75</span>
      </div>

      <div className={styles.whatsappBtn}>
        <span className={styles.pulseRing} />
        {/* Official WhatsApp SVG Vector */}
        <svg
          viewBox="0 0 24 24"
          width="32"
          height="32"
          fill="currentColor"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M12.031 2c-5.508 0-9.986 4.477-9.986 9.984 0 1.761.458 3.479 1.328 4.996l-1.411 5.16 5.281-1.385c1.464.799 3.111 1.22 4.788 1.22 5.508 0 9.986-4.478 9.986-9.985s-4.478-9.986-9.986-9.986zm5.82 14.156c-.244.688-1.229 1.266-1.703 1.344-.457.075-1.054.106-3.086-.734-2.599-1.074-4.275-3.714-4.405-3.886-.129-.172-1.054-1.4-1.054-2.67 0-1.27.665-1.895.901-2.152.237-.257.519-.322.693-.322.173 0 .346.002.497.009.158.007.371-.06.58.441.215.517.734 1.791.799 1.921.065.13.108.281.022.453-.086.172-.129.281-.258.431-.129.151-.271.336-.388.451-.129.129-.264.269-.114.527.151.258.67 1.103 1.436 1.785.986.878 1.817 1.15 2.075 1.279.258.129.409.108.56-.065.151-.172.645-.753.817-1.011.172-.258.344-.215.58-.129.237.086 1.506.71 1.764.839.258.129.431.194.495.301.065.108.065.624-.179 1.312z" />
        </svg>
      </div>
    </a>
  );
}
