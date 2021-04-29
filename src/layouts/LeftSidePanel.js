import React, { useCallback, useState } from 'react'
import AppLogo from '../assets/images/app-logo.svg'
import Users from '../assets/images/icons/users.svg'
import Message from '../assets/images/icons/message.svg'
import Calendar from '../assets/images/icons/calendar.svg'
import Setting from '../assets/images/icons/setting.svg'
import { withRouter } from 'react-router-dom';
// import { useHistory } from 'react-router'

const LeftSidePanel = (props) => {
    const [selectBar, setSelectBar] = useState("");

    const switchView = useCallback((e) => {
        const view = e.target.id
        setSelectBar(e.target.id);
        if (view === "main") {
            props.history.push("/teacher")
        } else {
            props.history.push(`/teacher/${e.target.id}`)
        }
        
    }, [props.history])

    return (
        <div className="left-side-panel">
            <div id="main" className="panel-header" onClick={(e) => switchView(e)}> 
                <img alt="" src={AppLogo} />
            </div>
            <div className="panel-content" onClick={(e) => switchView(e)}>
                <div id="students" className={`panel-item ${selectBar === "students" ? "selected-item" : ""}`} >
                    <img id="students" alt="student" src={Users}></img>
                </div>
                <div id="messages" className={`panel-item ${selectBar === "messages" ? "selected-item" : ""}`}>
                    <img id="messages" alt="message" src={Message}></img>
                </div>
                <div id="calendars" className={`panel-item ${selectBar === "calendars" ? "selected-item" : ""}`}>
                    <img id="calendars" alt="calendar" src={Calendar}></img>
                </div>
                <div id="settings" className={`panel-item ${selectBar === "settings" ? "selected-item" : ""}`}>
                     <img id="settings" alt="setting" src={Setting}></img>
                </div>
            </div>
        </div>
    )
}

export default withRouter((props) => LeftSidePanel(props));