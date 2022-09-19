import './App.css';
import './sidebars.css';
import { Link, BrowserRouter, Routes, Route } from 'react-router-dom';

//import navbar
import Navbar from './layouts/navbar';

import Sidebar from './layouts/sidebar';

//import sign up
import RegisterLibrarianStudent from './components/admin/register_librarian_student';

//import login
import Login from './components/login';

import AddCategory from './components/admin/AddCategory';

import AddBook from './components/admin/AddBook';

//import private component for admin
import PrivateComponentAdmin from './components/privateComponentAdmin';

function App() {
  return (
    <div className='App' >
      <BrowserRouter>
      <Navbar />
      <div style={{display:'flex'}}>
      <Sidebar />
        <Routes>
          <Route element={<PrivateComponentAdmin/>}>
            <Route path='/admin/registerlibrarianstudent' element={<RegisterLibrarianStudent />} />
          </Route>
          <Route path='/login' element={<Login />} />
          <Route path='/admin/AddCategory' element={<AddCategory />} />
          <Route path='/admin/AddBook' element={<AddBook />} />
        </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
