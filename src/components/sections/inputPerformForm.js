
import React, { useCallback, useEffect, useState } from 'react';
import { makeStyles } from "@material-ui/core/styles";
import TextField from '@material-ui/core/TextField';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import ArrowDown from '../../assets/images/icons/arrowDown.svg';

const useStyles = makeStyles((theme) => ({
    formControl: {
        minWidth: 350,
    },
    textArea: {
        marginBottom: 20,
        width: 830
    }
}));

const opacityColors = ["rgba(218,28,28,0.4)", "rgba(255,184,0,0.4)", "rgba(69,158,72,0.4)", "rgba(52,25,219,0.4)"]
const colors = ["rgba(218,28,28)", "rgba(255,184,0)", "rgba(69,158,72)", "rgba(52,25,219)"]
const LEVELDIC = {
    participation: { "needs more participation": 0, "somewhat participating": 1, "actively participating": 2, "excellent": 3},
    behavior: { "interrupts class": 0, "often distracted": 1, "socializes with friends well": 2, "follows rules well": 3},
    teamwork: { "disruptive or irresponsive": 0, "reserved": 1, "working well with others": 2, "showing leadership": 3},
    assignment: { "turns in none/little": 0, "turns in some assignments": 1, "turns in most assignments": 2, "turns in all assignments": 3}
}
const LEVELARRAY = {
    participation: ["needs more participation", "somewhat participating", "actively participating", "excellent"],
    behavior: ["interrupts class", "often distracted", "socializes with friends well", "follows rules well"],
    teamwork: ["disruptive or irresponsive", "reserved", "working well with others", "showing leadership"],
    assignment: ["turns in none/little", "turns in some assignments", "turns in most assignments", "turns in all assignments"]
}


function InputPerformForm({
    inputType,
    setInputPerform,
    isEdit,
    oldPerform
}) {
    const classes = useStyles();
    const [isCollapse, setIsCollapse] = useState(false);
    const [selectLevel, setSelectLevel] = useState(-1);
    const [note, setNote] = useState("Enter note here");

    const handleSelectLevel = useCallback((idx) => {
        setSelectLevel(idx);
        setInputPerform(prevState => {
            prevState[inputType] = LEVELARRAY[inputType][idx]
            return prevState;
        })
    }, [inputType, setInputPerform])

    useEffect(() => {
        if (isEdit) {
            setSelectLevel(LEVELDIC[inputType][oldPerform[inputType]]);
        }
    }, [isEdit, oldPerform, inputType])

    useEffect(() => {
        setInputPerform(prevState => {
            const nodeKey = inputType.charAt(0) + "Note";
            prevState[nodeKey] = note;
            return prevState;
        })
    }, [note, inputType, setInputPerform])

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
                        key={idx} style={ selectLevel === idx ? {backgroundColor: opacityColors[idx]} : null} 
                        onClick={(e) => handleSelectLevel(idx)} 
                        className="radio-option">
                            <div style={ selectLevel === idx ? {border: `5px solid ${colors[idx]}`} : null}  className="ratio-circle"></div>
                            <span>{LEVELARRAY[inputType][idx]}</span>
                    </div>);
            })}
        </div>}
        {!isCollapse && 
        <TextField
            className={classes.textArea}
            id="outlined-multiline-static"
            multiline
            rows={6}
            value={note}
            variant="outlined"
            onChange={(e) => setNote(e.target.value)}
        />}
    </div>);
};

export default InputPerformForm;