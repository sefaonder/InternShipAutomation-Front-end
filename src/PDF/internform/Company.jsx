import { Text, View } from '@react-pdf/renderer';
import React from 'react';
import PdfTable from '../pdfComponents/PdfTable';

const Company = ({ data }) => {
  console.log(data);
  const company = [
    { name: 'Adı', value: data?.company_info.name },
    { name: 'Adresi', value: data?.company_info.address },
    { name: 'Telefon No', value: data?.company_info.phone },
    { name: 'Faks No', value: data?.company_info.fax },
    { name: 'E-Posta Adresi', value: data?.company_info.email },
    { name: 'Hizmet Alanı', value: data?.company_info.service_area },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.inner}>
        <PdfTable data={company} />
        <View style={styles.auth}>
          <View style={styles.text}>
            <Text>Adı</Text>
            <Text>.................</Text>
          </View>
          <View style={styles.text}>
            <Text>Görevi ve Ünvanı</Text>
            <Text>.................</Text>
          </View>
          <View style={styles.text}>
            <Text>Tarih</Text>
            <Text>.................</Text>
          </View>
          <View style={styles.text}>
            <Text>İmza / Kaşe</Text>
            <Text>.................</Text>
          </View>
        </View>
      </View>
    </View>
  );
};
const styles = {
  container: {
    width: '80%',
    display: 'flex',
    alignItems: 'center',
  },
  inner: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
  },
  auth: {
    border: '1px solid grey',
    padding: '0 10px',
    width: '60%',
    display: 'flex',
    justifyContent: 'space-evenly',
    height: '133px',
  },
  text: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    fontSize: '10px',
  },
};
export default Company;
