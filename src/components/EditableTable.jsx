// import React, { useState } from 'react';

const EditableTable = () => {
  // const [data, setData] = useState([
  //   { id: 1, name: 'John Doe', age: 25, email: 'john.doe@example.com' },
  //   { id: 2, name: 'Jane Smith', age: 30, email: 'jane.smith@example.com' },
  //   // Ajoutez d'autres entrées de données ici...
  // ]);
  
  const label = [
    "Jour / Heure",
    "Lundi",
    "Mardi",
    "Mercredi",
    "Jeudi",
    "Vendredi",
    "Samedi",
  ];

  // const handleInputChange = (event, rowIdx, colName) => {
  //   const { value } = event.target;
  //   setData((prevData) =>
  //     prevData.map((row, idx) =>
  //       idx === rowIdx ? { ...row, [colName]: value } : row
  //     )
  //   );
  // };

  return (
    <>
    {/* <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Age</th>
          <th>Email</th>
        </tr>
      </thead>
      <tbody>
        {data.map((row, idx) => (
          <tr key={row.id}>
            <td>{row.id}</td>
            <td>
              <input
                type="text"
                value={row.name}
                onChange={(e) => handleInputChange(e, idx, 'name')}
              />
            </td>
            <td>
              <input
                type="number"
                value={row.age}
                onChange={(e) => handleInputChange(e, idx, 'age')}
              />
            </td>
            <td>
              <input
                type="text"
                value={row.email}
                onChange={(e) => handleInputChange(e, idx, 'email')}
              />
            </td>
          </tr>
        ))}
      </tbody>
      </table> */}
      <div className="table-responsive">
            <table className="table table-bordered ">
              <thead className='table-success'>
                <tr>
                {label.map((item, index)=> {
                  return (
                    <th key={index} className='align-middle'>{item }</th>

                  )
                })}
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td style={{backgroundColor: "#D1E7DD"}}>09h-11h</td>
                  <td>
                    <input type="text" className="form-control" style={{border: "none"}} />
                  </td>
                  <td>
                    <input type="text" className="form-control" style={{border: "none"}} />
                  </td>
                  <td>
                    <input type="text" className="form-control" style={{border: "none"}} />
                  </td>
                  <td>
                    <input type="text" className="form-control" style={{border: "none"}} />
                  </td>
                  <td>
                    <input type="text" className="form-control" style={{border: "none"}} />
                  </td>
                  <td>
                    <input type="text" className="form-control" style={{border: "none"}} />
                  </td>
                </tr>
                <tr>
                  <td style={{backgroundColor: "#D1E7DD"}}>11h-13h</td>
                  <td>
                    <input type="text" className="form-control" style={{border: "none"}} />
                  </td>
                  <td>
                    <input type="text" className="form-control" style={{border: "none"}} />
                  </td>
                  <td>
                    <input type="text" className="form-control" style={{border: "none"}} />
                  </td>
                  <td>
                    <input type="text" className="form-control" style={{border: "none"}} />
                  </td>
                  <td>
                    <input type="text" className="form-control" style={{border: "none"}} />
                  </td>
                  <td>
                    <input type="text" className="form-control" style={{border: "none"}} />
                  </td>
                </tr>
                <tr>
                  <td style={{backgroundColor: "#D1E7DD"}}>13h-15h</td>
                  <td>
                    <input type="text" className="form-control" style={{border: "none"}} />
                  </td>
                  <td>
                    <input type="text" className="form-control" style={{border: "none"}} />
                  </td>
                  <td>
                    <input type="text" className="form-control" style={{border: "none"}} />
                  </td>
                  <td>
                    <input type="text" className="form-control" style={{border: "none"}} />
                  </td>
                  <td>
                    <input type="text" className="form-control" style={{border: "none"}} />
                  </td>
                  <td>
                    <input type="text" className="form-control" style={{border: "none"}} />
                  </td>
                </tr>
                <tr>
                  <td style={{backgroundColor: "#D1E7DD"}}>15h-17h</td>
                  <td>
                    <input type="text" className="form-control" style={{border: "none"}} />
                  </td>
                  <td>
                    <input type="text" className="form-control" style={{border: "none"}} />
                  </td>
                  <td>
                    <input type="text" className="form-control" style={{border: "none"}} />
                  </td>
                  <td>
                    <input type="text" className="form-control" style={{border: "none"}} />
                  </td>
                  <td>
                    <input type="text" className="form-control" style={{border: "none"}} />
                  </td>
                  <td>
                    <input type="text" className="form-control" style={{border: "none"}} />
                  </td>
                </tr>
                <tr>
                  <td style={{backgroundColor: "#D1E7DD"}}>17h-19h</td>
                  <td>
                    <input type="text" className="form-control" style={{border: "none"}} />
                  </td>
                  <td>
                    <input type="text" className="form-control" style={{border: "none"}} />
                  </td>
                  <td>
                    <input type="text" className="form-control" style={{border: "none"}} />
                  </td>
                  <td>
                    <input type="text" className="form-control" style={{border: "none"}} />
                  </td>
                  <td>
                    <input type="text" className="form-control" style={{border: "none"}} />
                  </td>
                  <td>
                    <input type="text" className="form-control" style={{border: "none"}} />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
    </>

    
  );
};

export default EditableTable;
