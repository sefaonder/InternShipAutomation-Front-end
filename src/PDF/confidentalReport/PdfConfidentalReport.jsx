import React from 'react';
import { Document, Font, Image, Page, Text, View } from '@react-pdf/renderer';
import PdfTable from '../pdfComponents/PdfTable';
import PdfTableMultiOptions from '../pdfComponents/PdfTableMultiOptions';
import PdfHeader from '../pdfComponents/PdfHeader';
import turkish from '../pdfComponents/turkish2.ttf';

const PdfConfidentalReport = ({ data }) => {
  console.log(data);
  const studentCredentials = [
    { name: 'Adı Soyadı', value: 'asdasd' },
    { name: 'Doğum Yeri / Tarihi', value: 'asdasd' },
    { name: 'TC Kimlik No', value: 'Bölümü' },
    { name: 'Okul Numarası', value: 'asdasd' },
  ];
  const companyInfo = [
    { name: 'Firma Adı', value: data?.company_name },
    { name: 'Adresi', value: data?.address },
  ];
  const internshipInfo = [
    {
      name: 'Staja Başlama ve Bitiş Tarihleri',
      value: new Date(data?.start_date).toLocaleDateString('pt-PT'),
      value2: new Date(data?.end_date).toLocaleDateString('pt-PT'),
    },
    { name: 'Öğrencinin Devamsızlık Günleri ve Sayısı', value: data?.days_of_absence },
    { name: 'Staj Yapilan Departman', value: data?.department },
    { name: 'Staj Icerisinde Egitim Programi Uygulandı mı?', value: data?.is_edu_program ? 'Evet' : 'Hayır' },
  ];
  const authInfo = [
    { name: 'Adi Soyadi / Görevi', value: data?.auth_name },
    { name: 'Diploma Unvani', value: data?.auth_position },
    { name: 'Oda Sicil No (varsa)', value: data?.reg_number },
    { name: 'Tarih / İmza', value: 'asdasd caddesi' },
  ];

  const internEvuluation = {
    titles: ['Başari Ölçüleri', 'İyi', 'Orta', 'İyi Değil'],
    data: [
      { name: 'Calisma Dikkat ve Sorumluluk', value: data?.intern_evaluation?.responsibility },
      { name: 'İsi Yapmadaki Basarisi', value: data?.intern_evaluation?.success },
      { name: 'Ogrenme ve Arastirma Ilgisi', value: data?.intern_evaluation?.interest },
      { name: 'Ustelerine Karsi Davranisi', value: data?.intern_evaluation?.behaviour_to_auths },
      { name: 'Calisma Arkadaslarina Davranisi', value: data?.intern_evaluation?.behaviour_to_coworkers },
      { name: 'Is Guvenligi Kurallarina Uyumu', value: data?.intern_evaluation?.work_safety },
      { name: 'Meslek Bilgi Duzeyi', value: data?.intern_evaluation?.competence },
    ],
  };

  Font.register({ family: 'Turkish', src: turkish });

  return (
    <Document>
      <Page style={{ fontFamily: 'Turkish' }} size="A4">
        <View style={styles.viewContainer}>
          <PdfHeader></PdfHeader>
          <View style={styles.view}>
            <Text>Staj Sicil Belgesi</Text>
            <Text style={styles.subTitle}> Ögrenci Kimlik Bilgileri:</Text>
            <PdfTable data={studentCredentials} />
            <Text style={styles.subTitle}> Kurum Bilgileri:</Text>

            <PdfTable data={companyInfo} />
            <Text style={styles.subTitle}> Staj Tarihi Ve Calisma Konulari:</Text>

            <PdfTable data={internshipInfo} />
            <Text style={styles.subTitle}> Staj Calisma Degerlendirmesi:</Text>

            <PdfTableMultiOptions data={internEvuluation} />

            <Text style={styles.subTitle}> Degerlendirmeyi Yapan Yetkilinin (Muhendis):</Text>

            <View style={styles.authContainer}>
              <PdfTable data={authInfo} />
              <View style={styles.sign}>
                <Text>Onay</Text>
                <Text>Mühür Kaşe</Text>
                <Text>Kurum Yetkilisi</Text>
              </View>
            </View>
          </View>
          <View style={styles.footer}>
            <Text style={{ fontSize: '12px' }}>
              Not: Ulaşımın daha pratik olması maksadıyla uygun görülürse, Gizli Sicil Fişi kapalı ve mühürlenmiş bir
              zarfa konulmak suretiyle, öğrenci ile gönderilebilir.
            </Text>
          </View>
        </View>
      </Page>
    </Document>
  );
};

const styles = {
  footer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '80%',
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
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
  },
  sign: {
    width: '200px',
    border: '1px solid black',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    fontSize: '10px',
    fontWeight: '200',
  },
  authContainer: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
  },
};

export default PdfConfidentalReport;
