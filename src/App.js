import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import Nav from "./components/Nav";
import Home from "./routes/Home";
import GameDetail from "./routes/GameDetail";
import About from "./routes/About";
import LandingPage from "./routes/LandingPage";
import Create from "./routes/Create";

function App() {
  const [flag, setFlag] = useState(false);
  const toggleFlag = () => {
    if (flag) {
      setFlag(false);
    } else {
      setFlag(true);
    }
  };
  if (!flag) {
    return <LandingPage flag={toggleFlag}></LandingPage>;
  } else {
    return (
      <div className="App">
        <Nav></Nav>
        <Routes>
          <Route index element={<Home></Home>} />
          <Route path="/game/:id" element={<GameDetail></GameDetail>} />
          <Route path="/create" element={<Create></Create>} />
          <Route path="/about" element={<About></About>} />
        </Routes>
      </div>
    );
  }
}

export default App;
