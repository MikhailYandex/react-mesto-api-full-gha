import { useContext } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import Card from "./Card.js";

function Main({
  onEditAvatar,
  onEditProfile,
  onAddPlace,
  cards,
  onCardClick,
  onCardLike,
  onTrashClick,
}) {
  const userData = useContext(CurrentUserContext);

  return (
    <main>
      <section className="profile">
        <div className="profile__box">
          <div onClick={onEditAvatar} className="profile__avatar-container">
            <img
              src={userData.avatar}
              className="profile__avatar"
              alt="Аватар Жак-Ив-Кусто"
            />
          </div>
          <div className="profile__info">
            <h1 className="profile__name">{userData.name}</h1>
            <button
              onClick={onEditProfile}
              type="button"
              className="profile__edit-button"
            ></button>
            <p className="profile__text">{userData.about}</p>
          </div>
        </div>
        <button
          onClick={onAddPlace}
          type="button"
          className="profile__add-button"
        ></button>
      </section>
      <section className="elements">
        {cards.map((card) => (
          <Card
            key={card._id}
            card={card}
            onCardClick={onCardClick}
            onCardLike={onCardLike}
            onTrashClick={onTrashClick}
          />
        ))}
      </section>
    </main>
  );
}

export default Main;
