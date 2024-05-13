import { Text, View } from '@react-pdf/renderer';
import React from 'react';

const Signs = () => {
  return (
    <View style={styles.container2}>
      <View style={styles.box}>
        <View>
          {' '}
          <Text>Ogrenci Imzasi</Text>{' '}
        </View>
        <View style={styles.text}>
          <Text> Adi Soyadi</Text>
          <Text>:.............</Text>
        </View>
        <View style={styles.text}>
          <Text>Tarih</Text>
          <Text>:.............</Text>
        </View>
      </View>
      <View style={styles.box}>
        <View>
          {' '}
          <Text style={{ fontWeight: 'bold' }}>Fakulte Komisyon Onayi</Text>{' '}
        </View>
        <View style={styles.text}>
          <Text> Onaylayan</Text>
          <Text>:.............</Text>
        </View>
        <View style={styles.text}>
          <Text>Tarih</Text>
          <Text>:.............</Text>
        </View>
      </View>
      <View style={styles.box}>
        <View>
          {' '}
          <Text style={{ fontWeight: 'bold' }}> Fakulte / Yuksekokul / MYO </Text>{' '}
        </View>
        <View style={styles.text}>
          <Text> Onaylayan</Text>
          <Text>:.............</Text>
        </View>

        <View style={styles.text}>
          <Text>Tarih</Text>
          <Text>:.............</Text>
        </View>
      </View>
    </View>
  );
};

const styles = {
  text: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  container2: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    height: '50px',
    margin: '10px 0px',
  },
  box: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    border: '1px solid black',
    padding: '5px 15px',
    justifyContent: 'space-evenly',

    flex: 1,
  },
};
export default Signs;
