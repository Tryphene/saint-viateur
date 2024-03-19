import React, {useState, useEffect} from 'react'
// import Table from './Table';
import Status from './Status';
import { Link } from 'react-router-dom';

const Pagination = (props) => {
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 3; 
    
    
    const [admins, setAdmins] = useState([
        {
            id: "1",
            nom: "Yao",
            prenom: "Prince",
            dteNaissance: "1998-08-11",
            mail: "prince@gmail.com",
            mdp: "jioj",
            tel: "077854655",
            status: "Actif"
        },
        {
            id: "2",
            nom: "Konan",
            prenom: "Lisa",
            dteNaissance: "1998-08-12",
            mail: "lisa@gmail.com",
            mdp: "jopkop",
            tel: "077854655",
            status: "Bloqué",
        },
        {
            id: "3",
            nom: "Kouassi",
            prenom: "Paulin",
            dteNaissance: "1998-08-12",
            mail: "paulin@yahoo.fr",
            mdp: "oijio",
            tel: "077854655",
            status: "Actif",
        },
        {
            id: "4",
            nom: "Yao",
            prenom: "Prince",
            dteNaissance: "1998-08-11",
            mail: "prince@gmail.com",
            mdp: "jioj",
            tel: "077854655",
            status: "Actif"
        },
        {
            id: "5",
            nom: "Konan",
            prenom: "Lisa",
            dteNaissance: "1998-08-12",
            mail: "lisa@gmail.com",
            mdp: "jopkop",
            tel: "077854655",
            status: "Bloqué",
        },
        {
            id: "6",
            nom: "Kouassi",
            prenom: "Paulin",
            dteNaissance: "1998-08-12",
            mail: "paulin@yahoo.fr",
            mdp: "oijio",
            tel: "077854655",
            status: "Actif",
        },
        {
            id: "7",
            nom: "Konan",
            prenom: "Lisa",
            dteNaissance: "1998-08-12",
            mail: "lisa@gmail.com",
            mdp: "jopkop",
            tel: "077854655",
            status: "Bloqué",
        },
        {
            id: "8",
            nom: "Kouassi",
            prenom: "Paulin",
            dteNaissance: "1998-08-12",
            mail: "paulin@yahoo.fr",
            mdp: "oijio",
            tel: "077854655",
            status: "Actif",
        },
        {
            id: "4",
            nom: "Yao",
            prenom: "Prince",
            dteNaissance: "1998-08-11",
            mail: "prince@gmail.com",
            mdp: "jioj",
            tel: "077854655",
            status: "Actif"
        },
        {
            id: "5",
            nom: "Konan",
            prenom: "Lisa",
            dteNaissance: "1998-08-12",
            mail: "lisa@gmail.com",
            mdp: "jopkop",
            tel: "077854655",
            status: "Bloqué",
        },
        {
            id: "6",
            nom: "Kouassi",
            prenom: "Paulin",
            dteNaissance: "1998-08-12",
            mail: "paulin@yahoo.fr",
            mdp: "oijio",
            tel: "077854655",
            status: "Actif",
        },
        {
            id: "7",
            nom: "Konan",
            prenom: "Lisa",
            dteNaissance: "1998-08-12",
            mail: "lisa@gmail.com",
            mdp: "jopkop",
            tel: "077854655",
            status: "Bloqué",
        },
        {
            id: "8",
            nom: "Kouassi",
            prenom: "Paulin",
            dteNaissance: "1998-08-12",
            mail: "paulin@yahoo.fr",
            mdp: "oijio",
            tel: "077854655",
            status: "Actif",
        },
        {
            id: "4",
            nom: "Yao",
            prenom: "Prince",
            dteNaissance: "1998-08-11",
            mail: "prince@gmail.com",
            mdp: "jioj",
            tel: "077854655",
            status: "Actif"
        },
        {
            id: "5",
            nom: "Konan",
            prenom: "Lisa",
            dteNaissance: "1998-08-12",
            mail: "lisa@gmail.com",
            mdp: "jopkop",
            tel: "077854655",
            status: "Bloqué",
        },
        {
            id: "6",
            nom: "Kouassi",
            prenom: "Paulin",
            dteNaissance: "1998-08-12",
            mail: "paulin@yahoo.fr",
            mdp: "oijio",
            tel: "077854655",
            status: "Actif",
        },
        {
            id: "7",
            nom: "Konan",
            prenom: "Lisa",
            dteNaissance: "1998-08-12",
            mail: "lisa@gmail.com",
            mdp: "jopkop",
            tel: "077854655",
            status: "Bloqué",
        },
        {
            id: "8",
            nom: "Kouassi",
            prenom: "Paulin",
            dteNaissance: "1998-08-12",
            mail: "paulin@yahoo.fr",
            mdp: "oijio",
            tel: "077854655",
            status: "Actif",
        },
    ])
    const [totalPage, setTotalPage] = useState(Math.ceil(admins.length / itemsPerPage));

    const calculateDisplayedPages = () => {
        const MIN_PAGES = 5; // Nombre minimum de pages affichées
    
        if (totalPage <= MIN_PAGES) {
          // Si le nombre total de pages est inférieur ou égal au nombre minimum, toutes les pages sont affichées
          return Array.from({ length: totalPage }, (_, i) => i + 1);
        }
    
        const isStartEllipsisVisible = currentPage > 2;
        const isEndEllipsisVisible = currentPage < totalPage - 1;
    
        let startPage = currentPage - Math.floor(MIN_PAGES / 2);
        let endPage = currentPage + Math.floor(MIN_PAGES / 2);
    
        if (startPage < 1) {
          startPage = 1;
          endPage = MIN_PAGES;
        }
    
        if (endPage > totalPage) {
          startPage = totalPage - MIN_PAGES + 1;
          endPage = totalPage;
        }
    
        const pages = Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i);
    
        if (isStartEllipsisVisible) {
          pages.unshift('...');
        }
    
        if (isEndEllipsisVisible) {
          pages.push('...');
        }
    
        return pages;
    };
    
    const pages = calculateDisplayedPages();
    

    useEffect(() => {
        const newTotalPage = Math.ceil(admins.length / itemsPerPage);
        setCurrentPage(1); 
        setTotalPage(newTotalPage);
    }, [admins, itemsPerPage]);
    
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentItems = admins.slice(startIndex, endIndex)
    
    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

  return (
      <div className='containeur'>
              <table>
                {currentItems.map((admin, index) => {
                  return (
                    <tr key={index}>
                      <th scope="row">{admin.id}</th>
                      <td className='align-middle'>{admin.nom}</td>
                      <td className='align-middle'>{admin.prenom}</td>
                      <td className='align-middle'>{admin.dteNaissance}</td>
                      <td className='align-middle'>{admin.mail}</td>
                      <td className='align-middle'>{admin.mdp}</td>
                      <td className='align-middle'>{admin.tel}</td>
                      <td className='align-middle'>
                      {admin.status === "Actif" ? <Status titre={admin.status} bgColor="linear-gradient(to right, #40D99D, #3EC7AA, #3CBCB1)" /> : <Status titre={admin.status} bgColor="linear-gradient(to right, #ED213A, #93291E)" />}
                      </td>
                    </tr>
                  )
                })}
          </table>
          

          <nav aria-label="Page navigation example">
              <ul className="pagination">
                  <li className={currentPage === 1 ? "page-item disabled" : "page-item"}><Link className="page-link" onClick={() => {setCurrentPage(currentPage - 1)}}>Précédent</Link></li>
                  {/* {Array.from({ length: totalPage }, (_, index) => index + 1).map(
                      (pageNumber) => (
                          <li className="page-item" key={pageNumber} onClick={() => handlePageChange(pageNumber)}><Link className="page-link">{pageNumber}</Link></li>
                      )
                  )} */}
                  {pages.map((page, index) => (
                      <li className={`page-item ${page === currentPage && 'active'}`} key={index} onClick={() => handlePageChange(page)}><Link className="page-link">{page}</Link></li>
                  ))}
                  <li className={currentPage === totalPage ? "page-item disabled" : "page-item"}><Link className="page-link" onClick={() => {setCurrentPage(currentPage + 1)}}>Suivant</Link></li>
              </ul>
          </nav>
    </div>
  )
}

export default Pagination
