import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { getGames, getGenres, getPlataforms } from "../redux/actions";
import landingpagevideo from "../video/landingpagevideo.mp4";
import landingbg from "../images/landingbg.png";

const LandingPage = ({ flag }) => {
  const dispatch = useDispatch();
  const [btnDisplay, setBtnDisplay] = useState({
    display: "none",
  });

  useEffect(() => {
    dispatch(getGames());
    dispatch(getGenres());
    dispatch(getPlataforms());
  }, [dispatch]);

  setTimeout(() => {
    setBtnDisplay({ display: "inline-block" });
  }, 16000);

  return (
    <div className="landing">
      <button style={btnDisplay} type="button" onClick={flag}>
        GO
      </button>
      <video preload="auto" poster={landingbg} autoPlay muted>
        <source src={landingpagevideo} type="video/mp4" />
      </video>
    </div>
  );
};

export default LandingPage;
