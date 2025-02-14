import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchQuizQuestions } from '../api/FetchQuestion'; // ดึงฟังก์ชัน fetchQuizQuestions มาใช้


const MathQuiz: FC = () => {
  const [mathScore, setMathScore] = useState<number | null> (null); // ใช้ state เก็บคะแนนล่าสุด
  const [totalQuestions, setTotalQuestions] = useState<number | null>(null); // ใช้ state เก็บจำนวนคำถามทั้งหมด
  const navigate = useNavigate();


  useEffect(() => {
    const subject = 'Math'
    const loadQuestions = async () => {
      const questions = await fetchQuizQuestions({subject}); // ดึงคำถาม
      setTotalQuestions(questions.length); // เก็บจำนวนคำถามทั้งหมดใน state
    };
    loadQuestions();

    const savedScore = localStorage.getItem(`${subject}Score`);
    if (savedScore) {
      setMathScore(Number(savedScore)); // แปลงค่าที่ดึงมาเป็นตัวเลข
    }
  }, [navigate]);

  return (
     <div className="flex flex-col items-center justify-center p-4">
      <div className="bg-white shadow-lg rounded-2xl p-6 w-full max-w-md text-center">
        <h2 className="text-2xl font-bold text-gray-800">Welcome to the Quiz App</h2>
        {mathScore !== null ? (
          <h3 className="mt-4 text-lg text-gray-700">Your last score: <span className="font-semibold">{mathScore}/{totalQuestions}</span></h3>
        ) : (
          <p className="mt-4 text-gray-600">Take the quiz to see your score!</p>
        )}
        <Link to="/math-test">
          <button className="mt-6 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg shadow-md transition duration-300">
            Start Quiz
          </button>
        </Link>
      </div>
    </div>
      
  )
}

export default MathQuiz