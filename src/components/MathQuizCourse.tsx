import { FC } from "react";
import MathQuiz from '../assets/quiz-logo.png';

interface Props {
    title: string;
}

const QuizCourse: FC<Props> = ({ title }) => {
  return (
    <div>
      <div className="course-name">
        <div className="title">{title}</div>
        <div className="image">
          <img src={MathQuiz} alt={title} />
        </div>
      </div>
    </div>
  );
}

export default QuizCourse;
