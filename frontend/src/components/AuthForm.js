import { useEffect, useState } from "react";
import eyeImage from "../images/eye.svg";
import useFormWithValidation from "../hooks/useFormWithValidation";

const AuthForm = ({ onSubmit, nameForm, title, buttonText, children, loggedIn }) => {

  const { values, handleChange, errors, isValid, resetForm } = useFormWithValidation();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isValid) {
      onSubmit(values.email, values.password);
    }
  };

  useEffect(() => {
    if (loggedIn) resetForm();
  }, [loggedIn]);

  //смена видимости пароля и значка картинки
  const [type, setType] = useState("password");
  const [toggleIconClasses, setToggleIconClasses] = useState("");

  const togglePassInput = () => {
    if (type === "password") {
      setType("text");
      setToggleIconClasses("auth__pasword-btn_active");
    } else {
      setType("password");
      setToggleIconClasses("");
    }
  };

  return (
    <main>
      <section className="auth">
        <h2 className="auth__title">{title}</h2>
        <form name={nameForm} onSubmit={handleSubmit}>
          <label className="auth__label">
            <input
              className="auth__input"
              type="email"
              name="email"
              required
              placeholder="Email"
              value={values.email || ""}
              onChange={handleChange}
            />
            <span
              className={`email-error popup__input-error ${
                errors.email && "popup__input-error_active"
              }`}
            >
              {errors.email || ""}
            </span>
          </label>
          <label className="auth__label auth__label-pass">
            <input
              className="auth__input"
              type={type}
              name="password"
              required
              placeholder="Пароль"
              minLength="6"
              value={values.password || ""}
              onChange={handleChange}
            />
            <span
              className={`password-error popup__input-error ${
                errors.password && "popup__input-error_active"
              }`}
            >
              {errors.password || ""}
            </span>
            <div
              onClick={togglePassInput}
              className={`auth__pasword-btn ${toggleIconClasses}`}
            >
              <img src={eyeImage} className="auth__pasword-btn" />
            </div>
          </label>
          <button disabled={!isValid} type="submit" className={`auth__submit-button ${
              !isValid && "auth__submit-button_disabled"
            }`}>{buttonText}</button>
        </form>
        {children}
      </section>
    </main>
  );
};

export default AuthForm;
