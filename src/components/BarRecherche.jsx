import { useState } from 'react';
import "../styles/BarRecherche.css"
import { FaSearch } from 'react-icons/fa';
import { instance } from '../axios';

const BarRecherche = (props) => {
    const [searchText, setSearchText] = useState('');
    const [loading, setLoading] = useState('');

  const handleSearch = (event) => {
    event.preventDefault();
    console.log('Recherche :', searchText);

    if (searchText === "") {
    } else {
      instance.get(`${props.entite}/search?query=${searchText}`)
        .then(response => {
          props.setAdmins([...response.data]);
          console.log(response.data);
          setLoading(false)
        })
        .catch(error => {
          console.error('Erreur lors de la récupération des données :', error);
          setLoading(false)
                })
      
    }
      // if (searchText === "") {
      //   props.setAdmins([...props.admins]);
      //   console.log(typeof props.admins);
      //   console.log("vide");   
      //   setSearchText('');
      // } else {
      //   const filteredAdmins = props.elements.filter((element) => {
      //     for (let prop in element) {
      //       if (
      //         element[prop].toString().toLowerCase().includes(searchText.toLowerCase())
      //       ) {
      //         return true;
      //       }
      //     }
      //     return false;
      //   });
        
      //     props.setAdmins(filteredAdmins);
      //     console.log(filteredAdmins);
      // }

      
        
      
        // setResultat(props.personnes
        //   .filter((personne) => personne.nom === searchText)
        //   .map(({id, nom, prenom, dteNaissance, mail, mdp, tel, status}) => ({id, nom, prenom, dteNaissance, mail, mdp, tel, status})));
  };
  

  // props.result = resultat
  
  return (
    <>
      <form className="mt-2 mb-4"  style={{position: 'static'}}>
        <div className="input-group">
          <input type="text" className="form-control" value={searchText} onChange={(e) => { setSearchText(e.target.value); console.log(e.target.value);}} placeholder="Rechercher" aria-label="Rechercher" aria-describedby="basic-addon1" />
          <span className="input-group-text" id="basic-addon1"><FaSearch onClick={handleSearch} /></span>
        </div>
      </form>
    </>
  )
}

export default BarRecherche
