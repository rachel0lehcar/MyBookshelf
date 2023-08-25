import './App.css';
import { Route, Routes } from 'react-router-dom';
import AddBook from './components/pages/AddBook';
import Home from './components/pages/Home';
import Login from './components/pages/Login';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/home" element={<Home />} />
      <Route path="/addbook" element={<AddBook />} />
    </Routes>
  );
}

export default App;
