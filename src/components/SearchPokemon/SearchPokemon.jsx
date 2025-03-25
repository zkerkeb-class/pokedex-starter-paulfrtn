import { useState, useEffect, useRef } from "react";

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

  return (
    <input
      ref={inputRef}
      type="text"
      placeholder="Rechercher un Pokémon"
      value={localSearchTerm}
      onChange={(e) => setLocalSearchTerm(e.target.value)}
      style={{ padding: "8px", marginRight: "10px" }}
    />
  );
};

export default SearchPokemon;
