import React, { useEffect, useState, useCallback } from "react";
import ContentHeader from '../../layouts/ContentHeader';
import TeacherProfileSample from "../../assets/images/teacher-profile-sample.svg";
import BoyProfileSample from "../../assets/images/boy-profile-sample.svg";
import GirlProfileSample from "../../assets/images/girl-profile-sample.svg";
import UserNav from "../../components/elements/UserNav";
import Button from "../../components/elements/Button";
import InfoCard from "../../components/elements/InfoCard";
import useStudents from "../../services/useStudents";
import useFamilies from "../../services/useFamilies";
import Exclamation from "../../assets/images/shapes/exclamation.svg";
import Circle from "../../assets/images/shapes/circle.svg";
import Triangle from "../../assets/images/shapes/triangle.svg";
import FiveStar from "../../assets/images/shapes/fiveStar.svg";
import Edit from "../../assets/images/icons/edit.svg";
import User from "../../assets/images/icons/user.svg";
import Users from "../../assets/images/icons/users.svg";


const PERFORMLEVELS = [Exclamation, Triangle, Circle, FiveStar]
const LEVELDIC = {
    paticipation: {
        "needs more participation": 0,
        "somewhat participating": 1,
        "actively participating": 2,
        "excellent": 3
    },
    behavior: {
        "interrupts class": 0,
        "often distracted": 1,
        "socializes with friends well": 2,
        "follows rules well": 3
    },
    teamwork: {
        "disruptive or irresponsive": 0,
        "reserved": 1,
        "working well with others": 2,
        "showing leadership": 3
    },
    assignment: {
        "turns in none/little": 0,
        "turns in some assignments": 1,
        "turns in most assignments": 2,
        "turns in all assignments": 3
    }
}

function StudentView({
    teacherId
}) {
    const [students, setSutdents] = useState([]);
    const [selectStudent, setSelectStudent] = useState(null);
    const [cardContents, setCardContents] = useState([]);
    const [performances, setPerformances] = useState([]);
    const [selectView, setSelectView] = useState("");
    const [viewHeader, setViewHeader] = useState("");
    const [selectPerform, setSelectPerform] = useState(null);
    
    const { getStudentsByTeacherId, getStudentInfoByStudentId, 
        getStudentPerfoByStudentIdandTeacherId } = useStudents();
    const { getFamilyByStudentId } = useFamilies();

    const handleGetStudentsByTeacherId = useCallback(async () => {
        const students = await getStudentsByTeacherId(teacherId)
        setSutdents(students);
    }, [getStudentsByTeacherId, teacherId]);

    const handGetStudentPerformance = useCallback(async () => {
        const performanceList = await getStudentPerfoByStudentIdandTeacherId(teacherId, selectStudent.id);
        setPerformances(performanceList)
    }, [teacherId, selectStudent, getStudentPerfoByStudentIdandTeacherId])

    const handleGetFamilyInfo = useCallback(async () => {
        const family = await getFamilyByStudentId(selectStudent.id);
        const cards = [
            {
                cardName: "Primary Contact",
                data: [
                        {name: "Full Name", text: family.primaryContactName},
                        {name: "Relationship to Student", text: family.primaryContactRelation},
                        {name: "Email", text: family.primaryEmail},
                        {name: "Phone Number", text: family.primaryPhone}
                ]
            },
            {
                cardName: "Secondary Contact",
                data: [
                    {name: "Full Name", text: family.secondContactName},
                    {name: "Relationship to Student", text: family.secondContactRelation},
                    {name: "Email", text: family.secondEmail},
                    {name: "Phone Number", text: family.secondPhone}
                ]
            }
        ];
        setCardContents(cards);
    }, [getFamilyByStudentId, selectStudent]);

    const handleGetStudentInfo = useCallback(async () => {
        const studentInfo = await getStudentInfoByStudentId(selectStudent.id);
        const cards = [ 
            {
                cardName: "Basic Information", 
                data: [
                        {name: "Full Name", text: selectStudent.firstName + " " + selectStudent.middleName + " " + selectStudent.lastName},
                        {name: "Date of Birth", text: studentInfo.dateOfBirth},
                        {name: "Language", text: studentInfo.firstLanguage + "," + studentInfo.homeLanguage}
                    ]
            },
            {
                cardName: "Health Details",
                data: [
                        {name: "Allergies", text: "n/a"},
                        {name: "Health Conditions", text: studentInfo.healthDetails},
                        {name: "Behaviral Health", text: studentInfo.additionalInfo}
                    ]
            },
            {
                cardName: "Additional Notes",
                data: [
                        {name: "Content", text: studentInfo.additionalInfo}
                    ]
            }
        ] 
        setCardContents(cards);
    }, [getStudentInfoByStudentId, selectStudent]);
    
    const handleSelectView = useCallback((type, header) => {
        // clean up the old view data
        setCardContents([]);
        setPerformances([]);
        setSelectPerform(null);
        // set the new view
        setSelectView(type);
        setViewHeader(header);
    }, []);

    useEffect(() => {
        if (teacherId) {
            handleGetStudentsByTeacherId()
        }
        setSelectView("studentInfo");
        setViewHeader("Student Information");
    }, [teacherId, handleGetStudentsByTeacherId]);

    useEffect(() => {
        if (selectStudent) {
            if (selectView === "studentInfo") {
                handleGetStudentInfo()
            } else if (selectView === "familyInfo") {
                handleGetFamilyInfo()
            } else if (selectView === "studentPerform") {
                handGetStudentPerformance()
            }
        }
    }, [selectStudent, selectView, handleGetStudentInfo, handleGetFamilyInfo, handGetStudentPerformance]);

    const handleClickInput = (e) => {
        console.log("handle click the 'input performance' button in student view")
    };

    const convertDate = useCallback((date) => {
        const curDate = new Date(date);
        const output = curDate.toLocaleString('default', { month: 'long',  day: 'numeric'});
        return output;
    }, [])

    return (
        <div className="main-view-content">
            <div className="profile-box"> <img alt="teacher-profile" src={TeacherProfileSample}></img> </div>
            <ContentHeader headerName="Student View" />
            <div className="users-list">
                <div className="list-header"> Students </div>
                {students.map((student) => {
                    return (
                        <UserNav
                            key={student.id}
                            customStyles="custom-user-nav"
                            user={student}
                            userId={student.id}
                            userType="student"
                            isSelect={selectStudent && student.id === selectStudent.id}
                            setSelectFunction={setSelectStudent}
                        />
                    )
                })}
            </div>
            {selectStudent &&
            <div className="view-content">
                <div className="content-header">
                    <div className="user-nav custom-user-nav disable-hover">
                        <img 
                            className="user-img"
                            alt={selectStudent.id} 
                            src={selectStudent.gender === "MALE" ? BoyProfileSample : GirlProfileSample}>
                        </img>
                        <div className="user-name">
                            <div>{selectStudent.firstName} {selectStudent.middleName} {selectStudent.lastName}</div>
                            <span>ID: {selectStudent.id} </span>
                        </div>
                    </div>
                    <div className="button" >
                        <Button text="Input Peformance" height="35px" handleClick={handleClickInput} width="250px" fontSize="18px"></Button>
                    </div>
                </div>
                <div className="nav-switch-bars">
                    <div 
                        onClick={() => handleSelectView("studentPerform", "Student Performance")}
                        className={`switch-bar ${selectView === "studentPerform" ? "select" : ""}`}>
                        <div className="inner"> <img src={Edit} alt="edit"></img> Student Performance </div>
                    </div>
                    <div 
                        onClick={() => handleSelectView("studentInfo", "Student Information")}
                        className={`switch-bar ${selectView === "studentInfo" ? "select" : ""}`} id="studentInfo">
                        <div className="inner"> <img src={User} alt="user"></img> Student Information </div>
                    </div>
                    <div 
                        onClick={() => handleSelectView("familyInfo", "Family Information")}
                        className={`switch-bar ${selectView === "familyInfo" ? "select" : ""}`} id="familyInfo"> 
                        <div className="inner"> <img src={Users} alt="users"></img> Family Information </div>
                    </div>
                </div>
                <div className="content">
                    <h1>{viewHeader}</h1>
                    {(selectView === "studentInfo" || selectView === "familyInfo") &&
                    cardContents.map(card => <InfoCard key={card.cardName} cardTitle={card.cardName} contents={card.data}></InfoCard>)}
                    {selectView === "studentPerform" && 
                    (<div className="perform-calendar">
                        <div className="row-titles">
                            {["Participation", "Behavior", "Teamwork", "Assignment"].map(
                                text => <div key={text} className="row-title"> {text} </div>
                            )}
                        </div>
                        {performances.map((col, idx) => {
                            return (
                            <div key={idx} className="col-data" onClick={(e) => setSelectPerform(col)}>
                                <div>{convertDate(col.updateDate)}</div>
                                <img src={PERFORMLEVELS[LEVELDIC["paticipation"][col.participation]]} alt="partipate"></img>
                                <img src={PERFORMLEVELS[LEVELDIC["behavior"][col.behavior]]} alt="behavior"></img>
                                <img src={PERFORMLEVELS[LEVELDIC["teamwork"][col.teamwork]]} alt="teamwork"></img>
                                <img src={PERFORMLEVELS[LEVELDIC["assignment"][col.assignment]]} alt="assignment"></img>
                            </div>)
                        })}
                    </div>)}
                    {selectPerform &&
                    <div className="perform-detail">
                        <div className="date-title"> {convertDate(selectPerform.updateDate)} </div>
                        <div className="detail-item"> 
                            <div className="title">Participation</div> 
                            <img src={PERFORMLEVELS[LEVELDIC["paticipation"][selectPerform.participation]]} alt="partipate"></img>
                            <div>
                                Rick actively particiates in class and is good at socializing with other students. 
                                However, he tends to interrupt class oftentimes while other students or I was talking. 
                                Also, some assignments were not turned in. 
                            </div>
                        </div>
                        <div className="detail-item"> 
                            <div className="title">Behavior</div> 
                            <img src={PERFORMLEVELS[LEVELDIC["behavior"][selectPerform.behavior]]} alt="behavior"></img>
                            <div>
                                Rick actively particiates in class and is good at socializing with other students. 
                                However, he tends to interrupt class oftentimes while other students or I was talking.
                                Also, some assignments were not turned in. 
                            </div>
                        </div>
                        <div className="detail-item"> 
                            <div className="title">Teamwork</div> 
                            <img src={PERFORMLEVELS[LEVELDIC["teamwork"][selectPerform.teamwork]]} alt="teamwork"></img>
                            <div>
                                Struggling to share with his peers. 
                            </div>
                        </div>
                        <div className="detail-item">
                            <div className="title">Assignment</div> 
                            <img src={PERFORMLEVELS[LEVELDIC["assignment"][selectPerform.assignment]]} alt="assignment"></img>
                            <div>
                                Rick actively particiates in class and is good at socializing with other students. 
                                However, he tends to interrupt class oftentimes while other students or I was talking. 
                                Also, some assignments were not turned in. 
                            </div>
                        </div>
                    </div> }
                </div>
            </div>}
            {selectStudent == null &&
            <div className="blank-content">Click on a Student Profile</div>}
        </div>
    )
}


export default StudentView;