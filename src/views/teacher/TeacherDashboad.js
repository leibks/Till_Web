import React from "react"
import Message from "../../assets/images/icons/message1.svg"
import Edit from "../../assets/images/icons/edit1.svg"
import Trumpet from "../../assets/images/icons/trumpet.svg"
import ProgressBar from "../../components/elements/ProgressBar"
import Button from "../../components/elements/Button";
import MaleImage from "../../assets/images/male-profile-sample.svg"
import FemaleImage from "../../assets/images/female-profile-sample.svg"
import ProgressBar1 from "../../assets/images/temporary/progress1.svg"
import ProgressBar2 from "../../assets/images/temporary/progress2.svg"
import ProgressBar3 from "../../assets/images/temporary/progress3.svg"
import ProgressBar4 from "../../assets/images/temporary/progress4.svg"

function TeacherDashboad({
    teacherId
}) {
    const customMainViewClass = {
        backgroundColor: "#F6F6F6",
        height: "830px",
        width: "calc(92% - 80px)",
        padding: "30px 20px 0px 60px",
        minWidth: "800px"
    }

    return (
        <div className="main-view-content" style={customMainViewClass}>
            <div className="title">Welcome back, Julia!</div>
            <div className="subtitle">Quick Actions</div>
            <div className="left-outer-container">
                <div className="quick-action-container box-container">
                    <div className="content">
                        <img alt="edit" src={Edit}></img>
                        <div className="box-title">Quick<br /> Feedback</div>
                        <div className="display-progress">
                            <ProgressBar percentage={7 / 16} fillColor="#388697" baseColor="#F6F6F6"></ProgressBar>
                            <div className="text">7/16 Completed This Week</div>
                        </div>
                    </div>
                </div>
                <div className="quick-action-container box-container">
                    <div className="content">
                        <img alt="message" src={Message}></img>
                        <div className="box-title">New<br /> Message</div>
                        <div className="input-col"><span>To:</span></div>
                    </div>
                </div>
                <div className="quick-action-container box-container">
                    <div className="content">
                        <img alt="trumpet" src={Trumpet}></img>
                        <div className="box-title">New<br /> Announcement</div>
                        <div className="go-button">
                            <Button
                                text="Go !" height="38px" color="FA8334"
                                width="120px" borderRadius="10px" fontSize="18px"
                                handleClick={() => console.log()}>
                            </Button>
                        </div>
                    </div>
                </div>
                <div className="student-status-form box-container">
                    <h1>Student Performances Stats</h1>
                    <div className="date">5/6/2021</div>
                    <div className="status-bar">
                        <div className="bar-title">Participation</div>
                        <img alt="1" src={ProgressBar1}></img>
                    </div>
                    <div className="status-bar">
                        <div className="bar-title">Assignments</div>
                        <img alt="2" src={ProgressBar2}></img>
                    </div>
                    <div className="status-bar">
                        <div className="bar-title">Behaviors</div>
                        <img alt="3" src={ProgressBar3}></img>
                    </div>
                    <div className="status-bar">
                        <div className="bar-title">Teamwork</div>
                        <img alt="4" src={ProgressBar4}></img>
                    </div>
                </div>
            </div>

            <div className="messages-container box-container">
                <div className="title">Recent Messages</div>
                {[[1, "Amaya Jackson", "Hi ms. Professor has a docto..."],
                [1, "Sarah Stacy", "No I don’t understand the iss..."],
                [0, "George Michael", "Thank you!"],
                [1, "Sarah Stacy", "Yes"],
                [1, "Sarah Stacy", "I really appreciate what you’v..."]].map((row, idx) => {
                    return (<div key={idx} className="single-message">
                        <img alt="male" src={row[0] === 0 ? MaleImage : FemaleImage}></img>
                        <div className="message">
                            <div className="sender">{row[1]}</div>
                            <div className="text">{row[2]}</div>
                        </div>
                    </div>)
                })}
                <div className="edit"> View More </div>
            </div>

        </div>
    )
}


export default TeacherDashboad;