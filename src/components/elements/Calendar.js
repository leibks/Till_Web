import React, { useCallback, useEffect, useState } from 'react';
import { makeStyles } from "@material-ui/core/styles";
import TextField from '@material-ui/core/TextField';
import { generateCalendarFormat } from '../../utils/calendarUtil';

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
    const [date, setDate] = useState("");

    useEffect(() => {
        if (inputPerform["updateDate"] === "") {
            setDate(generateCalendarFormat(new Date()));
        } else {
            setDate(inputPerform["updateDate"]);
        }
    }, [inputPerform])

    // watcher (monitor the change of date in calendar)
    useEffect(() => {
        setInputPerform(prevState => {
            prevState["updateDate"] = date
            return prevState;
        })
    }, [date, setInputPerform])

    const handleDateChange = useCallback((event) => {
        setDate(event.target.value);
    }, [])

    return (
        <div className="calendar">
            <form className={classes.container} noValidate>
                <TextField
                    id="date" label="Date Picker" type="date"
                    onChange={handleDateChange} value={date}
                    className={classes.textField} InputLabelProps={{ shrink: true }}
                />
            </form>
        </div>
    )
};

export default Calendar;