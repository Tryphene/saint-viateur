import React, { useState } from 'react'
import { CgSmileSad } from 'react-icons/cg';
import BarRecherche from './BarRecherche';
import TableDataToExcel from './TableDataToExcel';

const Table = (props) => {
  const [loading, setLoading] = useState(true);
  // const [currentPage, setCurrentPage] = useState(1);
  // const itemsPerPage = 3; 
  
  // const [totalPage, setTotalPage] = useState(Math.ceil(props.data.length / itemsPerPage));

  //   useEffect(() => {
  //       const newTotalPage = Math.ceil(props.data.length / itemsPerPage);
  //       setCurrentPage(1); 
  //       setTotalPage(newTotalPage);
  //   }, [props.data, itemsPerPage]);
    
  //   const startIndex = (currentPage - 1) * itemsPerPage;
  //   const endIndex = startIndex + itemsPerPage;
  // const currentItems = props.data.slice(startIndex, endIndex)
    
  //   const handlePageChange = (pageNumber) => {
  //       setCurrentPage(pageNumber);
  //   };
  
  return (
    <>
      <div className="table-responsive">
        <div className="d-flex justify-content-between">
          <div className="">
            <p className='my-0 fw-semibold' style={{ marginLeft: 10, marginTop: 12, fontSize: 18 }}>{props.titre}</p>
            <p className='my-0 text-muted' style={{ marginLeft: 10, marginTop: 12, fontSize: 13 }}>{props.sousTitre}</p>
          </div>
          <div className="d-flex">
            <div className="mt-2">
              <TableDataToExcel data={props.data} nomFichier={props.nomFichier}  />
            </div>
            <input className="form-control mx-2 mt-2" style={{width: 65, height: 38}} min={1} max={100} type="number" onChange={props.onChangeChiffre} value={props.chiffre} name="chiffre" id="" />
            <BarRecherche entite={props.entite} setAdmins={props.setAdmins}  />
          </div>
        </div>
        <table className="table table-hover">
          <thead>
            <tr>
              {props.items.map((item, index) => {
                return (
                  <th key={index} scope="col">{item}</th>
                )
              })}
            </tr>
          </thead>
          <tbody>
            {props.children}
          </tbody>
        </table>
        <center>
          {props.item.length > 0 ? null : <i>{props.nom} pour le moment <CgSmileSad color='#282530' size={20} /> .</i>}
        </center>
      </div>

      {/* <nav aria-label="Page navigation example">
              <ul className="pagination">
                  <li className={currentPage === 1 ? "page-item disabled" : "page-item"}><Link className="page-link" onClick={() => {setCurrentPage(currentPage - 1)}}>Précédent</Link></li>
                  {Array.from({ length: totalPage }, (_, index) => index + 1).map(
                      (pageNumber) => (
                          <li className="page-item" key={pageNumber} onClick={() => handlePageChange(pageNumber)}><Link className="page-link">{pageNumber}</Link></li>
                      )
                  )}
                  <li className={currentPage === totalPage ? "page-item disabled" : "page-item"}><Link className="page-link" onClick={() => {setCurrentPage(currentPage + 1)}}>Suivant</Link></li>
              </ul>
          </nav> */}
    </>
  )
}

export default Table
