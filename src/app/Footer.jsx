"use client";

import { Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";

function FooterContent() {
  const searchParams = useSearchParams();
  const price = searchParams.get("price");
  const router = useRouter();

  return (
    <footer style={styles.footer}>
      <button
        type="button"
        className="btn btn-outline-danger rounded-pill"
        onClick={() => router.push(`/?price=${price}`)}
      >
        رفض
      </button>
      <button
        style={styles.button}
        onClick={() => router.push(`/payand?price=${price}`)}
      >
        <svg style={styles.att} viewBox="0 0 24 24">
          <path d="m12 4-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z" />
        </svg>
        دفع
      </button>
    </footer>
  );
}

export default function Footer() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <FooterContent />
    </Suspense>
  );
}

const styles = {
  footer: {
    position: "fixed",
    bottom: 0,
    width: "100%",
    height: "60px",
    backgroundColor: "#f8f8f8",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderTop: "1px solid #ccc",
    zIndex: 999,
  },
  button: {
    padding: "10px 20px",
    fontSize: "16px",
    borderRadius: "30px",
    display: "flex",
    width: "100px",
    alignItems: "center",
    justifyContent: "center",
    height: "40px",
    border: "none",
    backgroundColor: "#0070f3",
    color: "white",
    cursor: "pointer",
    marginLeft: "30px",
  },
  att: {
    fontSize: "22px",
    fill: "#fff",
    marginLeft: "5px",
  },
};
