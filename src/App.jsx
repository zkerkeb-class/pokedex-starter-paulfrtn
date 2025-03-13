import "./App.css";
import PokemonGrid from "./components/PokemonGrid/PokemonGrid.jsx";
import { useState, useEffect } from "react";
import SearchPokemon from "./components/SearchPokemon/SearchPokemon.jsx";
import FilterPokemon from "./components/FilterPokemon/FilterPokemon.jsx";
import { getAllPokemons } from "./services/api";
import MyButton from "./components/UI-components/Button/MyButton.jsx";
import AddEditModal from "./components/AddEditModal/AddEditModal.jsx";

function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTypes, setSelectedTypes] = useState([]);
  const [pokemons, setPokemons] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [selectedPokemon, setSelectedPokemon] = useState(null);

  const handleClose = () => {
    setIsOpen(false);
    setSelectedPokemon(null);
  };

  const fetchPokemons = async () => {
    try {
      const data = await getAllPokemons();
      setPokemons(data.pokemons);
    } catch (err) {
      setError(`Failed to fetch pokemons: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  const refreshPokemons = async () => {
    await new Promise((resolve) => setTimeout(resolve, 500));
    await fetchPokemons();
  };

  useEffect(() => {
    void fetchPokemons();
  }, []);

  const onPokemonSelect = (pokemon) => {
    setSelectedPokemon(pokemon);
    setIsEditing(true);
    setIsOpen(true);
  };

  const filteredPokemons = pokemons.filter((pokemon) => {
    const matchesName = pokemon.name.french
      .toLowerCase()
      .includes(searchTerm.toLowerCase());

    const matchesType =
      selectedTypes.length === 0 ||
      selectedTypes.some((type) => pokemon.type.includes(type));

    return matchesName && matchesType;
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <>
      <header
        style={{
          display: "flex",
          justifyContent: "space-around",
          alignItems: "center",
          margin: 0,
          padding: 0,
        }}
      >
        <SearchPokemon searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        <h1>Pokémon</h1>
        <MyButton
          isEditing={false}
          placeholder={"Ajouter"}
          onClick={() => {
            setIsOpen(true);
            setIsEditing(false);
            setSelectedPokemon(null);
          }}
        />
        <FilterPokemon
          selectedTypes={selectedTypes}
          setSelectedTypes={setSelectedTypes}
        />
      </header>
      <div className={"content"}>
        <PokemonGrid
          pokemons={filteredPokemons}
          onPokemonSelect={onPokemonSelect}
        />
      </div>
      <AddEditModal
        pokemon={selectedPokemon}
        isEditing={isEditing}
        isOpen={isOpen}
        handleClose={handleClose}
        refreshPokemons={refreshPokemons}
      />
    </>
  );
}

export default App;
