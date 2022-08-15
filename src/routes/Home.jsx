import React from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import Cards from "../components/Cards";
import FilterNav from "../components/FilterNav";

const Home = () => {
  const state = useSelector((state) => state);
  const [page, setPage] = useState(0);
  const switchPage = (e) => {
    if (e.target.name === "last") {
      if (page === 0) {
        setPage(page);
      } else {
        setPage(page - 1);
      }
    } else {
      if (page === state.videogames.length) {
        setPage(page);
      } else {
        setPage(page + 1);
      }
    }
  };
  return (
    <div className="home">
      <FilterNav></FilterNav>
      <Cards page={page}></Cards>
      <div className="pagination">
        <button className="page-btn" onClick={switchPage} name="last">
          last
        </button>
        {state.videogames?.map((item, index) => {
          const style = {};
          if (Number(index) === Number(page)) {
            style.background = "#fff759";
            style.color = "#303030";
          } else {
            style.background = "#303030";
            style.color = "#f1f1f1";
          }
          return (
            <button
              style={style}
              onClick={() => {
                setPage(index);
              }}
              key={index}
            >
              {index + 1}
            </button>
          );
        })}
        <button className="page-btn" onClick={switchPage} name="next">
          next
        </button>
      </div>
    </div>
  );
};

export default Home;
