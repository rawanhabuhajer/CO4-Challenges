import React, { useEffect , useState} from 'react'
import jwt_decode from "jwt-decode";
import { useNavigate } from 'react-router-dom'

const Profile = () => {
  // const [username , setUsername] = useState('');
  const [email , setEmail] = useState('');
  const [username , setUsername] = useState('');
  const navigate = useNavigate(); 

  useEffect(() => {
    const token = localStorage.getItem('token');
    console.log(token)
    if (token) {
      const user = jwt_decode(token);
      console.log(user , "hello")
      if (user) {
        setEmail(user.email);
        setUsername(user.username);
      }

     else {
      localStorage.removeItem('token');
      navigate('/signin')
    }
    }
  },[]); 
  return (
    <div>
      <div>
        <h1>{username}</h1>
        <h3>{email}</h3>
      </div>
    </div>
  )
}

export default Profile
