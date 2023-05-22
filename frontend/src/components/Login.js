import AuthForm from "./AuthForm";

const Login = ({ onLogin, buttonText }) => {

	return (
		<AuthForm
      title="Вход"
      nameForm="authentication"
      buttonText={buttonText}
      onSubmit={onLogin}
    />
	)
}

export default Login;