import './App.css';
import Navbar from './layouts/navbar'
import { Link,BrowserRouter,Routes,Route } from 'react-router-dom';
import Signup from "./components/signup";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar/>
        <Routes>
        <Route path="/signup" element={<Signup/>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
