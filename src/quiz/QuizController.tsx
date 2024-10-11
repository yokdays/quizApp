import { useState, useEffect } from 'react';
import { fetchQuizQuestions } from '../api/FetchQuestion';
import { FC } from 'react';

interface QuizQuestion {
  question: string;
  options: string[];
  answer: string;
}

interface Answer {
  question: string;
  selectedAnswer: string;
  correctAnswer: string;
  isCorrect: boolean;
}

interface Props{
  subject: string;
}



const Quiz: FC<Props>  = ({subject}) => {
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<Answer[]>([]);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isQuizFinished, setIsQuizFinished] = useState(false);
  const [score, setScore] = useState(0);

  useEffect(() => {
    const loadQuestions = async () => {
      const fetchedQuestions = await fetchQuizQuestions({subject});
      setQuestions(fetchedQuestions);
    };

    loadQuestions();
  }, [subject]);

  const handleAnswerSelection = (answer: string) => {
    setSelectedAnswer(answer);
  };

  const handleNext = () => {
    if (selectedAnswer === null) {
      alert('Please select an answer before proceeding.');
      return;
    }

    const currentQuestion = questions[currentQuestionIndex];
    const isCorrect = selectedAnswer === currentQuestion.answer;

    // เพิ่มคะแนนถ้าคำตอบถูกต้อง
    if (isCorrect) {
      setScore(prevScore => prevScore + 1);
    }

    setUserAnswers(prevAnswers => [
      ...prevAnswers,
      {
        question: currentQuestion.question,
        selectedAnswer: selectedAnswer,
        correctAnswer: currentQuestion.answer,
        isCorrect: isCorrect,
      },
    ]);

    const nextQuestionIndex = currentQuestionIndex + 1;

    if (nextQuestionIndex < questions.length) {
      setCurrentQuestionIndex(nextQuestionIndex);
      setSelectedAnswer(null); // Reset selection for next question
    } else {
      setIsQuizFinished(true); // ทำข้อสอบเสร็จ
    }
  };

  // เมื่อควิซเสร็จให้บันทึกคะแนนลง LocalStorage
  useEffect(() => {
    if (isQuizFinished) {
      // บันทึกคะแนนลง Local Storage (แทนที่คะแนนเดิม)
      localStorage.setItem(`${subject}Score`, score.toString());
    }
  }, [isQuizFinished, score]); // ทำงานเมื่อ isQuizFinished หรือ score เปลี่ยนแปลง

  if (isQuizFinished) {
    return (
      <div>
        <h2>Quiz Finished!</h2>
        <h3>Your Score: {score}</h3>
        <h3>Your Results:</h3>
        <ul>
          {userAnswers.map((answer, index) => (
            <li key={index} style={{ color: answer.isCorrect ? 'green' : 'red' }}>
              <strong>Q{index + 1}:</strong> {answer.question}
              <br />
              Your answer: {answer.selectedAnswer}
              <br />
              Correct answer: {answer.correctAnswer}
              <br />
              {answer.isCorrect ? 'Correct!' : 'Incorrect'}
            </li>
          ))}
        </ul>
      </div>
    );
  }

  if (questions.length === 0) {
    return <div>Loading questions...</div>;
  }

  const currentQuestion = questions[currentQuestionIndex];

  return (
    <div>
      <h2>Question {currentQuestionIndex + 1}:</h2>
      <h3>{currentQuestion.question}</h3>
      <ul>
        {currentQuestion.options.map((option, index) => (
          <li key={index}>
            <button
              onClick={() => handleAnswerSelection(option)}
              style={{
                backgroundColor: selectedAnswer === option ? 'lightblue' : 'white',
              }}
            >
              {option}
            </button>
          </li>
        ))}
      </ul>
      <button onClick={handleNext}>Next</button>
    </div>
  );
};

export default Quiz;
