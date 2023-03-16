import React from 'react';

import PopupWithForm from './PopupWithForm.js';
import { CurrentUserContext } from '../contexts/CurrentUserContext.js';

function EditProfilePopup(props) {

  const currentUser = React.useContext(CurrentUserContext);

  const [name, setName] = React.useState('');
  const [description, setDescription] = React.useState('');

  React.useEffect(() => {
    currentUser.name ? setName(currentUser.name) : setName('');
    currentUser.about ? setDescription(currentUser.about) : setDescription('');
  }, [currentUser, props.isOpen]);

  const handleChangeName = (evt) => {
    setName(evt.target.value);
  };

  const handleChangeDescription = (evt) => {
    setDescription(evt.target.value);
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();

    props.onUpdateUser({
      name,
      about: description,
    });
  };

  return (
    <PopupWithForm name='edit' title='Редактировать профиль' buttonText={props.buttonText} errorText={props.errorText} isOpen={props.isOpen} onClose={props.onClose} onSubmit={handleSubmit}>
      <fieldset className="popup__personal-data">
        <input type="text" name="username" id="username-input" className="popup__text-box popup__text-box_type_name"
          value={name} onChange={handleChangeName} placeholder="Имя" required minLength="2" maxLength="40" />
        <span className="popup__text-box-error username-input-error"></span>
        <input type="text" name="occupation" id="occupation-input" className="popup__text-box popup__text-box_type_info"
          value={description} onChange={handleChangeDescription} placeholder="Личная информация" required minLength="2" maxLength="200" />
        <span className="popup__text-box-error occupation-input-error"></span>
      </fieldset>
    </PopupWithForm>
  );
}

export default EditProfilePopup;