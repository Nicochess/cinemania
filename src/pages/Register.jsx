import { useContext, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthContext from "../context/AuthProvider";

const Register = () => {
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { register } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (passwordConfirmRef.current.value !== passwordRef.current.value) {
      return setError("A senhas não são iguais");
    }

    try {
      setError("");
      setLoading(true);
      register(emailRef.current.value, passwordRef.current.value).then(() => {
        navigate("/watch");
      })
    } catch {
      setError("Não conseguimos criar sua conta :(");
    }
  };

  return (
    <main className="main__card">
      <section className="card__profile">
        <div className="icon--cinerama"></div>
        <div className="alternative">
          {error}
        </div>
        <form className="card__form" onSubmit={handleSubmit}>
          <h2>Registre-se</h2>
          <label htmlFor="email">E-mail</label>
          <input
            type="email"
            id="email"
            ref={emailRef}
            required
            placeholder="Insira seu e-mail"
          />
          <label htmlFor="password">Senha</label>
          <input
            type="password"
            id="password"
            ref={passwordRef}
            required
            placeholder="Insira sua senha"
          />
          <label htmlFor="password-confirm">Confirme sua senha</label>
          <input
            type="password"
            id="password-confirm"
            ref={passwordConfirmRef}
            required
            placeholder="Repita sua senha"
          />
          <button type="submit" className="btn" disabled={loading}>
            Concluir Cadastro
          </button>
        </form>
      </section>
      <section className="card__senha">
      <div className="criar__conta">
          Já possui uma conta ? <Link to="/">Logar</Link>
        </div>
      </section>
    </main>
  );
};

export default Register;
