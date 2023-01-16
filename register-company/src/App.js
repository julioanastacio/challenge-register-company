import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';

import Home from './pages/Home/Home';
import RegisterCompany from './pages/RegisterCompany/RegisterCompany';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Home />}></Route>
        <Route path='/register-company' element={<RegisterCompany />}></Route>
      </Routes>
    </Router>
  );
}

export default App;
