import PokemonCard from "../PokemonCard/PokemonCard.jsx";
import styles from './PokemonGrid.module.css';

const PokemonGrid = ({pokemons}) => {
    return (
        <div className={styles.cardContainer}>
            {pokemons.map((pokemon) => (
                <PokemonCard key={pokemon.id} pokemon={pokemon}/>
            ))}
        </div>
    );
}

export default PokemonGrid;