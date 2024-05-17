import { Accordion, AccordionDetails, AccordionSummary, Box, Paper } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import React from 'react';
import InterviewReadyList from './Interview/InterviewReadyList';
import HolidayList from './Holiday/HolidayList';
import EduYearList from './EduYear/EduYearList';
import ListPageHeader from 'src/components/details/ListPageHeader';

function internshipPanel() {
  const [expanded, setExpanded] = React.useState('panel1');

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <ListPageHeader header={'Staj Paneli'} />
      <Paper>
        <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1-content" id="panel1-header">
            Resmi Tatil Günleri
          </AccordionSummary>
          <AccordionDetails>
            <HolidayList open={expanded === 'panel1'} />
          </AccordionDetails>
        </Accordion>
      </Paper>
      <Paper>
        <Accordion expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel2-content" id="panel2-header">
            Mülakata Hazır Stajlar
          </AccordionSummary>
          <AccordionDetails>
            <InterviewReadyList open={expanded === 'panel2'} />
          </AccordionDetails>
        </Accordion>
      </Paper>
      <Paper>
        <Accordion expanded={expanded === 'panel3'} onChange={handleChange('panel3')}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel3-content" id="panel3-header">
            Edu Year
          </AccordionSummary>
          <AccordionDetails>
            <EduYearList open={expanded === 'panel3'} />
          </AccordionDetails>
        </Accordion>
      </Paper>
    </Box>
  );
}

export default internshipPanel;
