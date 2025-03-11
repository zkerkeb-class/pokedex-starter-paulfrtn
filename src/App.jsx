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
  const [selectedType, setSelectedType] = useState("");
  const [pokemons, setPokemons] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isOpen, setIsOpen] = useState(false);

  const handleClose = () => {
    setIsOpen(false);
  };

  useEffect(() => {
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

    void fetchPokemons();

    // const newPokemon = {
    //     id: 3001,
    //     name: {
    //         french: 'Bulbizarre',
    //         english: 'Bulbasaur',
    //         japanese: 'CC',
    //         chinese: 'damn'
    //     },
    //     type: ['Grass', 'Poison'],
    //     base: {
    //         HP: 45,
    //         Attack: 49,
    //         Defense: 49,
    //         Sp_Attack: 65,
    //         Sp_Defense: 65,
    //         Speed: 45
    //     },
    //     image: 'https://example.com/bulbasaur.png'
    // };
    // createPokemon(newPokemon);
    //
    // const pokemon150 = getPokemonById(150);
    // console.log("TEST ID :", pokemon150);
    //
    //
    // const new127 = {
    //     id: 127,
    //     name: {
    //         french: 'ETATATEF2DVZJDZJHG',
    //         english: 'Bulbasaur',
    //         japanese: 'CC',
    //         chinese: 'damn'
    //     },
    //     type: ['Grass', 'Poison'],
    //     base: {
    //         HP: 45,
    //         Attack: 49,
    //         Defense: 49,
    //         Sp_Attack: 65,
    //         Sp_Defense: 65,
    //         Speed: 45
    //     },
    //     image: 'https://example.com/bulbasaur.png'
    // };
    // updatePokemon(127, new127).then(r => console.log(r));
  }, []);

  const filteredPokemons = pokemons.filter((pokemon) => {
    const matchesName = pokemon.name.french
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesType = selectedType
      ? pokemon.type.includes(selectedType)
      : true;

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
        <h1>Pokemon</h1>
        <MyButton
          isEditing={false}
          placeholder={"Ajouter"}
          onClick={() => {
            setIsOpen(true);
          }}
        />
        <FilterPokemon
          selectedType={selectedType}
          setSelectedType={setSelectedType}
        />
      </header>
      <div className={"content"}>
        <PokemonGrid pokemons={filteredPokemons} />
      </div>
      <AddEditModal
        isEditing={false}
        isOpen={isOpen}
        handleClose={handleClose}
      />
    </>
  );
}

export default App;
