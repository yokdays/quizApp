const quizzes = {
    Math: [
      {
        question: 'If x + 3 = 7, what is the value of x?',
        options: ['4', '5', '6', '7'],
        answer: '4',
      },
      {
        question: 'What is the derivative of 3x^2?',
        options: ['3x', '6x', '9x^2', '6x^2'],
        answer: '6x',
      },
      // คำถามอื่นๆ ในควิซคณิตศาสตร์
    ],
    English: [
      {
        question: 'What is the synonym of "happy"?',
        options: ['Sad', 'Joyful', 'Angry', 'Tired'],
        answer: 'Joyful',
      },
      {
        question: 'Choose the correct verb form: She ____ to the store.',
        options: ['go', 'going', 'gone', 'goes'],
        answer: 'goes',
      },
      // คำถามอื่นๆ ในควิซภาษาอังกฤษ
    ],
  };
  
  const fetchQuizByCategory = (req, res) => {
    const category = req.params.category;  // รับ category จากพารามิเตอร์ URL
    const quizQuestions = quizzes[category];
  
    if (quizQuestions) {
      res.json(quizQuestions);  // ส่งชุดคำถามในหมวดหมู่นั้น
    } else {
      res.status(404).json({ message: 'Quiz not found' });  // กรณีไม่พบควิซ
    }
  };
  
  module.exports = { fetchQuizByCategory };