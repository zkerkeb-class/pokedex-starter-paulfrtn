import { useNavigate } from "react-router-dom";
import { useState } from "react";
import MyButton from "../../../components/UI-components/Button/MyButton.jsx";
import { login } from "../../../services/api.js";
import styles from "./Login.module.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setError("");
      const data = await login({ mail: email, password });
      console.log("Connecté :", data);
      navigate("/");
    } catch (e) {
      console.error(e);
      setError(e.response?.data?.message || "Erreur de connexion. Veuillez réessayer.");
    }
  };

  const handleRegisterClick = (e) => {
    e.preventDefault();
    navigate("/auth/register");
  };

  return (
    <div className={styles.authContainer}>
      <div className={styles.formCard}>
        <h2 className={styles.formTitle}>Connexion</h2>
        <form onSubmit={handleSubmit} className={styles.form}>
          {error && (
            <div className={styles.errorMessage}>
              <span className={styles.errorIcon}>⚠️</span>
              {error}
            </div>
          )}
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
            <MyButton type="submit" placeholder={"Se connecter"} />
          </div>
          <div className={styles.alternateAction}>
            <p>Pas encore de compte ?</p>
            <MyButton 
              placeholder={"Créer un compte"} 
              onClick={handleRegisterClick} 
              type="button"
              style={{ width: "auto", padding: "0 15px" }}
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
