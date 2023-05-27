import { CurrentUserContext } from "../contexts/CurrentUserContext";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import { useEffect, useState } from "react";
import ImagePopup from "./ImagePopup";
import api from "../utils/api";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import ConfirmationPopup from "./ConfirmationPopup";
import { Route, Routes, useNavigate } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import Register from "./Register";
import Login from "./Login";
import PageNotFound from "./PageNotFound";
import * as auth from "../utils/auth";
import InfoTooltip from "./InfoTooltip";

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isImagePopupOpen, setIsImagePopupOpen] = useState(false);
  const [isConfirmationPopupOpen, setIsConfirmationPopupOpen] = useState(false);

  //оповещение о статусе регистрации
  const [isInfoTooltip, setIsInfoTooltip] = useState(false);
  const [isInfoTooltipOk, setIsInfoTooltipOk] = useState(false);

  //проверка, авторизован ли пользователь
  const [loggedIn, setLoggedIn] = useState(false);

  //данные пользователя
  const [userEmail, setUserEmail] = useState("");

  const [selectedCard, setSelectedCard] = useState({});

  //действующий пользователь
  const [currentUser, setCurrentUser] = useState({});

  //массив карточек с сервера
  const [cards, setCards] = useState([]);

  //карточки, которые нужно удалить
  const [removingCard, setRemovingCard] = useState({});

  //Загрузка данных при клике на кнопку
  const [isLoadingButton, setIsLoadingButton] = useState(false);

  const navigate = useNavigate();

  //обработчик лайка карточки
  function handleCardLike(card) {
    const isLiked = card.likes.some((i) => i === currentUser._id);

    api
      .handleCardLike(card._id, isLiked)
      .then((data) => {
        setCards((cards) => cards.map((c) => (c._id === card._id ? data : c)));
      })
      .catch((err) => console.log(err));
  }

  //отправка новых данных пользователя на сервер
  function handleUpdateUser(data) {
    setIsLoadingButton(true);
    api
      .editUserInfo(data.name, data.about)
      .then((newData) => {
        setCurrentUser(newData);
        closeAllPopups();
      })
      .catch((err) => console.log(err))
      .finally(() => setIsLoadingButton(false));
  }

  //отправка новой аватарки на сервер
  function handleUpdateAvatar(link) {
    setIsLoadingButton(true);
    api
      .editUserAvatar(link)
      .then((data) => {
        setCurrentUser(data);
        closeAllPopups();
      })
      .catch((err) => console.log(err))
      .finally(() => setIsLoadingButton(false));
  }

  //добавление новой карточки из формы
  function handleAddPlaceSubmit(data) {
    setIsLoadingButton(true);
    api
      .addCard(data)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((err) => console.log(err))
      .finally(() => setIsLoadingButton(false));
  }

  //обработчик удаления карточки
  function handleCardDelete() {
    setIsLoadingButton(true);
    api
      .removeCard(removingCard._id)
      .then(() => {
        setCards((cards) => cards.filter((c) => c._id !== removingCard._id));
        closeAllPopups();
      })
      .catch((err) => console.log(err))
      .finally(() => setIsLoadingButton(false));
  }

  function onRegister(email, password) {
    setIsLoadingButton(true);
    auth
      .register(email, password)
      .then(() => {
        setIsInfoTooltipOk(true);
        navigate("/sign-in", { replace: true });
      })
      .catch((err) => {
        setIsInfoTooltipOk(false);
        console.log(err);
      })
      .finally(() => setIsLoadingButton(false))
			.finally(() => setIsInfoTooltip(true))
  }

  function onLogin(email, password) {
    setIsLoadingButton(true);
    auth
      .authorize(email, password)
      .then((data) => {
        if (data.token) {
          navigate("/", { replace: true });
          setLoggedIn(true);
          localStorage.setItem("token", data.token);
          setUserEmail(email);
        }
      })
      .catch((err) => {
        setIsInfoTooltipOk(false);
        setIsInfoTooltip(true);
        console.log(err);
      })
      .finally(() => setIsLoadingButton(false));
  }

  //при открытии страницы проверяется токен
  useEffect(() => {
    if (localStorage.getItem("token")) {
      const jwt = localStorage.getItem("token");
      auth
        .checkToken(jwt)
        .then((data) => {
          setUserEmail(data.email);
          setLoggedIn(true);
          navigate("/", { replace: true });
					api
            .getUserInfo()
            .then((data) => {
              setCurrentUser(data);
            })
            .catch((err) => {
              console.log(err);
            });
          api
            .getInitialCards()
            .then((data) => {
              setCards(data);
            })
            .catch((err) => {
              console.log(err);
            });
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, []);

  function handleSingOut() {
    localStorage.removeItem("token");
    setLoggedIn(false);
    navigate("/sing-in", { replace: true });
  }

  function handleCardDeleteClick(card) {
    setIsConfirmationPopupOpen(true);
    setRemovingCard(card);
  }

  function handleCardClick(data) {
    setSelectedCard(data);
    setIsImagePopupOpen(true);
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function closeAllPopups() {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsImagePopupOpen(false);
    setIsConfirmationPopupOpen(false);
    setIsInfoTooltip(false);
    setSelectedCard({});
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Header onSingOut={handleSingOut} userEmail={userEmail} />
        <Routes>
          <Route
            path="/"
            element={
              <ProtectedRoute
                loggedIn={loggedIn}
                onEditProfile={handleEditProfileClick}
                onAddPlace={handleAddPlaceClick}
                onEditAvatar={handleEditAvatarClick}
                onCardClick={handleCardClick}
                onCardLike={handleCardLike}
                onTrashClick={handleCardDeleteClick}
                cards={cards}
                element={Main}
              />
            }
          />
          <Route
            path="/sign-in"
            element={
              <Login
                buttonText={isLoadingButton ? "Подождите..." : "Войти"}
                onLogin={onLogin}
              />
            }
          />
          <Route
            path="/sign-up"
            element={
              <Register
                buttonText={
                  isLoadingButton ? "Подождите..." : "Зарегистрироваться"
                }
                onRegister={onRegister}
              />
            }
          />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
        <Footer />

        <InfoTooltip
          isOpen={isInfoTooltip}
          onClose={closeAllPopups}
          isInfoTooltipOk={isInfoTooltipOk}
        />

        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
          buttonText={isLoadingButton ? "Сохранение..." : "Сохранить"}
        />

        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlace={handleAddPlaceSubmit}
          buttonText={isLoadingButton ? "Сохранение..." : "Сохранить"}
        />

        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
          buttonText={isLoadingButton ? "Сохранение..." : "Сохранить"}
        />

        <ImagePopup
          card={selectedCard}
          onClose={closeAllPopups}
          isOpen={isImagePopupOpen}
        />

        <ConfirmationPopup
          isOpen={isConfirmationPopupOpen}
          onClose={closeAllPopups}
          onCardDelete={handleCardDelete}
          buttonText={isLoadingButton ? "Удаление..." : "Да"}
        />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
