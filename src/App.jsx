import './App.css'
import PokemonCard from "./components/pokemonCard/PokemonCard.jsx"

function App() {
    return (
        <>
            <div className={"cardContainer"}>
                <PokemonCard/>
                <PokemonCard/>
            </div>
        </>
    )
}

export default App
