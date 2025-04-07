import { useState, useEffect, useRef } from "react";
import styles from "./SearchPokemon.module.css";

const SearchPokemon = ({ searchTerm, setSearchTerm }) => {
  const [localSearchTerm, setLocalSearchTerm] = useState(searchTerm);
  const inputRef = useRef(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setSearchTerm(localSearchTerm);
    }, 300);

    return () => clearTimeout(timer);
  }, [localSearchTerm, setSearchTerm]);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const handleClear = () => {
    setLocalSearchTerm("");
    setSearchTerm("");
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  return (
    <div className={styles.searchContainer}>
      <div className={styles.searchIconContainer}>
        <svg
          className={styles.searchIcon}
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="11" cy="11" r="8"></circle>
          <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
        </svg>
      </div>
      <input
        ref={inputRef}
        type="text"
        className={styles.searchInput}
        placeholder="Rechercher un Pokémon"
        value={localSearchTerm}
        onChange={(e) => setLocalSearchTerm(e.target.value)}
      />
      {localSearchTerm && (
        <button
          className={styles.clearButton}
          onClick={handleClear}
          type="button"
          aria-label="Effacer la recherche"
        >
          ✕
        </button>
      )}
    </div>
  );
};

export default SearchPokemon;
