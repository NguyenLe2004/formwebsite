import React, { useState } from 'react';

const Temp = () => {
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState('');

  const handleInputChange = (event) => {
    setCurrentQuestion(event.target.value);
  };

  const handleAddQuestion = () => {
    setQuestions([...questions, currentQuestion]);
    setCurrentQuestion('');
  };

  return (
    <div>
      <h1>Form câu hỏi</h1>
      <form>
        <label htmlFor="question">Câu hỏi:</label>
        <input
          type="text"
          id="question"
          value={currentQuestion}
          onChange={handleInputChange}
        />
        <button type="button" onClick={handleAddQuestion}>
          Thêm câu hỏi
        </button>
      </form>
      <h2>Câu hỏi đã thêm:</h2>
      <ul>
        {questions.map((question, index) => (
          <li key={index}>{question}</li>
        ))}
      </ul>
    </div>
  );
};

export default Temp;