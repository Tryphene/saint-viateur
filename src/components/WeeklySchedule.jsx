import React, { useEffect, useState } from 'react';
import axios from "axios";

const WeeklySchedule = (props) => {
  const daysOfWeek = [
    "Lundi",
    "Mardi",
    "Mercredi",
    "Jeudi",
    "Vendredi",
    "Samedi",
  ];

  const initialSchedule = {
    '09h-10h': { Lundi: '', Mardi: '', Mercredi: '', Jeudi: '', Vendredi: '', Samedi: '' },
    '10h-11h': { Lundi: '', Mardi: '', Mercredi: '', Jeudi: '', Vendredi: '', Samedi: '' },
    '11h-12h': { Lundi: '', Mardi: '', Mercredi: '', Jeudi: '', Vendredi: '', Samedi: '' },
    '13h-14h': { Lundi: '', Mardi: '', Mercredi: '', Jeudi: '', Vendredi: '', Samedi: '' },
    '14h-15h': { Lundi: '', Mardi: '', Mercredi: '', Jeudi: '', Vendredi: '', Samedi: '' },
    '14h-15h30': { Lundi: '', Mardi: '', Mercredi: '', Jeudi: '', Vendredi: '', Samedi: '' },
    '15h-16h': { Lundi: '', Mardi: '', Mercredi: '', Jeudi: '', Vendredi: '', Samedi: '' },
    '15h30-17h': { Lundi: '', Mardi: '', Mercredi: '', Jeudi: '', Vendredi: '', Samedi: '' },
    '16h-17h': { Lundi: '', Mardi: '', Mercredi: '', Jeudi: '', Vendredi: '', Samedi: '' },
    '17h-18h': { Lundi: '', Mardi: '', Mercredi: '', Jeudi: '', Vendredi: '', Samedi: '' },
  }; 
  
  const [schedule, setSchedule] = useState(initialSchedule);

  useEffect(() => {
    // Mettre à jour le schedule lorsque les props.heure changent
    const updatedSchedule = { ...initialSchedule };
    props.heure.forEach((h) => {
      updatedSchedule[h.heureCours][getDayOfWeekText(new Date(h.dateDebutCours).getDay())] = h.nomCours;
    });
    setSchedule(updatedSchedule);
  }, [props.heure]);

  // Fonction pour obtenir le jour de la semaine en texte à partir du numéro du jour (0 pour dimanche, 1 pour lundi, etc.)
  const getDayOfWeekText = (dayOfWeek) => {
    const daysOfWeekText = ["Dimanche", "Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi"];
    return daysOfWeekText[dayOfWeek];
  };

  props.heure.forEach((h) => {
      return initialSchedule[h.heureCours][getDayOfWeekText(new Date(h.dteDteDebutCours).getDay())] = props.nomCours[h.libelle];
  })

  // console.log("Le" + dateToCheck + " est un", dayOfWeekText, typeof (dayOfWeekText));

  // const [schedule, setSchedule] = useState(initialSchedule);

  const handleCellChange = (time, day, value) => {
    setSchedule((prevSchedule) => ({
      ...prevSchedule,
      [time]: {
        ...prevSchedule[time],
        [day]: value,
      },
    }));
  };

  return (
    <div className='table-responsive rounded-2'>
      {/* <h2>Mon emploi du temps</h2> */}
      <table className="table table-bordered ">
        <thead className='table-success'>
          <tr>
            <th className='align-middle'>Jour / Heure</th>
                {daysOfWeek.map((item, index)=> {
                  return (
                    <th key={index} className='align-middle px-4'>{item}</th>
                  )
                })}
          </tr>
        </thead>
        <tbody>
          {Object.entries(schedule).map(([time, activities]) => (
            <tr key={time}>
              <td className='px-0 ps-1 pe-0' style={{ backgroundColor: '#D1E7DD' }}>{time}</td>
              {daysOfWeek.map((day) => (
                <td key={`${time}-${day}`}>
                  <input
                    readOnly
                    type="text"
                    className="form-control"
                    style={{ border: 'none' }}
                    value={activities[day]}
                    onChange={(e) => handleCellChange(time, day, e.target.value)}
                  />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default WeeklySchedule;
