import React from "react";
import { Link } from "react-router-dom";
import "../../sass/notFound.sass";
const NotFound = () => {
  return (
    <div className="not-found">
      <p>404</p>
      <Link to="/" className="not-found__button">
        &#10229; Вернуться на главную
      </Link>
    </div>
  );
};

export default NotFound;
