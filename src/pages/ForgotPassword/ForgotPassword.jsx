import {useState} from 'react';
import { useAuth } from '../../contexts/AuthContext';
import Loader from '../../components/Loader';


const ForgotPassword = () => {

  const { sendPasswordResetEmail, loading } = useAuth();

  const [email, setEmail] = useState('');

  const handleSubmit = async(e) => {
    e.preventDefault()
    await sendPasswordResetEmail(email)
  }

  return (
    <form onSubmit={handleSubmit} className="product__container">
      <h2 className="heading">Forgot Password</h2>
      <div className="input__container">
        <label>Email</label>
        <input type="text" placeholder="Enter your email" value={email} onChange={(e) => setEmail(e.target.value)}/>
      </div>

      <button className="btn">{loading ? <Loader /> : 'Send Reset Email'}</button>
    </form>
  )
}

export default ForgotPassword
