import React from 'react';
import { Document, Font, Image, Page, Text, View } from '@react-pdf/renderer';
import PdfTable from '../pdfComponents/PdfTable';
import PdfTableMultiOptions from '../pdfComponents/PdfTableMultiOptions';
import PdfHeader from '../pdfComponents/PdfHeader';
import turkishbold from '../pdfComponents/extrabold.ttf';

Font.register({ family: 'Turkishbold', src: turkishbold });

const PdfConfidentalReport = ({ data }) => {
  console.log('dataıvır', data);
  const studentCredentials = [
    { name: 'Adı Soyadı', value: data?.interview?.student?.name + ' ' + data?.interview?.student?.last_name },
    {
      name: 'Doğum Yeri / Tarihi',
      value:
        data?.interview?.internStatus?.form.student_info.birth_place +
        ' - ' +
        new Date(data?.interview?.internStatus?.form.student_info?.birth_date).toLocaleDateString('tr-TR'),
    },
    { name: 'TC Kimlik No', value: data?.interview?.student?.tc_number },
    { name: 'Bölümü', value: 'Bilgisayar Mühendisliği' },
    { name: 'Okul Numarası', value: data?.interview?.student?.school_number },
  ];
  const companyInfo = [
    { name: 'Firma Adı', value: data?.company_name },
    { name: 'Adresi', value: data?.address },
  ];
  const internshipInfo = [
    {
      name: 'Staja Başlama ve Bitiş Tarihleri',
      value:
        new Date(data?.start_date).toLocaleDateString('tr-TR') +
        ' - ' +
        new Date(data?.end_date).toLocaleDateString('tr-TR'),
    },
    { name: 'Öğrencinin Devamsızlık Günleri ve Sayısı', value: data?.days_of_absence },
    { name: 'Staj Yapilan Departman', value: data?.department },
    { name: 'Staj İçerisinde Eğitim Programi Uygulandı mı?', value: data?.is_edu_program ? 'Evet' : 'Hayır' },
  ];
  const authInfo = [
    { name: 'Adı Soyadı / Görevi', value: data?.auth_name + ' - ' + data?.auth_position },
    { name: 'Diploma nvanı', value: data?.auth_position },
    { name: 'Oda Sicil No (varsa)', value: data?.reg_number },
    { name: 'Tarih / İmza', value: '' },
  ];

  const internEvuluation = {
    titles: ['Başari Ölçüleri', 'İyi', 'Orta', 'İyi Değil', 'Açıklama'],
    data: [
      { name: 'Çalışma Dikkat ve Sorumluluk', value: data?.intern_evaluation?.responsibility },
      { name: 'İşi Yapmadaki Başarısı', value: data?.intern_evaluation?.success },
      { name: 'Öğrenme ve Araştırma İlgisi', value: data?.intern_evaluation?.interest },
      { name: 'Üstelerine Karşı Davranışı', value: data?.intern_evaluation?.behaviour_to_auths },
      { name: 'Çalışma Arkadaşlarına Davranışı', value: data?.intern_evaluation?.behaviour_to_coworkers },
      { name: 'İş Güvenliği Kurallarına Uyumu', value: data?.intern_evaluation?.work_safety },
      { name: 'Meslek Bilgi Düzeyi', value: data?.intern_evaluation?.competence },
    ],
  };
  const headerText = ['T.C.', 'ULUDAĞ ÜNİVERSİTESİ', 'MÜHENDİSLİK FAKÜLTESİ'];
  return (
    <Document>
      <Page style={{ fontFamily: 'Turkishbold' }} size="A4">
        <View style={styles.viewContainer}>
          <PdfHeader headerText={headerText} padding={'55px'}></PdfHeader>
          <View style={styles.view}>
            <View style={{ borderBottom: '1px solid black', width: '100%', display: 'flex', alignItems: 'center' }}>
              <Text>Staj Sicil Belgesi</Text>
            </View>

            <Text style={styles.subTitle}> Ögrenci Kimlik Bilgileri:</Text>
            <PdfTable data={studentCredentials} fontSize={11} />
            <Text style={styles.subTitle}> Kurum Bilgileri:</Text>

            <PdfTable secondLine={true} rowIndex={[0, 1]} data={companyInfo} fontSize={10} />
            <Text style={styles.subTitle}> Staj Tarihi Ve Calisma Konulari:</Text>

            <PdfTable data={internshipInfo} fontSize={11} />
            <Text style={styles.subTitle}> Staj Calisma Degerlendirmesi:</Text>

            <PdfTableMultiOptions data={internEvuluation} fontSize={11} />

            <Text style={styles.subTitle}> Degerlendirmeyi Yapan Yetkilinin (Muhendis):</Text>

            <View style={styles.authContainer}>
              <PdfTable
                data={authInfo}
                secondLine={true}
                rowIndex={[0]}
                widthName="35%"
                widthValue="65%"
                fontSize={11}
              />
              <View style={styles.sign}>
                <Text>Onay</Text>
                <Text>Mühür Kaşe</Text>
                <Text>Kurum Yetkilisi</Text>
              </View>
            </View>
          </View>
          <View style={styles.footer}>
            <Text style={{ fontSize: '12px', marginTop: '10px' }}>
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
    marginTop: '10px',
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
