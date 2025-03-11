import { useState } from "react";
import FilterPokemon from "../FilterPokemon/FilterPokemon";
import styles from "./AddEditModal.module.css";
import MyButton from "../UI-components/Button/MyButton.jsx";

const AddEditModal = ({ isEditing, isOpen, handleClose, pokemon }) => {
  const [formData, setFormData] = useState({
    name: {
      french: "",
      english: "",
      japanese: "",
      chinese: "",
    },
    types: [],
    base: {
      HP: 0,
      Attack: 0,
      Defense: 0,
      "Sp. Attack": 0,
      "Sp. Defense": 0,
      Speed: 0,
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: Implement submit logic
    handleClose();
  };

  return (
    <div className={styles.overlay} onClick={handleClose}>
      <div className={styles.container} onClick={(e) => e.stopPropagation()}>
        <div className={styles.header}>
          <h5>{!isEditing ? "Ajouter un Pokémon" : "Modifier ..."}</h5>
          <button className={styles.close} onClick={handleClose}>
            ✖
          </button>
        </div>
        <div className={styles.content}>
          <div className={styles.formTop}></div>
          <div className={styles.formMiddle}></div>
          <div className={styles.formBottom}></div>
        </div>
        <div className={styles.footer}>
          <MyButton
            placeholder={isEditing ? "Modifier" : "Ajouter"}
            onClick={() => {}}
            style={{ backgroundColor: "#228B22" }}
          />
          {isEditing && (
            <MyButton
              placeholder={"Supprimer"}
              onClick={() => {}}
              style={{ backgroundColor: "#d03939" }}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default AddEditModal;
