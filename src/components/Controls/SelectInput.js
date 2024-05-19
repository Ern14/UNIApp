import React, { useState } from 'react';
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';

const SelectInput = (props) => {
    const [value, setValue] = useState('');

    const { label, items, onChange } = props;

    const handleChange = (event) => {
        setValue(event.target.value);
        onChange(event.target.value);
    };

    const styles = {
        formControl: {
            width: '100%'
        }
    }

    return (
        <FormControl 
            sx={styles.formControl}
        >
            <InputLabel>{label}</InputLabel>
            <Select
                value={value}
                label={label}
                onChange={handleChange}
            >
                {
                    items.map(item => (
                        <MenuItem key={item.idRol} value={item.idRol}>{item.Nombre}</MenuItem>
                    ))
                }
            </Select>
        </FormControl>
    );
}
 
export default SelectInput;