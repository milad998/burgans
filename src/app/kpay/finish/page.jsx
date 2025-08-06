"use client";
import styles from "./finish.module.css";
import { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";

function FinishContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const datas = searchParams.get("name");
  const [showPage, setShowPage] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowPage(false);
      router.push(`/kpay/finish/code?name=${datas}`);
    }, 4000);
    return () => clearTimeout(timer);
  }, [datas, router]);

  return (
    <div className={styles.continer}>
      <div className={styles.loader}></div>
      {showPage && <p className="text-primary">جاري اتمام عملية الدفع يرجى الانتظار</p>}
    </div>
  );
}

export default function Finish() {
  return (
    <Suspense fallback={<div>جارٍ التحميل...</div>}>
      <FinishContent />
    </Suspense>
  );
}
