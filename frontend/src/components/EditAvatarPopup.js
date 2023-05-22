import { useEffect } from "react";
import useFormWithValidation from "../hooks/useFormWithValidation";
import PopupWithForm from "./PopupWithForm";

const EditAvatarPopup = ({ isOpen, onClose, onUpdateAvatar, buttonText }) => {
  const { values, handleChange, errors, isValid, resetForm } =
    useFormWithValidation();

  useEffect(() => {
    resetForm();
  }, [isOpen, resetForm]);

  function handleSubmit(e) {
    e.preventDefault();

    onUpdateAvatar({
      avatar: values.avatar || "",
    });
  }

  return (
    <PopupWithForm
      isOpen={isOpen}
      title={"Обновить аватар"}
      name={"avatar"}
      buttonText={buttonText}
      nameOfForm={"avatar"}
      container={"-avatar"}
      onClose={onClose}
      onSubmit={handleSubmit}
      titleClass={"-avatar"}
      isDisabled={!isValid}
    >
      <input
        type="url"
        className={`popup__input popup__input_avatar ${
          errors.avatar && "popup__input_type_error"
        }`}
        placeholder="Ссылка на картинку"
        required
        name="avatar"
        value={values.avatar || ""}
        onChange={handleChange}
      ></input>
      <span
        className={`avatar-error popup__input-error ${
          errors.avatar && "popup__input-error_active"
        }`}
      >
        {errors.avatar || ""}
      </span>
    </PopupWithForm>
  );
};

export default EditAvatarPopup;
