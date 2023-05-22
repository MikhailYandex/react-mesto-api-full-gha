import { useState } from "react";
import { Link, Route, Routes } from "react-router-dom";
import logo from "../images/svg/logo.svg";

function Header({ userEmail, onSingOut }) {
	const [isBurgerActive, setIsBurgerActive] = useState(false);

	window.onresize = () => {
    setIsBurgerActive(false);
  };

  function signOut() {
    setIsBurgerActive(false);
    onSingOut();
  }

  return (
    <header className={`header ${isBurgerActive ? 'header_active' : ''}`}>
      <img src={logo} className="header__logo" alt="Логотип Место Россия" />
      <Routes>
        <Route
          path="/sign-in"
          element={
            <Link className="header__links" to="/sign-up">
              Регистрация
            </Link>
          }
        />
        <Route
          path="/sign-up"
          element={
            <Link className="header__links" to="/sign-in">
              Войти
            </Link>
          }
        />
        <Route
          path="/"
          element={
						<>
							<div className={`header__auth ${isBurgerActive ? 'header__auth_active' : ''}`}>
								<p className="header__email">{userEmail}</p>
								<Link className="header__logout" to="/sign-in" onClick={signOut}>
									Выйти
								</Link>
							</div>
							<button
								className="burger"
								type="button"
								onClick={() => setIsBurgerActive(!isBurgerActive)}
							>
							<span
								className={`burger__line ${isBurgerActive ? 'burger__line_active' : ''}`}
							/>
						</button>
					</>
          }
        />
      </Routes>
    </header>
  );
}

export default Header;
