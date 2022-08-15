import React, { useState } from "react";
import { useDispatch } from "react-redux";
import lupa from "../images/lupa.png";
import { getSomeGames } from "../redux/actions";

const SearchBar = () => {
  const [name, setName] = useState("");
  const dispatch = useDispatch();
  const handleChange = (e) => {
    setName(e.target.value);
  };
  const onSubmit = (e) => {
    e.preventDefault()
    dispatch(getSomeGames(name))
    setName('')
  }
  return (
    <form onSubmit={onSubmit} className="search">
      <input
        onChange={handleChange}
        className="input-text"
        type="text"
        value={name}
        placeholder="Search by name"
      />
      <button type="submit">
        <img src={lupa} alt="search icon" />
      </button>
    </form>
  );
};

export default SearchBar;
