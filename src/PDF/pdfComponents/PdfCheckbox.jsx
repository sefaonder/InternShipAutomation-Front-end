import React from 'react';
import { View, Text } from '@react-pdf/renderer';

// Stil tanımlamaları
const styles = {
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkbox: {
    width: 10,
    height: 10,
    marginRight: 5,
    border: '1 solid #000',
  },
};

const PdfCheckbox = ({ checked, text }) => {
  return (
    <View style={styles.container}>
      <Text style={[styles.checkbox, checked && { backgroundColor: '#000' }]} />
      <Text> {text} </Text>
    </View>
  );
};

export default PdfCheckbox;
