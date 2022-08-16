import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { filter, order, reset } from "../redux/actions";

const FilterNav = () => {
  const state = useSelector((state) => state);
  const dispatch = useDispatch();
  const [alphabet, setAlphabet] = useState("a-z");
  const [rating, setRating] = useState("+/-");
  const [btnFocus, setBtnFocus] = useState(true);
  const [genresFocus, setGenresFocus] = useState("");
  const [changeOrigin, setChangeOrigin] = useState(0);
  const origin = ["all", "api", "db"];
  const setOrder = (e) => {
    if (e.target.name === "rating") {
      setBtnFocus(false);
      if (rating === "+/-") {
        setRating("-/+");
        dispatch(order("-/+"));
      } else {
        setRating("+/-");
        dispatch(order("+/-"));
      }
    } else if (e.target.name === "origin") {
      if (changeOrigin < 2) {
        setChangeOrigin(changeOrigin + 1);
        dispatch(filterOnly(origin[changeOrigin]));
      } else {
        setChangeOrigin(0);
        dispatch(filterOnly(origin[changeOrigin]));
      }
    } else {
      setBtnFocus(true);
      if (alphabet === "a-z") {
        setAlphabet("z-a");
        dispatch(order("z-a"));
      } else {
        setAlphabet("a-z");
        dispatch(order("a-z"));
      }
    }
  };
  const genreFilter = (genre) => {
    setGenresFocus(genre);
    dispatch(filter(genre));
  };
  const resetFilters = () => {
    setGenresFocus("");
    dispatch(reset());
  };
  useEffect(() => {
    dispatch(filterOnly(origin[changeOrigin]));
  }, [dispatch, changeOrigin]);

  return (
    <div className="filters">
      <button
        style={{ background: "#303030", color: "#f5f5f5" }}
        onClick={resetFilters}
      >
        Reset ♻
      </button>
      <h4>Order</h4>
      <div className="order">
        <button
          onClick={setOrder}
          style={
            btnFocus
              ? { background: "#fff759" }
              : { background: "#303030", color: "#f5f5f5" }
          }
          name="alphabet"
        >
          {alphabet.toUpperCase()}
        </button>
        <button
          onClick={setOrder}
          style={
            btnFocus
              ? { background: "#303030", color: "#f5f5f5" }
              : { background: "#fff759" }
          }
          name="rating"
        >
          Rating {rating}
        </button>
        <button
          onClick={setOrder}
          name="origin"
          style={{ background: "#fff759" }}
        >
          {origin[changeOrigin]} games
        </button>
      </div>
      <h4>Genres</h4>
      <div className="genres">
        {state.genres?.map((item) => {
          const focusStyle = {};
          if (genresFocus === item.name) {
            focusStyle.color = "#ffc729";
          } else {
            focusStyle.color = "#f5f5f5";
          }
          return (
            <span onClick={() => genreFilter(item.name)} key={item.id}>
              <img src={item.image} alt={item.name} />
              <p style={focusStyle}>{item.name}</p>
            </span>
          );
        })}
      </div>
    </div>
  );
};

export default FilterNav;
