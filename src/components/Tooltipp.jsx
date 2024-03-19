import React from 'react'
import { OverlayTrigger, Tooltip } from 'react-bootstrap'
import dates from "../img/dates.png"


const Tooltipp = ({children, titre}) => {
  const renderTooltip = (props) => (
    <Tooltip id="button-tooltip" {...props}>
      {titre}
    </Tooltip>
  );

  return (
    <>
      <OverlayTrigger
        placement="bottom"
        delay={{ show: 250, hide: 400 }}
        overlay={renderTooltip}
      >
        {children}
      </OverlayTrigger>
        </>
    )
}

export default Tooltipp
