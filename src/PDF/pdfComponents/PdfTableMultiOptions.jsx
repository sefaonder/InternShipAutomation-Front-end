import { Text, View, Image } from '@react-pdf/renderer';
import React from 'react';
import icon from '../../../public/images/correct.png';

const PdfTableMultiOptions = ({ data }) => {
  const styles = {
    table: {
      marginBottom: 10,
      display: 'flex',
      width: '100%',
      borderStyle: 'solid',
      borderWidth: 1,
      borderRightWidth: 0,
      borderBottomWidth: 0,
    },
    tableRow: {
      flexDirection: 'row',
    },
    firstCol: {
      flex: 3,
      padding: 3,
      borderStyle: 'solid',
      borderWidth: 1,
      borderLeftWidth: 0,
      borderTopWidth: 0,
    },
    otherCols: {
      flex: 1,
      padding: 3,
      borderWidth: 1,
      borderTopWidth: 0,
      textAlign: 'center',
    },
    tableCell: {
      marginTop: 5,
      fontSize: 10,
    },
    image: {
      width: '20px',
    },
  };

  return (
    <View style={styles.table}>
      <View style={styles.tableRow}>
        {data?.titles.map((item, index) => (
          <View style={index === 0 ? styles.firstCol : styles.otherCols}>
            <Text style={styles.tableCell}>{item}</Text>
          </View>
        ))}
      </View>

      {data?.data.map((item, index) => (
        <View style={styles.tableRow}>
          <View style={styles.firstCol}>
            <Text style={styles.tableCell}>{item.name}</Text>
          </View>
          <View style={styles.otherCols}>
            <Text style={styles.tableCell}>
              {item?.value === 'İyi' && <Image style={styles.image} src={icon}></Image>}
            </Text>
          </View>
          <View style={styles.otherCols}>
            <Text style={styles.tableCell}>
              {item?.value === 'Orta' && <Image style={styles.image} src={icon}></Image>}
            </Text>
          </View>
          <View style={styles.otherCols}>
            <Text style={styles.tableCell}>
              {item?.value === 'İyi Değil' && <Image style={styles.image} src={icon}></Image>}
            </Text>
          </View>
        </View>
      ))}
    </View>
  );
};

export default PdfTableMultiOptions;
