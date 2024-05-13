import React from 'react';
import { Document, Font, Image, Page, Text, View } from '@react-pdf/renderer';
import PdfTable from '../pdfComponents/PdfTable';
import PdfHeader from '../pdfComponents/PdfHeader';
import CollectiveQuestions from '../pdfComponents/CollectiveQuestions';
import turkish from '../pdfComponents/turkish2.ttf';

const PdfSurvey = ({ data }) => {
  let companyInfo = [
    { name: 'Firma Adı', value: data?.company_name },
    { name: 'Adresi', value: data?.address },
  ];
  let studentInfo = [
    { name: 'Ögretim Türü', value: data?.teach_type },
    { name: 'GANO', value: data?.gano },
    { name: 'Staj Grubu', value: data?.intern_group },
    { name: 'Staj Turu', value: data?.intern_type },
    { name: 'Tarih', value: data?.date },
  ];
  Font.register({ family: 'Turkish', src: turkish });

  if (!data) {
    return 'asd';
  }

  return (
    <Document>
      <Page style={{ fontFamily: 'Turkish' }} size="A4">
        <View style={styles.viewContainer}>
          <PdfHeader></PdfHeader>
          <View style={styles.descContainer}>
            <Text style={{ fontSize: '10px' }}>
              (Öğrenci tarafından staj sonunda doldurulacak ve staj defteri ile beraber teslim edilecektir.)
            </Text>
            <View style={styles.description}>
              <Text style={{ textColor: 'black', fontWeight: 600 }}>Sevgili Öğrenciler,</Text>
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
            {data && <PdfTable data={companyInfo} />}
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
