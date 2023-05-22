import { useNavigate } from "react-router-dom";

const PageNotFound = () => {
	const navigate = useNavigate();

  return (
    <div className="notfound">
      <h2 className="notfound__text">
        Ошибка 404! <br />
        Такой страницы не существует!
      </h2>
      <button
        className="notfound__button"
        onClick={() => {
          navigate(-1);
        }}
      >
        Вернуться назад
      </button>
    </div>
  );
};

export default PageNotFound;
