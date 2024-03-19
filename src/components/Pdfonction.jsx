import React, { useState } from 'react';
import jsPDF from 'jspdf';

const  Pdfonction = () => {
  const [contenuHTML, setContenuHTML] = useState(`<center>hehjkjky</center>`);
  const [nomFichier, setNomFichier] = useState('mon_fichier');

  const telechargerPDF = () => {
      const doc = new jsPDF();
      doc.setFontSize(11);
    doc.html(contenuHTML, {
      callback: function (pdf) {
        pdf.save(nomFichier + '.pdf');
      },
    });
    };
    
    const generatePDF = () => {
        const doc = new jsPDF();
        doc.setFontSize(12);
        doc.text('Cocody Rivera Palmeraie', 5, 10);
        doc.text('Année scolaire 2023-2024', 150, 10);
        doc.text('Tel : +225 22 27 49 99 22 / +225 07 00 15 63 09 /', 5, 16);
        doc.text('+225 07 57 06 25 38', 10, 22);
        doc.text('contact@conservatoire-saintviateur.com', 5, 28);
        doc.setFillColor(200, 200, 200); // Couleur de fond grise
        doc.rect(60, 43, 80, 10, 'F'); // x, y, largeur, hauteur 'F' pour remplir le rectangle
        doc.setTextColor(255, 0, 0); // Rouge
        doc.text(`Fiche d\'Inscription`, 80, 50);
        // doc.text('Fiche d\'Inscription', 80, 50);
        // doc.text(`Nom : jhhhkkj`, 10, 20);
        // doc.text(`Prénom : jhuhkjj`, 10, 30);
        // doc.text(`Email : jhjkjk`, 10, 40);
      
        // // Ajoutez une ligne de séparation
        // doc.setLineWidth(0.5); // Épaisseur de la ligne
        // doc.line(10, 50, 200, 50); // Dessinez une ligne horizontale
      
        // Changez la couleur du texte pour le reste du document
        
      
        // Ajoutez des bordures autour de la page
        const pageWidth = doc.internal.pageSize.getWidth();
        const pageHeight = doc.internal.pageSize.getHeight();
        const borderWidth = 1; // Épaisseur de la bordure

        // Bordure supérieure
        doc.setLineWidth(borderWidth);
        doc.rect(0, 0, pageWidth, borderWidth, 'S');

        // Bordure inférieure
        doc.rect(0, pageHeight - borderWidth, pageWidth, borderWidth, 'S');

        // Bordure gauche
        doc.rect(0, 0, borderWidth, pageHeight, 'S');

        // Bordure droite
        doc.rect(pageWidth - borderWidth, 0, borderWidth, pageHeight, 'S');
      
        // Enregistrez le document PDF
        doc.save('fiche_inscription.pdf');
    };
    
    // const generatePDF = () => {
    //     const doc = new jsPDF();
    //     doc.setFontSize(16);
    //     doc.text('Fiche d\'Inscription', 10, 10);
      
    //     // Ajoutez une bordure autour du champ "Nom"
    //     doc.rect(10, 20, 80, 10); // x, y, largeur, hauteur
    //     doc.text(`Nom : jhhhkkj`, 10, 25);
      
    //     // Ajoutez une bordure autour du champ "Prénom"
    //     doc.rect(10, 30, 80, 10);
    //     doc.text(`Prénom : jhuhkjj`, 10, 35);
      
    //     // Ajoutez une bordure autour du champ "Email"
    //     doc.rect(10, 40, 80, 10);
    //     doc.text(`Email : jhjkjk`, 10, 45);
      
    //     // Ajoutez d'autres bordures et champs ici
      
    //     // Enregistrez le document PDF
    //     doc.save('fiche_inscription.pdf');
    //   };
      

  return (
    <div>
      <h1>Éditeur de contenu HTML pour PDF</h1>
      <label>Nom du fichier PDF :</label>
      <input
        type="text"
        value={nomFichier}
        onChange={(e) => setNomFichier(e.target.value)}
      /><br />

      <label>Contenu HTML :</label>
      <textarea
        rows="10"
        cols="50"
        value={contenuHTML}
        onChange={(e) => setContenuHTML(e.target.value)}
      /><br />

      <button onClick={generatePDF}>Télécharger PDF</button>
    </div>
  );
}

export default Pdfonction;
