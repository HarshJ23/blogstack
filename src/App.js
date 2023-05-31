import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router , Routes , Route } from 'react-router-dom';
import Home from './Pages/Home';
import Profile from './Pages/Profile';
import Navbar from './Components/Navbar';
import SignIn from './Pages/SignIn';

function App() {
  return (
  <>
  
  <Router>
    <Navbar/>
    <Routes>
      <Route path="/"  element={<Home/>}/>
      <Route path="/profile"  element={<Profile/>}/>
      <Route path="/sign-in"  element={<SignIn/>}/>
    </Routes>
  </Router>
  
  </>
  );
}

export default App;
