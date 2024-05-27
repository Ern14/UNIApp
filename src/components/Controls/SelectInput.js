import React from 'react';
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';

const SelectInput = (props) => {
    const { label, items, onChange, value, disabled } = props;

    const handleChange = (event) => {
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
                disabled={disabled}
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