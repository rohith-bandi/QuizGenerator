import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Quiz from "./Quiz" ;
import Cquiz from "./Cquiz";
import Contact from "./contact";
import History from "./history";
import Login from "./Login";



function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/history" element={<History />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/quiz" element={<Quiz />} />
          <Route path="/cquiz" element={<Cquiz />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
