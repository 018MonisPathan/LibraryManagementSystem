import './App.css';
import './sidebars.css';
import { Link, BrowserRouter, Routes, Route } from 'react-router-dom';

//import navbar
import Navbar from './layouts/navbar';

//import sign up
import RegisterLibrarianStudent from './components/admin/register_librarian_student';

//import login
import Login from './components/login';

//Import  Category
import AddCategory from './components/admin/AddCategory';

import AddBook from './components/admin/AddBook';

//Import SubCategory
import AddSubCategory from './components/admin/AddSubCategory';

//Import ManageCategory
import ManageCategory from './components/admin/ManageCategory';

//Import ManageSubCategory
import ManageSubCategory from './components/admin/ManageSubCategory';

//Import ManageMember
import ManageMember from './components/admin/ManageMember';

//Import ManageDeletedMember
import ManageDeletedMember from './components/admin/ManageDeletedMember';

//Import ManageBook
import ManageBook from './components/admin/ManageBook';

//import private component for admin
import PrivateComponentAdmin from './components/privateComponentAdmin';

//----------Student--------------

//Import student dashboard
import StudentDashboard from './components/student/dashboard';

//Import manage issue book
import ManageIssueBook from './components/student/ManageIssueBook';

//import private component for student
import PrivateComponentStudent from './components/PrivateComponentStudent';

//---------Faculty---------------

//Import faculty dashboard
import FacultyDashboard from './components/faculty/dashboard';

//Import private component for faculty
import PrivateComponentFaculty from './components/PrivateComponentFaculty';

//---------Librarian-------------

//Import librarian dashboard
import LibrarianDashboard from './components/librarian/dashboard';

//Import private component for librarian
import PrivateComponentLibrarian from './components/PrivateComponentLibrarian';

function App() {
  
  return (
    
    <div className='App' >
      <BrowserRouter>
      <Navbar />
      <div style={{display:'flex'}}>
      
        <Routes>
          <Route element={<PrivateComponentAdmin/>}>
            <Route path='/admin/registerlibrarianstudent' element={<RegisterLibrarianStudent />} />
            <Route path='/admin/registerlibrarianstudent/:id' element={<RegisterLibrarianStudent/>}></Route>
            <Route path='/admin/AddCategory' element={<AddCategory />} />
            <Route path='/admin/AddCategory/:id' element={<AddCategory />} />
            <Route path='/admin/AddSubCategory' element={<AddSubCategory/>}></Route>
            <Route path='/admin/AddSubCategory/:id' element={<AddSubCategory/>}></Route>
            <Route path='/admin/AddBook' element={<AddBook />} />
            <Route path='/admin/ManageCategory' element={<ManageCategory />} />
            <Route path='/admin/ManageSubCategory' element={<ManageSubCategory />} />
            <Route path='/admin/ManageMember' element={<ManageMember/>}/>
            <Route path='/admin/ManageBook' element={<ManageBook/>}/>
            <Route path='/admin/ManageDeletedMember' element={<ManageDeletedMember/>}/>
          </Route>

          <Route element={<PrivateComponentStudent/>}>
            <Route path='/student/dashboard' element={<StudentDashboard/>}></Route>
            <Route path='/student/ManageIssueBook' element={<ManageIssueBook/>}></Route>
          </Route>

          <Route element={<PrivateComponentFaculty/>}>
            <Route path='/faculty/dashboard' element={<FacultyDashboard/>}></Route>
          </Route>

          <Route element={<PrivateComponentLibrarian/>}>
            <Route path='/librarian/dashboard' element={<LibrarianDashboard/>}></Route>
          </Route>
          
          <Route path='/login' element={<Login />} />
          
        </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
