import React from 'react';
import { Document, Font, Image, Page, Text, View, StyleSheet } from '@react-pdf/renderer';
import { useState, useEffect } from 'react';
import { values } from 'lodash';
import turkish from '../pdfComponents/turkish2.ttf';

const PdfWorkingSaturday = () => {
  const studentInformation = [
    { name: 'Adı Soyadı', value: 'Ahmet Serhat ilgin' },
    { name: 'Günün tarhi', value: '03/05/2024' },
    { name: 'Okul Numarası', value: '032090042' },
    { name: 'Başlangıç tarihi', value: '02/04/2023' },
    { name: 'Bitiş tarihi', value: '02/05/2024' },
  ];
  Font.register({ family: 'Turkish', src: turkish });

  return (
    <Document>
      <Page style={styles.page} size={'A4'}>
        <View style={styles.day}>
          <Text>{studentInformation.find((item) => item.name === 'Günün tarhi').value}</Text>
        </View>
        <View style={styles.header}>
          <Text>BURSA ULUDAĞ ÜNİVERSİTESİ</Text>
          <Text>BİLGİSAYAR MÜHENDİSLİĞİ BÖLÜMÜ STAJ KOMİSYOUNA,</Text>
        </View>
        <View style={styles.content}>
          <Text style={[styles.subTitle, { marginBottom: 10 }]}>
            {studentInformation.find((item) => item.name === 'Okul Numarası').value} numaralı öğrenciniz{' '}
            {studentInformation.find((item) => item.name === 'Adı Soyadı').value} zorunlu Stajını{' '}
            {studentInformation.find((item) => item.name === 'Başlangıç tarihi').value} -
            {studentInformation.find((item) => item.name === 'Bitiş tarihi').value} tarihleri arasında firmamız
            bünyesinde yapacaktır. Firmamız <Text style={styles.bold}>Cumartesi</Text> günleri de mesai yaptığından
            öğrenciniz staj süresince Cumartesi günleri de firmamızda staj yapacaktır.
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
    paddingTop: 35,
    paddingBottom: 65,
    marginLeft: 25,
    paddingHorizontal: 35,
  },
  day: {
    paddingRight: 28,
    textAlign: 'right',
    marginBottom: 43,
    fontSize: 13,
  },
  header: {
    paddingRight: 20,
    textAlign: 'center',
    marginBottom: 35,
    fontSize: 16,
  },
  content: {
    marginBottom: 45,
    paddingLeft: 20,
  },
  signature: {
    textAlign: 'right',
    fontSize: 14,
    paddingRight: 28,
  },
  signature_extra: {
    paddingRight: 6,
  },
  subTitle: {
    fontSize: 11,
    paddingBottom: 5,
    width: '100%',
  },
  bold: {
    fontWeight: 'extrabold',
  },
};
export default PdfWorkingSaturday;
