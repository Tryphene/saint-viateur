import React, { useState } from 'react';
import StudentForm from './StudentForm';
import AttendanceList from './AttendanceList';

function Appp() {
  // State pour stocker les données des apprenants et les présences
  const [students, setStudents] = useState([]);
  const [attendance, setAttendance] = useState({});

  // Fonction pour ajouter un nouvel apprenant
  const handleAddStudent = (studentData) => {
    setStudents([...students, studentData]);
  };

  // Fonction pour marquer la présence d'un apprenant à un cours
  const markAttendance = (studentId, date) => {
    setAttendance({
      ...attendance,
      [studentId]: { ...attendance[studentId], [date]: true },
    });
  };

  return (
    <div>
      <h1>Application de gestion de présence aux cours</h1>
      <StudentForm onAddStudent={handleAddStudent} />
      <AttendanceList students={students} attendance={attendance} onMarkAttendance={markAttendance} />
    </div>
  );
}

export default Appp;
