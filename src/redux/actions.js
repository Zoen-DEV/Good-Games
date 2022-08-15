export const GET_GAMES = "GET_GAMES";
export const GET_GENRES = "GET_GENRES";
export const GET_DETAIL = "GET_DETAIL";
export const ORDER = "ORDER";
export const GET_SOME_GAMES = "GET_SOME_GAMES";
export const RESET = "RESET";
export const FILTER = "FILTER";
export const POST_GAME = "POST_GAME";
export const GET_PLATAFORMS = "GET_PLATAFORMS";

export const getGames = () => (dispatch) => {
  return fetch(`https://good-games-back.herokuapp.com/videogames/`)
    .then((res) => res.json())
    .then((res) => dispatch({ type: GET_GAMES, payload: res }));
};

export const getSomeGames = (name) => (dispatch) => {
  return fetch(`https://good-games-back.herokuapp.com/videogames?name=${name}`)
    .then((res) => res.json())
    .then((res) => dispatch({ type: GET_SOME_GAMES, payload: res }));
};

export const getGenres = () => (dispatch) => {
  return fetch("https://good-games-back.herokuapp.com/genres/")
    .then((res) => res.json())
    .then((res) => dispatch({ type: GET_GENRES, payload: res }));
};

export const getDetail = (id) => (dispatch) => {
  return fetch(`https://good-games-back.herokuapp.com/videogame/${id}`)
    .then((res) => res.json())
    .then((res) => dispatch({ type: GET_DETAIL, payload: res }));
};

export const getPlataforms = () => (dispatch) => {
  return fetch("https://good-games-back.herokuapp.com/plataforms/")
    .then((res) => res.json())
    .then((res) => dispatch({ type: GET_PLATAFORMS, payload: res }));
};

export const order = (type) => (dispatch) => {
  return dispatch({ type: ORDER, payload: type });
};

export const filter = (type) => (dispatch) => {
  return dispatch({ type: FILTER, payload: type });
};

export const reset = () => (dispatch) => {
  return dispatch({ type: RESET });
};
