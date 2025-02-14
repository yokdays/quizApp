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

interface Props {
  subject: string;
}

const optionColors = [
  'bg-red-500', // Red for option 1
  'bg-green-500', // Green for option 2
  'bg-blue-500', // Blue for option 3
  'bg-yellow-500', // Yellow for option 4
];

const Quiz: FC<Props> = ({ subject }) => {
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<Answer[]>([]);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isQuizFinished, setIsQuizFinished] = useState(false);
  const [score, setScore] = useState(0);

  useEffect(() => {
    const loadQuestions = async () => {
      const fetchedQuestions = await fetchQuizQuestions({ subject });
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

    if (isCorrect) {
      setScore((prevScore) => prevScore + 1);
    }

    setUserAnswers((prevAnswers) => [
      ...prevAnswers,
      {
        question: currentQuestion.question,
        selectedAnswer,
        correctAnswer: currentQuestion.answer,
        isCorrect,
      },
    ]);

    const nextQuestionIndex = currentQuestionIndex + 1;

    if (nextQuestionIndex < questions.length) {
      setCurrentQuestionIndex(nextQuestionIndex);
      setSelectedAnswer(null); // Reset selection for next question
    } else {
      setIsQuizFinished(true); // Finish the quiz
    }
  };

  useEffect(() => {
    if (isQuizFinished) {
      localStorage.setItem(`${subject}Score`, score.toString());
    }
  }, [isQuizFinished, score]);

  if (isQuizFinished) {
    return (
      <div className="text-center p-4">
        <h2 className="text-2xl font-semibold">Quiz Finished!</h2>
        <h3 className="text-xl mt-2">Your Score: {score}</h3>
        <h3 className="text-lg mt-4">Your Results:</h3>
        <ul className="mt-2">
          {userAnswers.map((answer, index) => (
            <li
              key={index}
              className={`p-2 ${answer.isCorrect ? 'text-green-500' : 'text-red-500'}`}
            >
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
    return <div className="text-center p-4">Loading questions...</div>;
  }

  const currentQuestion = questions[currentQuestionIndex];

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-4">Question {currentQuestionIndex + 1}:</h2>
      <h3 className="text-lg mb-6">{currentQuestion.question}</h3>
      <div className="grid grid-cols-2 gap-6 mb-6">
        {currentQuestion.options.map((option, index) => (
          <button
            key={index}
            onClick={() => handleAnswerSelection(option)}
            className={`w-full p-4 border-2 rounded-lg text-lg font-medium ${optionColors[index % optionColors.length]} 
            ${selectedAnswer === option ? 'text-white' : 'text-gray-800'} shadow-md hover:shadow-lg focus:ring-2 focus:ring-blue-500 transition-all ease-in-out duration-300`}
          >
            {option}
          </button>
        ))}
      </div>
      <div className="mt-6 flex justify-center">
        <button
          onClick={handleNext}
          className="px-6 py-3 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 transition-all duration-300"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Quiz;
