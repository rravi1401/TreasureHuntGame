import React, { useEffect, useState } from "react";

import Api from "../../Api";
import BounceLoader from "react-spinners/BounceLoader";
import NavBar from "../NavBar/NavBar";
import Question from "../Question/Question";
import axios from "axios";

const QuestionList = () => {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchAllQues = async () => {
      const res = await axios.get(Api.getAllQues, {
        headers: {
          token: `Bearer ${localStorage.token}`,
        },
      });
      if (res) {
        setQuestions(res.data);
      }
    };
    fetchAllQues();
    setLoading(false);
  }, []);
  return (
    <div>
      <NavBar />
      {loading && (
        <div className="spinner-container">
          <BounceLoader color="blue" className="page-spinner" />
        </div>
      )}
      {!loading &&
        questions.map((question, index) => {
          return (
            <>
              <Question
                key={question._id}
                level={index + 1}
                title={question.title}
                question={question.text}
                answers={question.answers}
                hints={question.hints}
              />
            </>
          );
        })}
    </div>
  );
};

export default QuestionList;
