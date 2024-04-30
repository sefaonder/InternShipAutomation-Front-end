import React from 'react';
import { Document, Font, Image, Page, Text, View } from '@react-pdf/renderer';
import PdfTable from './pdfComponents/PdfTable';
import PdfTableMultiOptions from './pdfComponents/PdfTableMultiOptions';
import { Height } from '@mui/icons-material';
import { useSelector } from 'react-redux';
import PdfHeader from './pdfComponents/PdfHeader';
import CollectiveQuestions from './pdfComponents/CollectiveQuestions';
import turkish from './pdfComponents/turkish2.ttf';
import PdfCheckbox from './pdfComponents/PdfCheckbox';
import { width } from '@mui/system';

const PdfSurvey = ({ data }) => {
  console.log(data);
  const companyInfo = [
    { name: 'Firma Adı', value: 'asd' },
    { name: 'Adresi', value: 'asdasd' },
  ];
  const studentInfo = [
    { name: 'Ögretim Türü', value: 'asdasdas' },
    { name: 'GANO', value: 'asdasd' },
    { name: 'Staj Grubu', value: 'asdasd' },
    { name: 'Staj Turu', value: 'asdasd' },
    { name: 'Tarih', value: '23-12-2022' },
  ];
  Font.register({
    family: 'TurkishFont',
    src: turkish,
  });

  return (
    <Document>
      <Page style={{ fontFamily: 'TurkishFont' }} size="A4">
        <View style={styles.viewContainer}>
          <PdfHeader></PdfHeader>
          <View style={styles.descContainer}>
            <Text style={{ fontSize: '10px' }}>
              (Öğrenci tarafından staj sonunda doldurulacak ve staj defteri ile beraber teslim edilecektir.)
            </Text>
            <View style={styles.description}>
              <Text>Sevgili Öğrenciler,</Text>
              <Text>
                Bu anketin amacı eğitimin niteliğini sürekli ve sistemli bir biçimde geliştirmek için görüşlerinizden
                yararlanmaktır. Yaptığınız stajı aşağıdaki ölçütlere göre değerlendirmeniz istenmektedir.
                Değerlendirmenizin kendi kişisel gözlem ve algılarınıza dayanıyor olması bu verilerin geçerliliği ve
                güvenilirliği açısından çok önemlidir. Buradaki sorulara verdiğiniz cevaplar stajınızın
                değerlendirilmesi esnasında dikkate alınmayacaktır. Bu nedenle değerlendirmeniz esnasında lütfen
                duygusal olmayınız ve arkadaşlarınızla aranızda fikir alışverişinde bulunmayınız.
              </Text>
              <Text>Katkılarınız için şimdiden teşekkür ederiz.</Text>
            </View>
          </View>
          <View style={styles.view}>
            <Text style={{ marginBottom: 5 }}>Staj Degerlendirme Anket Formu</Text>
            <Text style={styles.subTitle}> Ögrenci Kimlik Bilgileri:</Text>
            <PdfTable data={companyInfo} />
            <Text style={styles.subTitle}> Staj Yapan Ögrencinin:</Text>
            <PdfTable data={studentInfo} />
            <Text style={{ marginTop: 8 }}> Anket Soruları: </Text>
            <CollectiveQuestions data={data} />
          </View>
        </View>
      </Page>
    </Document>
  );
};
const styles = {
  descContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  description: {
    marginBottom: 5,
    fontSize: 10, // Yazı boyutunu burada belirtin, ayrıca display: 'flex', alignItems: 'center', justifyContent: 'center', ve backgroundColor: 'red' özelliklerini kaldırdım, çünkü metin alanı için gerekli değiller
    width: '80%',
    display: 'flex',
  },
  viewContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%', // Sayfanın tamamını kapla
  },
  subTitle: {
    fontSize: 12,
    fontWeight: 'bold',
    paddingBottom: 1,
    width: '100%',
  },
  view: {
    width: '80%',
    display: 'flex',
    fontSize: 12,
    padding: 3,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
  },
};
export default PdfSurvey;
