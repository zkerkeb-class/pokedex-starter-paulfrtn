import PokemonCard from "../PokemonCard/PokemonCard.jsx";
import styles from "./PokemonGrid.module.css";

const PokemonGrid = ({ pokemons, onPokemonSelect }) => {
  return (
    <div className={styles.cardContainer}>
      {pokemons &&
        pokemons.map((pokemon) => (
          <PokemonCard
            key={pokemon.id}
            pokemon={pokemon}
            onClick={() => onPokemonSelect(pokemon)}
          />
        ))}
    </div>
  );
};

export default PokemonGrid;
