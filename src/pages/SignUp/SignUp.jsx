import {useState} from 'react';
import { useHistory } from 'react-router-dom';
import { useAuth } from '../../contexts/authContext/AuthContext';
import './signup.css';

const SignUp = () => {

   const { signUp } = useAuth();

  const history = useHistory();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async(e) => {
    e.preventDefault()
    await signUp(email, password)
    history.push('/login')
  }
  return (
    <form onSubmit={handleSubmit} className="product__container">
      <h2 className="heading">Create an account</h2>
      <div className="product-name">
        <label>Email</label>
        <input type="text" placeholder="Enter your email" required value={email} onChange={(e) => setEmail(e.target.value)}/>
      </div>

      <div className="product-name">
        <label>Password</label>
        <input type="password" placeholder="Enter your password" required value={password} onChange={(e) => setPassword(e.target.value)}/>
      </div>

      <button >Sign Up</button>
    </form>
  )
}

export default SignUp
