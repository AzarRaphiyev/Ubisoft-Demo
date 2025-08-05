import * as React from 'react';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import Typography from '@mui/material/Typography';

export default function PriceFilter({pricevalue,setPriceValue}) {

  const handleChange = (event, newValue) => {
    setPriceValue(newValue);
  };
  console.log(pricevalue[0]);
  

  return (
    <Box sx={{ width: 270 }}>
      {/* Başlıq */}
      <Typography variant="subtitle1" gutterBottom>
        Price
      </Typography>

      {/* Slider */}
      <Slider
        value={pricevalue}
        onChange={handleChange}
        valueLabelDisplay="off"
        min={0}
        max={530}
        step={5}
        sx={{
          color: '#0099b0', // xəttin və point-lərin rəngi
          '& .MuiSlider-thumb': {
            borderRadius: '50%',
          },
        }}
      />

      {/* Minimum və Maksimum qiymətlər */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: -1 }}>
        <Typography sx={{ color: '#0099b0', fontSize: '14px' }}>{pricevalue[0]}€</Typography>
        <Typography sx={{ color: '#0099b0', fontSize: '14px' }}>{pricevalue[1]}€</Typography>
      </Box>
    </Box>
  );
}
