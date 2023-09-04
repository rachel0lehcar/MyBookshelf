import './App.css';
import { Route, Routes } from 'react-router-dom';
import AddBook from './components/pages/AddBook';
import Home from './components/pages/Home';
import Login from './components/pages/Login';
import Profile from './components/pages/Profile';
import NotesRating from './components/pages/NotesRating';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/home" element={<Home />} />
      <Route path="/addbook" element={<AddBook />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/notesrating" element={<NotesRating />} />
    </Routes>
  );
}

export default App;
