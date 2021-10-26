import {useState} from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { FcGoogle } from 'react-icons/fc';
import Loader from '../../components/Loader';

import './login.css'

const Login = () => {

  const { login, signInWithGoogle, loading } = useAuth();

  const history = useHistory();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async(e) => {
    e.preventDefault()
      await login(email, password)
      history.push('/')
  }

  const handleGoogle = async() => {
      await signInWithGoogle()
      history.push('/')
  }

  return (
    <form onSubmit={handleSubmit} className="product__container">
      <h2 className="heading">Login</h2>
      
      <div className="input__container">
        <label>Email</label>
        <input type="text" placeholder="Enter your email" required value={email} onChange={(e) => setEmail(e.target.value)} />
      </div>

      <div className="input__container">
        <label>Password</label>
        <input type="password" placeholder="Enter your password" required value={password} onChange={(e) => setPassword(e.target.value)} />
      </div>

        <h4 onClick={handleGoogle} className="login__page-link">
          <FcGoogle className="google"/> Sign in with google
        </h4>
       <h4>Don't have an account? <Link to="/signup" className="login__page-link">Sign up</Link></h4>
       <h4>Forgotten Password? <Link to="/forgotPassword" className="login__page-link">Forgot password</Link></h4>
      <button className="btn">{loading ? <Loader /> : 'Login'}</button>
    </form>
  )
}

export default Login
