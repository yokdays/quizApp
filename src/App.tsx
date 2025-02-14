import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import QuizTest from './quiz/QuizController';
import Home from './page/Home';
import UserList from './User';
import './App.scss';
import Header from './components/Header';
import QuizCourse from './components/MathQuizCourse';
import MathQuiz from './page/MathQuiz';
import Login from './page/Login';
import Register from './page/Register';
import { FC } from 'react';
import EnglishQuiz from './page/EnglishQuiz';

const App: FC = () => {
  return (
    <Router>
      <ProtectedApp />
    </Router>
  );
};

const ProtectedApp: FC = () => {
  const courses = [
    { path: '/math-quiz', title: 'Math' },
    { path: '/english-quiz', title: 'English' },
    { path: '/science-quiz', title: 'Science' },
    { path: '/other-quiz', title: 'Other' },
  ];

  return (
    <div>
      {/* Navbar */}
          <Header />
      {/* Quiz Categories */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 p-6">
        {courses.map((course) => (
          <Link key={course.title} to={course.path}>
            <QuizCourse title={course.title} />
          </Link>
        ))}
      </div>

      {/* Routes */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/math-test" element={<QuizTest subject="Math" />} />
        <Route path="/math-quiz" element={<MathQuiz />} />
        <Route path="/english-quiz" element={<EnglishQuiz />} />
        <Route path="/english-test" element={<QuizTest subject="English" />} />
        <Route path="/science-quiz" element={<Home />} />
        <Route path="/user" element={<UserList />} />
        <Route path="/test" element={<Home />} />
      </Routes>
    </div>
  );
};

export default App;
