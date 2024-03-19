import React from 'react';

function AttendanceList({ students, attendance, onMarkAttendance }) {
  return (
    <div>
      <h2>Liste des apprenants inscrits</h2>
      <ul>
        {students.map((student) => (
          <li key={student.name}>
            {student.name} (Début le {student.startDate})
          </li>
        ))}
      </ul>
      <h2>Marquer la présence</h2>
      <table>
        <thead>
          <tr>
            <th>Nom de l'apprenant</th>
            <th>Date du cours</th>
            <th>Présent</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student) => (
            <tr key={student.name}>
              <td>{student.name}</td>
              <td>
                <input
                  type="date"
                  onChange={(e) => onMarkAttendance(student.name, e.target.value)}
                />
              </td>
              <td>
                {attendance[student.name] && attendance[student.name][student.startDate] ? (
                  <span>Présent</span>
                ) : (
                  <span>Absent</span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AttendanceList;
