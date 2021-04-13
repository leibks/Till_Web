import React, { useState } from 'react'
import AppLogo from '../assets/images/app-logo.svg'
import StudentButtom from '../assets/images/icons/student-button.svg'
import MessageButtom from '../assets/images/icons/message-button.svg'
import CalendarButtom from '../assets/images/icons/calendar-button.svg'
import SettingButtom from '../assets/images/icons/setting-button.svg'
import { Link } from 'react-router-dom'

function initiateItemClass() {
    return {
        "student": "",
        "message": "",
        "calendar": "",
        "setting": "",
    }
}

function LeftSidePanel({
    panelType
}) {
    const [itemClasses, setItemClasses] = useState(() => initiateItemClass());

    function handleItemClassChange(prevState, buttonTyep) {
        return {
            ...prevState,
            [buttonTyep]: "selected-item"
        };
    }

    function switchView(e) {
        if (e.target.tagName === "IMG") {
            const buttonTyep = e.target.alt;
            setItemClasses(prevState => initiateItemClass())
            setItemClasses((prevState) => handleItemClassChange(prevState, buttonTyep))
        }
        
    }
    return (
        <div className="left-side-panel">
            <div className="panel-header" onClick={initiateItemClass}> 
                <Link to="/teacher"> <img alt="" src={AppLogo} /> </Link>
            </div>
            <div className="panel-content" onClick={(e) => switchView(e)}>
                <div className={`panel-item ${itemClasses.student}`} >
                    <Link to="/teacher/students"> <img alt="student" src={StudentButtom}></img> </Link>
                </div>
                <div className={`panel-item ${itemClasses.message}`}>
                    <Link to="/teacher/message"> <img alt="message" src={MessageButtom}></img> </Link>
                </div>
                <div className={`panel-item ${itemClasses.calendar}`}>
                    <Link to="/teacher/calendar"> <img alt="calendar" src={CalendarButtom}></img> </Link>
                </div>
                <div className={`panel-item ${itemClasses.setting}`}>
                    <Link to="/teacher/setting"> <img alt="setting" src={SettingButtom}></img> </Link>
                </div>
            </div>
        </div>
    )
}

export default LeftSidePanel;