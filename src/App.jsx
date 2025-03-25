import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import AllPokemons from "./pages/AllPokemons/AllPokemons.jsx";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<AllPokemons />} />
      </Routes>
    </Router>
  );
}

export default App;
