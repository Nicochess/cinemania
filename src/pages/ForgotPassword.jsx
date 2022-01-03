import { useContext, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../context/AuthProvider";

const ForgotPassword = () => {
  const emailRef = useRef();
  const { forgotPassword } = useContext(AuthContext);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setError("");
      setLoading(true);
      forgotPassword(emailRef.current.value);
      navigate('/')
    } catch {
      setError("Não conseguimos encontrar seu email.");
    }

    setLoading(false);
  };

  return (
      <main className="main__card">
        <div className="alternative">
          <h2>Recuperação</h2>
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
          <button type="submit" className="btn" disabled={loading}>
            Recuperar senha
          </button>
        </form>
      </main>
  );
};

export default ForgotPassword;
