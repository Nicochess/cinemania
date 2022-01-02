import { useContext, useRef, useState } from "react";
import AuthContext, { AuthProvider } from "../context/AuthProvider";

const Register = () => {
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();
  const { register } = useContext(AuthContext);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (passwordConfirmRef.current.value !== passwordRef.current.value) {
      return setError("A senhas não são iguais");
    }

    try {
      setError("");
      setLoading(true);
      register(emailRef.current.value, passwordRef.current.value);
    } catch {
      setError("Não conseguimos criar sua conta :(");
    }

    setLoading(false);
  };

  return (
    <AuthProvider>
      <main className="main__card">
        <div className="alternative">
          <h2>Registre-se</h2>
          {error}
        </div>
        <form className="card__form" onSubmit={handleSubmit}>
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
      </main>
    </AuthProvider>
  );
};

export default Register;
