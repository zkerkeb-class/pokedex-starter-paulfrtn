import PokemonCard from "../PokemonCard/PokemonCard.jsx";
import styles from "./PokemonGrid.module.css";

const PokemonGrid = ({ pokemons, unlocked, isAdmin, onPokemonSelect }) => {
  return (
    <div className={styles.cardContainer}>
      {pokemons &&
        pokemons.map((pokemon) => (
          <PokemonCard
            key={pokemon._id}
            pokemon={pokemon}
            unlocked={isAdmin || unlocked.includes(pokemon._id)}
            onClick={isAdmin ? () => onPokemonSelect(pokemon) : undefined}
          />
        ))}
    </div>
  );
};

export default PokemonGrid;
