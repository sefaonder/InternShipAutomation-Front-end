import React, { useEffect } from 'react';
import { Document, Font, Page, Text, View } from '@react-pdf/renderer';
import { dataSingle, dataMulti, dataInterm } from 'src/pages/Survey/SurveyComponents/SurveyQs';
import PdfCheckbox from './PdfCheckbox';
import turkishbold from '../pdfComponents/extrabold.ttf';

Font.register({ family: 'Turkishbold', src: turkishbold });

const CollectiveQuestions = ({ data }) => {
  const combinedArray = dataSingle?.map((item, index) => {
    const answer = data?.answers ? data.answers[index] : undefined;
    return {
      question: item.question,
      answer: answer,
      options: ['Evet', 'Kısmen', 'Hayır', 'Fikrim Yok'],
    };
  });
  const styles = {
    options: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    container: {
      width: '100%',
      marginTop: '30px',
    },
    text: {
      marginBottom: 10,
      fontFamily: 'Turkishbold',
    },
    box: {
      width: '100%',
      height: 150, // No 'px', since React PDF uses numbers for measurements
      border: '1px solid black',
    },
    intermQ: {
      display: 'flex',
      flexDirection: 'row',
      gap: '40px',
    },
  };
  console.log(dataInterm);
  console.log(data);
  return (
    <View style={{ margin: '20px' }}>
      {combinedArray?.slice(0, 26).map((item, index) => (
        <View>
          <Text>
            {index + 1} - {item.question}
          </Text>
          <View style={styles.options}>
            {item.options.map((option) =>
              option?.toLocaleLowerCase('tr-TR') == item?.answer?.toLocaleLowerCase('tr-TR') ? (
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
          <Text>27 - {dataSingle[26].question}</Text>
        </View>
        <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly' }}>
          {['Mükemmel', 'İyi', 'Orta', 'Kötü'].map((option) =>
            option?.toLocaleLowerCase('tr-TR') == data?.answers[26].toLocaleLowerCase('tr-TR') ? (
              <PdfCheckbox checked={true} text={option} />
            ) : (
              <PdfCheckbox checked={false} text={option} />
            ),
          )}
        </View>
      </View>
      [ ['evet'], ['evet','hayır','hiçbiri'], ['evet','hiçbiri'] ]
      <View>
        <Text style={{ margin: 12 }}>Birden Fazla Seçenekli Sorular</Text>
      </View>
      <View>
        {data?.answers?.slice(27, 31).map((innerArray, outerIndex) => (
          <View key={outerIndex}>
            <Text>
              {outerIndex + 28} - {dataMulti[outerIndex].question}{' '}
            </Text>
            {dataMulti[outerIndex].answers.map((answer, innerIndex) => (
              <View key={innerIndex}>
                <PdfCheckbox checked={innerArray.includes(answer.text)} text={answer.text} />
              </View>
            ))}
            <PdfCheckbox checked={false} text={'Diğer (lütfen belirtiniz)'} />
          </View>
        ))}
      </View>
      <View style={styles.container}>
        <Text style={styles.text}>
          Varsa staj ile ilgili paylaşmak istedikleriniz nelerdir (öneri, şikâyet, bilgilendirme vb.)?
        </Text>
        <View style={styles.box}>
          <Text style={{ width: '430px' }}></Text>
        </View>
      </View>
      {
        <View style={{ fontSize: '12px', marginTop: '50px' }}>
          <View
            style={{
              width: '100%',
              display: 'flex',
              flexDirection: 'column',
              border: '1px solid black',
              alignItems: 'center',
              fontFamily: 'Turkishbold',
            }}
          >
            <Text>BİLGİSAYAR MÜHENDİSLİĞİ BÖLÜMÜ</Text>
            <Text>DÖNEM İÇİ STAJ DEĞERLENDİRME SORULAR</Text>
          </View>
          <View
            style={{
              width: '100%',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              fontFamily: 'Turkishbold',
              margin: '10px 0',
            }}
          >
            <Text>DİKKAT</Text>
            <Text style={{ fontSize: '10px' }}>
              {' '}
              (Bu kısımda yer alan soruları sadece DÖNEM İÇİ STAJ yapan öğrenciler cevaplayacaktır){' '}
            </Text>
          </View>
          {dataInterm?.map((item, index) => {
            const currentAnswer = data?.answers?.slice(31, 40)[index];
            return (
              <View key={index}>
                <Text>
                  {index + 1} - {item.question}
                </Text>
                <View style={styles.intermQ}>
                  {item?.answers?.map((answer, answerIndex) => {
                    // console.log(answer.text, currentAnswer);
                    return (
                      <PdfCheckbox key={answerIndex} checked={answer?.text === currentAnswer} text={answer.text} />
                    );
                  })}
                </View>
              </View>
            );
          })}
        </View>
      }
    </View>
  );
};

export default CollectiveQuestions;
