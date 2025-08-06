"use client";

import Image from "next/image";
import styles from "./page.module.css";
import kent from "../../public/download.svg";
import Footer from "./Footer";


export default function Home() {
  const dateNow = new Date();
  const options = { year: "numeric", month: "long", day: "numeric" };
  const formattedDate = dateNow.toLocaleDateString("ar-EG", options);
  const tomorrow = new Date(dateNow);
  tomorrow.setDate(tomorrow.getDate() + 1);
  const optionss = {
    day: "numeric",
    month: "long",
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  };
  let formatted = tomorrow.toLocaleString("ar-EG", optionss);
  formatted = formatted.replace("،", ",");




  return (
    <div className={styles.page} dir="rtl">
      <main className={styles.main}>
        <div className={styles.headerBox}>
          <svg className={styles.icon} viewBox="0 0 24 24">
            <path d="M9 6c0 .56.45 1 1 1h5.59L4.7 17.89c-.39.39-.39 1.02 0 1.41s1.02.39 1.41 0L17 8.41V14c0 .55.45 1 1 1s1-.45 1-1V6c0-.55-.45-1-1-1h-8c-.55 0-1 .45-1 1" />
          </svg>
          <h6 className={styles.logo}>EZPAY</h6>
          <p className={styles.successText}>تم تجهيز طلب الدفع الخاص بك!</p>
        </div>

        <div className={styles.paymentBox}>
          <div className={styles.amountBox}>
            <span className={styles.amountDecimal}>000.</span>
            <span className={styles.amountMain}>10</span>
            <span className={styles.currency}>دينار كويتي</span>
          </div>
          <p className={styles.toPerson}>دفع إلى:</p>
          <p className={styles.nameperson}>بدر عبد الله عجيل محمد</p>

          <div className={styles.paymentMethod}>
            <div>
              <Image src={kent} width={40} height={20} alt="KNET" />
              <span>كي نت</span>
            </div>
            <input type="checkbox" checked readOnly />
          </div>

          <div className={styles.notesBox}>
            <label htmlFor="notes">ملاحظات</label>
            <textarea id="notes" placeholder="ملاحظات (اختياري)" maxLength={124}></textarea>
          </div>

          <div className={styles.detailsGrid}>
            <div><strong>اسم المسدّد:</strong><span>13</span></div>
            <div><strong>رقم الطلب:</strong><span>430083292</span></div>
            <div><strong>رقم التعريف الداخلي:</strong><span>3758350</span></div>
            <div><strong>تاريخ إنشاء الطلب:</strong><span>{formattedDate}</span></div>
            <div><strong>تاريخ انتهاء الدفع:</strong><span>{formatted}</span></div>
            <div><strong>الغرض من الدفع:</strong><span>خدمات</span></div>
          </div>
        </div>
      </main>

      <Footer />

    </div>
  );
}
