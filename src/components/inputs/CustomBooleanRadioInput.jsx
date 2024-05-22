import { FormControl, FormControlLabel, FormLabel, Radio, RadioGroup } from '@mui/material';
import React from 'react';

function CustomBooleanRadioInput({ label, onChange, value, trueLabel, falseLabel, name, id }) {
  return (
    <FormControl>
      <FormLabel id={id}>{label}</FormLabel>
      <RadioGroup
        aria-labelledby="demo-controlled-radio-buttons-group"
        name={name}
        value={value}
        onChange={(e) => onChange(e.target.value === 'false' ? false : true)}
      >
        <FormControlLabel value={true} control={<Radio />} label={trueLabel} />
        <FormControlLabel value={false} control={<Radio />} label={falseLabel} />
      </RadioGroup>
    </FormControl>
  );
}

export default CustomBooleanRadioInput;
