import React from "react";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { getDetail } from "../redux/actions";
import logo from "../images/logo.png";

const GameDetail = () => {
  const { id } = useParams();
  const state = useSelector((state) => state.gameDetail);
  const games = useSelector((state) => state.allgames);
  const game = games.find((item) => Number(item.id) === Number(id));
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getDetail(id));
  }, [dispatch, id]);
  return (
    <div className="game-container">
      <header>
        <img src={game?.image ? game.image : logo} alt={state.name} />
        <div className="main-info">
          <h1>{state.name}</h1>
          <span>
            <h3>Website:</h3>
            <a
              href={
                state.website
                  ? state.website
                  : `https://www.google.com/search?q=${state.name}&sxsrf=ALiCzsZa507RRNTWh47ntRFzt5SBO60Avg%3A1660335644253&ei=HLb2Yv35DpuNwbkPjNKtkAY&ved=0ahUKEwj996GikML5AhWbRjABHQxpC2IQ4dUDCA4&uact=5&oq=valorant&gs_lcp=Cgdnd3Mtd2l6EAMyBAgjECcyBAgjECcyBAgjECcyBQguEJECMgUIABCABDIFCAAQgAQyBQgAEIAEMgUIABCABDIFCAAQgAQyBQgAEIAEOgcIIxCwAxAnOgcIABBHELADOgcIABCwAxBDOg8ILhDUAhDIAxCwAxBDGAE6DAguEMgDELADEEMYAToFCAAQkQI6CwguEIAEEMcBENEDOgUILhCABDoNCC4QxwEQ0QMQ1AIQQzoECAAQQzoECC4QQzoHCC4Q1AIQQzoNCC4QQxCLAxCoAxCfAzoHCCMQ6gIQJzoOCC4QxwEQ0QMQ1AIQkQI6CAguENQCEJECOgsILhCABBDHARCvAToFCAAQywFKBAhBGABKBAhGGAFQlhxYzDFg9zJoBXABeACAAacBiAH4C5IBBDAuMTKYAQCgAQGwAQrIARO4AQLAAQHaAQYIARABGAg&sclient=gws-wiz`
              }
              rel="noreferrer"
              target="_blank"
            >
              {state.website ? state.website : state.name}
            </a>
          </span>
          <span>
            <h3>Released:</h3>
            <p>{state.released}</p>
          </span>
          <span>
            <h3>Rating:</h3>
            <p className="rating">⭐{state.rating}</p>
          </span>
        </div>
      </header>
      <div className="game-info">
        <span>
          <h3>Description:</h3>
          <p>{state.description?.replace(/(<([^>]+)>)/gi, "")}</p>
        </span>
        <span>
          <h3>Platforms:</h3>
          {state.platforms?.map((item, index) => {
            return <p key={index}>{item}</p>;
          })}
        </span>
        <span>
          <h3>Genres:</h3>
          {state.genres?.map((item) => {
            return (
              <div key={item.id} className="genre">
                <img
                  src={
                    item.image_background ? item.image_background : item.image
                  }
                  alt={item.name}
                />
                <p key={item.id}>{item.name}</p>
              </div>
            );
          })}
        </span>
      </div>
    </div>
  );
};

export default GameDetail;
