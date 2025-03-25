import styles from "./ConfirmModal.module.css";
import MyButton from "../UI-components/Button/MyButton.jsx";

const ConfirmModal = ({ isOpen, handleClose, onConfirm, pokemonName }) => {
  if (!isOpen) return null;

  return (
    <div className={styles.overlay} onClick={handleClose}>
      <div className={styles.container} onClick={(e) => e.stopPropagation()}>
        <div className={styles.header}>
          <h5>Confirmer la suppression</h5>
          <button className={styles.close} onClick={handleClose}>
            ✖
          </button>
        </div>
        <div className={styles.content}>
          <p>Êtes-vous sûr de vouloir supprimer le Pokémon "{pokemonName}" ?</p>
          <p>Cette action est irréversible.</p>
        </div>
        <div className={styles.actions}>
          <MyButton
            placeholder="Annuler"
            onClick={handleClose}
            style={{ backgroundColor: "#6c757d" }}
            type="button"
          />
          <MyButton
            placeholder="Supprimer"
            onClick={onConfirm}
            style={{ backgroundColor: "#d03939" }}
            type="button"
          />
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;
