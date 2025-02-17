import './App.css';
import pokemonsWithImages from "./assets/pokemons";
import PokemonGrid from "./components/PokemonGrid/PokemonGrid.jsx";
import { useState } from 'react';
import SearchPokemon from "./components/SearchPokemon/SearchPokemon.jsx";

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
                    <select onChange={(e) => setSelectedType(e.target.value)} style={{ padding: '8px' }}>
                        <option value="">Tous les types</option>
                        <option value="Bug">Bug</option>
                        <option value="Dark">Dark</option>
                        <option value="Dragon">Dragon</option>
                        <option value="Electric">Electric</option>
                        <option value="Fairy">Fairy</option>
                        <option value="Fightning">Fighting</option>
                        <option value="Fire">Fire</option>
                        <option value="Flying">Flying</option>
                        <option value="Ghost">Ghost</option>
                        <option value="Grass">Grass</option>
                        <option value="Ground">Ground</option>
                        <option value="Ice">Ice</option>
                        <option value="Normal">Normal</option>
                        <option value="Poison">Poison</option>
                        <option value="Psychic">Psychic</option>
                        <option value="Rock">Rock</option>
                        <option value="Steel">Steel</option>
                        <option value="Water">Water</option>
                    </select>
                </div>
            </header>
            <div className={"content"}>
                <PokemonGrid pokemons={filteredPokemons} />
            </div>
        </>
    );
}


export default App;
