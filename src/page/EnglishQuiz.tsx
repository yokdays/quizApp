import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchQuizQuestions } from '../api/FetchQuestion'; // ดึงฟังก์ชัน fetchQuizQuestions มาใช้


const EnglishQuiz: FC = () => {
  const [score, setScore] = useState<number | null> (null); // ใช้ state เก็บคะแนนล่าสุด
  const [totalQuestions, setTotalQuestions] = useState<number | null>(null); // ใช้ state เก็บจำนวนคำถามทั้งหมด
  const navigate = useNavigate();


  useEffect(() => {
    const subject = 'English'
    const loadQuestions = async () => {
      const questions = await fetchQuizQuestions({subject}); // ดึงคำถาม
      setTotalQuestions(questions.length); // เก็บจำนวนคำถามทั้งหมดใน state
    };
    loadQuestions();

    const savedScore = localStorage.getItem(`${subject}Score`);

    if (savedScore) {
      setScore(Number(savedScore)); // แปลงค่าที่ดึงมาเป็นตัวเลข
    }
  }, [navigate]);
  
  return (
    <div>
      <h2>Welcome to the Quiz App</h2>
      {score !== null ? (
        <h3>Your last score: {score}/{totalQuestions}</h3> // แสดงคะแนนล่าสุดหากมี
      ) : (
        <p>Take the quiz to see your score!</p> // ข้อความเมื่อยังไม่มีการทำควิซ
      )}
      <Link to="/english-test">
        <button>Start Quiz</button>
      </Link>
    </div>
  )
}

export default EnglishQuiz