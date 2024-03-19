import React from "react";
import ReactDOM from "react-dom/client";
// import "./index.css";
import App from "./App";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
// import "@progress/kendo-theme-default/dist/all.css";

// // Définissez le Méta-titre et la Méta-description ici
// const metaTitle = "Titre de ma page";
// const metaDescription = "Description de ma page";

// // Mettez à jour le titre de la page
// document.title = metaTitle;

// // Créez une balise Méta pour la description
// const metaDescriptionTag = document.createElement('meta');
// metaDescriptionTag.name = 'description';
// metaDescriptionTag.content = metaDescription;
// document.head.appendChild(metaDescriptionTag);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
