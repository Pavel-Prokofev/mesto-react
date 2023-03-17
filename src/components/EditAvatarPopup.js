import React from 'react';

import PopupWithForm from './PopupWithForm.js';

function EditAvatarPopup(props) {

  const avatarUrlRef = React.useRef();
  const [avatarError, setAvatarError] = React.useState('');
  const [isValid, setisValid] = React.useState(false);

  React.useEffect(() => {
    setAvatarError('');
    setisValid(false);
    avatarUrlRef.current.value = '';
  }, [props.isOpen]);


  const checkValid = async (inputElement, errorElement, validElement) => {
    !inputElement.target.validity.valid ? validElement(false) : validElement(true);
    !inputElement.target.validity.valid ? errorElement(inputElement.target.validationMessage) : errorElement('');
  };

  const handleChangeAvatar = (evt) => {

    checkValid(evt, setAvatarError, setisValid);
  };

  const handleSubmit = () => {
    props.onUpdateUserAvatar({
      avatar: avatarUrlRef.current.value
    });
  };

  return (
    <PopupWithForm name='edit-avatar' title='Обновить аватар' buttonText={props.buttonText} errorText={props.errorText}
      isOpen={props.isOpen} onClose={props.onClose} onSubmit={handleSubmit} isValid={isValid}>
      <fieldset className="popup__personal-data">
        <input ref={avatarUrlRef} onChange={handleChangeAvatar} type="url" name="avatar" id="avatar-input" className="popup__text-box popup__text-box_type_avatar-src"
          defaultValue="" placeholder="Ссылка на аватар" required />
        <span className="popup__text-box-error avatar-input-error">{avatarError}</span>
      </fieldset>
    </PopupWithForm>
  );
}

export default EditAvatarPopup;