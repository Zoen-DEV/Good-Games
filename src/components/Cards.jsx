import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import logo from "../images/logo.png";
import Loader from "./Loader";

const Cards = ({ page }) => {
  const state = useSelector((state) => state);
  if (!state.videogames[0]) {
    return <Loader />;
  } else {
    return (
      <div className="cards">
        {state.videogames[page]?.map((item) => {
          const released = item.released.slice(0, 10);
          let gameGenres = [];
          if (item.genresId) {
            const toNum = item.genresId.map((item) => Number(item));
            state.genres.forEach((item) => {
              if (toNum.includes(Number(item.id))) {
                gameGenres.push(item.name);
              }
            });
          } else {
            gameGenres = item.genres;
          }
          return (
            <Link to={`/game/${item.id}`} className="card" key={item.id}>
              <div className="genres">
                {gameGenres?.map((item, index) => {
                  return <p key={index}>{item}</p>;
                })}
              </div>
              <img src={item.image ? item.image : logo} alt={item.name} />
              <div className="info">
                <h3>{item.name}</h3>
                <p className="rating">⭐{item.rating}</p>
                <p className="released">{released}</p>
              </div>
            </Link>
          );
        })}
      </div>
    );
  }
};

export default Cards;
