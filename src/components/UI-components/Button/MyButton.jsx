import styles from "./MyButton.module.css";

const MyButton = ({ style, onClick, placeholder, type }) => {
  return (
    <div>
      <button
        className={styles.MyButton}
        onClick={onClick}
        style={{
          ...style,
        }}
        type={type}
      >
        {placeholder}
      </button>
    </div>
  );
};

export default MyButton;
