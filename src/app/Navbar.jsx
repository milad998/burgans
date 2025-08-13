"use client";
import 'bootstrap/dist/css/bootstrap.min.css';
import Image from 'next/image';
import boubyan from '../public/burgan.svg';

export default function NavbarCustom() {
  return (
    <nav className="navbar bg-white shadow-sm">
      <div className="container d-flex justify-content-start align-items-center">
        {/* شعار Boubyan */}
        <Image src={boubyan} alt="Boubyan" height={40} />

        {/* شعار Visa */}
        
      </div>
    </nav>
  );
        }
