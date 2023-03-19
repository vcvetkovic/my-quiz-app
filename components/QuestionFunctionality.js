import React, { useState } from 'react';
import './QuestionFunctionality.css'


const Question = ({ question, answers, correct, handleAnswerSelected, shuffledAnswers, returnQuestionHandler,}) => {

  const [showResults, setShowResults] = useState(false);
  const allAnswers = [answers[0], answers[1], answers[2], correct];  
  const correctAnswer = allAnswers.filter(answer => answer === correct); 
  
  const toggleResults = () => { 
    setShowResults(!showResults);
  }
  
  return (
    <>
      <div className="topItems">
        <button className='btn' onClick={() => {
          returnQuestionHandler()
          setShowResults(false)
          }}>
          <i className="fa-sharp fa-solid fa-arrow-left fa-sm"></i>
        </button>
        <i className="fa-solid fa-question btn" onClick={toggleResults}></i>
      </div>
      <div className="question">
        <h1>{question}</h1>
      </div>
      {showResults ?
        shuffledAnswers.map((answer) => {
          if (answer === correct) {
            return <div className='buttons'>              
              <button
                className='button-56 isCorrect'                
                onClick={() => {
                  handleAnswerSelected(answer)
                  toggleResults()
                }}
                >
                {correctAnswer}
              </button>
            </div>
          }
          return (
            <div className='buttons'>
              <button
                className='button-56'
                onClick={() => {
                  handleAnswerSelected(answer)
                  toggleResults()
                }}
                >
                {answer}
              </button>
            </div>
          );
        })
        :
        <div className='buttons'>
          {shuffledAnswers.map((answer) => (
            <button
              className='button-56'
              onClick={() => {
              handleAnswerSelected(answer)

              }}
              
            >
              {answer}
            </button>
        ))}
          </div>
      }
    </>
  );
};

export default Question;