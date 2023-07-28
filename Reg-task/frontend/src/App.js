import './App.css';
import SignUp from './components/signup/SignUp';
import { BrowserRouter, Route , Routes } from 'react-router-dom';
import SignIn from './components/signin/SignIn';
import Profile from './components/profile/Profile';

function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path='/signin' element={<SignIn />} />
      <Route path='/signup' element={<SignUp />} />
      <Route path='/profile' element={<Profile />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

