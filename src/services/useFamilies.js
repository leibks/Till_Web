import { useMemo } from "react";


const useFamilies = () => {
    async function getFamilyByStudentId(studentId) {
        const response = await fetch(`http://localhost:8080/families/?studentId=${studentId}`, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            method: "GET"
        });
        return await response.json();
    }

    return useMemo(() => ({
        getFamilyByStudentId
    }), [])
}

export default useFamilies