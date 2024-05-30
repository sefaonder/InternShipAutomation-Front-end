import { View, Text, Image } from '@react-pdf/renderer';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { getBusinessDays } from 'src/app/handlers/dateHandlers';
import PdfCheckbox from '../pdfComponents/PdfCheckbox';
import correct from '../../../public/images/correct.png';

const WorkDays = ({ data }) => {
  const [lastData, setLastData] = useState([]);
  const [items, setItems] = useState([]);
  const [box, setBox] = useState([
    {
      text: '01 Ocak - 14 Ocak',
      bas_tarih: '2024-01-01',
      bit_tarih: '2024-01-15',
      days: '.....',
    },
    {
      text: '15 Ocak - 14 Şubat',
      bas_tarih: '2024-01-15',
      bit_tarih: '2024-02-15',
      days: '.....',
    },
    {
      text: '15 Şubat - 14 Mart',
      bas_tarih: '2024-02-15',
      bit_tarih: '2024-03-15',
      days: '.....',
    },
    {
      text: '15 Mart - 14 Nisan',
      bas_tarih: '2024-03-15',
      bit_tarih: '2024-04-15',
      days: '.....',
    },
    {
      text: '15 Nisan - 14 Mayıs',
      bas_tarih: '2024-04-15',
      bit_tarih: '2024-05-15',
      days: '.....',
    },
    {
      text: '15 Mayıs - 14 Haziran',
      bas_tarih: '2024-05-15',
      bit_tarih: '2024-06-15',
      days: '.....',
    },
    {
      text: '15 Haziran - 14 Temmuz',
      bas_tarih: '2024-06-15',
      bit_tarih: '2024-07-15',
      days: '.....',
    },
    {
      text: '15 Temmuz - 14 Ağustos',
      bas_tarih: '2024-07-15',
      bit_tarih: '2024-08-15',
      days: '.....',
    },
    {
      text: '15 Ağustos - 14 Eylül',
      bas_tarih: '2024-08-15',
      bit_tarih: '2024-09-15',
      days: '.....',
    },
    {
      text: '15 Eylül - 14 Ekim',
      bas_tarih: '2024-09-15',
      bit_tarih: '2024-10-15',
      days: '.....',
    },
    {
      text: '15 Ekim - 14 Kasım',
      bas_tarih: '2024-10-15',
      bit_tarih: '2024-11-15',
      days: '.....',
    },
    {
      text: '15 Kasım - 14 Aralık',
      bas_tarih: '2024-11-15',
      bit_tarih: '2024-12-15',
      days: '.....',
    },
    {
      text: '15 Aralık - 31 Aralık',
      bas_tarih: '2024-12-15',
      bit_tarih: '2024-12-15',
      days: '.....',
    },
    {
      text: '',
      days: '',
    },
    {
      text: '',
      days: '',
    },
  ]);
  console.log(data);
  const calculatex = (item, index) => {
    const istenilenFormat = 'YYYY-MM-DDTHH:mm:ss.SSS[Z]';
    const startDate = new Date(data.start_date);
    const endDate = new Date(data.end_date);

    let first = new Date(moment(new Date(item.bas_tarih)).format(istenilenFormat));
    let last = new Date(moment(new Date(item.bit_tarih)).format(istenilenFormat));

    if (item.days == '') {
      setItems((prev) => [...prev, { ...item }]);

      return;
    }

    if (startDate > last) {
      setItems((prev) => [...prev, { ...item }]);
      return console.log('asd');
    }
    if (first > endDate) {
      setItems((prev) => [...prev, { ...item }]);
      return console.log('asd');
    }

    if (startDate > first) {
      first = startDate;
    }
    if (endDate < last) {
      last = endDate;
    }
    const workDays = getBusinessDays(first, last, [], data.weekDayWork);

    setItems((prev) => [...prev, { ...item, days: workDays }]);
  };
  useEffect(() => {
    box.map((item, index) => calculatex(item, index + 1));
  }, []);
  const days = ['Pazartesi', 'Sali', 'Carsamba', 'Persembe', ' Cuma', 'Cumartesi'];

  return (
    <View style={styles.container}>
      <View style={styles.title}>
        <Text></Text>
      </View>
      <View style={styles.header}>
        <View styles={styles.headerTitle}>
          <Text> Staj Yapilan Gunler: </Text>
        </View>
        <View style={styles.days}>
          {days?.map((day, index) => (
            <View style={styles.day}>
              <Text style={{ borderBottom: '1px solid black', width: '100%' }}> {day} </Text>
              {index + 1 == data?.weekDayWork[index] ? (
                <View style={styles.box}>
                  <Image src={correct}></Image>
                </View>
              ) : (
                ''
              )}
            </View>
          ))}
        </View>
      </View>
      <View style={styles.stuffs}>
        {items.map((stuff) => (
          <View style={styles.item}>
            <Text> {stuff.text} </Text>
            {stuff.text !== '' && <Text> {stuff.days} İş Günü </Text>}
          </View>
        ))}
      </View>
    </View>
  );
};
const styles = {
  box: {
    width: '10px',
    height: '10px',
  },
  headerTitle: {
    display: 'flex',
    backgroundColor: 'red',
    width: '30%',
  },
  day: {
    display: 'flex',
    flexDirection: 'column',
    border: '1px solid black',
    width: '20%',
    alignItems: 'center',
  },
  days: {
    display: 'flex',
    flexDirection: 'row',
    width: '70%',
  },
  header: {
    width: '100%',
    display: 'flex',
    border: '1px solid black',
    fontSize: '10px',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  container: {
    width: '100%',
  },
  stuffs: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  item: {
    width: '20%',
    fontSize: '8px',
    display: 'flex',
    padding: '0',
    flexDirection: 'column',
    border: '1px solid black',
    alignItems: 'center',
  },
};
export default WorkDays;
