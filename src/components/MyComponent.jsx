import React, { useState } from 'react';
import { Toast } from 'bootstrap';

function MyComponent(props) {
  const [alertVisible, setAlertVisible] = useState(false);
  const toastRef = React.useRef(null);

  React.useEffect(() => {
    if (toastRef.current) {
      const toast = new Toast(toastRef.current);
      if (alertVisible) {
        toast.show();
      } else {
        toast.hide();
      }
    }
  }, [alertVisible]);

  return (
    <div>
      <button type="button" className="btn btn-primary" onClick={(event) => { setAlertVisible(true); props.submit(event) }}>
        Envoyer
      </button>

          {alertVisible && (
              <div className="toast-container position-fixed top-0 start-50 translate-middle-x p-3">
        <div id="liveToast" className="toast" role="alert" aria-live="assertive" aria-atomic="true" ref={toastRef}>
          <div className="toast-header">
            <img width={20} src={props.image} className="rounded me-2" alt="..." />
            <strong className="me-auto">{props.titre}</strong>
            {/* <small>11 mins ago</small> */}
            <button type="button" className="btn-close" data-bs-dismiss="toast" aria-label="Close" onClick={() => setAlertVisible(false)}></button>
          </div>
          <div className="toast-body">
            {props.message}
          </div>
        </div></div>
      )}
    </div>
  );
}

export default MyComponent;
