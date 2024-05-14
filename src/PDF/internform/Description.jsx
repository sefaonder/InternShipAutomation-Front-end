import { Image, Text, View } from '@react-pdf/renderer';
import React from 'react';

const Description = () => {
  return (
    <View style={styles.container}>
      <View style={styles.desc}>
        <Text style={styles.text}>İlgili Makama,</Text>
        <Text style={styles.text}>
          Bilgisayar Mühendisliği Bölümü öğrencilerinin öğrenim süresi sonuna kadar kurum ve/veya kuruluşlarda zorunlu
          ya da isteğe bağlı staj ve işyerinde mesleki eğitim olmak üzere farklı şekillerde Uygulamalı Eğitim yapmaları
          beklenmektedir. Aşağıda yer alan ve SGK işlemleri Bursa Uludağ Üniversitesi tarafından yapılacak olan
          öğrencinin Uygulamalı Eğitimini kurumunuzda/kuruluşunuzda yapmasında göstereceğiniz ilgiye teşekkür eder,
          çalışmalarınızda başarılar dileriz.
        </Text>
      </View>
      <View style={styles.img}>
        <Text style={styles.textBox}> FOTOGRAF </Text>
      </View>
    </View>
  );
};

const styles = {
  container: {
    marginTop: '10px',
    display: 'flex',
    flexDirection: 'row',
    width: '80%',
    justifyContent: 'space-between',
    alignItems: 'center',
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
};
export default Description;
