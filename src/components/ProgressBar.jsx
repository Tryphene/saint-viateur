import React from 'react'

const ProgressBarr = (props) => {
  return (
      <>
          {/* <div className="progress" style={{ marginTop: 8, width: props.largeur, height: props.longueur, borderRadius: 7, }}>
              <div className="progress-bar progress-bar-striped progress-bar-animated"
                  role="progressbar"
                  aria-label="Animated striped example"
                  style={{ width: props.width, backgroundImage: props.bgColor }}
                  aria-valuenow="25"
                  aria-valuemin="0"
                  aria-valuemax="100">{props.titre }</div>
          </div> */}

          <div className="progress" style={{ marginTop: 8, width: 130, height: 7, borderRadius: 7, fontSize: 10, }}>
              <div className="progress-bar" role="progressbar" aria-label="Basic example" style={{ width: props.width, backgroundImage: props.bgColor}} aria-valuenow="25" aria-valuemin="0" aria-valuemax="100">{props.titre}</div>
          </div>

          {/* <div className="progress" style={{ marginTop: 8, width: props.largeur, height: props.longueur, borderRadius: 7, }}>
              <div
                  className="progress-bar progress-bar-striped progress-bar-animated"
                  role="progressbar" 
                  aria-label="Animated striped example" 
                  aria-valuenow="75"
                  aria-valuemin="0" 
                  aria-valuemax="100"
                  style={{ width: props.width, backgroundImage: props.bgColor  }}>{props.titre }</div>
          </div> */}
          {/* <ProgressBar>
              <ProgressBar striped variant="success" now={35} key={1} />
              <ProgressBar variant="warning" now={20} key={2} />
              <ProgressBar striped variant="danger" now={10} key={3} />
          </ProgressBar> */}
      </>
  )
}

export default ProgressBarr
