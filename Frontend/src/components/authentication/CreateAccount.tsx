import { FormEvent, useState } from 'react';
import { searchEmptyValues } from '../../utils/searchEmptyValues';
import { StyledForm } from './styles/StyledForm';

export const CreateAccount = () => {
  const [values, setValues] = useState({
    email: '',
    name: '',
    password: '',
    confirmPassword: '',
  });

  const createAccount = (e: FormEvent) => {
    e.preventDefault();

    // todo >
    const emptyValues = searchEmptyValues(values);
    if (emptyValues) return sendError(emptyValues);

    // todo >
    // const invalidValues = validateValues();
    // if (invalidValues) return sendError(invalidValues);

    return;
  };

  return (
    <StyledForm>
      <h1 className="title">Criar conta</h1>

      <form onSubmit={(e) => createAccount(e)}>
        <div className="inputs">
          <div className="email">
            <label htmlFor="email">Email</label>
            <input id="email" type="text" value={values.email} onChange={(e) => setValues({ ...values, email: e.target.value })} />
          </div>

          <div className="name">
            <label htmlFor="name">Nome</label>
            <input id="name" type="text" value={values.name} onChange={(e) => setValues({ ...values, name: e.target.value })} />
          </div>

          <div className="password">
            <label htmlFor="password">Senha</label>
            <input id="password" type="password" value={values.password} onChange={(e) => setValues({ ...values, password: e.target.value })} />
          </div>

          <div className="confirm-password">
            <label htmlFor="confirm-password">Confirme sua senha</label>
            <input
              id="confirm-password"
              type="password"
              value={values.confirmPassword}
              onChange={(e) => setValues({ ...values, confirmPassword: e.target.value })}
            />
          </div>
        </div>
        <button className="submit">Criar conta</button>
      </form>
    </StyledForm>
  );
};
