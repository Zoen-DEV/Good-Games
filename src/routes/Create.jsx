import React, { useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import Swal from "sweetalert2";

const Create = () => {
  const state = useSelector((state) => state);
  const initialState = {
    name: "",
    description: "",
    date: "",
    rating: "",
    platforms: [],
    genresId: [],
  };

  const [body, setBody] = useState(initialState);

  const handleChange = (e) => {
    switch (e.target.name) {
      case "name":
        setBody({
          ...body,
          name: e.target.value,
        });
        break;
      case "date":
        setBody({
          ...body,
          date: e.target.value,
        });
        break;
      case "description":
        setBody({
          ...body,
          description: e.target.value,
        });
        break;
      case "rating":
        setBody({
          ...body,
          rating: Number(e.target.value),
        });
        break;
      case "plataforms":
        setBody({
          ...body,
          plataforms: e.target.value,
        });
        break;
      default:
        break;
    }
  };

  const handleCheck = (e) => {
    switch (e.target.name) {
      case "platforms":
        if (e.target.checked) {
          setBody({
            ...body,
            platforms: [...body.platforms, e.target.value],
          });
        } else {
          const index = body.platforms.indexOf(e.target.value);
          const tempArr = { ...body };
          tempArr.platforms.splice(index, 1);
          setBody({ ...tempArr });
        }
        break;
      case "genres":
        if (e.target.checked) {
          console.log(e.target.value)
          setBody({
            ...body,
            genresId: [...body.genresId, e.target.value],
          });
        } else {
          const index = body.genresId.indexOf(e.target.value);
          const tempArr = { ...body };
          tempArr.genresId.splice(index, 1);
          setBody({ ...tempArr });
        }
        break;
      default:
        break;
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (body.name.trim().length === 0 || body.description.trim().length === 0) {
      Swal.fire("Input cannot be an empty value");
    } else if (body.date.length === 0) {
      Swal.fire("You must add a release date");
    } else if (body.rating > 5) {
      Swal.fire(
        "The rating must be between 1 and 5, including the halves of these. (example: 3.5)"
      );
    } else if (body.rating === "") {
      Swal.fire("You must add a rating");
    } else if (
      body.description.trim().length < 50 ||
      body.description.trim().length > 500
    ) {
      Swal.fire(
        "Description must have at least 50 characters and a maximum of 500"
      );
    } else if (body.name.trim().length < 5 || body.name.trim().length > 50) {
      Swal.fire("Name must have at least 5 characters and a maximum of 50");
    } else if (body.platforms.length === 0) {
      Swal.fire("Select at least 1 platform");
    } else if (body.genresId.length === 0) {
      Swal.fire("Select at least 1 genre");
    } else {
      axios
        .post("https://good-games-back.herokuapp.com/videogames", body)
        .then((res) => {
          Swal.fire("El juego a sido creado correctamente");
        })
        .catch((err) => {
          throw new Error(err);
        });
      setBody(initialState);
      window.location.replace("https://goodgames.vercel.app/");
    }
  };

  return (
    <form className="create-form" onSubmit={handleSubmit}>
      <h1>Create a new videogame</h1>
      <span>
        Name
        <br />
        <input
          onChange={handleChange}
          value={body.name}
          type="text"
          name="name"
          placeholder="Game's name"
          className="input-text"
        />
      </span>

      <span>
        Released date
        <br />
        <input
          onChange={handleChange}
          value={body.date}
          type="date"
          name="date"
          placeholder="Released date"
        />
      </span>

      <span>
        Description
        <br />
        <input
          onChange={handleChange}
          value={body.description}
          type="text"
          name="description"
          placeholder="Game's description"
          className="input-text"
        />
      </span>
      <span>
        Rating
        <br />
        <input
          onChange={handleChange}
          type="number"
          min="0"
          step="0.5"
          name="rating"
          placeholder="1-5"
        />
      </span>
      <div className="checkbox-container">
        <ul>
          <li>
            <span>Platforms</span>
          </li>
          {state.plataforms?.map((item) => {
            return (
              <li key={item.id}>
                <label>
                  <input
                    value={item.name}
                    onChange={handleCheck}
                    type="checkbox"
                    name="platforms"
                    id={item.id}
                  />
                  <span>{item.name}</span>
                  <div className="b-input"></div>
                </label>
              </li>
            );
          })}
        </ul>
        <ul>
          <li>
            <span>Genres</span>
          </li>
          {state.genres?.map((item) => {
            return (
              <li key={item.id}>
                <label>
                  <input
                    value={item.id}
                    onChange={handleCheck}
                    type="checkbox"
                    name="genres"
                    id={item.id}
                  />
                  <span>{item.name}</span>
                  <div className="b-input"></div>
                </label>
              </li>
            );
          })}
        </ul>
      </div>
      <input className="submit" type="submit" />
    </form>
  );
};

export default Create;
