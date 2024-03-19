import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { FaBars } from 'react-icons/fa';
// import Logo from "../img/logo.png"
import { Link } from 'react-router-dom';

function OffCanvas({items, selectt, setSelectt}) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      {/* <div className="d-flex justify-content-between"> */}
        <Button onClick={handleShow} color='#050505' style={{ backgroundColor: "white", border: "none", fontFamily: "Poppins, sans-serif", }}>
          <FaBars color='#050505' />
        </Button>
        
        {/* <div className="">
          <img src={Logo} width={120} alt="" />
        </div> */}
      {/* </div> */}
      <Offcanvas show={show} onHide={handleClose} className="offcanva" style={{backgroundColor: "white", fontFamily: "Poppins, sans-serif",}}>
        <Offcanvas.Header closeButton style={{ color: "white" }}>
          <Offcanvas.Title style={{ color: "black" }}>Menu</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          {items.map((item, i) => {
            return (
              <Link to={item.to} onClick={(() => { setSelectt(i); handleClose(); localStorage.setItem("selectt", i); })} className={selectt === i ? "my-2 sidebar-item active" : "my-2 sidebar-item"} key={i} style={{ fontSize: `${20}px`, }}>
            <div className="sidebar-icon" >{item.icon}</div>
            <div className="sidebar-title fw-semibold">{item.title}</div>
          </Link> 
            )
          })}
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}

export default OffCanvas;