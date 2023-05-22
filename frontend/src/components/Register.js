import { Link } from "react-router-dom";
import AuthForm from "./AuthForm";

const Register = ({ onRegister, buttonText }) => {

  return (
    <AuthForm
      title="Регистрация"
      nameForm="registration"
      buttonText={buttonText}
      onSubmit={onRegister}
    >
      <p className="auth__question">
        Уже зарегистрированы?&nbsp;
        <Link className="auth__question" to="/sign-in">
          Войти
        </Link>
      </p>
    </AuthForm>
  );
};

export default Register;
