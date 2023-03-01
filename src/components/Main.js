import React from 'react';
import api from '../utils/api.js';
import Card from './Card.js';

function Main(props) {
  const [userName, setUserName] = React.useState('Имя пользователя');
  const [userDescription, setUserDescription] = React.useState('Краткая информация о пользователе');
  const [userAvatar, setUserAvatar] = React.useState('#');
  const [userId, setUserId] = React.useState('');
  const [cards, setCards] = React.useState([]);

  React.useEffect(() => {
    api.getUserInfo()
      .then((res) => {
        setUserName(res.name);
        setUserDescription(res.about);
        setUserAvatar(res.avatar);
        setUserId(res._id);
        if (res._id) {
          api.getAllCards()
            .then((res) => {
              setCards(res);
            })
            .catch((err) => {
              props.onErrorPopup(`Ошибка при загрузке карточек с сервера: ${err}.`);
            });
        }
      })
      .catch((err) => {
        props.onErrorPopup(`Ошибка при загрузке данных пользователя с сервера: ${err}.`);
      });
  }, []);

  return (
    <main className="content">

      <section className="profile">
        <div className="profile__box">
          <div className="profile__avatar-box" onClick={props.onEditAvatar}>
            <img className="profile__avatar" src={userAvatar} alt="Аватарка" />
          </div>
          <div className="profile__bio">
            <div className="profile__wrap">
              <h1 className="profile__name">{userName}</h1>
              <p className="profile__info">{userDescription}</p>
            </div>
            <button type="button" className="profile__edit-button button-opacity" onClick={props.onEditProfile}></button>
          </div>
        </div>

        <button type="button" className="profile__add-button button-opacity" onClick={props.onAddPlace}></button>
      </section>

      <section className="gallery" aria-label="Фото галерея">
        <ul className="gallery__cards">
          <Card cards={cards} userId={userId} onCardClick={props.onCardClick} onUrn={props.onConfirmationPopup} dellCardId={props.dellCardId}/>
        </ul>
      </section>

    </main>
  );
}

export default Main;

