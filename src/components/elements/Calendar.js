import React, { useCallback } from 'react';
import { makeStyles } from "@material-ui/core/styles";
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles((theme) => ({
    container: {
        display: 'flex',
        flexWrap: 'wrap',
    }
}));

function Calendar({
    inputPerform,
    setInputPerform
}) {
    const classes = useStyles();

    const handleDateChange = useCallback((date) => {
        setInputPerform(prevState => {
            const newState = { ...prevState };
            newState["updateDate"] = date
            return newState;
        })
    }, [setInputPerform])

    return (
        <div className="calendar">
            <form className={classes.container} noValidate>
                <TextField
                    id="date" label="Date Picker" type="date"
                    onChange={(e) => handleDateChange(e.target.value)} value={inputPerform["updateDate"]}
                    className={classes.textField} InputLabelProps={{ shrink: true }}
                />
            </form>
        </div>
    )
};

export default Calendar;