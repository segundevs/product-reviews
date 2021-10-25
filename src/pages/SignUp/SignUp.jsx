import {useState} from 'react';
import { useHistory } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { toast } from 'react-toastify';
import Loader from '../../components/Loader';
import './signup.css';

const SignUp = () => {

   const { signUp } = useAuth();

  const history = useHistory();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async(e) => {
    e.preventDefault()
      setLoading(true)
      try{
        await signUp(email, password, username)
        setLoading(false)
        toast.success('Successfully created account!', {theme: "colored", autoClose: 2000 })
        history.push('/login')
      }catch (err){
        setError(err.message)
        setLoading(false)
        toast.error( error? `${error}` : 'Something went wrong!', {theme: "colored", autoClose: 2000 })
      }   
  }

  return (
    <form onSubmit={handleSubmit} className="product__container">
      <h2 className="heading">Create an account</h2>

      <div className="input__container">
        <label>Username</label>
        <input type="text" placeholder="Enter your username" value={username} onChange={(e) => setUsername(e.target.value)}/>
      </div>

      <div className="input__container">
        <label>Email</label>
        <input type="text" placeholder="Enter your email" required value={email} onChange={(e) => setEmail(e.target.value)}/>
      </div>

      <div className="input__container">
        <label>Password</label>
        <input type="password" placeholder="Enter your password" required value={password} onChange={(e) => setPassword(e.target.value)}/>
      </div>

      <button className="btn">{loading ? <Loader height='1em'/> : 'Sign Up'}</button>
    </form>
  )
}

export default SignUp
