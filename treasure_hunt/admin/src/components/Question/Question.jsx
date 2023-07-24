import "./Question.css";

const Question = ({ level, title, question, answers, hints }) => {
  return (
    <div className="question-container">
      <div className="column">
        <div className="heading">Level {level}</div>
      </div>
      <div className="column">
        <div className="heading">Title</div>
        <div className="content">{title}</div>
      </div>
      <div className="column">
        <div className="heading">Question</div>
        <div className="content">
          {question.map((parts, index) => (
            <div key={index} className="hint">
              {parts}
            </div>
          ))}
        </div>
      </div>
      <div className="column">
        <div className="heading">Answers</div>
        <div className="content">
          {answers.map((answer, index) => (
            <div key={index} className="hint">
              {answer}
            </div>
          ))}
        </div>
      </div>
      <div className="column">
        <div className="heading">Hints</div>
        <div className="content">
          {hints.map((hint, index) => (
            <div key={index} className="hint">
              {hint}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Question;
