import './App.css';
import PokemonCard from "./components/pokemonCard/PokemonCard.jsx";
import pokemonsWithImages from "./assets/pokemons";

function App() {
    return (
        <>
            <div className={"cardContainer"}>
                {pokemonsWithImages.map((pokemon) => (
                    <PokemonCard key={pokemon.id} pokemon={pokemon}/>
                ))}
            </div>
        </>
    );
}

export default App;