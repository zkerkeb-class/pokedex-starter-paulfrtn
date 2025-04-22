import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import PrivateRoute from "./routes/PrivateRoute.jsx";
import "./App.css";
import AllPokemons from "./pages/AllPokemons/AllPokemons.jsx";
import PokemonInfo from "./pages/PokemonInfo/PokemonInfo.jsx";
import Login from "./pages/Auth/Login/Login.jsx";
import Register from "./pages/Auth/Register/Register.jsx";
import BoosterOpening from "./pages/BoosterOpening/BoosterOpening.jsx";

function App() {
  return (
    <Router>
      <Routes>
        {/* Public routes */}
        <Route path="/auth/login" element={<Login />} />
        <Route path="/auth/register" element={<Register />} />

        {/* Protected routes */}
        <Route
          path="/"
          element={
            <PrivateRoute>
              <AllPokemons />
            </PrivateRoute>
          }
        />
        <Route
          path="/pokemon/:id"
          element={
            <PrivateRoute>
              <PokemonInfo />
            </PrivateRoute>
          }
        />
        <Route path="/booster" element={<BoosterOpening />} />
      </Routes>
    </Router>
  );
}

export default App;
