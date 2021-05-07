import React, { useCallback, useEffect, useState } from 'react'
import AppLogo from '../assets/images/app-logo.svg'
import Users from '../assets/images/icons/users.svg'
import Message from '../assets/images/icons/message.svg'
import Calendar from '../assets/images/icons/calendar.svg'
import Setting from '../assets/images/icons/setting.svg'
import { withRouter } from 'react-router-dom';
// import { useHistory } from 'react-router'

const LeftSidePanel = (props) => {
    const [selectBar, setSelectBar] = useState("");

    useEffect(() => {
        const currentPath = props.history.location.pathname.split("/");
        let currentView = currentPath[currentPath.length - 1]
        if (currentView === "teacher") {
            currentView = "main"
        }
        setSelectBar(currentView);
        props.setSelectedView(currentView)
    }, [props])

    const switchView = useCallback((view) => {
        setSelectBar(view);
        props.setSelectedView(view)
        if (view === "main") {
            props.history.push("/teacher")
        } else {
            props.history.push(`/teacher/${view}`)
        }
    }, [props])

    return (
        <div className="left-side-panel">
            <div className="panel-header" onClick={(e) => switchView("main")}>
                <img alt="logo" src={AppLogo} />
            </div>
            <div className="panel-content" onClick={(e) => switchView(e.target.id)}>
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