import './App.scss';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import Dashboard from './components/Dashboard';
import PasswordChange from './components/PasswordChange'

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path ='/' element={<Login/>}></Route>
          <Route path='/register' element={<Register/>}></Route>
          <Route path='/dashboard' element={<Dashboard/>}></Route>
          <Route path= '/password' element={<PasswordChange/>}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
