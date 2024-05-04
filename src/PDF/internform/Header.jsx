import { Image, Text, View } from '@react-pdf/renderer';
import React from 'react';
import logo from '../../../public/images/uniLogo.jpg';

const Header = () => {
  return (
    <View style={styles.container}>
      <Image style={styles.img} src={logo}></Image>

      <View style={styles.title}>
        <Text style={styles.text}>Bursa Uludağ Üniversitesi</Text>
        <Text style={styles.text}>Uygulamalı Eğitim Başvuru Formu</Text>
      </View>
      <Text style={styles.text}>FR 1.2.3_01</Text>
    </View>
  );
};

const styles = {
  container: {
    marginTop: '10px',
    display: 'flex',
    flexDirection: 'row',
    width: '80%',
    height: '50px',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '10px',
    border: '1px solid grey',
  },
  img: {
    width: '30px',
    height: '30px',
  },
  text: {
    fontSize: '10px',
  },
  title: {
    display: 'flex',
    alignItems: 'center',
  },
};
export default Header;
