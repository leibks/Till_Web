import React, { useEffect, useState, useCallback } from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from '@material-ui/core/TextField';
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
import InputPerformForm from "../../components/sections/inputPerformForm";
import {  PERFORMLEVEL, PERFORMTYPES, PERFORMARRAY} from '../../utils/studentPerformanceDic';

const LEVELSYMBOLS = [Exclamation, Triangle, Circle, FiveStar]

const useStyles = makeStyles((theme) => ({
    container: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        width: 200,
    },
}));

// given date string yyyy-mm-dd, return month name + date (dd)
const generateMonthName = (date) => {
    const curDate = new Date(date.replaceAll("-", "/"));
    return curDate.toLocaleString('default', { month: 'long',  day: 'numeric'});
}

// given new Date() type, return yyyy-mm-dd
const generateCalendarFormat = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth() < 10 ? "0"+(date.getMonth() + 1).toString() : date.getMonth();
    const day = date.getDate() < 10 ? "0"+date.getDate().toString() : date.getDate();
    const convertedDate = `${year}-${month}-${day}`;
    return convertedDate;
}

const convertPerforms = (performances) => {
    for (let i = 0; i < performances.length; i++) {
        for (const key of PERFORMTYPES) {
            // convert notes to default if null
            const noteKey = key.charAt(0) + "Note";
            if (performances[i][noteKey] === null) {
                performances[i][noteKey] = performances[i][key];
            }
            // convert performance level to index
            performances[i][key] = PERFORMLEVEL[key][performances[i][key]];
        }
        // convert calendar
        performances[i]["updateDate"] = performances[i]["updateDate"].replaceAll("/", "-");
    }
    return performances;
}

const convertBackPerform = (performance) => {
    let newPerform = {...performance};
    for (const key of PERFORMTYPES) {
        // convert index to performance content
        newPerform[key] = PERFORMARRAY[key][newPerform[key]];
    }
    // convert calendar
    newPerform["updateDate"] = newPerform["updateDate"].replaceAll("-", "/");
    return newPerform;
}

function StudentView({
    teacherId
}) {
    const classes = useStyles();
    const [students, setSutdents] = useState([]);
    const [selectStudent, setSelectStudent] = useState(null);
    const [selectView, setSelectView] = useState("");
    const [viewHeader, setViewHeader] = useState("");

    const [cardContents, setCardContents] = useState([]);
    const [performances, setPerformances] = useState([]);
    const [selectPerform, setSelectPerform] = useState(null);
    const [inputPerform, setInputPerform] = useState({
        "id": "", "studentId": "", "teacherId": "", "updateDate": "", "participation": "",
        "behavior": "", "teamwork": "", "assignment": "", "pNote": "", "bNote": "", "tNote": "", "aNote": ""
    })
    const [inputDate, setInputDate] = useState("");
    const [isEdit, setIsEdit] = useState(false);

    const { getStudentsByTeacherId, getStudentInfoByStudentId,
        getStudentPerfoByStudentIdandTeacherId, createOrUpdatePerformance } = useStudents();
    const { getFamilyByStudentId } = useFamilies();

    // TODO: implement debounce

    const handleGetStudentsByTeacherId = useCallback(async () => {
        const students = await getStudentsByTeacherId(teacherId)
        setSutdents(students);
    }, [getStudentsByTeacherId, teacherId]);

    const handGetStudentPerformance = useCallback(async () => {
        const performanceList = await getStudentPerfoByStudentIdandTeacherId(teacherId, selectStudent.id);
        convertPerforms(performanceList);
        setPerformances(performanceList);
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
        setSelectView(type);
        setViewHeader(header);
    }, []);

    const handleSubmitPerformance = useCallback(async (e) => {
        // setId
        setInputPerform(prevState => {
            prevState["id"] = teacherId + "+" + selectStudent.id + "+" + prevState["updateDate"].replaceAll("-", "/");
            return prevState;
        })
        // check valid date
        if (new Date(inputPerform["updateDate"]).getTime() > new Date().getTime()) {
            alert("Please do not select future date")
            return;
        }
        // check empty performance
        let emptyPerform = "";
        for (let type of PERFORMTYPES) {
            if (inputPerform[type] === -1) emptyPerform += (type + ",");
        }
        if (emptyPerform !== "") {
            alert("Please select performances for " + emptyPerform.substring(0, emptyPerform.length - 1));
            return;
        }
        // submit the performance
        try {
            const newPerform = convertBackPerform(inputPerform);
            await createOrUpdatePerformance(newPerform);
            alert("create or update performance successfully")
            handleSelectView("studentPerform", "student Performance")
        } catch (exception) {
            console.log(exception);
        }
    }, [inputPerform, teacherId, selectStudent, createOrUpdatePerformance, handleSelectView]);

    useEffect(() => {
        setInputPerform(prevState => {
            prevState["updateDate"] = inputDate
            return prevState;
        })
    }, [inputDate])

    const handleDateChange = useCallback((date) => {
        setInputDate(date.target.value);
    }, []);

    const handleEditPerform = useCallback(() => {
        setInputPerform(selectPerform);
        setInputDate(selectPerform.updateDate);
        setIsEdit(true);
        handleSelectView("inputPerform", "Input Performance")
    }, [handleSelectView, selectPerform, setIsEdit])

    const cleanUpOldData = useCallback(() => {
        // clean up the old view data
        setCardContents([]);
        setPerformances([]);
        setSelectPerform(null);
    }, [])

    // on mount function
    useEffect(() => {
        if (teacherId) {
            handleGetStudentsByTeacherId()
            setSelectView("studentInfo");
            setViewHeader("Student Information");
        }
    }, [teacherId, handleGetStudentsByTeacherId]);

    // when switch view
    useEffect(() => {
        cleanUpOldData();
        if (!isEdit) {
            // clean up input performance
            setInputPerform(prevState => {
                for (let key in prevState)  prevState[key] = "";
                return prevState;
            })
        }
        if (selectStudent) {
            if (selectView === "studentInfo") {
                handleGetStudentInfo()
            } else if (selectView === "familyInfo") {
                handleGetFamilyInfo()
            } else if (selectView === "studentPerform") {
                handGetStudentPerformance()
            } else if (selectView === "inputPerform") {
                if (isEdit) {
                    setIsEdit(false);
                    return;
                }
                // fill the id, studentId, teacherId
                setInputPerform(prevState => {
                    prevState["studentId"] = selectStudent.id;
                    prevState["teacherId"] = teacherId;
                    prevState["updateDate"] = generateCalendarFormat(new Date());
                    setInputDate(generateCalendarFormat(new Date()));
                    for (const key of PERFORMTYPES) {
                        prevState[key] = -1;
                    }
                    return prevState;
                })
            }
        }
    }, [teacherId, selectStudent, selectView, handleGetStudentInfo, handleGetFamilyInfo, 
        handGetStudentPerformance, cleanUpOldData]);

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
                        <Button text="Input Peformance" height="35px" 
                            handleClick={(e) => handleSelectView("inputPerform", "Input Performance")} 
                            width="250px" borderRadius="20px" fontSize="18px">
                        </Button>
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
                    {selectView === "inputPerform" && 
                    <div className="perform-input">
                        <Button 
                            text="Submit" 
                            height="40px" handleClick={() => handleSubmitPerformance()}
                            width="240px" borderRadius="30px" fontSize="20px">
                        </Button>
                        <div className="calendar">
                            <form className={classes.container} noValidate>
                                <TextField
                                    id="date"
                                    label="Performance Date Picker"
                                    type="date"
                                    onChange={handleDateChange}
                                    value={inputDate}
                                    className={classes.textField}
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                />
                            </form>
                        </div>
                        {["participation", "behavior", "teamwork", "assignment"].map(
                            text => <InputPerformForm key={text} inputType={text} inputPerform={inputPerform} 
                            setInputPerform={setInputPerform} ></InputPerformForm>
                        )}
                    </div>}
                    {(selectView === "studentInfo" || selectView === "familyInfo") &&
                    cardContents.map(card => <InfoCard key={card.cardName} cardTitle={card.cardName} contents={card.data}></InfoCard>)}
                    {selectView === "studentPerform" && 
                    <div className="perform-calendar">
                        <div className="row-titles">
                            {["Participation", "Behavior", "Teamwork", "Assignment"].map(
                                text => <div key={text} className="row-title"> {text} </div>
                            )}
                        </div>
                        {performances.map((col, idx) => {
                            return (
                            <div key={idx} className={`col-data ${selectPerform && (selectPerform.id === col.id) ? "select" : ""}`} 
                                onClick={(e) => setSelectPerform(col)}>
                                <div>{generateMonthName(col.updateDate)}</div>
                                {PERFORMTYPES.map(
                                    text => <img key={text} src={LEVELSYMBOLS[col[text]]} alt={text}></img>
                                )}
                            </div>)
                        })}
                    </div>}
                    {selectPerform &&
                    <div className="perform-detail">
                        <div className="date-title"> 
                            {generateMonthName(selectPerform.updateDate)}
                            <div onClick={handleEditPerform} className="edit"> edit </div> 
                        </div>
                        <div className="detail-item"> 
                            <div className="title">Participation</div> 
                            <img src={LEVELSYMBOLS[selectPerform.participation]} alt="partipate"></img>
                            <div> {selectPerform.pNote } </div>
                        </div>
                        <div className="detail-item"> 
                            <div className="title">Behavior</div> 
                            <img src={LEVELSYMBOLS[selectPerform.behavior]} alt="behavior"></img>
                            <div> {selectPerform.bNote } </div>
                        </div>
                        <div className="detail-item"> 
                            <div className="title">Teamwork</div> 
                            <img src={LEVELSYMBOLS[selectPerform.teamwork]} alt="teamwork"></img>
                            <div> {selectPerform.tNote } </div>
                        </div>
                        <div className="detail-item">
                            <div className="title">Assignment</div> 
                            <img src={LEVELSYMBOLS[selectPerform.assignment]} alt="assignment"></img>
                            <div> {selectPerform.aNote } </div>
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