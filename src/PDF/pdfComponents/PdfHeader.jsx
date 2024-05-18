import React from 'react';
import logo from '../../../public/images/uniLogo.jpg';
import { Document, Font, Image, Page, Text, View } from '@react-pdf/renderer';
import turkishbold from '../pdfComponents/extrabold.ttf';

Font.register({ family: 'Turkishbold', src: turkishbold });
const PdfHeader = ({ headerText, padding = 0 }) => {
  console.log(headerText);
  return (
    <View style={styles.title}>
      <Image style={styles.image} src={logo}></Image>
      <View
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          width: '80%',
          paddingRight: padding,
        }}
      >
        {headerText?.map((text) => (
          <Text style={styles.textTitle}>{text} </Text>
        ))}
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
    fontFamily: 'Turkishbold',
    marginTop: '20px',
    display: 'flex',
    flexDirection: 'row',
    width: '80%',
    alignItems: 'center',
    marginBottom: 10,
  },
  image: {
    marginRight: '5px', // Add some spacing between the image and text
    width: '15%',
    height: 'auto', // Adjust width as needed
  },
};

export default PdfHeader;
