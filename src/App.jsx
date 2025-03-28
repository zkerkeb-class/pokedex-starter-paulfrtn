import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import AllPokemons from "./pages/AllPokemons/AllPokemons.jsx";
import PokemonInfo from "./pages/PokemonInfo/PokemonInfo.jsx";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<AllPokemons />} />
        <Route path="/pokemon/:id" element={<PokemonInfo />} />
      </Routes>
    </Router>
  );
}

export default App;
