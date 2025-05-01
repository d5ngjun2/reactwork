import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import Header from './pages/Header';
import Board from './pages/Board';
import Login from './pages/Login';
import UserRegistration from './pages/UserRegistration';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Video from './pages/Video';

function App() {
  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/board" element={<Board />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<UserRegistration />} />
          <Route path="/video" element={<Video />} />
          {/* 
          <Route path="/signup" element={<SignUp />} />
          <Route path="*" element={<NotFound />} /> */}
        </Routes>
        <ToastContainer position="top-right" autoClose={1500} />
      </BrowserRouter>
    </>
  );
}

export default App;
