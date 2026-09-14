"use client";

import { motion, Variants } from "framer-motion";
import Image from "next/image";
import styles from "./ekip.module.css";
import { Mail } from "lucide-react";

const teamMembers = [
  {
    id: 1,
    name: "Okan HASTÜRK",
    role: "Y. Mimar",
    email: "info@hasturksm.com",
    image: "https://static.wixstatic.com/media/4bb5c9_41a37e2d629b45c59b8e07b08500df6c~mv2.png"
  },
  {
    id: 2,
    name: "Sevde Kübra AY HASTÜRK",
    role: "Çevre Y. Mühendisi",
    email: "info@hasturksm.com",
    image: "https://static.wixstatic.com/media/4bb5c9_eb382daf7645407cb54770d4fb2326ca~mv2.png"
  },
  {
    id: 3,
    name: "Prof. Dr. Mehmet Fatih ALTAN",
    role: "İnşaat Y. Müh. / Danışman",
    email: "info@hasturksm.com",
    image: "https://static.wixstatic.com/media/4bb5c9_cbc06f32ba8647ea8d5018bf890f539b~mv2.png"
  },
  {
    id: 4,
    name: "Baturay AKSOY",
    role: "Avukat / Hukuk Danışmanlığı",
    email: "info@hasturksm.com",
    image: "https://static.wixstatic.com/media/4bb5c9_7c4dd496b5b0494e8f653aff6b0a88e9~mv2.jpg"
  },
  {
    id: 5,
    name: "Onur HASTÜRK",
    role: "Sanat Danışmanı",
    email: "info@hasturksm.com",
    image: "https://static.wixstatic.com/media/4bb5c9_060eb66118df437081fb6bd08337982e~mv2.jpeg"
  }
];

export default function TeamPage() {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 100, damping: 20 }
    }
  };

  return (
    <div className={styles.container}>
      <motion.div 
        className={styles.hero}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <h1 className={styles.title}>Mimariyi Sanata <br/> Dönüştüren Kadro</h1>
        <p className={styles.subtitle}>
          Her biri alanında uzman, tarihi dokuya saygılı ve modern mühendisliği ilke edinmiş profesyonel ekibimizle tanışın.
        </p>
      </motion.div>

      <motion.div 
        className={styles.grid}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {teamMembers.map((member) => (
          <motion.div key={member.id} className={styles.card} variants={itemVariants}>
            <div className={styles.imageWrapper}>
              <img 
                src={member.image} 
                alt={member.name}
                className={styles.image}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            </div>
            
            <div className={styles.overlay}>
              <div className={styles.content}>
                <h3 className={styles.name}>{member.name}</h3>
                <div className={styles.role}>{member.role}</div>
                <div className={styles.contact}>
                  <a href={`mailto:${member.email}`} className={styles.email}>
                    <Mail size={16} />
                    {member.email}
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
