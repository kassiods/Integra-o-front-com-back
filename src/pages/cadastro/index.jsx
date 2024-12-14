import { Link } from "react-router-dom";
import { useRef } from "react";
import api from "../../services/api";
import "../../styles/cadastro.css";

function Cadastro() {
  const nameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();

  async function handleSubmit(event) {
    event.preventDefault();
    try {
      await api.post("/cadastro", {
        name: nameRef.current.value,
        email: emailRef.current.value,
        password: passwordRef.current.value,
      });
      alert("Usuário cadastrado com sucesso!");
    } catch (err) {
      alert("Erro ao cadastrar o usuário.");
    }
  }

  return (
    <div className="cadastro-container">
      <h2 className="cadastro-title">Cadastro</h2>
      <form className="cadastro-form" onSubmit={handleSubmit}>
        <input
          ref={nameRef}
          placeholder="Nome"
          type="text"
          className="cadastro-input"
        />
        <input
          ref={emailRef}
          placeholder="Email"
          type="email"
          className="cadastro-input"
        />
        <input
          ref={passwordRef}
          placeholder="Senha"
          type="password"
          className="cadastro-input"
        />
        <button type="submit" className="cadastro-button">
          Cadastrar-se
        </button>
      </form>
      <Link to="/login" className="cadastro-link">
        Já tem uma conta? Faça login
      </Link>
    </div>
  );
}

export default Cadastro;