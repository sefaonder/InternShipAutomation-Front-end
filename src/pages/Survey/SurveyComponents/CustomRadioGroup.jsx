import { Box, FormControl, FormControlLabel, FormHelperText, FormLabel, Radio, RadioGroup } from '@mui/material';
import React from 'react';

const CustomRadioGroup = ({ data, formik, error, helperText, index, disabled }) => {
  return (
    <FormControl error={error} disabled={disabled} className="w-full flex-col flex  items-center">
      <FormLabel className="font-extrabold w-full flex flex-row " id="demo-radio-buttons-group-label">
        {index ? `${index && index} - ${data.name}` : data.name}
      </FormLabel>
      <Box className="w-full">
        <RadioGroup
          aria-labelledby="demo-radio-buttons-group-label"
          name="radio-buttons-group"
          value={formik?.values[data.type]}
          className="w-full flex flex-row justify-between gap-2"
          onChange={(e) => formik?.setFieldValue(data.type, e.target.value)}
        >
          {data.data.map((item) => (
            <FormControlLabel key={item} value={item} control={<Radio />} label={item} />
          ))}
        </RadioGroup>
        {helperText && <FormHelperText>{helperText}</FormHelperText>}
      </Box>
    </FormControl>
  );
};

export default CustomRadioGroup;
