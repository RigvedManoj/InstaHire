import {BrowserRouter, Routes, Route} from 'react-router-dom'
import {Login} from "./View/Pages/Login";
import {Home} from "./View/Pages/home";
import {Navigation} from './View/Pages/navigations';
import {Logout} from './View/Pages/logout';
import {Signup} from './View/Pages/Signup';
import 'bootstrap/dist/css/bootstrap.css';

// App.js
const App = () => {
    return (
        <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/logout" element={<Logout/>}/>
          <Route path="/signup" element={<Signup/>}/>
        </Routes>
      </BrowserRouter>
    );
};

export default App;
