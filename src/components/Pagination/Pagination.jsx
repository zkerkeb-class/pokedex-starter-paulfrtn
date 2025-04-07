import styles from "./Pagination.module.css";
import MyButton from "../UI-components/Button/MyButton.jsx";
import { ArrowBack, ArrowForward } from "@mui/icons-material";

const Pagination = ({ page, setPage, pageCount }) => {
  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= pageCount) {
      setPage(newPage);
    }
  };

  const buttons = Array.from({ length: pageCount }, (_, i) => (
    <MyButton
      key={i + 1}
      placeholder={i + 1}
      style={{
        width: "50px",
      }}
      onClick={() => handlePageChange(i + 1)}
    />
  ));

  return (
    <div className={styles.pagination}>
      <MyButton
        onClick={() => handlePageChange(page - 1)}
        disabled={page <= 1}
        placeholder={<ArrowBack />}
        style={{
          width: "50px",
        }}
      />

      <div className={styles.pageInfo}>{buttons}</div>
      <MyButton
        onClick={() => handlePageChange(page + 1)}
        disabled={page >= pageCount}
        placeholder={<ArrowForward />}
        style={{
          width: "50px",
        }}
      />
    </div>
  );
};

export default Pagination;
