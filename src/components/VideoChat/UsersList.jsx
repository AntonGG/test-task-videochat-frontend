import React from "react";
import { Link, useHistory } from "react-router-dom";
import "../../sass/leftMenuList.sass";
const UsersList = ({ users, activeRoom }) => {
  const history = useHistory();
  return (
    <div className="left-menu-list">
      {users &&
        users.map((user, i) => (
          <div
            onClick={() => {
              history.push(`/vc/videochat/${user.userId}/user`);
              window.location.reload();
            }}
            key={i}
            className={`left-menu-list__item ${
              user.userId === activeRoom ? "left-menu-list__item__active" : ""
            }`}
          >
            <div>
              <p
                style={{ backgroundColor: `${user.color}a1` }}
                className="left-menu-list__logo"
              >
                {user.name.substr(0, 1).toUpperCase()}
              </p>
            </div>
            <div>
              <p>{user.name}</p>
              {/* <p>{room.roomId}</p> */}
            </div>
          </div>
        ))}
    </div>
  );
};

export default UsersList;
