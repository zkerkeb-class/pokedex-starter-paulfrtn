import styles from "./MyButton.module.css";

const MyButton = ({ style, onClick, placeholder }) => {
  return (
    <div>
      <button
        className={styles.MyButton}
        onClick={onClick}
        style={{
          ...style,
        }}
      >
        {placeholder}
      </button>
    </div>
  );
};

export default MyButton;
