import './App.css';
import Regform from './Regform';
import Login from './Login';
import { BrowserRouter, Routes ,Route } from 'react-router-dom';
function App() {
  return (
    <>
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<Regform/>}/>
      <Route path='/Login' element={<Login/>}/>
    </Routes>
    </BrowserRouter>
    </>
  );
}

export default App;
