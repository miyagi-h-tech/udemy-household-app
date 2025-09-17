import { Box, Button } from '@mui/material'
import React from 'react'
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { ja } from "date-fns/locale";

const MonthSelector = () => {
    return (
        <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={ja}>
            <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                <Button color={"error"} variant="contained">
                    先月
                </Button>
                <DatePicker sx={{ mx: 2 }} />
                <Button color={"primary"} variant="contained">
                    次月
                </Button>
            </Box>
        </LocalizationProvider>
    )
}

export default MonthSelector