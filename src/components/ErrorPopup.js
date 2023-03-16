import React from 'react';

function ErrorPopup(props) {

  React.useEffect(() => {
    if (props.isOpen) {

      document.addEventListener('click', props.onClose);
      document.addEventListener('keydown', props.onClose);

      return () => {
        document.removeEventListener('click', props.onClose);
        document.removeEventListener('keydown', props.onClose);
      };
    };
  }, [props.isOpen]);

  return (
    <div className={`popup popup_error ${props.isOpen.tugle && 'popup_opened'}`}>
      <div className="popup__content">
        <button type="button" className="popup__close-button button-opacity"></button>
        <h2 className="popup__title">{props.isOpen.errorPopupText}</h2>
      </div>
    </div>
  );
}

export default ErrorPopup;

