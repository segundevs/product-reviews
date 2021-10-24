import {useState} from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useAuth } from '../../contexts/authContext/AuthContext';

const Login = () => {

  const { login, sendPasswordResetEmail, isAuthenticating } = useAuth();

  const history = useHistory();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false)

  const handleSubmit = async(e) => {
    e.preventDefault()
    setLoading(true)
    await login(email, password)
    setLoading(false)
    history.push('/')
  }

  return (
    <form onSubmit={handleSubmit} className="product__container">
      <h2 className="heading">Login</h2>
      <div className="product-name">
        <label>Email</label>
        <input type="text" placeholder="Enter your email" required value={email} onChange={(e) => setEmail(e.target.value)}/>
      </div>

      <div className="product-name">
        <label>Password</label>
        <input type="password" placeholder="Enter your password" required value={password} onChange={(e) => setPassword(e.target.value)}/>
      </div>
       <h2 className="heading">Don't have an account? <Link to="/signup">Sign up</Link></h2>
       <h2 className="heading">Forgotten Password? <Link to="/forgotPassword">Forgot password</Link></h2>
      <button >{loading ? 'running' : 'Login'}</button>
    </form>
  )
}

export default Login
