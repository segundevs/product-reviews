import {useState} from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { toast } from 'react-toastify';
import Loader from '../../components/Loader';


const ForgotPassword = () => {

  const { sendPasswordResetEmail } = useAuth();

  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async(e) => {
    e.preventDefault()
      setLoading(true)
      try{
        await sendPasswordResetEmail(email)
        setLoading(false)
        toast.success('Please check your email to reset your password', {theme: "colored", autoClose: 2000 })
      }catch(err){
        setError(err.message)
        setLoading(false)
        toast.error( error? `${error}` : 'Something went wrong!', {theme: "colored", autoClose: 2000 })
      }
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
