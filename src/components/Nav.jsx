import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import "../styles/Nav.css"
import { FaBars, FaTimes } from 'react-icons/fa'
import { BiLogOut } from 'react-icons/bi'

const Nav = (props) => {
    const [iconn, setIconn] = useState(true);
    const [menu, setMenu] = useState(false);

  return (
      <>
          <div className="nav">
              <div>
                  {iconn ? <FaBars size={25} className='ps-2' color='white' onClick={(() => { setIconn(false); setMenu(true) })} /> : <FaTimes size={25} className='ps-2' color='white' onClick={(() => { setIconn(true); setMenu(false) })} />}
              </div>
              <div>
                  <img className='el' src={"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSYvIrqn_BRRWhy0jyUMXYF4AAM-kd1xZg1mS___44ttA&s"} width={60} alt="" />
              </div>
              <div className='rond' onClick={props.deconnexion}>
                  <BiLogOut size={18} color='#B60520' />
              </div>
          </div>
          {menu && (<div className="menu">
              {props.items.map((item, index) => {
                  return (
                      <Link to={item.to} onClick={(() => { props.setSelect(index); setMenu(false); setIconn(true)})} className={props.select === index ? "sidebar-item active" : "sidebar-item"} key={index} style={{ fontSize: `${item.size}px`, color: 'white' }}>
                          <div className="sidebar-icon" >{item.icon}</div>
                          <div className="sidebar-title">{item.title}</div>
                      </Link>
                  )
              }
              )}
          </div>)
          }
      </>
  )
}

export default Nav
