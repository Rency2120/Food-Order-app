import './App.css';
import Home from './screens/Home';
import { Route, Routes } from 'react-router-dom';
import Login from './screens/Login';
import '../node_modules/bootstrap-dark-5/dist/css/bootstrap-dark.min.css'
import '../node_modules/bootstrap/dist/js/bootstrap.bundle';
import "../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js";
import Signup from './screens/Signup.js';
import Cart from './screens/Cart.js';
import MyOrder from './screens/MyOrder.js';
import Navbar from './components/Navbar.js';
import Footer from './components/Footer.js';


function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route exact path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/myorder' element={<MyOrder />} />
      </Routes>
    </>

  );
}

export default App;
