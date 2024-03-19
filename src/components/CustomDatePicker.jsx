import React from 'react';
// import './DatePicker.css'; // Assurez-vous d'avoir le fichier CSS pour appliquer le style de grisage

class CustomDatePicker extends React.Component {
  constructor(props) {
    super(props);
    // Supposons que vous avez une liste de jours à griser (format : 'YYYY-MM-DD')
    this.disabledDates = ['2023-07-15', '2023-07-18', '2023-07-22'];
  }

  isDateDisabled = (date) => {
    return this.disabledDates.includes(date);
  };

  render() {
    return (
      <div className="date-picker-container">
        {/* Votre champ de date */}
        <input type="date" onChange={(e) => console.log(e.target.value)} />

        {/* Style CSS pour griser les jours désactivés */}
        <style>
          {`.date-picker-container input[type="date"]::-webkit-calendar-picker-indicator {
            filter: ${(e) =>
              this.isDateDisabled(e.target.value) ? 'grayscale(100%)' : 'none'};
            cursor: ${(e) => (this.isDateDisabled(e.target.value) ? 'default' : 'pointer')};
          }`}
        </style>
      </div>
    );
  }
}

export default CustomDatePicker;
