import React, { useEffect, useState } from 'react';
import SingleSelectQuestions from './SingleSelectQuestions';
import MultiSelectQuestions from './MultiSelectQuestions';

const SurveyQuestions = ({
  selectedAnswersSingle,
  setSelectedAnswersSingle,
  selectedAnswersMulti,
  setSelectedAnswersMulti,
}) => {
  return (
    <div className="w-full flex justify-center flex-col items-center">
      <SingleSelectQuestions
        selectedAnswers={selectedAnswersSingle}
        setSelectedAnswers={setSelectedAnswersSingle}
      ></SingleSelectQuestions>
      <h1 className="text-blue-600">Burdan sonraki sorularda birden fazla seçeneği işaretleyebilirsiniz.</h1>
      <MultiSelectQuestions responses={selectedAnswersMulti} setResponses={setSelectedAnswersMulti} />
    </div>
  );
};

export default SurveyQuestions;
