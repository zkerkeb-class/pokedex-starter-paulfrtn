import { useNavigate } from "react-router-dom";
import { useState } from "react";
import MyButton from "../../../components/UI-components/Button/MyButton.jsx";
import { register } from "../../../services/api.js";
import styles from "./Register.module.css";

const Register = () => {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setError("");
      const data = await register({
        firstname,
        lastname,
        mail: email,
        password,
      });
      console.log("Inscription réussie :", data);
      navigate("/auth/login");
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || "Erreur d'inscription. Veuillez réessayer.");
    }
  };

  const handleLoginClick = (e) => {
    e.preventDefault();
    navigate("/auth/login");
  };

  return (
    <div className={styles.authContainer}>
      <div className={styles.formCard}>
        <h2 className={styles.formTitle}>Inscription</h2>
        <form onSubmit={handleSubmit} className={styles.form}>
          {error && (
            <div className={styles.errorMessage}>
              <span className={styles.errorIcon}>⚠️</span>
              {error}
            </div>
          )}
          <div className={styles.inputGroup}>
            <input
              type="text"
              placeholder="Prénom"
              value={firstname}
              onChange={(e) => {
                setFirstname(e.target.value);
              }}
              className={styles.input}
            />
          </div>
          <div className={styles.inputGroup}>
            <input
              type="text"
              placeholder="Nom"
              value={lastname}
              onChange={(e) => {
                setLastname(e.target.value);
              }}
              className={styles.input}
            />
          </div>
          <div className={styles.inputGroup}>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              className={styles.input}
            />
          </div>
          <div className={styles.inputGroup}>
            <input
              type="password"
              placeholder="Mot de passe"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              className={styles.input}
            />
          </div>
          <div className={styles.buttonGroup}>
            <MyButton type="submit" placeholder={"S'inscrire"} />
          </div>
          <div className={styles.alternateAction}>
            <p>Déjà inscrit ?</p>
            <MyButton 
              placeholder={"Déjà un compte"} 
              onClick={handleLoginClick} 
              type="button"
              style={{ width: "auto", padding: "0 15px" }}
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
