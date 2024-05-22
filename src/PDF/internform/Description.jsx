import { Image, Text, View, Font, StyleSheet } from '@react-pdf/renderer';
import React, { useEffect, useState } from 'react';
import turkishbold from '../pdfComponents/extrabold.ttf';
import turkishregular from '../pdfComponents/semibold.ttf';

Font.register({ family: 'Turkishbold', src: turkishbold });
Font.register({ family: 'Turkish', src: turkishregular });

const Description = () => {
  return (
    <View style={[styles.container]}>
      <View style={styles.desc}>
        <Text style={{ fontFamily: 'Turkishbold', fontSize: '10px' }}>İlgili Makama,</Text>
        <View style={{ flexDirection: 'row', justifyContent: 'flex-start', flexWrap: 'wrap' }}>
          <View style={{ display: 'flex', flexDirection: 'row' }}>
            <Text style={{ fontFamily: 'Turkishbold', marginRight: '5px', textIndent: '30px' }}>
              Bilgisayar Mühendisliği Bölümü
            </Text>
            <Text style={{ textIndent: '30px' }}>öğrencilerinin öğrenim süresi sonuna kadar kurum</Text>
          </View>
          <Text>
            ve/veya kuruluşlarda zorunlu ya da isteğe bağlı staj ve işyerinde mesleki eğitim olmak üzere farklı
          </Text>
          <View style={{ display: 'flex', flexDirection: 'row' }}>
            <Text>şekillerde Uygulamalı Eğitim yapmaları beklenmektedir. Aşağıda yer alan ve</Text>
            <Text style={{ fontFamily: 'Turkishbold', textDecoration: 'underline' }}> SGK işlemleri</Text>
          </View>
          <View style={{ display: 'flex', flexDirection: 'row' }}>
            <Text style={{ fontFamily: 'Turkishbold', textDecoration: 'underline' }}>
              Bursa Uludağ Üniversitesi tarafından yapılacak
            </Text>
            <Text style={{ marginLeft: '2px' }}>olan öğrencinin Uygulamalı Eğitimini </Text>
          </View>
          <Text>
            kurumunuzda/kuruluşunuzda yapmasında göstereceğiniz ilgiye teşekkür eder, çalışmalarınızda başarılar dileriz
          </Text>
        </View>
      </View>
      <View style={styles.img}>
        <Text style={styles.textBox}> FOTOGRAF </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  highlight: {
    color: 'red',
    borderBottom: '1 solid red',
  },
  container: {
    marginTop: '10px',
    display: 'flex',
    flexDirection: 'row',
    width: '80%',
    justifyContent: 'space-between',
    alignItems: 'center',
    fontFamily: 'Turkish',
  },
  img: {
    width: '20%',
    height: '100px',
    border: '1px solid black',
    fontSize: '10px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: '9px',
  },

  desc: {
    display: 'flex',
    width: '80%',
  },
  textBox: {
    fontSize: '12px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
export default Description;
