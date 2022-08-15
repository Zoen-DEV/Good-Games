import React from "react";

const Loader = () => {
  return (
    <div className="loader-container">
      <div className="loader"></div>
      <p>
        Only the first 100 games are shown here...
        <br />
        you can search by name if you want to see them all!
      </p>
    </div>
  );
};

export default Loader;
