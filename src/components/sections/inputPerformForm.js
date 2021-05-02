
import React, { useCallback, useEffect, useState } from 'react';
import { makeStyles } from "@material-ui/core/styles";
import TextField from '@material-ui/core/TextField';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import ArrowDown from '../../assets/images/icons/arrowDown.svg';
import { OPACITYPERFORMCOLORS, PERFORMCOLORS, PERFORMARRAY} from '../../utils/studentPerformanceDic';

const useStyles = makeStyles((theme) => ({
    formControl: {
        minWidth: 350,
    },
    textArea: {
        marginBottom: 20,
        width: 830
    }
}));

function InputPerformForm({
    inputType,
    inputPerform,
    setInputPerform
}) {
    const classes = useStyles();
    const [isCollapse, setIsCollapse] = useState(false);
    const [note, setNote] = useState("");
    const [selectLevel, setSelectLevel] = useState(-1);

    useEffect(() => {
        setSelectLevel(inputPerform[inputType]);
        setNote(inputPerform[inputType.charAt(0) + "Note"]);
    }, [inputType, inputPerform])

    useEffect(() => {
        setInputPerform(prevState => {
            prevState[inputType] = selectLevel;
            return prevState;
        })
    }, [selectLevel, inputType, setInputPerform])

    useEffect(() => {
        setInputPerform(prevState => {
            prevState[inputType.charAt(0) + "Note"] = note;
            return prevState;
        })
    }, [note, inputType, setInputPerform])

    const handleSelectLevel = useCallback((idx) => {
        setSelectLevel(idx);
    }, [])

    const handleUpdateNote = useCallback((newNote) => {
        setNote(newNote);
    }, [])

    return (
    <div className="input-perform-form">
        <div className="header" onClick={e => {setIsCollapse(prev => !prev)}}> 
            <div>{inputType.charAt(0).toUpperCase() + inputType.slice(1)}</div>
            {isCollapse && <ArrowForwardIosIcon></ArrowForwardIosIcon>}
            {!isCollapse && <img alt="arrow-down" src={ArrowDown}></img>}
        </div>
        {!isCollapse && 
        <div className="radio-options">
            {[0, 1, 2, 3].map(idx => {
                return (
                    <div 
                        key={idx} 
                        style={ selectLevel === idx ? {backgroundColor: OPACITYPERFORMCOLORS[idx]} : null} 
                        onClick={(e) => handleSelectLevel(idx)} 
                        className="radio-option">
                        <div 
                            style={ selectLevel === idx ? {border: `5px solid ${PERFORMCOLORS[idx]}`} : null}  
                            className="ratio-circle">
                        </div>
                        <span>{PERFORMARRAY[inputType][idx]}</span>
                    </div>);
            })}
        </div>}
        {!isCollapse && 
        <TextField
            placeholder="Enter note here (optional)"
            className={classes.textArea}
            id="outlined-multiline-static"
            multiline
            rows={6}
            value={note}
            variant="outlined"
            onChange={(e) => handleUpdateNote(e.target.value)}
        />}
    </div>);
};

export default InputPerformForm;