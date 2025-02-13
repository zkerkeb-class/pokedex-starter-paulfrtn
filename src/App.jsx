import './App.css';
import pokemonsWithImages from "./assets/pokemons";
import PokemonGrid from "./components/pokemonGrid/PokemonGrid.jsx";

function App() {
    return (
        <>
            <header>
                <h1>Pokemon</h1>
            </header>
            <div className={"content"}>
                <PokemonGrid pokemons={pokemonsWithImages}/>
            </div>
        </>
    );
}

export default App;