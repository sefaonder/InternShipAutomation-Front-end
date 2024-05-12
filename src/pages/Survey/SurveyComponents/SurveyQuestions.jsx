import React, { useEffect, useState } from 'react';
import SingleSelectQuestions from './SingleSelectQuestions';
import MultiSelectQuestions from './MultiSelectQuestions';
import IntermQuestions from './IntermQuestions';

const SurveyQuestions = ({
  selectedAnswersSingle,
  setSelectedAnswersSingle,
  selectedAnswersMulti,
  setSelectedAnswersMulti,
  selectedAnswersInterm,
  setSelectedAnswersInterm,
  isInTerm,
}) => {
  return (
    <div className="w-full flex justify-center flex-col items-center">
      <SingleSelectQuestions
        selectedAnswers={selectedAnswersSingle}
        setSelectedAnswers={setSelectedAnswersSingle}
      ></SingleSelectQuestions>
      <h1 className="text-blue-600">Burdan sonraki sorularda birden fazla seçeneği işaretleyebilirsiniz.</h1>
      <MultiSelectQuestions responses={selectedAnswersMulti} setResponses={setSelectedAnswersMulti} />
      {isInTerm && (
        <>
          <h1 className="text-blue-600">Dönem İçi Staj Yapan Öğrenciler İçin.</h1>
          <IntermQuestions selectedAnswers={selectedAnswersInterm} setSelectedAnswers={setSelectedAnswersInterm} />{' '}
        </>
      )}
    </div>
  );
};

export default SurveyQuestions;
