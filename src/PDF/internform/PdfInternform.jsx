import React from 'react';
import { Document, Font, Image, Page, Text, View } from '@react-pdf/renderer';
import Header from './Header';
import Description from './Description';
import PdfCheckbox from '../pdfComponents/PdfCheckbox';
import StudentInfo from './StudentInfo';
import Company from './Company';
import WorkDays from './WorkDays';
import Signs from './Signs';
import turkishbold from '../pdfComponents/extrabold.ttf';
import turkishregular from '../pdfComponents/semibold.ttf';

Font.register({ family: 'Turkish', src: turkishregular });
Font.register({ family: 'Turkishbold', src: turkishbold });
const PdfInternform = ({ data }) => {
  console.log(data);

  return (
    <Document>
      <Page style={{ fontFamily: 'Turkishbold' }} size="A4"></Page>
      <View style={styles.internformContainer}>
        <Header></Header>
        <Description></Description>
        <View style={styles.internOption}>
          <Text style={{ border: '1px solid black', width: '100%', padding: '2px', fontFamily: 'Turkishbold' }}>
            YAPMAK İSTEDİĞİNİZ UYGULAMALI EĞİTİM SEÇENEĞİ
          </Text>
          <View style={styles.options}>
            {['Zorunlu Staj', 'İsteğe Bağlı Staj', 'Dönem İçi Staj', 'iş Yerindeki Meslek Eğitimi'].map(
              (item, index) => (
                <View style={styles.checkboxItem}>
                  {!data.isInTerm ? (
                    <PdfCheckbox text={item} checked={item === 'Zorunlu Staj'} />
                  ) : (
                    <PdfCheckbox text={item} checked={data.isInTerm & (item === 'Dönem İçi Staj')} />
                  )}
                </View>
              ),
            )}
          </View>
        </View>
        <View style={{ width: '80%' }}>
          <Text style={{ fontFamily: 'Turkishbold', marginTop: '5px' }}>ÖĞRENCİNİN</Text>
        </View>
        <StudentInfo data={data} />
        <View style={{ width: '80%' }}>
          <Text style={{ fontFamily: 'Turkishbold' }}>UYGULAMALI EĞİTİM YAPILAN YERİN</Text>
        </View>
        <Company data={data} />
        <View style={{ width: '80%', margin: '10px 0px' }}>
          <Text
            style={{
              border: '1px solid black',
              width: '100%',
              fontSize: '9px',
              padding: '2px',
              fontFamily: 'Turkishbold',
            }}
          >
            BU ALAN İLGİLİ FAKÜLTE / YÜKSEKOKUL / MESLEK YÜKSEKOKULU TARAFINDAN DOLDURULACAKTIR{' '}
          </Text>
          <WorkDays data={data} />
        </View>

        <View style={{ width: '80%', fontSize: '10px', fontFamily: 'Turkishbold' }}>
          <Text>KAYITLI OLDUĞU FAKÜLTE / YÜKSEKOKUL / MESLEK YÜKSEKOKULU</Text>
        </View>
        <View style={{ width: '80%', border: '1px solid grey' }}>
          <Text style={{ fontSize: '10px', padding: '3px' }}>
            {data.edu_faculty} - {data.edu_program}
          </Text>
        </View>
        <View style={{ width: '80%', fontSize: '9px', margin: '5px 0' }}>
          <Text>
            E.K. Sağlık Provizyon ve Aktivasyon Sistemi (SPAS) Müstehaklık Belgesi (E DEVLET üzerinden alınarak
            eklenecektir. SGK işlemlerinin sağlıklı yürütülebilmesi için önemlidir.)
          </Text>
        </View>
        <View style={{ width: '80%', fontSize: '8px' }}>
          <Signs data={data} />
        </View>
        <View style={{ width: '80%', fontSize: '8px', fontFamily: 'Turkishbold' }}>
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
    fontSize: '10px',
  },
  internOption: {
    width: '80%',
    fontSize: '10px',
    marginTop: '5px',
  },
  options: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  checkboxItem: {
    display: 'flex',
    border: '1px solid black',
    width: 'auto',
    padding: '3px 20px',
    alignItems: 'center',
    justifyContent: 'center',
  },
};
export default PdfInternform;
