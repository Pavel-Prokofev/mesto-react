import React from 'react';

function PopupWithForm(props) {

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
    <div className={`popup popup_${props.name} ${props.isOpen && 'popup_opened'}`}>
      <div className="popup__content">
        <button type="button" className="popup__close-button button-opacity"></button>
        <h2 className="popup__title">{`${props.title}`}</h2>
        <form name={`${props.name}`} className="popup__form" noValidate>
          {props.children}
          <button type="submit" className="popup__save-button">{`${props.buttonText}`}</button>
        </form>
        <span className="popup__text-box-error loading-error"></span>
      </div>
    </div>
  );
}

export default PopupWithForm;
