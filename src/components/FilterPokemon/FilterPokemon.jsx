import { useState, useEffect, useRef } from "react";
import { types } from "../../constants/types.js";
import styles from "./FilterPokemon.module.css";

const FilterPokemon = ({ selectedTypes = [], setSelectedTypes }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1);

  const handleTypeToggle = (type) => {
    setSelectedTypes((prev) => {
      if (prev.includes(type)) {
        return prev.filter((t) => t !== type);
      } else if (prev.length < 2) {
        return [...prev, type];
      } else {
        return [prev[1], type];
      }
    });
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className={styles.dropdown} ref={dropdownRef}>
      <div className={styles.select} onClick={() => setIsOpen(!isOpen)}>
        {selectedTypes.length > 0
          ? selectedTypes.map((type) => capitalize(type)).join(", ")
          : "Tous les types"}
        <span className={`${styles.arrow} ${isOpen ? styles.open : ""}`}>
          ▼
        </span>
      </div>

      {isOpen && (
        <div className={styles.dropdownMenu}>
          {types.map((type) => (
            <label key={type} className={styles.dropdownItem}>
              <input
                type="checkbox"
                checked={selectedTypes.includes(type)}
                onChange={() => handleTypeToggle(type)}
              />
              {capitalize(type)}
            </label>
          ))}
        </div>
      )}
    </div>
  );
};

export default FilterPokemon;
