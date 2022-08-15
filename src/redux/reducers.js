import {
  GET_GAMES,
  GET_GENRES,
  ORDER,
  GET_SOME_GAMES,
  RESET,
  FILTER,
  GET_DETAIL,
  GET_PLATAFORMS,
} from "./actions";

const initialState = {
  allgames: [],
  videogames: [],
  genres: [],
  gameDetail: {},
  plataforms: [],
};

const rootReducer = (state = initialState, actions) => {
  const pagination = (arr) => {
    const tempArr = [];
    let tempCount = 0;
    arr.forEach((item, index) => {
      if (
        index === 0 ||
        index === 15 ||
        index === 30 ||
        index === 45 ||
        index === 60 ||
        index === 75 ||
        index === 90 ||
        index === 105 ||
        index === 120 ||
        index === 135 ||
        index === 150
      ) {
        tempCount = tempArr.length;
        tempArr.push([item]);
      } else {
        tempArr[tempCount].push(item);
      }
    });
    return tempArr;
  };
  switch (actions.type) {
    case GET_GAMES:
      return {
        ...state,
        allgames: actions.payload,
        videogames: pagination(
          actions.payload.sort((a, b) => {
            if (a.name < b.name) {
              return -1;
            }
            if (a.name > b.name) {
              return 1;
            }
            return 0;
          })
        ),
      };
    case GET_SOME_GAMES:
      return {
        ...state,
        videogames: pagination(
          actions.payload.sort((a, b) => {
            if (a.name < b.name) {
              return -1;
            }
            if (a.name > b.name) {
              return 1;
            }
            return 0;
          })
        ),
      };
    case GET_GENRES:
      return {
        ...state,
        genres: actions.payload.sort((a, b) => {
          if (a.name < b.name) {
            return -1;
          }
          if (a.name > b.name) {
            return 1;
          }
          return 0;
        }),
      };
    case ORDER:
      const arr = [...state.allgames];
      if (actions.payload === "z-a") {
        arr.sort((a, b) => {
          if (a.name < b.name) {
            return 1;
          }
          if (a.name > b.name) {
            return -1;
          }
          return 0;
        });
      } else if (actions.payload === "-/+") {
        arr.sort((a, b) => a.rating - b.rating);
      } else if (actions.payload === "+/-") {
        arr.sort((a, b) => b.rating - a.rating);
      } else {
        arr.sort((a, b) => {
          if (a.name < b.name) {
            return -1;
          }
          if (a.name > b.name) {
            return 1;
          }
          return 0;
        });
      }
      return {
        ...state,
        allgames: arr,
        videogames: pagination(arr),
      };
    case RESET:
      return {
        ...state,
        videogames: pagination(state.allgames),
      };
    case FILTER:
      const allGames = state.allgames;
      const genreToFilter = state.genres.filter(
        (item) => item.name === actions.payload
      )[0];
      const dbGames = [];
      const apiGames = [];
      allGames.forEach((item) => {
        if (item.genresId) {
          let genresChange = item.genresId.map((item) => Number(item));
          if (genresChange.includes(genreToFilter.id)) {
            dbGames.push(item);
          }
        } else {
          if (item.genres.includes(genreToFilter.name)) {
            apiGames.push(item);
          }
        }
      });
      return {
        ...state,
        videogames: pagination([...apiGames, ...dbGames]),
      };
    case GET_DETAIL:
      let game = actions.payload;
      if (game.genresId) {
        const tempGenres = game.genresId.map((item) => Number(item));
        const gameGenres = [];
        state.genres.forEach((item) => {
          if (tempGenres.includes(item.id)) {
            gameGenres.push(item);
          }
        });
        game.genres = gameGenres;
      }
      return {
        ...state,
        gameDetail: game,
      };
    case GET_PLATAFORMS:
      return {
        ...state,
        plataforms: actions.payload,
      };
    default:
      return state;
  }
};

export default rootReducer;
