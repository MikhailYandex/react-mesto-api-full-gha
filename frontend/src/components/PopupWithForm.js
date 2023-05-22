import { useEffect } from "react";

function PopupWithForm({
  isOpen,
  onClose,
  name,
  title,
  titleClass,
  container,
  nameOfForm,
  onSubmit,
  children,
  isDisabled,
  buttonText,
}) {
  //закрытие по клавише Escape
  function closeByEscape(e) {
    if (e.key === "Escape") {
      onClose();
    }
  }

  useEffect(() => {
    if (isOpen) {
      document.addEventListener("keydown", closeByEscape);
      return () => {
        document.removeEventListener("keydown", closeByEscape);
      };
    }
  }, [isOpen]);

  return (
    <div
      className={`popup popup_type_${name} ${isOpen ? "popup_opened" : ""}`}
      onClick={onClose}
    >
      <div
        className={`popup__container${container}`}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          className="popup__close"
          onClick={onClose}
        />
        <h2 className={`popup__title${titleClass}`}>{title}</h2>
        <form
          className={`popup__form popup__form_${nameOfForm}`}
          noValidate
          onSubmit={onSubmit}
        >
          {children}
          <button
            type="submit"
            disabled={isDisabled}
            className={`popup__button ${
              isDisabled && "popup__button_disabled"
            }`}
          >
            {buttonText || "Сохранить"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default PopupWithForm;
