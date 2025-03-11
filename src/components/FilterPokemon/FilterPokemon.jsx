import { types } from "../../constants/types.js";
import styles from "./FilterPokemon.module.css";
const FilterPokemon = ({ selectedType, setSelectedType }) => {
  return (
    <select
      className={styles.select}
      value={selectedType}
      onChange={(e) => setSelectedType(e.target.value)}
      style={{ padding: "8px" }}
    >
      <option value="">{"Tous les types"}</option>
      {types.map((type) => (
        <option key={type} value={type}>
          {type}
        </option>
      ))}
    </select>
  );
};

export default FilterPokemon;
