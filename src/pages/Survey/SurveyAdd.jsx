import {
  Box,
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  TextField,
  Typography,
} from '@mui/material';
import { Field, useFormik } from 'formik';
import React, { useEffect, useState } from 'react';
import * as yup from 'yup';
import CustomRadioGroup from './SurveyComponents/CustomRadioGroup';
import SurveyQuestions from './SurveyComponents/SurveyQuestions';
import { useCreateNewSurveyMutation, useUpdateSurveyMutation } from 'src/store/services/survey/surveyApiSlice';

const SurveyAdd = ({ survey, surveyId }) => {
  const [selectedAnswersSingle, setSelectedAnswersSingle] = useState([]);
  const [selectedAnswersMulti, setSelectedAnswersMulti] = useState([]);

  const [createSurvey, { isLoading }] = useCreateNewSurveyMutation();
  const [updateSurvey, { isLoadingUpdate }] = useUpdateSurveyMutation();

  useEffect(() => {
    if (survey) {
      formik.setFieldValue('company_name', survey.company_name, true);
      formik.setFieldValue('company_address', survey.company_address, true);
      formik.setFieldValue('teach_type', survey.teach_type, false);
      formik.setFieldValue('gano', survey.gano, false);
      if (survey?.answers?.length != 0) {
        setSelectedAnswersSingle([...survey?.answers?.slice(0, 27)]);
        const res = survey?.answers?.slice(27);
        const newArray = [, ...res];
        setSelectedAnswersMulti(newArray);
      }
    }
  }, [survey]);

  const validationSchema = yup.object({
    company_name: yup.string().required('E-mail Zorunlu'),
    company_address: yup.string().required('Şirket Adresi Zorunlu'),
    teach_type: yup.string().required('Öğrenim Türü Zorunlu'),
    gano: yup.string().required('Gano Bilgisi Zorunlu'),
    answers: yup.array().required('Anket Soruları Zorunlu').min(30, 'Bütün Sorular Cevaplanmalı'),
  });
  const formik = useFormik({
    initialValues: {
      company_name: '',
      company_address: '',
      teach_type: '',
      intern_group: 'asdasd',
      intern_type: 'asdasd',
      gano: '',
      date: '',
      answers: null,
    },
    onSubmit: async (values) => {
      try {
        console.log(values);
        if (survey) {
          console.log(surveyId);

          await updateSurvey({ payload: values, surveyId: surveyId }).unwrap();
        } else {
          await createSurvey(values).unwrap();
        }
      } catch (err) {}
    },
    validationSchema: validationSchema,
  });
  useEffect(() => {
    formik.values.answers = [...selectedAnswersSingle, ...selectedAnswersMulti.slice(1)];
    //console.log(selectedAnswersMulti);
  }, [formik]);

  const teach_type_data = { name: 'Öğretim Türü', type: 'teach_type', data: ['1. Öğretim', '2. Öğretim'] };
  const gano_data = {
    name: 'GANO',
    type: 'gano',
    data: ['0 - 1.79', '1.80 - 1.99', '2.00 - 2.49', '2.50 - 2.99', '3.00 - 3.49', '3.50 - 4.00'],
  };

  return (
    <div>
      <form onSubmit={formik.handleSubmit} className="p-8 flex items-center justify-center flex-col lg:w-full mt-12">
        <Box className="flex flex-col gap-3">
          <FormLabel className="font-extrabold flex justify-center text-2xl items-center">
            STAJ DEĞERLENDİRME ANKET FORMU
          </FormLabel>
          <Typography className="my-2">
            Sevgili Öğrenciler, Bu anketin amacı eğitimin niteliğini sürekli ve sistemli bir biçimde geliştirmek için
            görüşlerinizden yararlanmaktır. Yaptığınız stajı aşağıdaki ölçütlere göre değerlendirmeniz istenmektedir.
            Değerlendirmenizin kendi kişisel gözlem ve algılarınıza dayanıyor olması bu verilerin geçerliliği ve
            güvenilirliği açısından çok önemlidir. Buradaki sorulara verdiğiniz cevaplar stajınızın değerlendirilmesi
            esnasında dikkate alınmayacaktır. Bu nedenle değerlendirmeniz esnasında lütfen duygusal olmayınız ve
            arkadaşlarınızla aranızda fikir alışverişinde bulunmayınız.
          </Typography>
        </Box>
        <Box className="lg:w-1/2 sm:w-full gap-2 flex flex-col">
          <Box className="flex items-center justify-between">
            <FormLabel className="font-extrabold">Staj Yapılan Firma Adı: </FormLabel>
            <TextField
              className="w-1/2 my-0"
              id="company_name"
              name="company_name"
              label="Firma adı"
              margin="normal"
              value={formik.values.company_name}
              onChange={formik.handleChange}
              error={formik.touched.company_name && Boolean(formik.errors.company_name)}
              helperText={formik.touched.company_name && formik.errors.company_name}
            />
          </Box>

          <Box className="flex items-center  justify-between">
            <FormLabel className="font-extrabold">Staj Yapılan Firma Adresi:</FormLabel>
            <TextField
              className="w-1/2"
              id="company_address"
              name="company_address"
              label="Firma adresi"
              margin="normal"
              value={formik.values.company_address}
              onChange={formik.handleChange}
              error={formik.touched.company_address && Boolean(formik.errors.company_address)}
              helperText={formik.touched.company_address && formik.errors.company_address}
            />
          </Box>

          <Box className="flex items-center justify-between">
            <CustomRadioGroup
              error={formik.touched.teach_type && Boolean(formik.errors.teach_type)}
              helperText={formik.touched.teach_type && formik.errors.teach_type}
              data={teach_type_data}
              formik={formik}
            />
          </Box>
          <Box className="flex items-center justify-between">
            <CustomRadioGroup
              data={gano_data}
              formik={formik}
              error={formik.touched.gano && Boolean(formik.errors.gano)}
              helperText={formik.touched.gano && formik.errors.gano}
            />
          </Box>
          <Box>
            <SurveyQuestions
              selectedAnswersSingle={selectedAnswersSingle}
              setSelectedAnswersSingle={setSelectedAnswersSingle}
              selectedAnswersMulti={selectedAnswersMulti}
              setSelectedAnswersMulti={setSelectedAnswersMulti}
            />
            <Typography className="flex justify-end">
              {formik.touched.answers && Boolean(formik.errors.answers) && (
                <Box className="text-red-500">{formik.touched.answers && formik.errors.answers}</Box>
              )}
            </Typography>
          </Box>
        </Box>
        <Button className="px-4 w-1/3 flex my-2" type="submit" color="success" variant="outlined">
          Gönder
        </Button>
      </form>
    </div>
  );
};

export default SurveyAdd;
