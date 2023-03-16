import React from 'react';

import PopupWithForm from './PopupWithForm.js';

function EditAvatarPopup(props) {

  const avatarUrlRef = React.useRef();

  React.useEffect(() => {
    avatarUrlRef.current.value = '';
  }, [props.isOpen]);

  const handleSubmit = (evt) => {
    evt.preventDefault();

    props.onUpdateUserAvatar({
      avatar: avatarUrlRef.current.value
    });
  };

  return (
    <PopupWithForm name='edit-avatar' title='Обновить аватар' buttonText={props.buttonText} errorText={props.errorText} isOpen={props.isOpen} onClose={props.onClose} onSubmit={handleSubmit}>
      <fieldset className="popup__personal-data">
        <input ref={avatarUrlRef} type="url" name="avatar" id="avatar-input" className="popup__text-box popup__text-box_type_avatar-src"
          defaultValue="" placeholder="Ссылка на аватар" required />
        <span className="popup__text-box-error avatar-input-error"></span>
      </fieldset>
    </PopupWithForm>
  );
}

export default EditAvatarPopup;