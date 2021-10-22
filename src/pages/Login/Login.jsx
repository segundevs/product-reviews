import {useState} from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useAuth } from '../../contexts/authContext/AuthContext';

const Login = () => {

  const { login } = useAuth();

  const history = useHistory();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async(e) => {
    e.preventDefault()
    await login(email, password)
    history.push('/')
  }
  return (
    <form onSubmit={handleSubmit} className="product__container">
      <h2 className="heading">Login</h2>
      <div className="product-name">
        <label>Email</label>
        <input type="text" placeholder="Enter your email" value={email} onChange={(e) => setEmail(e.target.value)}/>
      </div>

      <div className="product-name">
        <label>Password</label>
        <input type="password" placeholder="Enter your password" value={password} onChange={(e) => setPassword(e.target.value)}/>
      </div>

       <h2 className="heading">Don't have an account? <Link to="/signup">Sign up</Link></h2>
      <button >Login</button>
    </form>
  )
}

export default Login
