import './App.css';
import { Link, BrowserRouter, Routes, Route } from 'react-router-dom';

//import navbar
import Navbar from './layouts/navbar';

//import sign up
import Signup from './components/signup';

//import login
import Login from './components/login';

function App() {
  return (
    <div className='App'>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path='/signup' element={<Signup />} />
          <Route path='/login' element={<Login />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
