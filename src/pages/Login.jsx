import { useContext, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthContext from "../context/AuthProvider";

const Login = () => {
  const emailRef = useRef();
  const passwordRef = useRef();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setError("");
      setLoading(true);
      login(emailRef.current.value, passwordRef.current.value).then(() => {
        navigate("/add"); 
      })
    } catch {
      setError("Não conseguimos foi possível logar");
    }

  };

  return (
      <main className="main__card">
        <section className="card__profile">
          <div className="icon--cinerama"></div>
          <form className="card__form" onSubmit={handleSubmit}>
            <h2>Login</h2>
            {error}
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
              autoComplete='on'
              required
              placeholder="Insira sua senha"
            />
            <button type="submit" className="btn" disabled={loading}>
              Fazer login
            </button>
          </form>
        </section>
        <section className="card__senha">
          <div>
            <Link to='/forgot'>Recuperar minha senha</Link>
          </div>
          <div className="criar__conta">
            Deseja criar uma conta ? <Link to='/register'>Registre-se</Link>
          </div>
        </section>
      </main>

  );
};

export default Login;
