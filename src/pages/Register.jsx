import { useRef } from "react";

const Register = () => {
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();

  return (
    <>

      <h2>Registre-se</h2>
      <form action="">
        <input type="email" id="email" ref={emailRef} required />
        <input type="password" id="password" ref={passwordRef} required />
        <input
          type="password"
          id="password-confirm"
          ref={passwordConfirmRef}
          required
        />
        <button>Concluir Cadastro</button>
      </form>

    </>
  );
};

export default Register;
