import React from "react";
import { Link } from "react-router-dom";

const RightMenu = ({ isAuth, onLogout }) => {
  return (
    <div className="right-menu">
      {isAuth ? (
        <>
          <Link onClick={() => onLogout()} to="/auth/signIn">
            Выход
          </Link>
        </>
      ) : (
        ""
      )}
    </div>
  );
};

export default RightMenu;
