import React from 'react';
import html2pdf from 'html2pdf.js';
import logo from "../img/logo.png"
import moment from 'moment';
import { Button } from 'react-bootstrap';

class ConvertToPDF extends React.Component {
  downloadPDF = () => {
    const content = this.getHTMLContent(this.props.studentInfo, this.props.compte); // Remplacez cette fonction par votre propre logique pour obtenir le contenu HTML

    const pdfOptions = {
      margin: 5,
      filename: `Fiche_inscription_${this.props.studentInfo.prenom}_${this.props.studentInfo.nom}.pdf`,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
    };

    if (this.props.compte === true) {
      if (!this.props.studentInfo.nom || !this.props.studentInfo.prenom || !this.props.studentInfo.dateNaissance || !this.props.studentInfo.lieuNaissance || (!this.props.studentInfo.profession && !this.props.studentInfo.nvScolaire) || !this.props.studentInfo.adresseEmail || !this.props.studentInfo.telephoneMobile) {
        console.log("Infos manquants");
      }else {
        html2pdf().from(content).set(pdfOptions).save();
      }
      
    } else if (this.props.compte === false) {
      if (!this.props.studentInfo.nom || !this.props.studentInfo.prenom || !this.props.studentInfo.dateNaissance || !this.props.studentInfo.lieuNaissance || !this.props.studentInfo.nvScolaire || !this.props.studentInfo.adresseEmail || !this.props.studentInfo.nomParent || !this.props.studentInfo.prenomParent || !this.props.studentInfo.mailParent || !this.props.studentInfo.telParent) {
        console.log("Infos manquants");
        console.log(this.props.studentInfo);
      } else {
        html2pdf().from(content).set(pdfOptions).save();
      }
    } 
  };

  getHTMLContent = (studentInfo, compte) => {
    const { nom, prenom, dateNaissance, lieuNaissance, profession, nvScolaire, adresseEmail, telephoneMobile, nomParent, prenomParent, mailParent, telParent } = studentInfo;
    // Remplacez cette fonction par votre propre logique pour obtenir le contenu HTML sous forme de chaîne
      const htmlContent = `
      <div >
      <div
        style="
          display: flex;
          justify-content: space-between;
          font-size: 16px;
          font-weight: 600;
        "
      >
        <div class="" style="text-align: center">
          <p style="margin-bottom: -5px">Cocody Rivera Palmeraie</p>
          <p style="margin-bottom: -5px">
            Tel : 22 27 49 99 22 / 07 00 15 63 09 
          </p>
          <p style="margin-bottom: -5px">07 57 06 25 38</p>
          <p>contact@conservatoire-saintviateur.com</p>
        </div>
        <div>
        <p style="margin-bottom: -3px">Année scolaire 2023-2024</p>
        <center>
        <img src=${logo} style="width: 150px;" />
        </center>
        </div>
      </div>
      <div class="" style="display: flex; justify-content: center">
        <div
          class=""
          style="
            padding: 15px;
            background-color: #b60520;
            border-radius: 5px;
            color: white;
            font-size: 25px;
            font-weight: 800;
            text-align: center;
            margin-top: 45px;
            margin-bottom: 45px;
          "
        >
          FICHE D'INSCRIPTON
        </div>
      </div>
      <div class="">
        <p style="font-size: 20px; font-weight: 700; margin-bottom: 10px">
          Informations Apprenant
        </p>
        <div
          class=""
          style="
            border-bottom: 5px solid #b60520;
            width: 120px;
            margin-bottom: 35px;
          "
        ></div>
      </div>
      <div
        class=""
        style="
          display: flex;
          font-size: 16px;
          margin-right: 15px;
          font-weight: 500;
        "
      >
        <p style="margin-right: 18px">Nom :</p>
        <p style="font-weight: 700">${nom}</p>
      </div>
      <div
        class=""
        style="
          display: flex;
          font-size: 16px;
          margin-right: 15px;
          font-weight: 500;
        "
      >
        <p style="margin-right: 18px">Prénom(s) :</p>
        <p style="font-weight: 700">${prenom}</p>
      </div>
      <div
        class=""
        style="
          display: flex;
          font-size: 16px;
          margin-right: 15px;
          font-weight: 500;
        "
      >
        <p style="margin-right: 18px">Né le :</p>
        <p style="font-weight: 700">${dateNaissance}</p>

        <p style="margin-left: 100px; margin-right: 18px">A :</p>
        <p style="font-weight: 700">${lieuNaissance}</p>
      </div>
      ${compte === false ? `` : `<div
      class=""
      style="
        display: flex;
        font-size: 16px;
        margin-right: 15px;
        font-weight: 500;
      "
    >
      <p style="margin-right: 18px">Profession :</p>
      <p style="font-weight: 700">${profession}</p>
    </div>`}
      <div
        class=""
        style="
          display: flex;
          font-size: 16px;
          margin-right: 15px;
          font-weight: 500;
        "
      >
        <p style="margin-right: 18px">Niveau scolaire :</p>
        <p style="font-weight: 700">${nvScolaire}</p>
      </div>
      <div
        class=""
        style="
          display: flex;
          font-size: 16px;
          margin-right: 15px;
          font-weight: 500;
        "
      >
        <p style="margin-right: 18px">Adresse e-mail :</p>
        <p style="font-weight: 700">${adresseEmail}</p>
      </div>
      <div
        class=""
        style="
          display: flex;
          font-size: 16px;
          margin-right: 15px;
          font-weight: 500;
        "
      >
        <p style="margin-right: 18px">Téléphone domicile :</p>
        <p style="font-weight: 700">juihu</p>

        <p style="margin-left: 100px; margin-right: 18px">Téléphone mobile :</p>
        <p style="font-weight: 700">${telephoneMobile}</p>
      </div>
      ${compte === false ? `` : 
      `
      ${studentInfo.test === true ?
        `
        <input type="checkbox" name="" checked="checked" id="" /> Je souhaiterais
         participer aux auditions, tests de passage à un niveau
        supérieur et au concert de fin d'année de conservatoire
        `
        :
        ``}
      ` }
      ${compte === false ? 
        `
        <div class="">
        <p style="font-size: 20px; font-weight: 700; margin-top: 30px; margin-bottom: 10px">
          Representant Légal
        </p>
        <div
          class=""
          style="
            border-bottom: 5px solid #b60520;
            width: 120px;
            margin-bottom: 35px;
          "
        ></div>
      </div>
      <div
        class=""
        style="
          display: flex;
          font-size: 16px;
          margin-right: 15px;
          font-weight: 500;
        "
      >
        <p style="margin-right: 18px">Nom :</p>
        <p style="font-weight: 700">${nomParent}</p>
      </div>
      <div
        class=""
        style="
          display: flex;
          font-size: 16px;
          margin-right: 15px;
          font-weight: 500;
        "
      >
        <p style="margin-right: 18px">Prénom(s) :</p>
        <p style="font-weight: 700">${prenomParent}</p>
      </div>
      <div
        class=""
        style="
          display: flex;
          font-size: 16px;
          margin-right: 15px;
          font-weight: 500;
        "
      >
        <p style="margin-right: 18px">Adresse e-mail :</p>
        <p style="font-weight: 700">${mailParent}</p>
      </div>
      <div
        class=""
        style="
          display: flex;
          font-size: 16px;
          margin-right: 15px;
          font-weight: 500;
        "
      >
        <p style="margin-right: 18px">Téléphone :</p>
        <p style="font-weight: 700">${telParent}e</p>
      </div>
      ${studentInfo.test === true ?
          `
          <input type="checkbox" name="" checked="checked" id="" /> Je souhaiterais
          que mon enfant participe aux auditions, tests de passage à un niveau
          supérieur et au concert de fin d'année de conservatoire
          `
          :
          ``}
      `
        :
        `
        `}
       <div
        style="
          display: flex;
          justify-content: space-around;
          font-size: 16px;
          font-weight: 600;
          margin-top: 26px;
        "
      >
        <div
          class=""
          style="
            /* text-align: center; */
            display: flex;
            justify-content: space-around;
          "
        >
          <p style="margin-right: 18px">Date :</p>
          <p style="font-weight: 700">${moment(new Date()).format("DD MMMM YYYY ")}</p>
        </div>
        <div class="">
          <p style="margin-right: 18px">Signature</p>
          <div
            class=""
            style="width: 120px; height: 60px; border: 1px solid black"
          ></div>
        </div>
      </div>
      </div>
    </div>
      `;
    const body = document.createElement('body');
    body.style.border = '4px solid #b60520';
    body.style.padding = '20px'
    body.style.minHeight = '1080px'
    body.innerHTML = htmlContent;
    return body;
  };

  render() {
    return (
      <div>
        <Button style={{width: this.props.width}} variant={this.props.bg} onClick={(e) => { this.downloadPDF(e); this.props.submit(e) }}>{this.props.titre}</Button>
      </div>
    );
  }
}

export default ConvertToPDF;
