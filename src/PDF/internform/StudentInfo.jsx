import { View, Text } from '@react-pdf/renderer';
import React from 'react';
import PdfTable from '../pdfComponents/PdfTable';

const StudentInfo = ({ data }) => {
  console.log(data);
  const studentInfo = {
    left: [
      { name: 'Adı Soyadı', value: data?.student?.name + ' ' + data?.student?.last_name },
      { name: 'Tc Kimlik No', value: data?.student?.tc_number },
      { name: 'Baba Adı', value: data?.student_info?.fathers_name },
      { name: 'Anne Adı', value: data?.student_info?.mothers_name },
      { name: 'Doğum Yeri', value: data?.student_info?.birth_place },
      { name: 'Doğum Tarihi', value: new Date(data?.student_info?.birth_date).toLocaleDateString('pt-PT') },
    ],
    right: [
      { name: 'Öğrenci No', value: data?.student?.school_number },
      { name: 'Programı', value: data?.edu_program },
      { name: 'Eğitim-Öğretim Yılı', value: data?.edu_year?.name },
      { name: 'Uygulamalı Eğitim Gün/İş Günü', value: data?.total_work_day, bold: true },
      {
        name: 'Uygulamalı Eğitim Başlangıç Tarihi',
        value: new Date(data?.start_date).toLocaleDateString('pt-PT'),
        bold: true,
      },
      {
        name: 'Uygulamalı Eğitim Bitiş Tarihi',
        value: new Date(data?.end_date).toLocaleDateString('pt-PT'),
        bold: true,
      },
    ],
  };

  const address = {
    name: 'İkametgah Adresi ve Telefonu:',
    value: data?.company_info?.address,
  };
  return (
    <View style={styles.container}>
      <View style={styles.inner}>
        <View style={{ width: '50%' }}>
          <PdfTable widthName="40%" widthValue="60%" data={studentInfo.left}></PdfTable>
        </View>
        <View style={{ width: '50%' }}>
          <PdfTable widthName="60%" widthValue="40%" data={studentInfo.right}></PdfTable>
        </View>
      </View>

      <View style={styles.address}>
        <View style={{ width: '20%', border: '1px solid black', padding: 4 }}>
          <Text> {address.name} </Text>
        </View>
        <View style={{ width: '80%', border: '1px solid black', padding: 4 }}>
          <Text> {address.value} </Text>
        </View>
      </View>
    </View>
  );
};
const styles = {
  container: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    marginBottom: '10px',
  },
  inner: {
    width: '80%',
    display: 'flex',
    flexDirection: 'row',
  },
  address: {
    width: '80%',
    fontSize: '9px',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
};
export default StudentInfo;
