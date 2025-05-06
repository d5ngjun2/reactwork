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
import MyPage from './pages/MyPage';
import EnrollBoard from './pages/EnrollBoard';
import BoardDetail from './pages/BoardDetail';
import NotFound from './pages/NotFound';
import BoardEdit from './pages/BoardEdit';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

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
          <Route path="/mypage" element={<MyPage />} />
          <Route path="/EnrollBoard" element={<EnrollBoard />} />
          <Route path="/BoardDetail/:boardId" element={<BoardDetail />} />
          <Route path="/boardedit/:boardId" element={<BoardEdit />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <ToastContainer position="top-right" autoClose={3000} />
      </BrowserRouter>
    </>
  );
}

export default App;
