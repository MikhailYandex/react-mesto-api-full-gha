import { useContext } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Card({ card, onCardClick, onCardLike, onTrashClick }) {
  const userData = useContext(CurrentUserContext);

  //проверка собственник ли карточки
  const isOwner = card.owner === userData._id;

  //проверяем, есть ли у карточки лайк, поставленный текущим пользователем
  const isLiked = card.likes.some((i) => i === userData._id);

  //переменная для кнопки лайка
  const cardLikeButtonClassName = `element__like ${
    isLiked && "element__like_active"
  }`;

  function handleClick() {
    onCardClick(card);
  }

  function handleLikeClick() {
    onCardLike(card);
  }

  function handleTrashClick() {
    onTrashClick(card);
  }

  return (
    <article className="element">
      {isOwner && (
        <button
          className="element__delete-icon"
          type="button"
          onClick={handleTrashClick}
        ></button>
      )}
      <img
        src={card.link}
        className="element__photo"
        alt={card.name}
        onClick={handleClick}
      />
      <div className="element__group">
        <h2 className="element__text">{card.name}</h2>
        <div className="element__like-block">
          <button
            type="button"
            className={cardLikeButtonClassName}
            onClick={handleLikeClick}
          ></button>
          <p className="element__like-counter">{card.likes.length}</p>
        </div>
      </div>
    </article>
  );
}

export default Card;
