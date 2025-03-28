import { useNavigate } from "react-router-dom";
import { useState } from "react";
import MyButton from "../../../components/UI-components/Button/MyButton.jsx";
import { register } from "../../../services/api.js";

const Register = () => {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await register({
        firstname,
        lastname,
        mail: email,
        password,
      });
      console.log("Inscription réussie :", data);
      navigate("/auth/login");
    } catch (err) {
      alert("Erreur d'inscription : " + err.message);
    }
  };

  const onClick = () => {
    navigate("/auth/login");
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Prénom"
          value={firstname}
          onChange={(e) => {
            setFirstname(e.target.value);
          }}
        />
        <br />
        <input
          type="text"
          placeholder="Nom"
          value={lastname}
          onChange={(e) => {
            setLastname(e.target.value);
          }}
        />
        <br />
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
        <MyButton type="submit" placeholder={"S'inscrire"} />
        <br />
        <MyButton placeholder={"Déjà un compte"} onClick={onClick} />
      </form>
    </div>
  );
};

export default Register;
