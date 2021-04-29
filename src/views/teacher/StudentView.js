import React, { useEffect, useState, useCallback } from "react"
import ContentHeader from '../../layouts/ContentHeader'
import TeacherProfileSample from "../../assets/images/teacher-profile-sample.svg"
import BoyProfileSample from "../../assets/images/boy-profile-sample.svg";
import GirlProfileSample from "../../assets/images/girl-profile-sample.svg";
import UserNav from "../../components/elements/UserNav";
import Button from "../../components/elements/Button";
import InfoCard from "../../components/elements/InfoCard";
import useStudents from "../../services/useStudents";
import useFamilies from "../../services/useFamilies";
import Exclamation from "../../assets/images/shapes/exclamation.svg"
import Circle from "../../assets/images/shapes/circle.svg"
import Triangle from "../../assets/images/shapes/triangle.svg"
import FiveStar from "../../assets/images/shapes/fiveStar.svg"


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
    const [selectedStudent, setSelectedStudent] = useState(null);
    const [cardContents, setCardContents] = useState([]);
    const [performances, setPerformances] = useState([]);
    const [selectView, SetSelectView] = useState("");
    const [viewHeader, SetViewHeader] = useState("");
    const { getStudentsByTeacherId, getStudentInfoByStudentId, 
        getStudentPerfoByStudentIdandTeacherId } = useStudents();
    const { getFamilyByStudentId } = useFamilies();

    const handleGetStudentsByTeacherId = useCallback(async () => {
        const students = await getStudentsByTeacherId(teacherId)
        setSutdents(students);
    }, [getStudentsByTeacherId, teacherId]);

    const handGetStudentPerformance = useCallback(async () => {
        const performance = await getStudentPerfoByStudentIdandTeacherId(teacherId, selectedStudent.id);
        console.log(performance);
        setPerformances(performance)
    }, [teacherId, selectedStudent, getStudentPerfoByStudentIdandTeacherId])

    const handleGetFamilyInfo = useCallback(async () => {
        const family = await getFamilyByStudentId(selectedStudent.id);
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
    }, [getFamilyByStudentId, selectedStudent]);

    const handleGetStudentInfo = useCallback(async () => {
        const studentInfo = await getStudentInfoByStudentId(selectedStudent.id);
        const cards = [ 
            {
                cardName: "Basic Information", 
                data: [
                        {name: "Full Name", text: selectedStudent.firstName + " " + selectedStudent.middleName + " " + selectedStudent.lastName},
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
    }, [getStudentInfoByStudentId, selectedStudent]);
    
    const handleSelectView = useCallback((e) => {
        SetSelectView(e.target.id);
        SetViewHeader(e.target.textContent);
    }, []);

    useEffect(() => {
        if (teacherId) {
            handleGetStudentsByTeacherId()
        }
        SetSelectView("studentInfo");
        SetViewHeader("Student Information");
    }, [teacherId, handleGetStudentsByTeacherId]);

    useEffect(() => {
        if (selectedStudent) {
            if (selectView === "studentInfo") {
                handleGetStudentInfo()
            } else if (selectView === "familyInfo") {
                handleGetFamilyInfo()
            } else if (selectView === "studentPerform") {
                handGetStudentPerformance()
            }
        }
    }, [selectedStudent, selectView, handleGetStudentInfo, handleGetFamilyInfo, handGetStudentPerformance]);

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
                            isSelect={selectedStudent && student.id === selectedStudent.id}
                            setSelectFunction={setSelectedStudent}
                        />
                    )
                })}
            </div>
            {selectedStudent &&
            <div className="view-content">
                <div className="content-header">
                    <div className="user-nav custom-user-nav disable-hover">
                        <img 
                            className="user-img"
                            alt={selectedStudent.id} 
                            src={selectedStudent.gender === "MALE" ? BoyProfileSample : GirlProfileSample}>
                        </img>
                        <div className="user-name"> 
                            <div>    
                                {selectedStudent.firstName} {selectedStudent.middleName} {selectedStudent.lastName}
                            </div>
                            <span>ID: {selectedStudent.id} </span>
                        </div>
                    </div>
                    <div className="button" >
                        <Button
                            text="Input Peformance" 
                            height="35px" 
                            handleClick={handleClickInput}
                            width="250px" 
                            fontSize="18px"
                        >
                        </Button>
                    </div>
                </div>
                <div className="nav-switch-bars" onClick={handleSelectView}>
                    <div 
                        className={`switch-bar ${selectView === "studentPerform" ? "select" : ""}`} 
                        id="studentPerform"> 
                        Student Performance 
                    </div>
                    <div 
                        className={`switch-bar ${selectView === "studentInfo" ? "select" : ""}`} 
                        id="studentInfo">
                        Student Information 
                    </div>
                    <div 
                        className={`switch-bar ${selectView === "familyInfo" ? "select" : ""}`} 
                        id="familyInfo"> 
                        Family Information 
                    </div>
                </div>
                <div className="content">
                    <h1>{viewHeader}</h1>
                    {(selectView === "studentInfo" || selectView === "familyInfo") &&
                    cardContents.map((card => {
                        return (
                            <InfoCard key={card.cardName} cardTitle={card.cardName} contents={card.data} />
                        )
                    }))}
                    {selectView === "studentPerform" && 
                    (<div className="perform-calendar">
                        <div className="row-titles">
                            <div className="row-title"> Participation </div>
                            <div className="row-title"> Behavior </div>
                            <div className="row-title"> Teamwork </div>
                            <div className="row-title"> Assignment </div>
                        </div>
                        {performances.map((col, idx) => {
                            return (
                            <div key={idx} className="col-data">
                                <div>{convertDate(col.updateDate)}</div>
                                <img src={PERFORMLEVELS[LEVELDIC["paticipation"][col.participation]]} alt="particate"></img>
                                <img src={PERFORMLEVELS[LEVELDIC["behavior"][col.behavior]]} alt="behavior"></img>
                                <img src={PERFORMLEVELS[LEVELDIC["teamwork"][col.teamwork]]} alt="teamwork"></img>
                                <img src={PERFORMLEVELS[LEVELDIC["assignment"][col.assignment]]} alt="assignment"></img>
                            </div>)
                        })}
                    </div>)}
                </div>
            </div>}
            {selectedStudent == null &&
            <div className="blank-content">Click on a Student Profile</div>}
        </div>
    )
}


export default StudentView;