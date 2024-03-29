import './App.css';
import './sidebars.css';
import { Link, BrowserRouter, Routes, Route } from 'react-router-dom';

//import navbar
import Navbar from './layouts/navbar';

//import sign up
import RegisterLibrarianStudent from './components/admin/register_librarian_student';

//import ForgetPassword Email Check
import ForgetPassword_EmailCheck from './components/ForgetPassword_EmailCheck'

//Verify OTP
import VerifyOTP from './components/OTP_verify'

//change password after otp verification
import ChangePasswordAfterOTP from './components/changePassword_afterOTP'

//import login
import Login from './components/login';

//Import home page
import HomePage from './components/HomePage';

//Import footer
import Footer from './components/Footer';

//Import profile
import Profile from './components/Profile';

//----------Admin module-------------

//import admin dashboard
import Dashboard from './components/admin/Dashboard';

//Import  Category
import AddCategory from './components/admin/AddCategory';

import AddBook from './components/admin/AddBook';


//Import SubCategory
import AddSubCategory from './components/admin/AddSubCategory';

//Import AddSetting
import AddSettings from './components/admin/AddSettings';

//Import ManageCategory
import ManageCategory from './components/admin/ManageCategory';

//Import ManageSubCategory
import ManageSubCategory from './components/admin/ManageSubCategory';

//Import ManageDeletedCategory
import ManageDeletedCategory from './components/admin/ManageDeletedCategory';

//Import Manage Deleted Subcategory
import ManageDeletedSubCategory from './components/admin/ManageDeletedSubCategory';

import ManageDeletedBook from './components/admin/ManageDeletedBooks';

//Import ManageMember
import ManageMember from './components/admin/ManageMember';

//Import ManageDeletedMember
import ManageDeletedMember from './components/admin/ManageDeletedMember';

//Import ManageBook
import ManageBook from './components/admin/ManageBook';

//Import ManageSettings
import ManageSettings from './components/admin/ManageSettings';

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

//Import manage issue book
import ManageFacultyIssueBook from './components/faculty/ManageIssueBook';

//Import private component for faculty
import PrivateComponentFaculty from './components/PrivateComponentFaculty';

//---------Librarian-------------

//Import librarian dashboard
import LibrarianDashboard from './components/librarian/dashboard';
import LibrarianManageIssueBook from './components/librarian/ManageIssueBook';

//Import private component for librarian
import PrivateComponentLibrarian from './components/PrivateComponentLibrarian';

import FinePage from './components/Fine';

import Success from './components/SuccessPage_Paypal';
import Cancel from './components/CancelPage_Paypal';


function App() {
  
  return (
    
    <div className='App' >
      <BrowserRouter>
      <Navbar />
      <div style={{display:'flex'}}>
      
        <Routes>

          {/* <Route exact path="/" element/> */}

          {/* Default page is home page */}
          <Route path='/' element={<HomePage/>}></Route>

          <Route path='/home' element={<HomePage/>}></Route>

          <Route element={<PrivateComponentAdmin/>}>
            <Route path='/admin/dashboard' element={<Dashboard/>}></Route>
            <Route path='/admin/profile' element={<Profile/>}></Route>
            <Route path='/admin/registerlibrarianstudent' element={<RegisterLibrarianStudent />} />
            <Route path='/admin/registerlibrarianstudent/:id' element={<RegisterLibrarianStudent/>}/>
            <Route path='/admin/ManageMember' element={<ManageMember/>}/>
            <Route path='/admin/ManageDeletedMember' element={<ManageDeletedMember/>}/>
            
            <Route path='/admin/AddCategory' element={<AddCategory />} />
            <Route path='/admin/AddCategory/:id' element={<AddCategory />} />
            <Route path='/admin/ManageCategory' element={<ManageCategory />} />
            <Route path='/admin/ManageDeletedCategory'element={<ManageDeletedCategory/>}/>
            
            <Route path='/admin/AddSubCategory' element={<AddSubCategory/>}></Route>
            <Route path='/admin/AddSubCategory/:id' element={<AddSubCategory/>}></Route>
            <Route path='/admin/ManageSubCategory' element={<ManageSubCategory />} />
            <Route path='/admin/ManageDeletedSubCategory' element={<ManageDeletedSubCategory/>}/>
            
            <Route path='/admin/AddBook' element={<AddBook />} />
            <Route path='/admin/AddBook/:id' element={<AddBook/>}></Route>
            <Route path='/admin/ManageBook' element={<ManageBook/>}/>
            <Route path='/admin/ManageDeletedBook' element={<ManageDeletedBook/>}/>
            
            <Route path='/admin/AddSetting' element={<AddSettings/>}></Route>
            <Route path='/admin/AddSetting/:id' element={<AddSettings/>}></Route>
            <Route path='/admin/ManageSettings' element={<ManageSettings/>}></Route>
           
          </Route>

          <Route element={<PrivateComponentStudent/>}>
            <Route path='/student/profile' element={<Profile/>}></Route>
            <Route path='/student/dashboard' element={<StudentDashboard/>}></Route>
            <Route path='/student/ManageIssueBook' element={<ManageIssueBook/>}></Route>
          </Route>

          <Route element={<PrivateComponentFaculty/>}>
            <Route path='/faculty/profile' element={<Profile/>}></Route>
            <Route path='/faculty/dashboard' element={<FacultyDashboard/>}></Route>
            <Route path='/faculty/ManageIssueBook' element={<ManageFacultyIssueBook/>}></Route>
          </Route>

          <Route element={<PrivateComponentLibrarian/>}>
            <Route path='/librarian/dashboard' element={<LibrarianDashboard/>}></Route>
            <Route path='/librarian/ManageIssueBook' element={<LibrarianManageIssueBook/>}></Route>
          </Route>
          
          <Route path='/login' element={<Login />} />
          <Route path='/ForgetPassword_email' element={<ForgetPassword_EmailCheck />} />
          <Route path='/VerifyOTP' element={< VerifyOTP />} />
          <Route path='/ChangePasswordAfterOTP' element={< ChangePasswordAfterOTP />} />
          <Route path='/Finepage' element={<FinePage/>}/>
          <Route path='/Success' element={<Success/>}/>
          <Route path='/Cancel' element={<Cancel/>}/>
          
        </Routes>
        </div>
        <Footer/>
      </BrowserRouter>
    </div>
  );
}

export default App;
