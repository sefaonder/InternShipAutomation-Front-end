import { createSlice } from '@reduxjs/toolkit';

const surveySlice = createSlice({
  name: 'survey',
  initialState: {
    company_name: '',
    company_address: '',
    teach_type: '',
    gano: '',
    intern_group: '',
    intern_type: '',
    date: '',
    answers: null,
  },
  reducers: {
    setSurvey: (state, action) => {
      const { company_name, company_address, teach_type, gano, intern_group, intern_type, date, answers } =
        action.payload;
      state.company_name = company_name;
      state.company_address = company_address;
      state.teach_type = teach_type;
      state.gano = gano;
      state.intern_group = intern_group;
      state.intern_type = intern_type;
      state.date = date;
      state.answers = answers;
    },
    resetSurvey: (state, action) => {
      (state.company_name = ''),
        (state.company_address = ''),
        (state.teach_type = ''),
        (state.gano = ''),
        (state.intern_group = ''),
        (state.intern_type = ''),
        (state.date = ''),
        (state.answers = null);
    },
  },
});

export const { setSurvey, resetSurvey } = surveySlice.actions;

export default surveySlice.reducer;
