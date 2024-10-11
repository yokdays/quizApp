interface QuizParams {
  subject: string;
}

export const fetchQuizQuestions = async ({ subject }: QuizParams) => {
  const token = localStorage.getItem('token');
  const response = await fetch(`http://localhost:5000/quiz-questions/${subject}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  const data = await response.json();
  return data;
};
