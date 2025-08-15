"use client"
import styles from './finish.module.css'
import { Suspense } from "react";
import {useState,useEffect} from 'react'
import {useRouter,useSearchParams} from 'next/navigation'
const FinishContent = ()=>{
    const [showPage,setShowPage]=useState(true);
    const router = useRouter();
    const x = useSearchParams();
    const refN = x.get("refN");
    const price= x.get("price");
    
    useEffect(() => {
        const timer = setTimeout(() => {
            setShowPage(false)
            router.push(`/code?refN=${refN}&price=${price}`)
        }, 7000);
        return () => clearTimeout(timer);
    },[])
    
    
       
    return(
       <div className={styles.continer}>
      
            <div className={styles.loading}>
                <div className={styles.d1}></div>
                <div className={styles.d2}></div>
            </div>
       
           {showPage && <p></p>}
     </div>
           
)

}

export default function Finish() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <FinishContent />
    </Suspense>
  );
      }
