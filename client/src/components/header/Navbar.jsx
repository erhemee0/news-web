import React, { useEffect, useState } from "react";
import { useLocation } from 'react-router-dom';
import sprite from "../../images/sprite-1.svg";
import "../../styles/navbar.css";
import Logout from "../logout";
import Search from "./Search";
import { Link } from "react-router-dom";
import { categorys } from "../../utils/categorys";
import jwt from "jsonwebtoken";
import { getDataAPI } from "../../utils/fetchData";
import logo from "../../images/csi_logo.png";

const Navbar = () => {
  const [user, setUser] = useState([]);
  const { role } = user;
  const id = jwt.decode(localStorage.getItem("user")).id;
  useEffect(() => {
    async function fetchData() {
      const res = await getDataAPI(`user/${id}`);
      setUser(res.data.user);
    }
    fetchData();
  }, [id, setUser]);

  const categoryNews = (category) => {
    const url = `/category/${category}`;
    window.location.href = url;
  };
  const toggleBtn = () => {
    const collapsibles = document.querySelectorAll(".collapsible");
    collapsibles.forEach((item) =>
      item.addEventListener("click", function () {
        this.classList.toggle("collapsible--expanded");
      })
    );
  };

  const location = useLocation();
  const [isCategoryVisible, setIsCategoryVisible] = useState(false);

  const toggleCategory = () => {
    setIsCategoryVisible((prev) => !prev);
  };

  const closeCategory = () => {
    setIsCategoryVisible(false);
  };

  const isCategoryPage = location.pathname === '/';

  return (
    <header>
      <nav className="nav collapsible collapsible--expanded">
        <Link className="nav__brand" to="/">
          <img src={logo} className="logo_nav" alt="logo" />
        </Link>
        <svg onClick={toggleBtn} className="icon nav__toggler">
          <use href={sprite + "#menu"}></use>
        </svg>

        <ul className="list nav__list collapsible__content">
          <li className="nav__item" onClick={toggleCategory}>
            <Link to="/">Мэдээ</Link>
          </li>
          <li className="nav__item">
            <Link to="/aboutus">Бидний тухай</Link>
          </li>
          {role === "admin" && (
            <li className="nav__item">
              <Link to="/admin">Админ</Link>
            </li>
          )}
          <li className="nav__item">
            <Link to={`/profile/${id}`}>Хувийн мэдээлэл</Link>
          </li>
          <li className="nav__item">
            <Link to="/">
              <Logout />
            </Link>
          </li>
        </ul>
        <Search sprite={sprite} />
      </nav>
      <div className="category">
        {isCategoryPage && isCategoryVisible && (
          <ul
            className="sub__list block-domain__prices"
            onClick={closeCategory}
          >
            {categorys.map((cate) => (
              <li
                className="badge"
                key={cate.name}
                onClick={() => categoryNews(cate.name)}
              >
                {cate.name}
              </li>
            ))}
          </ul>
        )}
      </div>
    </header>
  );
};

export default Navbar;
