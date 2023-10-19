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
import AddToCols from './components/pages/AddToCols';
import MyBooks from './components/pages/MyBooks';
import MyCollections from './components/pages/MyCollections';
import SingleBook from './components/pages/SingleBook';
import { useState, useLayoutEffect } from 'react';

function App() {

  const [color,setColor] = useState('#FFAAD4');

  useLayoutEffect(() => {
    const backgroundColor = localStorage.getItem('background-color');
    if(backgroundColor!=null) {
      setColor(backgroundColor);
    }
    document.documentElement.style.setProperty('--base1',color);
  },[color]);

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
      <Route path="/addtocollections/:objectid" element={<AddToCols/>} />
      <Route path="/mybooks/:collectionName?" element={<MyBooks />} />
      <Route path="/mycollections" element={<MyCollections />} />
      <Route path="/singlebook/:bookid" element={<SingleBook />} />
    </Routes>
  );
}

export default App;
