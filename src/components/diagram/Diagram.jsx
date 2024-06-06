import { Box, Container, Paper, Typography } from '@mui/material';
import React, { useState } from 'react';
import DiagramBox from './DiagramBox';
import PopUp from 'src/pages/Dashboard/PopUp';
import { InternStatusEnum } from 'src/app/enums/internStatus';

const Diagram = ({ data, isAdvancedComission }) => {
  const diagramData = [
    {
      id: 'FRM01',
      index: 1,
      text: InternStatusEnum.FRM01.label,
      description:
        'Öğrenciler bu aşamada yönergede belirtilen kurallara uygun bir staj yeri bulması ve form bilgilerini eksiksiz bir şekilde doldurulması beklenmektedir.',
    },
    {
      id: 'FRM02',
      index: 2,
      text: InternStatusEnum.FRM02.label,
      description: `Öğrencilerin kayıtları yetkili tarafından dijital olarak onaylanmıştır.
        Öğrencinin diğer işlemlere başlayabilmesi için staj formunu ilgili alanları 
        (SGK birimi, Firma Staj Yetkilisi, Staj Komisyonu) imzalatıp yetkili kişi veya kişilere teslim etmesi gerekmektedir.
        SGK ve diğer işmelerini bu aşamada tamamlayabilir.`,
    },
    {
      id: 'FRM03',
      index: 3,
      text: InternStatusEnum.FRM03.label,
      description: `Öğrencinin Staj Formu ve ilgili evrakları teslim alınmıştır.
      Cumartesi günleri çalışma durumu olan öğrenciler Cumartesi çalışır belgelerini'de imzalatıp getirmelidirler.`,
    },

    {
      id: 'RED01',
      hidden: true,
      index: '!',
      text: InternStatusEnum.RED01.label,
      description: `Staj Formu Reddedildi.Öğrencinin Staj Formundaki bilgileri ve yönergeyi tekrar gözden geçirmesi gerekmektedir.
      Staj Komisyonu ile iletişime geçilebilir.`,
    },

    {
      id: 'MLK01',
      index: 4,
      text: InternStatusEnum.MLK01.label,
      description: `Öğrenci yönergede belirtilen kurallara uyarak staj başlangıç tarihinde stajına başlayabilir.
      Staj Defteri, Mühendislik Dekanından temin edilmesi yönergede belirtilen işlemler uygulanması gerekir.
      `,
    },
    {
      id: 'MLK02',
      index: 5,
      text: InternStatusEnum.MLK02.label,
      description: `Öğrenci stajını tamamlayarak mülakat aşamasına geçmeye hak kazanmıştır.
      Mülakat gününe kadar öğrencilerin gerekli belgeleri (Gizli Sicil Fişi, Staj Defteri, Öğrenci Değerlendirme Anketi) teslim etmesi etmesi zorunludur.
      Gizli Sicil Fişi, Otomasyon sistemi üzerinden ilgili mülakat kaydında 'Sicil Fişini İlet' özelliği ile firmaya doğrudan iletebilir.
      Öğrenci Değerlendirme Anketi,  Otomasyon sistemi üzerinden Öğrenci Değerlendirme Anketi sayfasına giderek ilgili mülakat kaydını seçerek oluşturabilirsiniz.
      Oluşturduğunuz Değerlendirme Anketini PDF formatında çıktı alıp imzalayıp teslim edebilirsiniz.
      `,
    },
    {
      id: 'MLK04',
      index: '!',
      hidden: true,
      text: InternStatusEnum.MLK04.label,
      description: 'Staj Mülakatında eksik belgeler var.Staj Komisyonu ile iletişime geçilebilir.',
    },
    {
      id: 'MLK03',
      index: 6,
      text: InternStatusEnum.MLK03.label,
      description:
        'Öğrenci Mülakatını başarılı bir şekilde tamamlamıştır.Gerekli kontroller tamamlandıktan sonra staj işlemleri tamamlanacaktır.',
    },
    {
      id: 'RED02',
      hidden: true,
      index: '!',
      text: InternStatusEnum.RED02.label,
      description:
        'Staj Mülakatı Reddedildi.Öğrenci staj yönergesini gözden geçirmesi gerekmektedir.Staj Komisyonu ile iletişime geçilebilir.',
    },
    {
      id: 'RED03',
      hidden: true,
      index: '!',
      text: InternStatusEnum.RED03.label,
      description: 'Staj İptal Edildi.Staj Komisyonu ile iletişime geçilebilir.',
    },

    {
      id: 'STJ00',
      index: 7,
      text: InternStatusEnum.STJ00.label,
      description: 'Staj işlemleri tamamlandı.',
    },
  ];
  const [description, setDescription] = useState('');
  const [open, setOpen] = useState(false);

  const handleClickOpen = (item) => {
    setDescription(item);
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const status = !isAdvancedComission && diagramData.findIndex((item) => item.id === data?.status);

  return (
    <Box className="grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] justify-items-center gap-2">
      {diagramData.map((item, index) => {
        if (item.hidden && data?.status !== item.id) {
          return null;
        }
        return (
          <DiagramBox
            key={item.index}
            handleClickOpen={handleClickOpen}
            index={item.index}
            item={item}
            success={status > index ? true : false}
            progress={status === index}
            error={item.hidden}
          />
        );
      })}
      <PopUp item={description} open={open} handleClose={handleClose} />
    </Box>
  );
};

export default Diagram;
