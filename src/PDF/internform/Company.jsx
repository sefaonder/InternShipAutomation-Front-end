import { Text, View, Font } from '@react-pdf/renderer';
import React from 'react';
import PdfTable from '../pdfComponents/PdfTable';
import turkishbold from '../pdfComponents/extrabold.ttf';

const Company = ({ data }) => {
  const company = [
    { name: 'Adı', value: 'murat murat murat murat muat murat murat murat mur' },
    { name: 'Adresi', value: data?.company_info?.address },
    { name: 'Telefon No', value: data?.company_info?.phone },
    { name: 'Faks No', value: data?.company_info?.fax },
    { name: 'E-Posta Adresi', value: data?.company_info?.email },
    { name: 'Hizmet Alanı', value: data?.company_info?.service_area },
  ];
  Font.register({ family: 'Turkishbold', src: turkishbold });

  return (
    <View style={styles.container}>
      <View style={styles.inner}>
        <PdfTable widthName="35%" secondLine={true} width="100%" widthValue="65%" data={company} />
        <View style={styles.auth}>
          <View style={styles.text}>
            <Text style={{ fontWeight: 'bold', fontSize: '10px', fontFamily: 'Turkishbold' }}>
              İŞVEREN VEYA İŞVEREN YETKİLİNİN:
            </Text>
          </View>
          <View style={styles.text}>
            <Text>Adı:</Text>
            <Text>...........................</Text>
          </View>
          <View style={styles.text}>
            <Text>Görevi ve Ünvanı:</Text>
            <Text>...........................</Text>
          </View>
          <View style={styles.text}>
            <Text>Tarih:</Text>
            <Text>...........................</Text>
          </View>
          <View style={styles.text}>
            <Text>İmza / Kaşe:</Text>
            <Text>...........................</Text>
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
    justifyContent: 'center',
  },
  text: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    fontSize: '10px',
  },
};
export default Company;
