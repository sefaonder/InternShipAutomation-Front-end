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
      text: '01 ocak - 14 ocak',
      bas_tarih: '2024-01-01',
      bit_tarih: '2024-01-15',
      days: '.....',
    },
    {
      text: '15 ocak - 14 şubat',
      bas_tarih: '2024-01-15',
      bit_tarih: '2024-02-15',
      days: '.....',
    },
    {
      text: '15 şubat - 14 mart',
      bas_tarih: '2024-02-15',
      bit_tarih: '2024-03-15',
      days: '.....',
    },
    {
      text: '15 mart - 14 nisan',
      bas_tarih: '2024-03-15',
      bit_tarih: '2024-04-15',
      days: '.....',
    },
    {
      text: '15 nisan - 14 mayıs',
      bas_tarih: '2024-04-15',
      bit_tarih: '2024-05-15',
      days: '.....',
    },
    {
      text: '15 mayıs - 14 haziran',
      bas_tarih: '2024-05-15',
      bit_tarih: '2024-06-15',
      days: '.....',
    },
    {
      text: '15 haziran - 14 temmuz',
      bas_tarih: '2024-06-15',
      bit_tarih: '2024-07-15',
      days: '.....',
    },
    {
      text: '15 temmuz - 14 agustos',
      bas_tarih: '2024-07-15',
      bit_tarih: '2024-08-15',
      days: '.....',
    },
    {
      text: '15 agustos - 14 eylul',
      bas_tarih: '2024-08-15',
      bit_tarih: '2024-09-15',
      days: '.....',
    },
    {
      text: '15 eylul - 14 ekim',
      bas_tarih: '2024-09-15',
      bit_tarih: '2024-10-15',
      days: '.....',
    },
    {
      text: '15 ekim - 14 kasim',
      bas_tarih: '2024-10-15',
      bit_tarih: '2024-11-15',
      days: '.....',
    },
    {
      text: '15 kasim - 14 aralik',
      bas_tarih: '2024-11-15',
      bit_tarih: '2024-12-15',
      days: '.....',
    },
    {
      text: '15 aralik - 31 aralik',
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
    padding: '2px 0',
    flexDirection: 'column',
    border: '1px solid black',
    alignItems: 'center',
  },
};
export default WorkDays;
