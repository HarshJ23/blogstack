import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router , Routes , Route } from 'react-router-dom';
import Home from './Pages/Home';
import Profile from './Pages/Profile';

function App() {
  return (
  <>
  
  <Router>
    <Routes>
      <Route path="/"  element={<Home/>}/>
      <Route path="/profile"  element={<Profile/>}/>
    </Routes>
  </Router>
  
  </>
  );
}

export default App;
