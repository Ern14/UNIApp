import React from 'react';
import { TextField } from '@mui/material';

const TextInput = (props) => {
    const { name, label, value, type, onChange, error = null, ...other} = props;

    const styles = {
        textInput: {
            minWidth: 120,
            width: '100%'
        }
    }

    return ( 
        <TextField
            sx={styles.textInput}
            variant='outlined'
            label={label}
            name={name}
            value={value}
            type={type}
            onChange={onChange}
            {...other}
            {...(error && {error:true,helperText:error})}
        />
     );
}
 
export default TextInput;