import React, { useEffect } from 'react';
import { Document, Font, Page, Text, View } from '@react-pdf/renderer';
import { dataSingle, dataMulti, dataInterm } from 'src/pages/Survey/SurveyComponents/SurveyQs';
import PdfCheckbox from './PdfCheckbox';

const CollectiveQuestions = ({ data }) => {
  console.log(data.answers.slice(31, 40)); // cevaplar ['Evet', 'Kısmen', 'Hayır', 'Hayır', 'Hayır', 'Hayır', 'Hayır', 'Kısmen', 'Bir Fark Yok']
  console.log(dataInterm);
  const combinedArray = dataSingle.map((item, index) => {
    return {
      question: item.question,
      answer: data.answers[index],
      options: ['Evet', 'Kısmen', 'Hayır', 'Fikrim Yok'],
    };
  });
  const styles = {
    options: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
  };

  return (
    <View style={{ margin: '20px' }}>
      {combinedArray.slice(0, 26).map((item, index) => (
        <View>
          <Text>
            {' '}
            {index + 1} - {item.question}{' '}
          </Text>{' '}
          <View style={styles.options}>
            {item.options.map((option) =>
              option?.toLocaleLowerCase('tr-TR') == item.answer.toLocaleLowerCase('tr-TR') ? (
                <PdfCheckbox checked={true} text={option} />
              ) : (
                <PdfCheckbox checked={false} text={option} />
              ),
            )}
          </View>
        </View>
      ))}
      <View>
        <View>
          {' '}
          <Text>27 - {dataSingle[26].question}</Text>{' '}
        </View>
        <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly' }}>
          {' '}
          {['Mükemmel', 'İyi', 'Orta', 'Kötü'].map((option) =>
            option.toLocaleLowerCase('tr-TR') == data.answers[26].toLocaleLowerCase('tr-TR') ? (
              <PdfCheckbox checked={true} text={option} />
            ) : (
              <PdfCheckbox checked={false} text={option} />
            ),
          )}{' '}
        </View>
      </View>
      <View>
        <Text style={{ margin: 12 }}>Birden Fazla Seçenekli Sorular</Text>
      </View>
      <View>
        {data.answers.slice(27, 31).map((innerArray, index) => (
          <View key={index}>
            <Text>
              {index + 28} {dataMulti[index].question}{' '}
            </Text>
            {innerArray.map((value, valueIndex) => (
              <View key={valueIndex}>
                {dataMulti[index].answers.map((obje) => obje.text).includes(value) ? (
                  <PdfCheckbox checked={true} text={value} />
                ) : (
                  <PdfCheckbox checked={false} text={value} />
                )}
              </View>
            ))}
          </View>
        ))}
      </View>

      <View style={{ fontSize: '12px', margin: 2 }}>
        <Text style={{ margin: 12 }}>Dönem İçi Staj Yapanlar İçin:</Text>
        {dataInterm.map((item, index) => (
          <View>
            <Text>
              {' '}
              {index + 1} - {item.question}{' '}
            </Text>{' '}
            <View style={styles.options}>
              {item.answers.map((answer) =>
                answer.text.toLocaleLowerCase('tr-TR') ==
                data.answers.slice(31, 40)[index].toLocaleLowerCase('tr-TR') ? (
                  <PdfCheckbox checked={true} text={answer.text} />
                ) : (
                  <PdfCheckbox checked={false} text={answer.text} />
                ),
              )}
            </View>
          </View>
        ))}
      </View>
    </View>
  );
};

export default CollectiveQuestions;
