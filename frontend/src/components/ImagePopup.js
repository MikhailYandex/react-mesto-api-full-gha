import { useEffect } from "react";

function ImagePopup({ isOpen, onClose, card }) {
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
      className={`popup popup_type_image ${isOpen ? "popup_opened" : ""}`}
      onClick={onClose}
    >
      <div
        className={`popup__container-image`}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="popup__close"
          type="button"
          onClick={onClose}
        ></button>
        <figure className="popup__figure">
          <img src={card.link} className="popup__image" alt={card.name} />
          <figcaption className="popup__caption">{card.name}</figcaption>
        </figure>
      </div>
    </div>
  );
}

export default ImagePopup;
