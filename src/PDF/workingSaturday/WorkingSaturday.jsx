import React from 'react';
import { Document, Font, Image, Page, Text, View, StyleSheet } from '@react-pdf/renderer';
import { useState, useEffect } from 'react';
import { values } from 'lodash';
import turkish from '../pdfComponents/semibold.ttf';
import turkish2 from '../pdfComponents/extrabold.ttf';

const PdfWorkingSaturday = ({ data }) => {
  console.log(data);
  const studentInformation = {
    name: data?.student?.name + ' ' + data?.student?.last_name,
    date: '..../..../20....',
    no: data?.student?.school_number,
    startDate: new Date(data?.start_date).toLocaleDateString('tr-TR'),
    endDate: new Date(data?.end_date).toLocaleDateString('tr-TR'),
  };
  Font.register({ family: 'Turkish', src: turkish });
  Font.register({ family: 'Turkish2', src: turkish2 });

  return (
    <Document>
      <Page style={styles.page} size={'A4'}>
        <View style={styles.day}>
          <Text>{studentInformation.date}</Text>
        </View>
        <View style={styles.header}>
          <Text>BURSA ULUDAĞ ÜNİVERSİTESİ</Text>
          <Text>BİLGİSAYAR MÜHENDİSLİĞİ BÖLÜMÜ STAJ KOMİSYOUNA,</Text>
        </View>
        <View style={styles.content}>
          <Text style={[styles.subTitle, { marginBottom: 10 }]}>
            {studentInformation.no} numaralı öğrenciniz {studentInformation.name} zorunlu Stajını{' '}
            {studentInformation.startDate} - {studentInformation.endDate} tarihleri arasında firmamız bünyesinde
            yapacaktır. Firmamız <Text style={styles.bold}>Cumartesi</Text> günleri de mesai yaptığından öğrenciniz staj
            süresince cumartesi günleri de firmada staj yapacaktır.
          </Text>
        </View>
        <View style={styles.signature}>
          <Text>Firma Yetkilisi</Text>
          <Text style={styles.signature_extra}>İMZA ve KAŞE</Text>
        </View>
      </Page>
    </Document>
  );
};
const styles = {
  page: {
    fontFamily: 'Turkish',
    display: 'flex',
    alignItems: 'center',
  },
  day: {
    width: '100%',
    textAlign: 'right',
    fontSize: 12,
    right: '30px',
    padding: '50px',
  },
  header: {
    fontFamily: 'Turkish2',
    display: 'flex',
    alignItems: 'center',
    marginBottom: 35,
    fontSize: 14,
  },
  content: {
    marginBottom: 50,
    width: '70%',
  },
  signature: {
    fontFamily: 'Turkish2',
    textAlign: 'right',
    fontSize: 12,
    paddingRight: 80,
    width: '100%',
    right: 0,
  },

  subTitle: {
    fontSize: 11,
    paddingBottom: 5,
    width: '100%',
  },
};
export default PdfWorkingSaturday;
