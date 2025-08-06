// components/Navbar.js
import Image from "next/image";
import burgan from '../../public/burgan.svg'

export default function Navbar() {
  return (
    <nav style={styles.navbar}>
      <div style={styles.logo}>
        <Image src={burgan} width={80} height={50} alt="KNET Logo" />
      </div>
    </nav>
  );
}

const styles = {
  navbar: {
    position: 'fixed',
    top: 0,
    width: '100%',
    height: '60px',
    backgroundColor: '#fff',
    display: 'flex',
    justifyContent: 'flex-end', // الشعار على اليمين
    alignItems: 'center',
    padding: '0 20px',
    boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
    marginBottom:'25px',
    zIndex: 1000
  },
  logo: {
    display: 'flex',
    alignItems: 'center',
  }
};
