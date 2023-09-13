import './App.css';
import { Route, Routes } from 'react-router-dom';
import AddBook from './components/pages/AddBook';
import Home from './components/pages/Home';
import Login from './components/pages/Login';
import Profile from './components/pages/Profile';
import NotesRating from './components/pages/NotesRating';
import ReviewNB from './components/pages/ReviewNB';
import Signup from './components/pages/Signup';
import GoogleBook from './components/pages/GoogleBook';


function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/home" element={<Home />} />
      <Route path="/addbook/:booksearch?" element={<AddBook />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/notesrating" element={<NotesRating />} />
      <Route path="/reviewnb" element={<ReviewNB />} />
      <Route path="/googlebook/:bookid" element={<GoogleBook />} />
    </Routes>
  );
}

export default App;
