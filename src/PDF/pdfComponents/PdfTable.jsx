import React from 'react';
import { Document, Font, Page, Text, View } from '@react-pdf/renderer';
import turkishbold from '../pdfComponents/extrabold.ttf';

Font.register({ family: 'Turkishbold', src: turkishbold });

const PdfTable = ({
  data,
  widthName = '50%',
  widthValue = '50%',
  fontSize = 8,
  secondLine = false,
  rowIndex,
  width = 'auto',
}) => {
  const styles = {
    table: {
      display: 'table',
      width: width,
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
      display: 'flex',
      justifyContent: 'center',
    },
    tableCol2: {
      width: widthValue,
      borderStyle: 'solid',
      borderWidth: 1,
      borderLeftWidth: 0,
      borderTopWidth: 0,
      fontSize: 8,
    },
    tableCell: {
      padding: 2,
      fontSize: fontSize,
    },
  };

  return (
    <View style={styles.table}>
      {data.map((item, index) => (
        <View
          style={[styles.tableRow, { height: rowIndex?.includes(index) && secondLine ? '30px' : 'auto' }]}
          key={index}
        >
          <View style={styles.tableCol1}>
            <Text style={[styles.tableCell, { fontFamily: item.bold && 'Turkishbold' }]}>{item.name}</Text>
          </View>
          <View style={styles.tableCol2}>
            <Text style={[styles.tableCell, { fontSize: secondLine ? 9 : fontSize }]}>{item.value}</Text>
          </View>
        </View>
      ))}
    </View>
  );
};

export default PdfTable;
