import React from 'react'

const Status = (props) => {
  return (
      <>
         {/* <div style={{ width: 70, marginTop: 3, height: 20, borderRadius: 7, backgroundImage: props.bgColor, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, boxShadow: "0 1px 1px rgba(0, 0, 0, 0.2)", fontWeight: "bold", color: "white" }}> */}
         <div style={{ width: 70, marginTop: 3, height: 20, borderRadius: 7, backgroundImage: props.bgColor, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: "bold", color: "white" }}>
                {props.titre}
              </div> 
      </>
  )
}

export default Status
