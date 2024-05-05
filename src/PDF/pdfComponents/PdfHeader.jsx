import React from 'react';
import logo from '../../../public/images/uniLogo.jpg';
import { Document, Font, Image, Page, Text, View } from '@react-pdf/renderer';

const PdfHeader = () => {
  return (
    <View style={styles.title}>
      <Image style={styles.image} src={logo}></Image>
      <View
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          width: '80%',
        }}
      >
        <Text style={styles.textTitle}> T.C. </Text>
        <Text style={styles.textTitle}> Uludag Universitesi </Text>
        <Text style={styles.textTitle}>Muhendislik Fakultesi</Text>
      </View>
    </View>
  );
};
const styles = {
  textTitle: {
    fontSize: '12px',
    alignItems: 'center', // Center text vertically within its space
    justifyContent: 'center',
  },
  title: {
    marginTop: '20px',
    display: 'flex',
    flexDirection: 'row',
    width: '80%',
    alignItems: 'center',
    marginBottom: 10,
  },
  image: {
    marginRight: '5px', // Add some spacing between the image and text
    width: '10%',
    height: 'auto', // Adjust width as needed
  },
};

export default PdfHeader;
