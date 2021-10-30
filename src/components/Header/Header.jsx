import {useState} from 'react';
import { Link, useHistory } from 'react-router-dom';
import {CgMenuRight, CgClose} from 'react-icons/cg';
import './header.css';
import { useAuth } from '../../contexts/AuthContext';


const Header = () => {
  const history = useHistory();

  const {user, logOut} = useAuth();

  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = async() => {
    setIsOpen(false)
    await logOut()
    history.push('/')
  }

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
          {!user && <Link to="/login" className="nav__link login">Login</Link>}
          {!user && <Link to="/signup" className="nav__link login">Sign up</Link>}
          {user && <Link to="/" className="nav__link login" onClick={handleLogout}>Logout</Link>}
        </div>

        <div className="menu__icon" onClick={() => setIsOpen(prev => !prev)}>
          {!isOpen ? <CgMenuRight className="toggleIcon open"/> : <CgClose className="toggleIcon close"/>}
        </div>

        {isOpen && <div className="nav__links-mobile">
          <Link to="/" className="nav__link" onClick={() => setIsOpen(false)}>Home</Link>
          <Link to="/product" className="nav__link" onClick={() => setIsOpen(false)}>Product</Link>
          {!user && <Link to="/login" className="nav__link login" onClick={() => setIsOpen(false)}>Login</Link>}
          {!user && <Link to="/signup" className="nav__link login" onClick={() => setIsOpen(false)}>Sign up</Link>}
          {user && <Link to="/" className="nav__link login" onClick={handleLogout}>Logout</Link>}
        </div>}
        </div>   
      </nav>
      
    </header>
  )
}

export default Header
