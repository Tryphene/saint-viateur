import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Weekly = (props) => {
  const daysOfWeek = ["Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi"];

  // État pour stocker la période choisie (nombre de mois)
  const [selectedPeriod, setSelectedPeriod] = useState(1);

  // État pour stocker les dates de début et de fin de la période choisie
  const [periodDates, setPeriodDates] = useState({ startDate: null, endDate: null });

  useEffect(() => {
    // Calculez les dates de début et de fin en fonction de la période choisie
    const startDate = new Date(props.startDate); // Utilisez la date de début choisie par l'apprenant
    const endDate = new Date(startDate);
    endDate.setMonth(endDate.getMonth() + selectedPeriod);

    // Mettez à jour les dates de la période
    setPeriodDates({ startDate, endDate });
  }, [props.startDate, selectedPeriod]);

  // Fonction pour générer les dates de cours pour la période choisie
  const generateCourseDates = () => {
    const courseDates = [];
    let currentDate = new Date(periodDates.startDate);

    while (currentDate <= periodDates.endDate) {
      // Si le jour de la semaine correspond au jour du cours, ajoutez la date au tableau
      if (currentDate.getDay() === getDayOfWeekIndex(props.courseDay)) {
        courseDates.push(new Date(currentDate));
      }
      currentDate.setDate(currentDate.getDate() + 1); // Passez au jour suivant
    }

    return courseDates;
  };

  // Fonction pour obtenir l'index du jour de la semaine en fonction du jour choisi par l'apprenant
  const getDayOfWeekIndex = (courseDay) => {
    // Remarque : Lundi est considéré comme le premier jour de la semaine en JavaScript (0 pour dimanche, 1 pour lundi, etc.)
    return (courseDay + 6) % 7;
    };
    const getDayOfWeekText = (dayOfWeek) => {
        const daysOfWeekText = ["Dimanche", "Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi"];
        return daysOfWeekText[dayOfWeek];
      };

  const handleMarkAttendance = (time, day) => {
    const courseId = props.heure.find(
      (h) =>
        h.heureCours === time && getDayOfWeekText(new Date(h.dteDteDebutCours).getDay()) === day
    )?.id;

    if (courseId) {
      axios.post(`http://localhost:8081/cours/${courseId}/markAttendance`, {
        // Vous pouvez ajouter d'autres données ici si nécessaire
        // par exemple, l'ID de l'apprenant ou des informations supplémentaires sur la présence.
      })
      .then((response) => {
        // Gérer la réponse de l'API si nécessaire
        console.log("Présence enregistrée !");
      })
      .catch((error) => {
        // Gérer les erreurs de l'API si nécessaire
        console.error("Erreur lors de l'enregistrement de la présence :", error);
      });
    }
  };

  return (
    <div className='table-responsive rounded-2'>
      {/* Affichez les dates de début et de fin de la période choisie */}
      <p>Début : {periodDates.startDate?.toLocaleDateString()}</p>
      <p>Fin : {periodDates.endDate?.toLocaleDateString()}</p>

      <table className="table table-bordered">
        <tbody>
          {/* Affichez l'horaire des cours en utilisant les dates générées */}
          {generateCourseDates().map((date) => (
            <tr key={date}>
              <td>{date.toLocaleDateString()}</td>
              {/* Affichez les détails du cours ici */}
              {/* Vous pouvez ajouter des boutons pour marquer la présence, etc. */}
              {props.heure.map((h) => (
                date.getTime() === new Date(h.dteDteDebutCours).getTime() &&
                <td key={h.id}>
                  <button onClick={() => handleMarkAttendance(h.heureCours, getDayOfWeekText(date.getDay()))}>
                    Marquer présence
                  </button>
                  {h.libelle}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Weekly;
