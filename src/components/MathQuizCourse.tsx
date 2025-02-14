import { FC } from "react";

interface Props {
  title: string;
}

const QuizCourse: FC<Props> = ({ title }) => {
  return (
    <div className="bg-white rounded-lg shadow-lg p-6 flex flex-col items-center space-y-4 transition-transform duration-300 hover:scale-105">
      {/* Title */}
      <div className="text-xl font-semibold text-gray-800">{title}</div>

      {/* Image */}
      
    </div>
  );
};

export default QuizCourse;
