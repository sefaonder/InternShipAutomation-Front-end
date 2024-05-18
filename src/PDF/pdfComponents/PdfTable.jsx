import React from 'react';
import { Document, Font, Page, Text, View } from '@react-pdf/renderer';
import turkishbold from '../pdfComponents/extrabold.ttf';

Font.register({ family: 'Turkishbold', src: turkishbold });

const PdfTable = ({ data, widthName = '50%', widthValue = '50%', fontSize = 8 }) => {
  const styles = {
    table: {
      display: 'table',
      width: 'auto',
      borderStyle: 'solid',
      borderWidth: 1,
      borderRightWidth: 0,
      borderBottomWidth: 0,
    },
    tableRow: {
      margin: 'auto',
      flexDirection: 'row',
    },
    tableCol1: {
      width: widthName,
      borderStyle: 'solid',
      borderWidth: 1,
      borderLeftWidth: 0,
      borderTopWidth: 0,
    },
    tableCol2: {
      width: widthValue,
      borderStyle: 'solid',
      borderWidth: 1,
      borderLeftWidth: 0,
      borderTopWidth: 0,
    },
    tableCell: {
      padding: 2,
      fontSize: fontSize,
    },
  };

  return (
    <View style={styles.table}>
      {data.map((item, index) => (
        <View style={styles.tableRow} key={index}>
          <View style={styles.tableCol1}>
            <Text style={[styles.tableCell, { fontFamily: item.bold && 'Turkishbold' }]}>{item.name}</Text>
          </View>
          <View style={styles.tableCol2}>
            <Text style={styles.tableCell}>
              {item.value} {item.value2 && ' - '} {item.value2 && item.value2}
            </Text>
          </View>
        </View>
      ))}
    </View>
  );
};

export default PdfTable;
