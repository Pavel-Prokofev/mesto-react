function Card(props) {

  function checkMyLike(card) {
    return card.likes.some(like => like._id === props.userId)
  };

  function handleClickImg(card) {
    props.onCardClick({ name: card.name, link: card.link });
  }

  function handleClickUrn(card) {
    props.onUrn();
    props.dellCardId(card._id);
  }

  return (

    props.cards.map(card => (
      <li key={card._id} className="gallery__card">
        {card.owner._id === props.userId && (<button type="button" className="gallery__card-trash button-opacity"
          onClick={() => { handleClickUrn(card) }}></button>)}
        <img className="gallery__card-image" src={card.link} alt={card.name} onClick={() => { handleClickImg(card) }} />
        <div className="gallery__wrap">
          <h2 className="gallery__card-title">{card.name}</h2>
          <div className="gallery__card-like-box">
            <button type="button" className={`gallery__card-like ${checkMyLike(card) && 'gallery__card-like_active'}`}></button>
            <p className="gallery__card-like-counter">{card.likes.length}</p>
          </div>
        </div>
      </li>
    ))
  );
}

export default Card;