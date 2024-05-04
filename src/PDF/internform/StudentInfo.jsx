import { View, Text } from '@react-pdf/renderer';
import React from 'react';
import PdfTable from '../pdfComponents/PdfTable';

const StudentInfo = ({ data }) => {
  const studentInfo = {
    left: [
      { name: 'Adı Soyadı', value: data?.student.name },
      { name: 'Tc Kimlik No', value: data?.student.tc_number },
      { name: 'Baba Adı', value: data?.student_info.fathers_name },
      { name: 'Anne Adı', value: data?.student_info.mothers_name },
      { name: 'Doğum Yeri', value: data?.student_info.birth_place },
      { name: 'Doğum Tarihi', value: data?.student_info.birth_date },
      { name: 'İkametgah Adresi', value: data?.student_info.address },
    ],
    right: [
      { name: 'Öğrenci No', value: data?.student.school_number },
      { name: 'Programı', value: data?.edu_program },
      { name: 'Gün Sayısı', value: data?.total_work_day },
      { name: 'Başlangıç Tarihi', value: data?.start_date },
      { name: 'Bitiş Tarihi', value: data?.end_date },
      { name: 'Eğitim-Öğretim Yılı', value: data?.edu_year.name },
    ],
  };
  return (
    <View style={styles.container}>
      <View>
        <PdfTable data={studentInfo.left}></PdfTable>
      </View>
      <View>
        <PdfTable data={studentInfo.right}></PdfTable>
      </View>
    </View>
  );
};
const styles = {
  container: {
    width: '80%',
    display: 'flex',
    flexDirection: 'row',
  },
};
export default StudentInfo;
