import React, { useEffect, useState } from "react"
import ContentHeader from '../../layouts/ContentHeader'
import TeacherProfileSample from "../../assets/images/teacher-profile-sample.svg"
import BoyProfileSample from "../../assets/images/boy-profile-sample.svg";
import GirlProfileSample from "../../assets/images/girl-profile-sample.svg";

function StudentView({
    teacherId
}) {
    const [students, setSutdents] = useState([]);
    const [selectedStudent, setSelectedStudent] = useState({});

    function handleSelectedStudent(event) {
        let student_id = 0;
        if (event.target.tagName === "IMG") {
            student_id = event.target.alt;
        } else if (event.target.tagName === "DIV") {
            student_id = event.target.id;
        }
        if (student_id !== 0) {
            const found_students = students.filter((student) => {
                return student.studentId == student_id
            });
            if (found_students.length != 0) setSelectedStudent(found_students[0])
        }
    }

    useEffect(() => {
        async function fetchUsers() {
            // You can await here
            const response = await fetch(`http://localhost:8080/student/findByTeacherId?teacherId=${teacherId}`, {
                headers : { 
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                method: "GET"
            });
            const students = await response.json();
            console.log(students);
            setSutdents(students);
        }
        fetchUsers();
    }, [])

    return (
        <div>
            <div className="profile-box"> <img alt="teacher-profile" src={TeacherProfileSample}></img> </div>
            <ContentHeader headerName="Student View" />
            <div className="users-list">
                <h2> Students </h2>
                {students.map((student) => {
                    return (
                    <div key={student.studentId}
                            className={`user-item  ${Object.keys(selectedStudent).length !== 0 && student.studentId === selectedStudent.studentId ? "select-item" : ""}`}
                            id={student.studentId}
                            onClick={(e) => handleSelectedStudent(e)}
                        >
                            <div className={`img-box`} id={student.studentId}>
                                <img alt={student.studentId} src={student.gender === "MALE" ? BoyProfileSample : GirlProfileSample}></img>
                            </div>
                            <div id={student.studentId} className="user-name"> 
                                {student.firstName} {student.lastName} 
                            </div>
                    </div>)
                })}
            </div>
            {Object.keys(selectedStudent).length !== 0 &&
            <div className="view-content">
                <div className="content-header">
                    <div className="user-item">
                        <div className="img-box">
                        <img alt={selectedStudent.studentId} src={selectedStudent.gender === "MALE" ? BoyProfileSample : GirlProfileSample}></img>
                        </div>
                        <div className="user-name"> 
                            <div>    
                                {selectedStudent.firstName} {selectedStudent.middleName} {selectedStudent.lastName}
                            </div>
                            <div >
                                <span>ID: {selectedStudent.studentId} </span>
                            </div>
                        </div>
                    </div>

                </div>
            </div>}
        </div>
    )
}


export default StudentView;