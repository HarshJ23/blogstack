import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router , Routes , Route } from 'react-router-dom';
import Home from './Pages/Home';
import Profile from './Pages/Profile';
import Navbar from './Components/Navbar';
import SignIn from './Pages/SignIn';
import PrivateRoute from './Components/PrivateRoute';
import PublishBlog from './Pages/PublishBlog';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
  <>
  
  <Router>
    <Navbar/>
    <Routes>
      <Route path="/"  element={<Home/>}/>

      <Route path="/profile" element={<PrivateRoute/>}>
      <Route path="/profile"  element={<Profile/>}/>
      </Route>

      <Route path="/publish-blogs" element={<PrivateRoute/>}>
      <Route path="/publish-blogs"  element={<PublishBlog/>}/>
      </Route>

      <Route path="/sign-in"  element={<SignIn/>}/>
    </Routes>
  </Router>
  
  <ToastContainer
position="bottom-right"
hideProgressBar
autoClose={2500}
newestOnTop={false}
closeOnClick
rtl={false}
pauseOnFocusLoss
draggable
theme="light"
/>
  </>
  );
}

export default App;
