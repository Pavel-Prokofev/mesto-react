import React from 'react';

import PopupWithForm from './PopupWithForm.js';

function AddPlacePopup(props) {

  const [title, setTitle] = React.useState('');
  const [imgUrl, setImgUrl] = React.useState('');

  React.useEffect(() => {
    setTitle('');
    setImgUrl('');
  }, [props.isOpen]);

  const handleChangeTitle = (evt) => {
    setTitle(evt.target.value);
  };

  const handleChangeImgUrl = (evt) => {
    setImgUrl(evt.target.value);
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();

    props.onAddPlace({
      name: title,
      link: imgUrl
    });
  };

  return (
    <PopupWithForm name='add' title='Новое место' buttonText={props.buttonText} errorText={props.errorText} isOpen={props.isOpen} onClose={props.onClose} onSubmit={handleSubmit}>
      <fieldset className="popup__personal-data">
        <input type="text" name="title" id="title-input" className="popup__text-box popup__text-box_type_title"
          value={title} onChange={handleChangeTitle} placeholder="Название" required minLength="2" maxLength="30" />
        <span className="popup__text-box-error title-input-error"></span>
        <input type="url" name="img" id="img-src-input" className="popup__text-box popup__text-box_type_img-src"
          value={imgUrl} onChange={handleChangeImgUrl} placeholder="Ссылка на картинку" required />
        <span className="popup__text-box-error img-src-input-error"></span>
      </fieldset>
    </PopupWithForm>
  );
}

export default AddPlacePopup;