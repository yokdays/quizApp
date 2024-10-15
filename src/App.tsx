import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import QuizTest from './quiz/QuizController';
import Home from './page/Home'; // สร้างหน้าแรก Home
import UserList from './User';
import './App.scss';
import Header from './components/Header';
import QuizCourse from './components/MathQuizCourse';
import MathQuiz from './page/MathQuiz';
import Login from './page/Login';
import Register from './page/Register';
import { FC } from 'react';
import EnglishQuiz from './page/EnglishQuiz';


import { checkTokenExpiration } from './utils/CheckAuth';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const App: FC = () => {

  return (
    <Router> {/* ให้ Router ครอบคลุมทั้งแอป */}
      <ProtectedApp />
    </Router>
  );
};

const ProtectedApp: FC = () => {
  const navigate = useNavigate();
  const location = window.location.pathname; // ตรวจสอบ path ปัจจุบัน

  useEffect(() => {
    // ไม่ตรวจสอบ token 
    if (location !== '/' && location !== '/login' && location !== '/register') {
      const isTokenValid = checkTokenExpiration();
      if (!isTokenValid) {
        navigate('/login');
      }
    }
  }, [navigate, location]);

  return (
    <div className="container">
      <div className='navbar'>
        <Link to='/'><Header /></Link>
        <Link to='/test'>Home</Link>
        <Link to="/user">User Here</Link>
        <Link to="/login">Login Here</Link>
        <Link to="/register">Register Here</Link>
      </div>
      <div className='quiz-course'>
        <Link to='/math-quiz'><QuizCourse title="Math" /></Link>
        <Link to= '/english-quiz'><QuizCourse title="English" /></Link>
        <QuizCourse title="Science" />
        <QuizCourse title="Other" />
      </div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/math-test" element={<QuizTest subject='Math'/>} />
        <Route path="/math-quiz" element={<MathQuiz />} />
        <Route path="/english-quiz" element={<EnglishQuiz />} />
        <Route path="/english-test" element={<QuizTest subject='English'/>} />
        <Route path="/Science-quiz" element={<Home />} />
        <Route path="/user" element={<UserList />} />
        <Route path='/test' element={<Home />} />
      </Routes>
    </div>
  );
}

export default App;
