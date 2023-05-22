import PopupWithForm from "./PopupWithForm";

const ConfirmationPopup = ({ isOpen, onClose, onCardDelete, buttonText }) => {
  function handleSubmit(e) {
    e.preventDefault();
    onCardDelete();
  }

  return (
    <PopupWithForm
      title="Вы уверены?"
      name="confirm"
      nameOfForm={"confirm"}
      buttonText={buttonText}
      container={"-confirm"}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      titleClass={"-confirm"}
    ></PopupWithForm>
  );
};

export default ConfirmationPopup;
