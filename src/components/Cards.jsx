import React from 'react'

const Cards = (props) => {
  return (
      <>
          <div className="card" style={{width: "300px"}}>
              <img src={props.img} className="card-img-top" alt="..." />
              <div className="card-body">
                  <h5 className="card-title">{props.titre}</h5>
                  {/* <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p> */}
              </div>
              <ul className="list-group list-group-flush">
                  {props.children}
              </ul>
          </div>
      </>
  )
}

export default Cards
