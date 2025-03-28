import { useNavigate } from "react-router-dom";
import { useState } from "react";
import MyButton from "../../../components/UI-components/Button/MyButton.jsx";
import { login } from "../../../services/api.js";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await login({ mail: email, password });
      console.log("Connecté :", data);
      navigate("/");
    } catch (e) {
      alert("Erreur de connexion" + e.message);
    }
  };

  const onClick = () => {
    navigate("/auth/register");
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
        <br />
        <input
          type="password"
          placeholder="Mot de passe"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
        <br />
        <MyButton type="submit" placeholder={"Se connecter"} />
        <br />
        <MyButton placeholder={"Créer un compte"} onClick={onClick} />
      </form>
    </div>
  );
};

export default Login;
