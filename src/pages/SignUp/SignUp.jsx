import {useState} from 'react';
import { useHistory } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import Loader from '../../components/Loader';
import './signup.css';

const SignUp = () => {

   const { signUp, loading } = useAuth();

  const history = useHistory();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');

  const handleSubmit = async(e) => {
    e.preventDefault()
      await signUp(email, password, username)
      history.push('/login')  
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
