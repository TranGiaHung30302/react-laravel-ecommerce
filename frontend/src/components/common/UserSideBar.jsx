import React, { useContext } from "react";
import { AuthContext } from "../context/Auth.jsx";
import { Link } from "react-router-dom";

const UserSideBar = () => {
  const { logout } = useContext(AuthContext);

  return (
    <div className="card shadow mb-5 sidebar">
      <div className="card-body p4">
        <ul>
          <li>
            <Link to="/account">Account</Link>
          </li>
          <li>
            <Link to="#">Orders</Link>
          </li>
          <li>
            <Link to="#">Change Password</Link>
          </li>
          <li>
            <a href="" onClick={logout}>
              Logout
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default UserSideBar;
