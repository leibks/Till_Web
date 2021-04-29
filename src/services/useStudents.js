import { useMemo } from "react";


const useStudents = () => {
    async function getStudentsByTeacherId(teacherId) {
        const response = await fetch(`http://localhost:8080/students/?teacherId=${teacherId}`, {
            headers: { 
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            method: "GET"
        });
        return await response.json();
    }

    async function getStudentInfoByStudentId(studentId) {
        const response = await fetch(`http://localhost:8080/students/info/?studentId=${studentId}`, {
            headers: { 
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            method: "GET"
        })
        return await response.json();
    }

    async function getStudentPerfoByStudentIdandTeacherId(teacherId, studentId) {
        const response = await fetch(`http://localhost:8080/students/performances/?studentId=${studentId}&teacherId=${teacherId}`, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            method: "Get"
        });
        return await response.json();
    }

    return useMemo(
        () => ({
            getStudentsByTeacherId,
            getStudentInfoByStudentId,
            getStudentPerfoByStudentIdandTeacherId
        }),
        []
    )
}

export default useStudents;