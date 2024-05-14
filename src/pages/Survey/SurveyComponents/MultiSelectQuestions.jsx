import React, { useState } from 'react';
import { Container, Typography, Box, Checkbox, FormControlLabel, Button } from '@mui/material';
import { dataMulti as data } from './SurveyQs';

const MultiSelectQuestions = ({ responses, setResponses }) => {
  const handleResponseChange = (questionId, answer) => {
    setResponses((prevResponses) => {
      const updatedResponses = [...prevResponses]; // responses dizisini kopyalayın
      const questionResponses = updatedResponses[questionId] || [];

      if (questionResponses.includes(answer)) {
        updatedResponses[questionId] = questionResponses.filter((selectedAnswer) => selectedAnswer !== answer);
      } else {
        updatedResponses[questionId] = [...questionResponses, answer];
      }
      return updatedResponses;
    });
  };

  return (
    <Container className="w-full">
      {data.map((question) => (
        <Box className="sm:py-4" key={question.id}>
          <h2 className="font-bold">
            {question.id}: {question.question}
          </h2>
          <div className="flex justify-between flex-col lg:flex-row ">
            {question.answers.map((answer) => (
              <div
                className={
                  responses[question.id]?.includes(answer.text)
                    ? 'bg-emerald-500 text-left text-white cursor-pointer py-0.5 px-4 rounded-md m-1'
                    : 'text-left py-0.5 px-4 rounded-md hover:bg-emerald-100 hover:cursor-pointer transition ease-in-out delay-150 m-1'
                }
                onClick={() => handleResponseChange(question.id, answer.text)}
              >
                -{answer.text}
              </div>
            ))}
          </div>
        </Box>
      ))}
    </Container>
  );
};

export default MultiSelectQuestions;
