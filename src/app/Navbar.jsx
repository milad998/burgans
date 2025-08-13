"use client";
import 'bootstrap/dist/css/bootstrap.min.css';
import Image from 'next/image';
import boubyan from '../public/boubyan.png';
import visa from '../public/visa.png';

export default function NavbarCustom() {
  return (
    <nav className="navbar bg-white shadow-sm">
      <div className="container d-flex justify-content-between align-items-center">
        {/* شعار Boubyan */}
        <Image src={boubyan} alt="Boubyan" height={40} />

        {/* شعار Visa */}
        <Image src={visa} alt="Visa" height={40} />
      </div>
    </nav>
  );
        }
