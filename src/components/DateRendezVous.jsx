import React, { useEffect, useState } from 'react';
import axios from 'axios';
import "../styles/Calendrier.css"

const DateRendezVous = ({ date, heuresDisponibles }) => {
  const [loading, setLoading] = useState(true);
  const [dateHeure, setDateHeure] = useState([]);

  useEffect(() => {
    const fetchData = () => {
      axios.get('http://localhost:8081/cours/read-dte-debut-cours')
        .then(response => {
          setDateHeure(response.data);
          setLoading(false);
        })
        .catch(error => {
          console.error('Erreur lors de la récupération des données :', error);
          setLoading(false);
        });
    };

    fetchData();
  }, []);

  // Filtrer les heures déjà prises pour la date donnée
  const heuresPrises = dateHeure
    .filter(rdv => rdv.date === date)
    .map(rdv => rdv.heure);

  // Filtrer les heures disponibles (non prises) pour la date donnée
  const heuresDisponiblesFiltrees = heuresDisponibles
    .filter(heure => !heuresPrises.includes(heure));

  // Griser la date si toutes les heures sont prises
  const dateIndisponible = heuresDisponiblesFiltrees.length === 0;

  return (
    <div className={dateIndisponible ? 'date-indisponible' : ''}>
      <p>{date}</p>
      <ul>
        {heuresDisponiblesFiltrees.map(heure => (
          <li key={heure}>
            {heure}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DateRendezVous;
