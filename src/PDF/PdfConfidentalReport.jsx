import React from 'react';
import { Document, Font, Image, Page, Text, View } from '@react-pdf/renderer';
import PdfTable from './pdfComponents/PdfTable';
import PdfTableMultiOptions from './pdfComponents/PdfTableMultiOptions';
import { Height } from '@mui/icons-material';
import { useSelector } from 'react-redux';
import PdfHeader from './pdfComponents/PdfHeader';

const PdfConfidentalReport = ({ data }) => {
  console.log(data);
  const studentCredentials = [
    { name: 'Adı Soyadı', value: 'asdasd' },
    { name: 'Doğum Yeri / Tarihi', value: 'asdasd' },
    { name: 'TC Kimlik No', value: 'Bölümü' },
    { name: 'Okul Numarası', value: 'asdasd' },
  ];
  const companyInfo = [
    { name: 'Firma Adı', value: data.company_name },
    { name: 'Adresi', value: data.address },
  ];
  const internshipInfo = [
    { name: 'Staja Başlama ve Bitiş Tarihleri', value: data.start_date },
    { name: 'Öğrencinin Devamsızlık Günleri ve Sayısı', value: data.days_of_absence },
    { name: 'Staj Yapilan Departman', value: data.department },
    { name: 'Staj Icerisinde Egitim Programi Uygulandı mı?', value: data.is_edu_program ? 'Evet' : 'Hayır' },
  ];
  const authInfo = [
    { name: 'Adi Soyadi / Görevi', value: data.auth_name },
    { name: 'Diploma Unvani', value: data.auth_position },
    { name: 'Oda Sicil No (varsa)', value: data.reg_number },
    { name: 'Tarih / İmza', value: 'asdasd caddesi' },
  ];

  const internEvuluation = {
    titles: ['Başari Olculeri', 'Iyi', 'Orta', 'Iyi Degil'],
    data: [
      { name: 'Calisma Dikkat ve Sorumluluk', value: data.intern_evaluation.responsibility },
      { name: 'İsi Yapmadaki Basarisi', value: data.intern_evaluation.success },
      { name: 'Ogrenme ve Arastirma Ilgisi', value: data.intern_evaluation.interest },
      { name: 'Ustelerine Karsi Davranisi', value: data.intern_evaluation.behaviour_to_auths },
      { name: 'Calisma Arkadaslarina Davranisi', value: data.intern_evaluation.behaviour_to_coworkers },
      { name: 'Is Guvenligi Kurallarina Uyumu', value: data.intern_evaluation.work_safety },
      { name: 'Meslek Bilgi Duzeyi', value: data.intern_evaluation.competence },
    ],
  };

  return (
    <Document>
      <Page size="A4">
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

            <PdfTable data={authInfo} />
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
};

export default PdfConfidentalReport;
