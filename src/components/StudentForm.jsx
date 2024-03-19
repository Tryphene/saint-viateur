import React, { useState } from 'react';

function StudentForm({ onAddStudent }) {
  const [name, setName] = useState('');
  const [startDate, setStartDate] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Ici, vous pouvez effectuer des validations sur les données avant d'ajouter l'apprenant
    onAddStudent({ name, startDate });
    setName('');
    setStartDate('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Nom de l'apprenant:
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
      </label>
      <label>
        Date de début:
        <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
      </label>
      <button type="submit">Ajouter</button>
    </form>
  );
}

export default StudentForm;
