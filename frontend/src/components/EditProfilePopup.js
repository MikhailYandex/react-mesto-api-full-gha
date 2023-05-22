import { CurrentUserContext } from "../contexts/CurrentUserContext";
import { useContext, useEffect } from "react";
import PopupWithForm from "./PopupWithForm";
import useFormWithValidation from "../hooks/useFormWithValidation";

const EditProfilePopup = ({ isOpen, onUpdateUser, onClose, buttonText }) => {
  const { values, handleChange, errors, isValid, setIsValid, resetForm } =
    useFormWithValidation();

  const currentUser = useContext(CurrentUserContext);

  useEffect(() => {
    if (currentUser) {
      resetForm({
        name: currentUser.name,
        text: currentUser.about,
      });
      setIsValid(true);
    }
  }, [currentUser, resetForm, setIsValid, isOpen]);

  function handleSubmit(e) {
    e.preventDefault();

    onUpdateUser({
      name: values.name || "",
      about: values.text || "",
    });
  }

  return (
    <PopupWithForm
      isOpen={isOpen}
      title={"Редактировать профиль"}
      name={"edit"}
      buttonText={buttonText}
      nameOfForm={"edit"}
      container={""}
      titleClass={""}
      onClose={onClose}
      onSubmit={handleSubmit}
      isDisabled={!isValid}
    >
      <input
        type="text"
        className={`popup__input popup__input_name ${
          errors.name && "popup__input_type_error"
        }`}
        placeholder="Имя"
        required
        minLength="2"
        maxLength="40"
        name="name"
        value={values.name || ""}
        onChange={handleChange}
      ></input>
      <span
        className={`name-error popup__input-error ${
          errors.name && "popup__input-error_active"
        }`}
      >
        {errors.name || ""}
      </span>
      <input
        type="text"
        className={`popup__input popup__input_text ${
          errors.text && "popup__input_type_error"
        }`}
        placeholder="О себе"
        required
        minLength="2"
        maxLength="200"
        name="text"
        value={values.text || ""}
        onChange={handleChange}
      ></input>
      <span
        className={`text-error popup__input-error ${
          errors.text && "popup__input-error_active"
        }`}
      >
        {errors.text || ""}
      </span>
    </PopupWithForm>
  );
};

export default EditProfilePopup;
