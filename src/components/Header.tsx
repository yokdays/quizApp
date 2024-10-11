import quizLogo from '../assets/quiz-logo.png';

function Header() {
  return (
    <div>
        <div className="quiz-logo">
          <div className="image">
            <img src={String(quizLogo)} alt="" />
          </div>
            <h1>Application</h1>
        </div>
    </div>
  )
}

export default Header