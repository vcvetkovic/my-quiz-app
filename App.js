import React, { useEffect, useState } from 'react';
import Question from './components/QuestionFunctionality';
import './App.css'



const QuizApp = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [questions, setQuestions] = useState([])
  const [selectedAnswer, setSelectedAnswer] = useState(null);


  useEffect(() => {
    const fetchData = async () => {
      const responses = await fetch('https://the-trivia-api.com/api/questions?limit=10&difficulty=medium');
      const responseData = await responses.json();
      const loadedData = [];

      for (const key in responseData) {
        loadedData.push({
          id: key,
          question: responseData[key].question,
          correctAnswer: responseData[key].correctAnswer,
          incorrectAnswers: responseData[key].incorrectAnswers

        })
      }

      setQuestions(loadedData);
    }

    fetchData();

  }, [])

  const handleAnswerSelected = (selectedAnswer) => {
    setSelectedAnswer(selectedAnswer);

    if (selectedAnswer === questions[currentQuestion].correctAnswer) {
      setScore(score + 1);
    }
    if (currentQuestion + 1 < questions.length) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setCurrentQuestion(questions.length);
    }
  }

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setScore(0);
  };

  const returnQuestionHandler = () => {
    if (currentQuestion !== 0) {
      setCurrentQuestion(currentQuestion - 1);
      if (score !== 0) {
        setScore(score - 1)
      }
    }
  }

  return (
      <div className='container'>
        {currentQuestion === questions.length ?
          <div className="score-box">
            <h1>Your score: {score} out of {questions.length}</h1>
            <button className="button-56" onClick={resetQuiz}>Reset Quiz</button>
          </div>
          :
          <>
            <Question
              question={questions[currentQuestion].question}
              answers={questions[currentQuestion].incorrectAnswers}
              correct={questions[currentQuestion].correctAnswer}
              selectedAnswer={selectedAnswer}
              shuffledAnswers={questions[currentQuestion].incorrectAnswers.concat(questions[currentQuestion].correctAnswer).sort(() => Math.random() - 0.5)}
              handleAnswerSelected={handleAnswerSelected}
              returnQuestionHandler={returnQuestionHandler}
            />
            <div className="currentBox">
              <h2>Current question: {currentQuestion}/10</h2>
              <h2>Score: {score}</h2>
            </div>

          </>
        }
      </div>
  );
}

export default QuizApp;