import React from 'react';
import { Document, Font, Image, Page, Text, View } from '@react-pdf/renderer';
import Header from './Header';
import Description from './Description';
import PdfCheckbox from '../pdfComponents/PdfCheckbox';
import StudentInfo from './StudentInfo';
import Company from './Company';
import WorkDays from './WorkDays';
import Signs from './Signs';
import turkish from '../pdfComponents/turkish2.ttf';

const PdfInternform = ({ data }) => {
  console.log(data);

  Font.register({ family: 'Turkish', src: turkish });

  return (
    <Document>
      <Page style={{ fontFamily: 'Turkish' }} size="A4"></Page>
      <View style={styles.internformContainer}>
        <Header></Header>
        <Description></Description>
        <View style={styles.internOption}>
          <Text>Yapmak İstediğiniz Uygulamalı Eğitim Seçeneği</Text>
          <View style={styles.options}>
            {['Zorunlu Staj', 'Dönem İçi Staj'].map((item) => (
              <PdfCheckbox text={item} checked={true} />
            ))}
          </View>
        </View>
        <View style={{ width: '80%', fontSize: '12px' }}>
          <Text>Öğrencinin</Text>
        </View>
        <StudentInfo data={data} />
        <View style={{ width: '80%', fontSize: '12px' }}>
          <Text>Uygulamalı Eğitim Yapılan Yerin</Text>
        </View>
        <Company data={data} />
        <View style={{ width: '80%', margin: '10px 0px' }}>
          {' '}
          <WorkDays data={data} />
        </View>

        <View style={{ width: '80%', fontSize: '12px' }}>
          <Text>Kayıtlı Olduğu Fakülte / Yüksekokul</Text>
        </View>
        <View style={{ width: '80%', border: '1px solid grey' }}>
          <Text style={{ fontSize: '10px', padding: '3px' }}>
            {data.edu_faculty} - {data.edu_program}
          </Text>
        </View>
        <View style={{ width: '80%', fontSize: '8px' }}>
          <Text>
            E.K. Lorem ipsum dolor sit amet consectetur adipisicing elit. Asperiores harum facere incidunt earum
            necessitatibus aliquam velit magnam eius, perspiciatis laboriosam alias illo consequatur ducimus minus
            beatae facilis ut nihil ea.
          </Text>
        </View>
        <View style={{ width: '80%', fontSize: '8px' }}>
          <Signs />
        </View>
        <View style={{ width: '80%', fontSize: '8px' }}>
          <Text>
            6764 sayili kanunun 48. Maddesi ile 3308 sayili kanunun ek geçici 12. Maddesi uyarinca Staj ücretlerine
            işsizlik fonu katkisindan faydalanmak isteyen işverenlerin web sayfamizda yer alan formlar içerisinde Staj
            Ücretleri Formunu eksiksiz doldurarak dekont ile Dekanliga/Müdürlüğe teslim etmesi gerekmektedir.
          </Text>
        </View>
      </View>
    </Document>
  );
};
const styles = {
  internformContainer: {
    display: 'flex',
    alignItems: 'center',
    fontFamily: 'Turkish',
  },
  internOption: {
    margin: '5px 0',
    width: '80%',
    fontSize: '10px',
  },
  options: {
    padding: '5px',
    width: '50%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
};
export default PdfInternform;
