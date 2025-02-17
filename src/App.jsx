import './App.css';
import pokemonsWithImages from "./assets/pokemons";
import PokemonGrid from "./components/PokemonGrid/PokemonGrid.jsx";
import { useState } from 'react';
import SearchPokemon from "./components/SearchPokemon/SearchPokemon.jsx";
import FilterPokemon from "./components/FilterPokemon/FilterPokemon.jsx";

function App() {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedType, setSelectedType] = useState('');

    const filteredPokemons = pokemonsWithImages.filter((pokemon) => {
        const matchesName = pokemon.name.french.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesType = selectedType ? pokemon.type.includes(selectedType) : true;

        return matchesName && matchesType;
    });

    return (
        <>
            <header style={{ margin: 0, padding: 0 }}>
                <h1>Pokemon</h1>
                <div>
                    <SearchPokemon searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
                    <FilterPokemon selectedType={selectedType} setSelectedType={setSelectedType} />
                </div>
            </header>
            <div className={"content"}>
                <PokemonGrid pokemons={filteredPokemons} />
            </div>
        </>
    );
}


export default App;
