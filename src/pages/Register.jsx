import { useRef } from "react";

const Register = () => {
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();

  return (
    <main className="main__card">
      <div className="alternative">
      <h2>Registre-se</h2>
      </div>
      <form className="card__form" action="">
        <label htmlFor="email">
          E-mail
        </label>
          <input type="email" id="email" ref={emailRef} required placeholder="Insira seu e-mail"/>
        <label htmlFor="password">
          Senha
        </label>
          <input type="password" id="password" ref={passwordRef} required placeholder="Insira sua senha" />
        <label htmlFor="password-confirm">
          Confirme sua senha
        </label>
          <input
            type="password"
            id="password-confirm"
            ref={passwordConfirmRef}
            required
            placeholder="Repita sua senha"
          />
        <button className="btn">
          Concluir Cadastro
        </button>
      </form>

    </main>
  );
};

export default Register;
