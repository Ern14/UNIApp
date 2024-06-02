import React from 'react';
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';

const SelectInput = (props) => {
    const { label, items, onChange, value, disabled, keyField, valueField } = props;

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
                        <MenuItem key={item[keyField]} value={item[keyField]}>{item[valueField]}</MenuItem>
                    ))
                }
            </Select>
        </FormControl>
    );
}
 
export default SelectInput;