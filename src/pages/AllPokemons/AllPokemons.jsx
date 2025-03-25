import styles from "./AllPokemons.module.css";
import { useEffect, useState } from "react";
import { getAllPokemons, searchPokemons } from "../../services/api.js";
import SearchPokemon from "../../components/SearchPokemon/SearchPokemon.jsx";
import MyButton from "../../components/UI-components/Button/MyButton.jsx";
import FilterPokemon from "../../components/FilterPokemon/FilterPokemon.jsx";
import PokemonGrid from "../../components/PokemonGrid/PokemonGrid.jsx";
import AddEditModal from "../../components/AddEditModal/AddEditModal.jsx";

const AllPokemons = () => {
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
      setLoading(true);
      const data = await getAllPokemons();
      setPokemons(data.pokemons);
    } catch (err) {
      setError(`Failed to fetch pokemons: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  const searchPokemonsData = async () => {
    try {
      setLoading(true);
      const data = await searchPokemons(searchTerm, selectedTypes);
      setPokemons(data.pokemons);
    } catch (err) {
      setError(`Failed to search pokemons: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (searchTerm || selectedTypes.length > 0) {
      void searchPokemonsData();
    } else {
      void fetchPokemons();
    }
  }, [searchTerm, selectedTypes]);

  const refreshPokemons = async () => {
    await new Promise((resolve) => setTimeout(resolve, 500));
    if (searchTerm || selectedTypes.length > 0) {
      await searchPokemonsData();
    } else {
      await fetchPokemons();
    }
  };

  const onPokemonSelect = (pokemon) => {
    setSelectedPokemon(pokemon);
    setIsEditing(true);
    setIsOpen(true);
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <>
      <header
        className={styles.header}
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
      <div className={styles.content}>
        <PokemonGrid pokemons={pokemons} onPokemonSelect={onPokemonSelect} />
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
};

export default AllPokemons;
