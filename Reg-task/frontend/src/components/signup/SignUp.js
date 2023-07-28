import  {React,  useState  } from "react";
import {useNavigate} from 'react-router-dom';
import './SignUp.css';

 

const Signup = () => {
  const [email , setEmail] = useState('')
  const [password , setPassword] = useState('')
  const [confirmPassword , setConfirmPassword] = useState('')
  const [username , setUsername] = useState('')
  const [error , setError] = useState('')
const navigate = useNavigate();

  const onSubmitHandler = async (e)=>{
    e.preventDefault() 
    
      const res = await fetch('http://localhost:8060/signup' ,{
     method : 'POST',
         headers: {
          'Content-Type': 'application/json'
         },
         body: JSON.stringify({
          username,
           email,
           password,
           confirmPassword,
         })
       })
      
    const data = await res.json()
    console.log(data);
    if (data.status === "error" && data.error === 'duplicate-email') {
      setError('Email already exists');
    } else if (data.status === 'success') {
      navigate('/signin')}
    // } else {
    //   setError('An unknown error occurred. Please try again later.');
    // }
 
  
  }
  const onChangeEmail =(e)=>{
    e.preventDefault()
    setEmail(e.target.value)
  }
  const onChangePassword =(e)=>{
    e.preventDefault()
    setPassword(e.target.value)
  }
  const confirmPasswordHandler =(e)=>{
    e.preventDefault()
    setConfirmPassword(e.target.value)
  }
  const onChangeUsername =(e)=>{
    e.preventDefault()
    setUsername(e.target.value)
  }


  return(
    <>
    <div className="signup_container">
      <form onSubmit={onSubmitHandler}  className="signup-form">
      <input  onChange={onChangeUsername} type="text" value={username} placeholder="Username"/>
      <input  onChange={onChangeEmail} type="email" value={email} placeholder="Email"/>
      <input onChange={onChangePassword} type="password" value={password} placeholder="Password"/>
      <input onChange={confirmPasswordHandler} type="password" value={confirmPassword} placeholder="Confirm password"/>
      {error && <div className="error-message">{error}</div>}
      <input type="submit" value="Signup" className="btn" />
      </form>
    </div>
    </>
  )
   
 
};

export default Signup;
