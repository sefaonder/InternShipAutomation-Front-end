import { createSlice } from '@reduxjs/toolkit';

const surveySlice = createSlice({
  name: 'survey',
  initialState: {
    id: null,
    interview: null,
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
      const {
        company_name,
        company_address,
        teach_type,
        gano,
        intern_group,
        intern_type,
        date,
        answers,
        interview,
        id,
      } = action.payload;
      state.company_name = company_name;
      state.company_address = company_address;
      state.teach_type = teach_type;
      state.gano = gano;
      state.intern_group = intern_group;
      state.intern_type = intern_type;
      state.date = date;
      state.answers = answers;
      state.interview = interview;
      state.id = id;
    },
    resetSurvey: (state, action) => {
      state.company_name = null;
      state.company_address = null;
      state.teach_type = null;
      state.gano = null;
      state.intern_group = null;
      state.intern_type = null;
      state.date = null;
      state.answers = null;
      state.interview = null;
      state.id = null;
    },
  },
});

export const { setSurvey, resetSurvey } = surveySlice.actions;

export default surveySlice.reducer;
