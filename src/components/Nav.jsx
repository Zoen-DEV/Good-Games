import React from "react";
import logo from "../images/logo.png";
import { Link } from "react-router-dom";
import SearchBar from "./SearchBar";

const Nav = () => {
  return (
    <nav>
      <Link to="/">
        <img src={logo} alt="logo with a link to home" />
      </Link>
      <SearchBar />
      <Link className="link" to="/">
        HOME
      </Link>
      <Link className="link" to="/about">
        ABOUT
      </Link>
      <Link className="link" to="/create">
        ADD NEW GAME +
      </Link>
    </nav>
  );
};

export default Nav;
