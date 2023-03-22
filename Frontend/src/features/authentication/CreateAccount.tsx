import { FormEvent, useState } from 'react';
import { resetTextFromLabels } from './utils/resetTextFromLabels';
import { searchEmptyValues } from './utils/searchEmptyValues';
import { sendError } from './utils/sendError';
import { validateValues } from './utils/validateValues';
import { StyledForm } from './styles/StyledForm';
import { QueriesUser } from './utils/queriesUser';
import { useNotification } from './hooks/useNotification';

export const CreateAccount = () => {
  const { sendNotification } = useNotification();
  const [values, setValues] = useState({
    email: '',
    name: '',
    password: '',
    confirmPassword: '',
  });

  const createAccount = async (e: FormEvent) => {
    e.preventDefault();

    const queriesUser = new QueriesUser();

    resetTextFromLabels(Object.keys(values));

    const emptyValues = searchEmptyValues(values);
    if (emptyValues) return sendError(emptyValues);

    const invalidValues = validateValues(values);
    if (invalidValues) return sendError(invalidValues);

    const { email, name, password } = values;
    const { error } = await queriesUser.createUser({ email, name, password });

    if (error) return sendNotification('error', error);

    sendNotification('success', 'Novo usuario criado');
  };

  return (
    <StyledForm>
      <h1 className="title">Criar conta</h1>

      <form onSubmit={(e) => createAccount(e)}>
        <div className="inputs">
          <div id="email">
            <label htmlFor="email-input" data-text="Email">
              Email
            </label>
            <input id="email-input" type="text" value={values.email} onChange={(e) => setValues({ ...values, email: e.target.value })} />
          </div>

          <div id="name">
            <label htmlFor="name-input" data-text="Nome">
              Nome
            </label>
            <input id="name-input" type="text" value={values.name} onChange={(e) => setValues({ ...values, name: e.target.value })} />
          </div>

          <div id="password">
            <label htmlFor="password-input" data-text="Senha">
              Senha
            </label>
            <input id="password-input" type="password" value={values.password} onChange={(e) => setValues({ ...values, password: e.target.value })} />
          </div>

          <div id="confirmPassword">
            <label htmlFor="confirm-password-input" data-text="Confirme sua senha">
              Confirme sua senha
            </label>
            <input
              id="confirm-password-input"
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
