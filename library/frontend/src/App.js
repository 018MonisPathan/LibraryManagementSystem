import './App.css';
import { Link, BrowserRouter, Routes, Route } from 'react-router-dom';

//import navbar
import Navbar from './layouts/navbar';

//import sign up
import RegisterLibrarianStudent from './components/admin/register_librarian_student';

//import login
import Login from './components/login';

//import private component for admin
import PrivateComponentAdmin from './components/privateComponentAdmin';

function App() {
  return (
    <div className='App'>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route element={<PrivateComponentAdmin/>}>
            <Route path='/admin/registerlibrarianstudent' element={<RegisterLibrarianStudent />} />
          </Route>
          <Route path='/login' element={<Login />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
