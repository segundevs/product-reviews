import {useState} from 'react';
import { Link } from 'react-router-dom';
import {CgMenuRight, CgClose} from 'react-icons/cg';
import './header.css';


const Header = () => {

  const [isOpen, setIsOpen] = useState(false);

  return (
   <header className="header">
      <nav className="navbar">
       <Link to="/" className="logo-link">
        Reviews
       </Link>
      

        <div className="navbar__links-container">

        <div className="nav__links">
          <Link to="/" className="nav__link">Home</Link>
          <Link to="/product" className="nav__link">Product</Link>
          <Link to="/login" className="nav__link login">Login</Link>
        </div>

        <div className="menu__icon" onClick={() => setIsOpen(prev => !prev)}>
          {!isOpen ? <CgMenuRight className="toggleIcon open"/> : <CgClose className="toggleIcon close"/>}
        </div>

        {isOpen && <div className="nav__links-mobile">
          <Link to="/" className="nav__link" onClick={() => setIsOpen(false)}>Home</Link>
          <Link to="/product" className="nav__link" onClick={() => setIsOpen(false)}>Product</Link>
          <Link to="/login" className="nav__link login" onClick={() => setIsOpen(false)}>Login</Link>
        </div>}
        </div>   
      </nav>
      
    </header>
  )
}

export default Header
