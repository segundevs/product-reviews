import {useState} from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useAuth } from '../../contexts/authContext/AuthContext';

const ForgotPassword = () => {

  const { sendPasswordResetEmail } = useAuth();

  const history = useHistory();

  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async(e) => {
    e.preventDefault()
    setLoading(true)
    await sendPasswordResetEmail(email)
    setLoading(false)
  }

  return (
    <form onSubmit={handleSubmit} className="product__container">
      <h2 className="heading">Login</h2>
      <div className="product-name">
        <label>Email</label>
        <input type="text" placeholder="Enter your email" value={email} onChange={(e) => setEmail(e.target.value)}/>
      </div>

      <button >{loading ? 'running' : 'Send Reset Email'}</button>
    </form>
  )
}

export default ForgotPassword
