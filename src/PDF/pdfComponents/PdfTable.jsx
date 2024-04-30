import React from 'react';
import { Document, Font, Page, Text, View } from '@react-pdf/renderer';

const PdfTable = ({ data }) => {
  const styles = {
    table: {
      marginBottom: 10,
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
    tableCol: {
      width: '50%',
      borderStyle: 'solid',
      borderWidth: 1,
      borderLeftWidth: 0,
      borderTopWidth: 0,
    },
    tableCell: {
      padding: 5,
      fontSize: 10,
    },
  };
  return (
    <View style={styles.table}>
      {data.map((item, index) => (
        <View style={styles.tableRow} key={index}>
          {' '}
          <View style={styles.tableCol}>
            <Text style={styles.tableCell}>{item.name}</Text>
          </View>
          <View style={styles.tableCol}>
            <Text style={styles.tableCell}>{item.value}</Text>
          </View>
        </View>
      ))}
    </View>
  );
};

export default PdfTable;
