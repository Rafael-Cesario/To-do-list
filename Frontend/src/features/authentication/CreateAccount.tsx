import { FormEvent, useState } from 'react';
import { resetTextFromLabels } from './utils/resetTextFromLabels';
import { searchEmptyValues } from './utils/searchEmptyValues';
import { sendError } from './utils/sendError';
import { validateValues } from './utils/validateValues';
import { StyledForm } from './styles/StyledForm';
import { QueriesUser } from './utils/queriesUser';
import { useNotification } from './hooks/useNotification';
import { Loading } from './Loading';

export const CreateAccount = () => {
  const initialStateValues = { email: '', name: '', password: '', confirmPassword: '' };
  const [isLoading, setIsLoading] = useState(false);
  const [values, setValues] = useState(initialStateValues);
  const { sendNotification } = useNotification();

  // todo > tests
  const createAccount = async (e: FormEvent) => {
    e.preventDefault();

    const queriesUser = new QueriesUser();

    resetTextFromLabels(Object.keys(values));

    const emptyValues = searchEmptyValues(values);
    if (emptyValues) return sendError(emptyValues);

    const invalidValues = validateValues(values);
    if (invalidValues) return sendError(invalidValues);

    setIsLoading(true);

    const { email, name, password } = values;
    const { error } = await queriesUser.createUser({ email, name, password });

    setIsLoading(false);

    if (error) return sendNotification('error', error);

    sendNotification('success', 'Novo usuario criado, você já pode fazer login. Boas vindas!');
    setValues(initialStateValues);
  };

  // todo > component Field for input text
  // todo > component FieldPassword for input type password
  const [passwordInputType, setPasswordInputType] = useState('password');

  return (
    <StyledForm>
      <h1 className="title">Criar conta</h1>

      <form onSubmit={(e) => createAccount(e)}>
        <div className="inputs">
          <div id="email" className="field">
            <label htmlFor="email-input" data-text="Email">
              Email
            </label>
            <input id="email-input" type="text" value={values.email} onChange={(e) => setValues({ ...values, email: e.target.value })} />
          </div>

          <div id="name" className="field">
            <label htmlFor="name-input" data-text="Nome">
              Nome
            </label>
            <input id="name-input" type="text" value={values.name} onChange={(e) => setValues({ ...values, name: e.target.value })} />
          </div>

          <div id="password" className="field">
            <label htmlFor="password-input" data-text="Senha">
              Senha
            </label>
            <div className="password-field">
              {passwordInputType === 'password' && (
                <img onClick={() => setPasswordInputType('text')} className="icon" src="/icons/hidden.png" height={'15rem'} alt="show password" />
              )}

              {passwordInputType === 'text' && (
                <img onClick={() => setPasswordInputType('password')} className="icon" src="/icons/eye.png" height={'15rem'} alt="show password" />
              )}

              <input
                id="password-input"
                type={passwordInputType}
                value={values.password}
                onChange={(e) => setValues({ ...values, password: e.target.value })}
              />
            </div>
          </div>

          <div id="confirmPassword" className="field">
            <label htmlFor="confirm-password-input" data-text="Confirme sua senha">
              Confirme sua senha
            </label>

            <div className="password-field">
              {passwordInputType === 'password' && (
                <img onClick={() => setPasswordInputType('text')} className="icon" src="/icons/hidden.png" height={'15rem'} alt="show password" />
              )}

              {passwordInputType === 'text' && (
                <img onClick={() => setPasswordInputType('password')} className="icon" src="/icons/eye.png" height={'15rem'} alt="show password" />
              )}

              <input
                id="confirm-password-input"
                type={passwordInputType}
                value={values.confirmPassword}
                onChange={(e) => setValues({ ...values, confirmPassword: e.target.value })}
              />
            </div>
          </div>
        </div>

        <Loading isLoading={isLoading} />
        <button className="submit">Criar conta</button>
      </form>
    </StyledForm>
  );
};
